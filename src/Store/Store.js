import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./AuthUser";
import ExpensesSliceReducer from "./ExpensesSlice";
import ThemeSlicer from "./ThemeSlicer";
const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    expenses: ExpensesSliceReducer,
    theme:ThemeSlicer
  },
});

export default store;
