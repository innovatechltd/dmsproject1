import React, { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function load() {
    const res = await fetch("/api/products");
    if (res.ok) setProducts((await res.json()).products);
  }

  useEffect(() => {
    load();
  }, []);

  async function addProduct(e) {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
    if (res.ok) {
      setName("");
      setPrice("");
      load();
    }
  }

  return (
    <div>
      <h1>Products</h1>
      <form onSubmit={addProduct} className="row-form">
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Price
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add product</button>
      </form>

      {products === null ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{Number(p.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
