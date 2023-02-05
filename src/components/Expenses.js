import { useEffect, useState } from "react";
import "./Expenses.css";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseSliceActions } from "../Store/ExpensesSlice";
const Expenses = () => {
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseName, setExpenseName] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  // const [expenses, setExpenses] = useState([]);
  const [edit, setEdit] = useState(null);
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
  console.log(expenses);
  useEffect(() => {
    try {
      fetch(`https://react-92f28-default-rtdb.firebaseio.com/Expenses.json`)
        .then((response) =>
          response.json().then((data) => {
            let myarray = [];
            for (let key of Object.keys(data)) {
              myarray.push({ id: key, ...data[key] });
            }

            dispatch(ExpenseSliceActions.refreshExpenses(myarray));
          })
        )
        .catch((err) => console.log(err));
    } catch (error) {
      alert(error);
    }
  }, [dispatch]);

  const expensesFormHandler = async (event) => {
    event.preventDefault();
    if (edit) {
      try {
        const editData = await fetch(
          `https://react-92f28-default-rtdb.firebaseio.com/Expenses/${edit.id}.json`,
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
          //  setExpenses((prevExpenses) =>
          //   prevExpenses.map((item) =>
          //     item.id === edit.id
          //       ? {
          //           ...item,
          // amount: expenseAmount,
          // name: expenseName,
          // category: expenseCategory,
          //         }
          //       : item
          //   )
          // );
          dispatch(
            ExpenseSliceActions.editExpensive({
              id:edit.id,
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
          `https://react-92f28-default-rtdb.firebaseio.com/Expenses.json`,
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
            // setExpenses((prevValues) => {
            //   return [
            //     ...prevValues,
            //     {
            //       id: response.name,
            //       name: expenseName,
            //       amount: expenseAmount,
            //       category: expenseCategory,
            //     },
            //   ];
            // });
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
        `https://react-92f28-default-rtdb.firebaseio.com/Expenses/${expenseId}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // setExpenses((prevValues) => {
        //   return prevValues.filter((expense) => expense.id !== expenseId);
        // });
        dispatch(ExpenseSliceActions.removeExpensive(expenseId))
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
    setExpenseAmount(expense.amount);
    setExpenseCategory(expense.category);
    setExpenseName(expense.name);
    setEdit(expense);
  };
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
      </center>
    </>
  );
};
export default Expenses;
