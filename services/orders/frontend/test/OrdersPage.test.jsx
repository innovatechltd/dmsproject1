import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import OrdersPage from "../pages/OrdersPage.jsx";

describe("OrdersPage", () => {
  it("fetches and renders the user's orders", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        orders: [{ id: 1, item: "Keyboard", quantity: 2, user_email: "a@b.c" }],
      }),
    });

    render(<OrdersPage />);

    expect(await screen.findByText("Keyboard")).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith("/api/orders");
  });

  it("shows an empty state when there are no orders", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ orders: [] }) });

    render(<OrdersPage />);

    expect(await screen.findByText(/no orders yet/i)).toBeInTheDocument();
  });
});
