import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./AuthUser";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});

export default store;