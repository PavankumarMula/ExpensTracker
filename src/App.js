import SignUp from "./components/SignUp";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import ForgetPassword from "./components/ForgetPassword";
import CompleteProfile from "./components/CompleteProfile";
import LogIn from "./components/Login";
import Expenses from "./components/Expenses";

import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

function App(props) {
  const isLogIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          {localStorage.getItem("token") ? (
            <Redirect to="/home"></Redirect>
          ) : (
            <Redirect to="/login"></Redirect>
          )}
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        {isLogIn && (
          <Route path="/home">
            <Home />
          </Route>
        )}
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/forgetpassword">
          <ForgetPassword />
        </Route>
        <Route path="/completeprofile">
          <CompleteProfile />
        </Route>
        {isLogIn && (
          <Route path="/expenses">
            <Expenses />
          </Route>
        )}
      </Switch>
    </>
  );
}

export default App;
