// RSA keypair used to sign session tokens (RS256).
// Generated automatically on first run into backend/keys/ (gitignored).
// The PRIVATE key never leaves this service; the PUBLIC key is served at
// GET /api/auth/public-key so other services can verify tokens.
import fs from "node:fs";
import path from "node:path";
import { generateKeyPairSync } from "node:crypto";
import { fileURLToPath } from "node:url";

const KEYS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "keys");
const PRIVATE_PATH = path.join(KEYS_DIR, "private.pem");
const PUBLIC_PATH = path.join(KEYS_DIR, "public.pem");

export function loadOrCreateKeys() {
  if (!fs.existsSync(PRIVATE_PATH)) {
    const { privateKey, publicKey } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
      publicKeyEncoding: { type: "spki", format: "pem" },
    });
    fs.mkdirSync(KEYS_DIR, { recursive: true });
    fs.writeFileSync(PRIVATE_PATH, privateKey);
    fs.writeFileSync(PUBLIC_PATH, publicKey);
    console.log("[auth] generated new RSA signing keypair in backend/keys/");
  }
  return {
    privateKey: fs.readFileSync(PRIVATE_PATH, "utf8"),
    publicKey: fs.readFileSync(PUBLIC_PATH, "utf8"),
  };
}
