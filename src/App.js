import SignUp from "./components/SignUp";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import { useState } from "react";
import ForgetPassword from "./components/ForgetPassword";
import CompleteProfile from "./components/CompleteProfile";


function App(props) {
  const[isLogIn,setIsLogIn]=useState(false)
  const getloginstatus=(boolean)=>{
    console.log(boolean)
        if(boolean===true){
          setIsLogIn(true);
        }else{
          setIsLogIn(false)
        }
  }
  return <>
     <Route path="/signup"><SignUp loginstatus={getloginstatus}/></Route>
    <Route path="/home"><Home/></Route>
    <Route path="/forgetpassword"><ForgetPassword/></Route>
    <Route path="/">
      <Redirect to="signup"></Redirect>
    </Route>
    {isLogIn===true&& <Redirect to="/home"></Redirect>}
    <Route path="/completeprofile"><CompleteProfile/></Route>
  </>
  
 
   
  
    
}

export default App;
