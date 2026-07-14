import React, { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState(null);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  async function load() {
    const res = await fetch("/api/orders");
    if (res.ok) setOrders((await res.json()).orders);
  }

  useEffect(() => {
    load();
  }, []);

  async function addOrder(e) {
    e.preventDefault();
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item, quantity }),
    });
    if (res.ok) {
      setItem("");
      setQuantity(1);
      load();
    }
  }

  return (
    <div>
      <h1>Orders</h1>
      <form onSubmit={addOrder} className="row-form">
        <label>
          Item
          <input value={item} onChange={(e) => setItem(e.target.value)} required />
        </label>
        <label>
          Quantity
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <button type="submit">Add order</button>
      </form>

      {orders === null ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.item}</td>
                <td>{o.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
