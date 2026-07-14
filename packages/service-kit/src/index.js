// @dms/service-kit — the only shared code a service needs.
//
//   requireAuth()  Express middleware: verifies the SSO cookie issued by the
//                  auth service and puts the user on req.user. Services never
//                  implement login themselves — they just use this.
//   createPool()   PostgreSQL pool bound to the service's own DB role/schema.
//   COOKIE_NAME    Name of the session cookie set by the auth service.
export { requireAuth, getAuthPublicKey, COOKIE_NAME } from "./auth.js";
export { createPool } from "./db.js";
