// src/pages/ProductCRUD.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../features/products/productsSlice";

export default function ProductCRUD() {
  const dispatch = useDispatch();
  const { list, total, loading, error } = useSelector(s => s.products);
  const [form, setForm] = useState({ title: "", price: 0, description: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 50 }));
  }, [dispatch]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      await dispatch(createProduct(form)).unwrap();
      setForm({ title: "", price: 0, description: "" });
    } catch (err) {
      console.error(err);
    }
  }

  function startEdit(p) {
    setEditingId(p.id);
    setForm({ title: p.title || p.name, price: p.price || 0, description: p.description || "" });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await dispatch(updateProduct({ id: editingId, data: form })).unwrap();
      setEditingId(null);
      setForm({ title: "", price: 0, description: "" });
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure to delete?")) return;
    try {
      await dispatch(deleteProduct(id)).unwrap();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Products CRUD — Total records: {total}</h2>

      <div className="crud-grid">
        <div className="crud-form">
          <h3>{editingId ? "Edit Product" : "Create Product"}</h3>
          <form onSubmit={editingId ? handleUpdate : handleCreate}>
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} required />
            <label>Price</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} required />
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} />
            <button className="btn" type="submit" disabled={loading}>
              {editingId ? "Update" : "Create"}
            </button>
            {editingId && <button type="button" onClick={() => {setEditingId(null); setForm({title:'',price:0,description:''})}}>Cancel</button>}
          </form>

          {error && <div className="error">{JSON.stringify(error)}</div>}
        </div>

        <div className="crud-list">
          <h3>List</h3>
          <table className="table">
            <thead><tr><th>ID</th><th>Title</th><th>Price</th><th>Actions</th></tr></thead>
            <tbody>
              {list.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.title || p.name}</td>
                  <td>{p.price}</td>
                  <td>
                    <button onClick={() => startEdit(p)}>Edit</button>
                    <button onClick={() => handleDelete(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
