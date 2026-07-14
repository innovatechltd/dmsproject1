import fs from "node:fs";
import { createPool } from "@dms/service-kit";
import { createApp } from "./app.js";

const { port, name } = JSON.parse(
  fs.readFileSync(new URL("../../service.json", import.meta.url), "utf8")
);

// Connects as orders_service; search_path = orders, so "orders" below is orders.orders.
const pool = createPool(name);

const db = {
  async list(userEmail) {
    const { rows } = await pool.query(
      "SELECT * FROM orders WHERE user_email = $1 ORDER BY id DESC",
      [userEmail]
    );
    return rows;
  },
  async create(userEmail, item, quantity) {
    const { rows } = await pool.query(
      "INSERT INTO orders (user_email, item, quantity) VALUES ($1, $2, $3) RETURNING *",
      [userEmail, item, quantity]
    );
    return rows[0];
  },
};

createApp({ db }).listen(port, () => {
  console.log(`orders service listening on http://localhost:${port}`);
});
