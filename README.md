# DMS — service monorepo

A system of independent full-stack services (Node.js/Express backend +
React frontend per service) composed into one product by a shared **shell**
frontend, all under a single domain, with single sign-on provided by the
**auth** service.

## Quick start

Requirements: **Node.js 20+**. Nothing else — the dev database is a real
PostgreSQL downloaded by npm (no Docker, no installer).

```bash
npm install     # once, at the repo root — installs every workspace
npm run dev     # starts DB + active services + shell
```

Open **http://localhost:3000** and log in with the seeded dev user
`admin@example.com` / `password123`.

Run the tests (all services + shell):

```bash
npm test
```

## How it fits together

```
Browser ── http://localhost:3000 (ONE domain)
              │  shell (Vite) serves the UI and proxies /api/*:
              ├── /api/auth/*      → auth backend      :4001
              ├── /api/orders/*    → orders backend    :4002
              └── /api/products/*  → products backend  :4003
                                        │
                              PostgreSQL :5544 (embedded, .pgdata/)
                              one schema + one DB role per service
```

- **shell/** — the only frontend app that runs. It renders the common
  header + menu and mounts each service's pages. Its Vite dev server is
  also the gateway: it proxies each `/api/<service>` prefix to that
  service's backend port (config derived from `active-services.json` +
  each `service.json` — you never edit the proxy by hand).
- **services/<name>/** — one folder per service, owning its backend AND
  frontend. A developer working on `orders` never needs to open another
  service's folder.
- **packages/service-kit/** — the one shared package: `requireAuth()`
  (verifies the SSO token) and `createPool()` (service-scoped DB pool).

## How single sign-on works

1. Only the **auth** service handles credentials. `POST /api/auth/login`
   verifies the password (bcrypt) and sets an **httpOnly cookie** containing
   a JWT signed with auth's **RSA private key** (RS256, 8h expiry).
2. Because every service is served under **one domain**, the browser sends
   that cookie automatically with every `/api/<service>/...` request.
   Log in once → every service sees your session. That's the SSO.
3. Services verify tokens **locally** with auth's **public key** (fetched
   once from `GET /api/auth/public-key`, cached). They can *verify*
   identities but can never *mint* them — only auth holds the private key.
4. All a service does is `router.use(requireAuth())` — then `req.user`
   is `{ sub, email, name }`. No login code anywhere except auth.

The shell asks `GET /api/auth/me` on load; logged-out visitors are
redirected to `/login` (a page contributed by the auth service's frontend).

## Running only the services you work on

Edit **`active-services.json`** at the repo root:

```json
["auth", "orders"]
```

`npm run dev` then starts only those backends (auth is always included —
everything needs it for login), and the shell shows only those menu items.

## Adding service #4 (and #5, ... #16)

1. Copy `services/orders` to `services/<name>`; rename things and pick a
   free port in `service.json` (4004, 4005, ...).
2. Write your tables in `backend/db/init.sql` — **your own schema only**,
   following the same pattern (`CREATE SCHEMA <name> AUTHORIZATION
   <name>_service`).
3. Export your pages/menu from `frontend/index.jsx` (the manifest).
4. Register it: add `"<name>"` to `active-services.json`, and one import +
   one array entry in `shell/src/services.js`.
5. `npm install` (links the new workspaces), then `npm run dev`.

Database role + schema are created automatically on next `npm run dev`
(or `npm run db:setup`).

## Each service's anatomy

```
services/orders/
├── service.json          # { name, port, basePath } — the service's identity
├── backend/
│   ├── db/init.sql       # own schema + tables, owned by own DB role
│   ├── src/app.js        # express app factory (testable, no DB required)
│   ├── src/server.js     # wires app to the real DB and listens
│   └── test/             # vitest + supertest (incl. token accept/reject)
└── frontend/
    ├── index.jsx         # manifest: { name, menu: [...], routes: [...] }
    ├── pages/            # React pages, rendered inside the shell layout
    └── test/             # vitest + React Testing Library
```

## Useful commands

| Command                                   | What it does                            |
| ----------------------------------------- | --------------------------------------- |
| `npm run dev`                              | DB + active services + shell             |
| `npm run db`                               | just the dev database                    |
| `npm run db:setup`                         | (re)create schemas/roles + seed          |
| `npm test`                                 | every workspace's tests                  |
| `npm test --workspace services/orders/backend` | one workspace's tests               |

## Production notes (not needed for local dev)

- Point the services at a real PostgreSQL with the standard `PG*` env vars;
  create the same per-service roles/schemas there.
- Build the shell (`npm run build --workspace shell`) and put any reverse
  proxy in front, replicating the dev routing — e.g. nginx:

```nginx
server {
  listen 80;
  location /api/auth/     { proxy_pass http://auth:4001; }
  location /api/orders/   { proxy_pass http://orders:4002; }
  location /api/products/ { proxy_pass http://products:4003; }
  location / { root /srv/shell/dist; try_files $uri /index.html; }
}
```

- Set `NODE_ENV=production` so the session cookie is marked `Secure`
  (HTTPS-only), and set `AUTH_URL` for each service to reach auth.
- Possible later upgrades, deliberately left out to keep things simple:
  short-lived tokens + refresh tokens, a sessions table for server-side
  revocation, key rotation via JWKS.
