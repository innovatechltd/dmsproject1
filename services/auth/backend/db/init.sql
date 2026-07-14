-- Auth service — own schema, owned by its own role (created by db-setup).
CREATE SCHEMA IF NOT EXISTS auth AUTHORIZATION auth_service;

CREATE TABLE IF NOT EXISTS auth.users (
  id            serial PRIMARY KEY,
  email         text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name          text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE auth.users OWNER TO auth_service;
