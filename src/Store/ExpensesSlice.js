import { createSlice } from "@reduxjs/toolkit";
const intialExpensesState = { expenses: [] };
const ExpensesSlice = createSlice({
  name: "Expenses",
  initialState: intialExpensesState,
  reducers: {
    addExpensive(state, action) {
      state.expenses = [...state.expenses, action.payload];
    },
    editExpensive(state, action) {
      const expenses = state.expenses;
      const index = expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      expenses[index] = {
        ...expenses[index],
        name: action.payload.name,
        amount: action.payload.amount,
        category: action.payload.category,
      };
      state.expenses = [...expenses];
    },
    removeExpensive(state, action) {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload
      );
      if (index !== -1) {
        state.expenses.splice(index, 1);
      }
    },
    // refreshExpenses(state, action) {
    //   state.expenses = [...state.expenses, ...action.payload];
    // },
    refreshExpenses(state, action) {
      const expenses = [...state.expenses];
      action.payload.forEach(item => {
        if (!expenses.some(i => i.id === item.id)) {
          expenses.push(item);
        }
      });
      state.expenses = expenses;
    },
  },
});

export default ExpensesSlice.reducer;
export const ExpenseSliceActions = ExpensesSlice.actions;
