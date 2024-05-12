import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart-slice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
