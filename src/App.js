import SignUp from "./components/SignUp";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import ForgetPassword from "./components/ForgetPassword";
import CompleteProfile from "./components/CompleteProfile";


function App(props) {
  const loadtoken=localStorage.getItem('token');
  const isLoggedIn=!!loadtoken
  console.log(isLoggedIn);
  return <>
  <Switch>
   {isLoggedIn===true&& <Route exact path='/' component={Home}/>}
   {isLoggedIn===false&& <Route exact path='/' component={SignUp}/>}
    <Route path='/home' component={Home}/>
    <Route path="/forgetpassword" component={ForgetPassword}/>
    <Route path="/signup" component={SignUp}/>
    <Route path="/completeprofile" component={CompleteProfile}/>
  </Switch>
  </>
  
 
   
  
    
}

export default App;
