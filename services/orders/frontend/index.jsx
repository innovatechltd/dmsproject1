// Frontend manifest for the orders service — the shell mounts these routes
// and adds these menu entries under the shared layout.
import React from "react";
import OrdersPage from "./pages/OrdersPage.jsx";

export default {
  name: "orders",
  menu: [{ label: "Orders", path: "/orders" }],
  routes: [{ path: "/orders", element: <OrdersPage /> }],
};
