import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./AuthUser";
import ExpensesSliceReducer from "./ExpensesSlice";
const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    expenses: ExpensesSliceReducer,
  },
});

export default store;
