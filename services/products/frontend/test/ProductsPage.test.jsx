import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductsPage from "../pages/ProductsPage.jsx";

describe("ProductsPage", () => {
  it("fetches and renders the product list", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        products: [
          { id: 1, name: "Laptop", price: "1200.00" },
          { id: 2, name: "Mouse", price: "25.99" },
        ],
      }),
    });

    render(<ProductsPage />);

    expect(await screen.findByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("Mouse")).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith("/api/products");
  });
});
