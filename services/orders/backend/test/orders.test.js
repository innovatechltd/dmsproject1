// The important tests: orders must REJECT requests without a valid token
// from the auth service, and ACCEPT ones with it. We sign tokens with a
// test keypair and hand the public half to requireAuth via AUTH_PUBLIC_KEY
// (the same env override production could use instead of fetching the key).
import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import { generateKeyPairSync } from "node:crypto";
import { createApp } from "../src/app.js";

const rsa = () =>
  generateKeyPairSync("rsa", {
    modulusLength: 2048,
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
    publicKeyEncoding: { type: "spki", format: "pem" },
  });

const authKeys = rsa(); // plays the role of the real auth service
const attackerKeys = rsa(); // someone who is NOT the auth service

const signedByAuth = jwt.sign(
  { sub: "1", email: "test@example.com", name: "Test User" },
  authKeys.privateKey,
  { algorithm: "RS256", expiresIn: "1h" }
);

function inMemoryDb() {
  const rows = [];
  return {
    list: (email) => rows.filter((r) => r.user_email === email),
    create: (user_email, item, quantity) => {
      const row = { id: rows.length + 1, user_email, item, quantity };
      rows.push(row);
      return row;
    },
  };
}

let app;
beforeAll(() => {
  process.env.AUTH_PUBLIC_KEY = authKeys.publicKey;
  app = createApp({ db: inMemoryDb() });
});

describe("orders service auth integration", () => {
  it("rejects requests without any token", async () => {
    const res = await request(app).get("/api/orders");
    expect(res.status).toBe(401);
  });

  it("rejects a token NOT signed by the auth service", async () => {
    const forged = jwt.sign({ sub: "1", email: "evil@example.com" }, attackerKeys.privateKey, {
      algorithm: "RS256",
      expiresIn: "1h",
    });
    const res = await request(app)
      .get("/api/orders")
      .set("Cookie", [`dms_token=${forged}`]);
    expect(res.status).toBe(401);
  });

  it("accepts a token signed by the auth service", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Cookie", [`dms_token=${signedByAuth}`]);
    expect(res.status).toBe(200);
    expect(res.body.orders).toEqual([]);
  });

  it("creates an order attributed to the logged-in user", async () => {
    const created = await request(app)
      .post("/api/orders")
      .set("Cookie", [`dms_token=${signedByAuth}`])
      .send({ item: "Keyboard", quantity: 2 });
    expect(created.status).toBe(201);
    expect(created.body.order.user_email).toBe("test@example.com");

    const list = await request(app)
      .get("/api/orders")
      .set("Cookie", [`dms_token=${signedByAuth}`]);
    expect(list.body.orders).toHaveLength(1);
    expect(list.body.orders[0].item).toBe("Keyboard");
  });
});
