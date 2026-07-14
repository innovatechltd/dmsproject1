-- Products service — own schema, owned by its own role (created by db-setup).
CREATE SCHEMA IF NOT EXISTS products AUTHORIZATION products_service;

CREATE TABLE IF NOT EXISTS products.products (
  id         serial PRIMARY KEY,
  name       text UNIQUE NOT NULL,
  price      numeric(10, 2) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products.products OWNER TO products_service;

-- A little seed data so the page isn't empty on first run.
INSERT INTO products.products (name, price) VALUES
  ('Laptop', 1200.00),
  ('Monitor', 320.50),
  ('Mouse', 25.99)
ON CONFLICT (name) DO NOTHING;
