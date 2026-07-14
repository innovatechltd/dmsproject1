// Local dev orchestrator — the only command you need: `npm run dev`.
//
// It starts, in order:
//   1. the embedded PostgreSQL server        (scripts/db.js)
//   2. schema/role setup + seed              (scripts/db-setup.js)
//   3. the backend of every service listed in active-services.json
//   4. the shell frontend (Vite) on http://localhost:3000 — which also
//      proxies /api/* to the right backend, so :3000 is the single domain.
//
// Edit active-services.json to run only the services you work on.
// "auth" is always started — every other service depends on it for login.
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { startDb } from "./db.js";
import { setupDb } from "./db-setup.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);

const active = JSON.parse(fs.readFileSync(path.join(ROOT, "active-services.json"), "utf8"));
if (!active.includes("auth")) {
  console.log("[dev] adding 'auth' — all services need it for login");
  active.unshift("auth");
}

const db = await startDb();
await setupDb(active);

const children = [];

/** Spawn a child process and prefix each output line with the service name. */
function run(name, command, args, cwd) {
  const child = spawn(command, args, { cwd, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
  const prefix = (data) =>
    String(data)
      .split(/\r?\n/)
      .filter((line) => line.trim())
      .forEach((line) => console.log(`[${name}] ${line}`));
  child.stdout.on("data", prefix);
  child.stderr.on("data", prefix);
  child.on("exit", (code) => {
    if (!shuttingDown) {
      console.error(`[dev] "${name}" exited with code ${code} — shutting everything down`);
      shutdown(1);
    }
  });
  children.push(child);
}

// 3. service backends
for (const service of active) {
  const server = path.join(ROOT, "services", service, "backend", "src", "server.js");
  run(service, process.execPath, [server], path.join(ROOT, "services", service, "backend"));
}

// 4. auth frontend (resolve Vite's JS entry so this works on any OS)
run("frontend", process.execPath, [path.join(ROOT, "services", "auth", "frontend", "node_modules", "vite", "bin", "vite.js")], path.join(ROOT, "services", "auth", "frontend"));

console.log(`[dev] running: ${active.join(", ")} + frontend`);
console.log("[dev] open http://localhost:3000 — Ctrl+C stops everything");

let shuttingDown = false;
async function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) child.kill();
  await db.stop().catch(() => {});
  process.exit(code);
}
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => shutdown());
