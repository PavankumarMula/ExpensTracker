import { useEffect, useState } from 'react';
import './Expenses.css'

const Expenses = ()=>{
    const[expenseAmount,setExpenseAmount]=useState(0)
    const[expenseName,setExpenseName]=useState('')
    const[expenseCategory,setExpenseCategory]=useState("")
    const[expenses,setExpenses]=useState([])
    useEffect(()=>{
        try {
            fetch(`https://react-92f28-default-rtdb.firebaseio.com/Expenses.json`)
            .then(response=>response.json().then(data=>{
                let myarray=[]
                for(let key of Object.keys(data)){
                    myarray.push(data[key])
                }
                setExpenses(myarray)
            })).catch(err=>console.log(err))
        } catch (error) {
            alert(error);
        }
    },[])
    const expensesFormHandler =async (event)=>{
        event.preventDefault();
       try {
           const expenseResposnse=await fetch(`https://react-92f28-default-rtdb.firebaseio.com/Expenses.json`,
            {
                method:'POST',
                body: JSON.stringify({
                  amount:expenseAmount,
                  name:expenseName,
                  category:expenseCategory
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
            })//fetch ends)
            if(expenseResposnse.ok){
                const response=await expenseResposnse.json();
                
                setExpenses(prevValues=>{
                    return [...prevValues,{amount:expenseAmount,name:expenseName,category:expenseCategory}]
                })
            }else{
                const response=await expenseResposnse.json();
                throw response.error;
            }
       } catch (error) {
                console.log(error.message);
       }
       
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
              <td>{expense.name}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </center>
    </>
}
export default Expenses;