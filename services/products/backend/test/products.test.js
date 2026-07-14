// Confirms products rejects requests without a valid token from the auth
// service and accepts ones with it (see orders' test for the forged-token case
// exercised in depth — the middleware is the same shared requireAuth()).
import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import { generateKeyPairSync } from "node:crypto";
import { createApp } from "../src/app.js";

const authKeys = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
});

const token = jwt.sign({ sub: "1", email: "test@example.com" }, authKeys.privateKey, {
  algorithm: "RS256",
  expiresIn: "1h",
});

function inMemoryDb() {
  const rows = [{ id: 1, name: "Laptop", price: 1200 }];
  return {
    list: () => rows,
    create: (name, price) => {
      const row = { id: rows.length + 1, name, price };
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

describe("products service auth integration", () => {
  it("rejects requests without a token", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(401);
  });

  it("lists products for a logged-in user", async () => {
    const res = await request(app)
      .get("/api/products")
      .set("Cookie", [`dms_token=${token}`]);
    expect(res.status).toBe(200);
    expect(res.body.products[0].name).toBe("Laptop");
  });

  it("creates a product for a logged-in user", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Cookie", [`dms_token=${token}`])
      .send({ name: "Webcam", price: 49.99 });
    expect(res.status).toBe(201);
    expect(res.body.product.name).toBe("Webcam");
  });

  it("rejects creation without a token", async () => {
    const res = await request(app).post("/api/products").send({ name: "X", price: 1 });
    expect(res.status).toBe(401);
  });
});
