import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  image: "",
  token: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { name, email, image, isLoggedIn, token } = action.payload;
      state.name = name;
      state.email = email;
      state.image = image;
      state.isLoggedIn = isLoggedIn;
      state.token = token;
    },
    clearUser(state) {
      state.name = "";
      state.email = "";
      state.image = "";
      state.isLoggedIn = false;
      state.token = "";
    },

    setAccessToken(state, action) {
      state.token = action.payload;
    },

    clearAccessToken(state) {
      state.token = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
