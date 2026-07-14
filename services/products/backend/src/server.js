import fs from "node:fs";
import { createPool } from "@dms/service-kit";
import { createApp } from "./app.js";

const { port, name } = JSON.parse(
  fs.readFileSync(new URL("../../service.json", import.meta.url), "utf8")
);

// Connects as products_service; search_path = products.
const pool = createPool(name);

const db = {
  async list() {
    const { rows } = await pool.query("SELECT * FROM products ORDER BY id");
    return rows;
  },
  async create(productName, price) {
    const { rows } = await pool.query(
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
      [productName, price]
    );
    return rows[0];
  },
};

createApp({ db }).listen(port, () => {
  console.log(`products service listening on http://localhost:${port}`);
});
