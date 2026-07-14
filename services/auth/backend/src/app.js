// The SSO service. The ONLY place in the whole system that handles
// credentials and issues session tokens. Endpoints (under /api/auth):
//
//   POST /login       check email+password, set httpOnly session cookie (JWT)
//   POST /logout      clear the cookie
//   GET  /me          who is logged in (valid cookie required)
//   GET  /public-key  PEM public key other services use to verify tokens
//
// The app is a factory so tests can inject an in-memory user store.
import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { requireAuth, COOKIE_NAME } from "@dms/service-kit";

const SESSION_HOURS = 8;

/**
 * @param users      { findByEmail(email) -> { id, email, password_hash, name } | null }
 * @param privateKey PEM RSA private key (signs tokens)
 * @param publicKey  PEM RSA public key (verifies tokens, served to other services)
 */
export function createApp({ users, privateKey, publicKey }) {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  const router = express.Router();

  router.post("/login", async (req, res) => {
    const { email, password } = req.body ?? {};
    const user = email ? await users.findByEmail(email) : null;
    if (!user || !bcrypt.compareSync(password ?? "", user.password_hash)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { sub: String(user.id), email: user.email, name: user.name },
      privateKey,
      { algorithm: "RS256", expiresIn: `${SESSION_HOURS}h` }
    );

    // httpOnly: JS can't read it (XSS-safe). SameSite=Lax + one shared domain
    // is what makes this single sign-on: the browser sends this cookie to
    // EVERY service's /api/* route automatically.
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_HOURS * 60 * 60 * 1000,
    });
    res.json({ user: { id: user.id, email: user.email, name: user.name } });
  });

  router.post("/logout", (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.json({ ok: true });
  });

  router.get("/me", requireAuth({ publicKey }), (req, res) => {
    res.json({ user: { id: req.user.sub, email: req.user.email, name: req.user.name } });
  });

  router.get("/public-key", (req, res) => {
    res.type("text/plain").send(publicKey);
  });

  app.use("/api/auth", router);
  return app;
}
