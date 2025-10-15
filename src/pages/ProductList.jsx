// src/pages/ProductList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const { list, loading, error, total } = useSelector(s => s.products);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 30 }));
  }, [dispatch]);

  return (
    <div>
      <h2>Products ({total})</h2>
      {loading && <div>Loading products...</div>}
      {error && <div className="error">{JSON.stringify(error)}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {list.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title || p.name}</td>
              <td>{p.price}</td>
              <td>{p.brand || "-"}</td>
              <td>{p.category || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
