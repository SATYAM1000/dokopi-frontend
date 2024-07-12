import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/new-cart-slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
