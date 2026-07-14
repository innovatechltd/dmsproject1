-- Orders service — own schema, owned by its own role (created by db-setup).
CREATE SCHEMA IF NOT EXISTS orders AUTHORIZATION orders_service;

CREATE TABLE IF NOT EXISTS orders.orders (
  id         serial PRIMARY KEY,
  user_email text NOT NULL,          -- who placed it (from the SSO token)
  item       text NOT NULL,
  quantity   integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders.orders OWNER TO orders_service;
