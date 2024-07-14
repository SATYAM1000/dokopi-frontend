import { fetchAccessToken } from "@/actions/access-token";
import { fetchServerURL } from "@/actions/server-url";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching cart items from the server
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const API_URL = await fetchServerURL();
      const token = await fetchAccessToken();
      const response = await axios.get(`${API_URL}/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.cart.cartItems;
    } catch (error) {
      console.error(
        "Error fetching cart items:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk for adding a new cart item
export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ userId, cartItem }, { rejectWithValue }) => {
    try {
      const API_URL = await fetchServerURL();
      const token = await fetchAccessToken();
      const response = await axios.post(`${API_URL}/add`, cartItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.cartItem;
    } catch (error) {
      console.error(
        "Error adding cart item:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk for updating a cart item
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ userId, fileId, updatedCartItem }, { rejectWithValue }) => {
    try {
      const API_URL = await fetchServerURL();
      const token = await fetchAccessToken();
      const response = await axios.put(
        `${API_URL}/update/${fileId}`,
        updatedCartItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.cart;
    } catch (error) {
      console.error(
        "Error updating cart item:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk for deleting a cart item
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, fileId }, { rejectWithValue }) => {
    try {
      const API_URL = await fetchServerURL();
      const token = await fetchAccessToken();
      await axios.delete(`${API_URL}/delete/${fileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return fileId;
    } catch (error) {
      console.error(
        "Error deleting cart item:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk for clearing the cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId, { rejectWithValue }) => {
    try {
      const API_URL = await fetchServerURL();
      const token = await fetchAccessToken();
      await axios.delete(`${API_URL}/clear`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return [];
    } catch (error) {
      console.error(
        "Error clearing cart:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        if (Array.isArray(state.items)) {
          state.items.push(action.payload);
        } else {
          state.items = [action.payload];
        }
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const existingIndex = state.items.findIndex(
          (item) => item.fileId === updatedItem.fileId
        );
        if (existingIndex !== -1) {
          state.items[existingIndex] = updatedItem;
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        const idToDelete = action.payload;
        state.items = state.items.filter((item) => item.fileId !== idToDelete);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default cartSlice.reducer;
