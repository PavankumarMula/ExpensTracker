import { createSlice } from "@reduxjs/toolkit";
const loggedIn = localStorage.getItem("token") ? true : false;

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: loggedIn },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
