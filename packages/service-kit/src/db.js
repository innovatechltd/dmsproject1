import pg from "pg";

/**
 * PostgreSQL pool for one service. Each service connects as its OWN role
 * (created by scripts/db-setup.js) whose search_path is pinned to the
 * service's own schema — so plain `SELECT ... FROM orders` hits
 * orders.orders, and the role has no rights on other services' schemas.
 *
 * Defaults match the embedded dev database; override via standard PG* env
 * vars in production.
 */
export function createPool(serviceName) {
  return new pg.Pool({
    host: process.env.PGHOST || "localhost",
    port: Number(process.env.PGPORT || 5544),
    database: process.env.PGDATABASE || "dms",
    user: process.env.PGUSER || `${serviceName}_service`,
    password: process.env.PGPASSWORD || "devpassword",
  });
}
