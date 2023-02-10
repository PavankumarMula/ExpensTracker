import { createSlice } from "@reduxjs/toolkit";





const loggedIn = localStorage.getItem("token") ? true : false;
const email=localStorage.getItem("email")
const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: loggedIn,email:email },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.email=localStorage.getItem("email");
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.email=null
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
