import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import bcrypt from "bcryptjs";
import { generateKeyPairSync } from "node:crypto";
import { createApp } from "../src/app.js";

// Tests run against an in-memory user store and a throwaway keypair — no DB needed.
const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
});

const testUser = {
  id: 1,
  email: "test@example.com",
  password_hash: bcrypt.hashSync("secret123", 4),
  name: "Test User",
};

const users = { findByEmail: (email) => (email === testUser.email ? testUser : null) };

let app;
beforeAll(() => {
  app = createApp({ users, privateKey, publicKey });
});

describe("auth service", () => {
  it("rejects a wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "wrong" });
    expect(res.status).toBe(401);
  });

  it("logs in with correct credentials and sets the session cookie", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "secret123" });
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe("test@example.com");
    expect(res.headers["set-cookie"][0]).toContain("dms_token=");
    expect(res.headers["set-cookie"][0]).toContain("HttpOnly");
  });

  it("reports the logged-in user on /me using the cookie", async () => {
    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "secret123" });

    const me = await request(app)
      .get("/api/auth/me")
      .set("Cookie", login.headers["set-cookie"]);
    expect(me.status).toBe(200);
    expect(me.body.user.email).toBe("test@example.com");
  });

  it("rejects /me without a cookie", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });

  it("serves the public key other services verify tokens with", async () => {
    const res = await request(app).get("/api/auth/public-key");
    expect(res.status).toBe(200);
    expect(res.text).toContain("BEGIN PUBLIC KEY");
  });
});
