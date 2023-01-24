import SignUp from "./components/SignUp";
import { Redirect, Route } from "react-router-dom";
import Home from "./components/Home";
import { useState } from "react";


function App(props) {
  const[isLogIn,setIsLogIn]=useState(false)
  const getloginstatus=(boolean)=>{
        if(boolean===true){
          setIsLogIn(true);
        }else{
          setIsLogIn(false)
        }
  }
  return <div>
    <Route path="/signup"><SignUp loginstatus={getloginstatus}/></Route>
    <Route path="/home"><Home/></Route>
    <Route path="/">
      <Redirect to="signup"></Redirect>
    </Route>
    {isLogIn===true&& <Redirect to="/home"></Redirect>}
  </div>
    
}

export default App;
