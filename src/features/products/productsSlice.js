// src/features/products/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// fetch products (paginated optional)
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit = 30, skip = 0 } = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(`/products?limit=${limit}&skip=${skip}`);
      return res.data; // { products: [...], total, skip, limit }
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

// create product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (payload, { rejectWithValue }) => {
    try {
      // dummyjson supports /products/add
      const res = await api.post("/products/add", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

// update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/products/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

// delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/products/${id}`);
      return { id, data: res.data };
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(fetchProducts.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload.products || [];
        s.total = a.payload.total || s.list.length;
      })
      .addCase(fetchProducts.rejected, (s, a) => { s.loading = false; s.error = a.payload || "Failed to fetch"; })

      .addCase(createProduct.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(createProduct.fulfilled, (s, a) => {
        s.loading = false;
        // dummyjson returns created product - add to list
        s.list.unshift(a.payload);
        s.total += 1;
      })
      .addCase(createProduct.rejected, (s, a) => { s.loading = false; s.error = a.payload || "Create failed"; })

      .addCase(updateProduct.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(updateProduct.fulfilled, (s, a) => {
        s.loading = false;
        const idx = s.list.findIndex(p => p.id === a.payload.id);
        if (idx !== -1) s.list[idx] = a.payload;
      })
      .addCase(updateProduct.rejected, (s, a) => { s.loading = false; s.error = a.payload || "Update failed"; })

      .addCase(deleteProduct.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(deleteProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.list = s.list.filter(p => p.id !== a.payload.id);
        s.total = Math.max(0, s.total - 1);
      })
      .addCase(deleteProduct.rejected, (s, a) => { s.loading = false; s.error = a.payload || "Delete failed"; });
  }
});

export default productsSlice.reducer;
