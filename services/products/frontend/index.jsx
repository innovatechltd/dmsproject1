// Frontend manifest for the products service.
import React from "react";
import ProductsPage from "./pages/ProductsPage.jsx";

export default {
  name: "products",
  menu: [{ label: "Products", path: "/products" }],
  routes: [{ path: "/products", element: <ProductsPage /> }],
};
