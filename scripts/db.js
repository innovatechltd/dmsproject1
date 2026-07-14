// Starts a real PostgreSQL server for local development — no Docker or
// system-wide install needed. Binaries come from the `embedded-postgres`
// npm package; data lives in .pgdata/ (gitignored).
//
// Usage: `npm run db` (or it is started automatically by `npm run dev`).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import EmbeddedPostgres from "embedded-postgres";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = path.join(ROOT, ".pgdata");

export const DB_CONFIG = {
  host: "localhost",
  port: 5544, // non-default port so we never clash with a system PostgreSQL
  database: "dms",
  superuser: "postgres",
  superpassword: "postgres",
};

/** Start (initialising on first run) the dev database. Returns the server handle. */
export async function startDb() {
  const pg = new EmbeddedPostgres({
    databaseDir: DATA_DIR,
    user: DB_CONFIG.superuser,
    password: DB_CONFIG.superpassword,
    port: DB_CONFIG.port,
    persistent: true,
  });

  if (!fs.existsSync(path.join(DATA_DIR, "PG_VERSION"))) {
    console.log("[db] first run — initialising PostgreSQL data directory...");
    await pg.initialise();
  }

  await pg.start();

  try {
    await pg.createDatabase(DB_CONFIG.database);
    console.log(`[db] created database "${DB_CONFIG.database}"`);
  } catch {
    // database already exists — fine
  }

  console.log(`[db] PostgreSQL ready on localhost:${DB_CONFIG.port}`);
  return pg;
}

// Allow running standalone: `node scripts/db.js`
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const pg = await startDb();
  console.log("[db] press Ctrl+C to stop");
  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, async () => {
      await pg.stop();
      process.exit(0);
    });
  }
}
