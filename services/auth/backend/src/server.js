import fs from "node:fs";
import { createPool } from "@dms/service-kit";
import { createApp } from "./app.js";
import { loadOrCreateKeys } from "./keys.js";

const { port, name } = JSON.parse(
  fs.readFileSync(new URL("../../service.json", import.meta.url), "utf8")
);

const pool = createPool(name);
const { privateKey, publicKey } = loadOrCreateKeys();

// Real user store backed by this service's own schema (search_path = auth).
const users = {
  async findByEmail(email) {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return rows[0] ?? null;
  },
};

createApp({ users, privateKey, publicKey }).listen(port, () => {
  console.log(`auth service listening on http://localhost:${port}`);
});
