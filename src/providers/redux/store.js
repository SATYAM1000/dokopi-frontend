import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart-slice";
import userReducer from "./slices/user-slice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});
