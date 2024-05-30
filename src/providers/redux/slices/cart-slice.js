import { createSlice } from "@reduxjs/toolkit";
const getInitialCartItems = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  }
  return [];
};

const initialState = {
  items: getInitialCartItems(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setInitialCartItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      state.items.push(newItem);
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    deleteFromCart: (state, action) => {
      const itemIdToDelete = action.payload;
      state.items = state.items.filter((item) => item.id !== itemIdToDelete);
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("cartItems");
      }
    },
  },
});

export const {
  setInitialCartItems,
  addToCart,
  deleteFromCart,
  increaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
