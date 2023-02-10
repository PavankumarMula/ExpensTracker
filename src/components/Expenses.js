import { useEffect, useState } from "react";
import "./Expenses.css";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseSliceActions } from "../Store/ExpensesSlice";
import { themeActions } from "../Store/ThemeSlicer";

const Expenses = () => {
  const dispatch = useDispatch();
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseName, setExpenseName] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [toatalAmont, setTotalAmount] = useState(0);
  const [edit, setEdit] = useState(null);
  const expenses = useSelector((state) => state.expenses.expenses);
  const themeMode = useSelector((state) => state.theme.theme);
  const email = useSelector((state) => state.auth.email);
  const emailUrl = email.replace(/[@.]/g, "");
 console.log(expenses)
  useEffect(() => {
    
    if (emailUrl) {
      const bringData = async () => {
        const expensesData = await fetch(
          `https://react-demo-50fe0-default-rtdb.firebaseio.com/${emailUrl}Expenses.json`
        );
        if (expensesData.ok) {
          const expensesJson = await expensesData.json();
          let myarray = [];
          for (let key of Object.keys(expensesJson)) {
            let obj = expensesJson[key];
            myarray.push({
              id:key,...obj});
          }
          dispatch(ExpenseSliceActions.refreshExpenses(myarray));
        }
      };
      bringData().catch(alert.error);
    }
  }, [dispatch,emailUrl]);

  //premuim
  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < expenses.length; i++) {
      sum = sum + parseInt(expenses[i].amount);
    }
    setTotalAmount(sum);
  }, [expenses]);
  //theme

  useEffect(() => {
    if (themeMode === "dark") {
      document.body.style.backgroundColor = "darkred";
    } else {
      document.body.style.backgroundColor = "darkblue";
    }
  }, [themeMode]); //theme ends

  const expensesFormHandler = async (event) => {
    event.preventDefault();
    if (edit) {
      try {
        const editData = await fetch(
          `https://react-demo-50fe0-default-rtdb.firebaseio.com/${emailUrl}Expenses/${edit.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify({
              amount: expenseAmount,
              name: expenseName,
              category: expenseCategory,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (editData.ok) {
          dispatch(
            ExpenseSliceActions.editExpensive({
              id: edit.id,
              amount: expenseAmount,
              name: expenseName,
              category: expenseCategory,
            })
          );
        } else {
          const editjson = await editData.json();
          throw editjson.error;
        }
      } catch (error) {
        alert(error.message);
      }
    }
    //add Expense
    else {
      try {
        const expenseResposnse = await fetch(
          `https://react-demo-50fe0-default-rtdb.firebaseio.com/${emailUrl}Expenses.json`,
          {
            method: "POST",
            body: JSON.stringify({
              amount: expenseAmount,
              name: expenseName,
              category: expenseCategory,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ); //fetch ends)
        if (expenseResposnse.ok) {
          const response = await expenseResposnse.json();
          if (response.name !== undefined) {
  
           
            dispatch(
              ExpenseSliceActions.addExpensive({
                id: response.name,
                name: expenseName,
                amount: expenseAmount,
                category: expenseCategory,
              })
            );
            setExpenseName("");
            setExpenseAmount(0);
            setExpenseCategory("");
          }
        } else {
          const response = await expenseResposnse.json();
          throw response.error;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  //Delete Handler
  const deleteHandler = async (expenseId) => {
    try {
      const response = await fetch(
        `https://react-demo-50fe0-default-rtdb.firebaseio.com/${emailUrl}Expenses/${expenseId}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        
        dispatch(ExpenseSliceActions.removeExpensive(expenseId));
      } else {
        const data = await response.json();
        throw data.error;
      }
    } catch (error) {
      alert(error.message);
    }
  };
  //Edit Hanndler
  const editHandler = async (expense) => {
    console.log(expense);
    setExpenseAmount(expense.amount);
    setExpenseCategory(expense.category);
    setExpenseName(expense.name);
    setEdit(expense);
  };

  //premium Handler
  const premiumHandler = () => {
    dispatch(themeActions.toggleTheme());
  };
  //csv files
  const title = ["Category", "Amount", "Description"];
  const data = [title];

  expenses.forEach((item) => {
    data.push([item.name, item.amount, item.category]);
  });

  const creatingCSV = data.map((row) => row.join(",")).join("\n");
  const blob = new Blob([creatingCSV]);

  return (
    <>
      <div className="card">
        <form className="form" onSubmit={expensesFormHandler}>
          <label htmlFor="amount">Expense Amount</label>
          <input
            value={expenseAmount}
            type="number"
            id="amount"
            onChange={(e) => setExpenseAmount(e.target.value)}
          ></input>
          <label htmlFor="name" value={expenseName}>
            Expense Name
          </label>
          <input
            type="text"
            id="name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          ></input>
          <label htmlFor="category">Choose Expense Category</label>
          <select
            id="category"
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
          >
            <option value="none">Select an Option</option>
            <option value="Entertainment">Entertainment</option>
            <option value="study">Study</option>
            <option value="food">Food</option>
            <option value="sports">Sports</option>
          </select>
          <button type="submit">Add</button>
        </form>
      </div>
      <center>
        <h2 style={{ color: "beige" }}>Expenses:</h2>
        <table className="expense-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
                <td>
                  <button
                    onClick={() => {
                      editHandler(expense);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteHandler(expense.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {toatalAmont >= 10000 && (
          <button
            onClick={premiumHandler}
            style={{
              marginTop: "1rem",
              backgroundColor: "red",
              color: "white",
              borderRadius: "15px",
            }}
          >
            SubScribe to Premium
          </button>
        )}
        <a
          href={URL.createObjectURL(blob)}
          download="expenses.csv"
          style={{ marginTop: "80px", color: "red" }}
        >
          Download Your Expenses
        </a>
      </center>
    </>
  );
};
export default Expenses;
