import SignUp from "./components/SignUp";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import ForgetPassword from "./components/ForgetPassword";
import CompleteProfile from "./components/CompleteProfile";
import LogIn from "./components/Login";

import Expenses from "./components/Expenses";

function App(props) {
  return (
    <>
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
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/forgetpassword">
          <ForgetPassword />
        </Route>
        <Route path="/completeprofile">
          <CompleteProfile />
        </Route>
        <Route path="/expenses">
          <Expenses />
        </Route>
      </Switch>
    </>
  );
}

export default App;
