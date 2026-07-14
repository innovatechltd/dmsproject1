import jwt from "jsonwebtoken";

export const COOKIE_NAME = "dms_token";

let cachedKey = null;

// The auth service signs tokens with its PRIVATE key (RS256). Everyone else
// verifies them with its PUBLIC key, fetched once from the auth service and
// cached. Public-key crypto means other services can VERIFY identities but
// can never MINT them — even a compromised service can't forge a login.
export async function getAuthPublicKey() {
  if (process.env.AUTH_PUBLIC_KEY) return process.env.AUTH_PUBLIC_KEY; // used by tests
  if (cachedKey) return cachedKey;
  const base = process.env.AUTH_URL || "http://localhost:4001";
  const res = await fetch(`${base}/api/auth/public-key`);
  if (!res.ok) throw new Error(`Could not fetch auth public key from ${base} (${res.status})`);
  cachedKey = await res.text();
  return cachedKey;
}

/**
 * Express middleware guarding a route. On success, req.user is the token
 * payload: { sub, email, name }. On failure, responds 401.
 *
 * Usage:   router.use(requireAuth());
 * Options: { publicKey } — provide the key directly (the auth service itself
 *          and tests use this); by default it is fetched from the auth service.
 */
export function requireAuth(options = {}) {
  return async (req, res, next) => {
    try {
      // Cookie is the normal path (browser). Bearer header supports
      // service-to-service or scripted calls.
      const bearer = req.headers.authorization?.replace(/^Bearer /, "");
      const token = req.cookies?.[COOKIE_NAME] || bearer;
      if (!token) return res.status(401).json({ error: "Not logged in" });

      const key = options.publicKey || (await getAuthPublicKey());
      req.user = jwt.verify(token, key, { algorithms: ["RS256"] });
      next();
    } catch {
      res.status(401).json({ error: "Invalid or expired session" });
    }
  };
}
