// Orders backend. Note there is NO login code here — requireAuth() from
// @dms/service-kit verifies the SSO cookie issued by the auth service and
// gives us req.user. That's the entire integration.
import express from "express";
import cookieParser from "cookie-parser";
import { requireAuth } from "@dms/service-kit";

/**
 * @param db { list(userEmail), create(userEmail, item, quantity) }
 */
export function createApp({ db }) {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  const router = express.Router();
  router.use(requireAuth()); // every orders route requires a valid session

  router.get("/", async (req, res) => {
    res.json({ orders: await db.list(req.user.email) });
  });

  router.post("/", async (req, res) => {
    const { item, quantity } = req.body ?? {};
    if (!item) return res.status(400).json({ error: "item is required" });
    const order = await db.create(req.user.email, item, Number(quantity) || 1);
    res.status(201).json({ order });
  });

  app.use("/api/orders", router);
  return app;
}
