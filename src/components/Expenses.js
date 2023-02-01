import { useState } from 'react';
import './Expenses.css'

const Expenses = ()=>{
    const[expenseAmount,setExpenseAmount]=useState(0)
    const[expenseName,setExpenseName]=useState('')
    const[expenseCategory,setExpenseCategory]=useState("")
    const[expenses,setExpenses]=useState([])
    const expensesFormHandler =(event)=>{
        event.preventDefault();
        setExpenses((prevvalue)=>{
            return [...prevvalue,{eamount:expenseAmount,ename:expenseName,ecategory:expenseCategory}]
        })
    }
    return <>
        <div className="card">
            <form className='form' onSubmit={expensesFormHandler}>
                <label htmlFor="amount">Expense Amount</label>
                <input value={expenseAmount} type="number" id="amount" onChange={(e)=>setExpenseAmount(e.target.value)}></input>
                <label htmlFor="name" value={expenseName}>Expense Name</label>
                <input type="text" id="name" onChange={(e)=>setExpenseName(e.target.value)}></input>
                <label htmlFor="category">Choose Expense Category</label>
                <select  id="category" value={expenseCategory} onChange={(e)=>setExpenseCategory(e.target.value)}>
                <option value="none" >Select an Option</option>
                <option value="Entertainment">Entertainment</option>
                <option value="study">Study</option>
                <option value="food">Food</option>
                <option value="sports">Sports</option>
                </select>
                <button type="submit">Add</button>
            </form>
        </div>
        <center><h2 style={{color:'beige'}}>Expenses:</h2>
        <table className="expense-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.ename}</td>
              <td>{expense.eamount}</td>
              <td>{expense.ecategory}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </center>
    </>
}
export default Expenses;