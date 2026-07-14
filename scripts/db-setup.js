// Idempotent database setup. For every active service that ships a
// backend/db/init.sql, this script:
//   1. creates a dedicated DB role  <service>_service  (login, dev password)
//   2. runs the service's init.sql  (which creates the service's OWN schema,
//      owned by that role — services cannot touch each other's schemas)
//   3. pins the role's search_path to its schema
// Finally it seeds a dev user into the auth schema.
//
// Usage: `npm run db:setup` (also run automatically by `npm run dev`).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import bcrypt from "bcryptjs";
import { DB_CONFIG } from "./db.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEV_ROLE_PASSWORD = "devpassword";

export async function setupDb(activeServices) {
  const client = new pg.Client({
    host: DB_CONFIG.host,
    port: DB_CONFIG.port,
    database: DB_CONFIG.database,
    user: DB_CONFIG.superuser,
    password: DB_CONFIG.superpassword,
  });
  await client.connect();

  for (const service of activeServices) {
    const initSql = path.join(ROOT, "services", service, "backend", "db", "init.sql");
    if (!fs.existsSync(initSql)) continue;

    const role = `${service}_service`;
    await client.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${role}') THEN
          CREATE ROLE ${role} LOGIN PASSWORD '${DEV_ROLE_PASSWORD}';
        END IF;
      END $$;
    `);
    await client.query(fs.readFileSync(initSql, "utf8"));
    await client.query(`ALTER ROLE ${role} SET search_path = ${service}`);
    console.log(`[db-setup] service "${service}": role + schema ready`);
  }

  // Seed a dev login so the system is usable immediately after first start.
  if (activeServices.includes("auth")) {
    const { rows } = await client.query("SELECT count(*)::int AS n FROM auth.users");
    if (rows[0].n === 0) {
      const hash = bcrypt.hashSync("password123", 10);
      await client.query(
        "INSERT INTO auth.users (email, password_hash, name) VALUES ($1, $2, $3)",
        ["admin@example.com", hash, "Admin"]
      );
      console.log("[db-setup] seeded dev user admin@example.com / password123");
    }
  }

  await client.end();
}

// Allow running standalone: `node scripts/db-setup.js` (needs the DB running)
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const active = JSON.parse(fs.readFileSync(path.join(ROOT, "active-services.json"), "utf8"));
  await setupDb(active);
}
