import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/AuthUser";
import { useHistory } from "react-router-dom";
import { ExpenseSliceActions } from "../Store/ExpensesSlice";
const Navbar = () => {
    const dispatch=useDispatch()
    const history=useHistory()
    const logoutHandler=()=>{
        dispatch(authActions.logout())
        dispatch(ExpenseSliceActions.logoutbutton())
        history.replace('/login')
    }
  return (
    <nav className="navbar">
      <h1 className="navbar-header">Expense Tracker</h1>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/home" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
         <Link to='/Expenses'className="nav-link">Expenses</Link>
        </li>
        <li className="nav-item">
         <Link to='/login'className="nav-link">Login</Link>
        </li>
        <button className="button" onClick={logoutHandler}>logout</button>
      </ul>
    </nav>
  );
};

export default Navbar;
