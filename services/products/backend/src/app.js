// Products backend. No login code here — requireAuth() from @dms/service-kit
// verifies the SSO cookie issued by the auth service.
import express from "express";
import cookieParser from "cookie-parser";
import { requireAuth } from "@dms/service-kit";

/**
 * @param db { list(), create(name, price) }
 */
export function createApp({ db }) {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  const router = express.Router();
  router.use(requireAuth()); // every products route requires a valid session

  router.get("/", async (req, res) => {
    res.json({ products: await db.list() });
  });

  router.post("/", async (req, res) => {
    const { name, price } = req.body ?? {};
    if (!name || price == null) {
      return res.status(400).json({ error: "name and price are required" });
    }
    const product = await db.create(name, Number(price));
    res.status(201).json({ product });
  });

  app.use("/api/products", router);
  return app;
}
