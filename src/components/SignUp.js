import "./SignUp.css";
import { useEffect, useRef, useState } from "react";
import { Link,useHistory } from "react-router-dom";
const SignUp = (props) => {
  const[signedup,setSignedUp]=useState(false);
  const history=useHistory()
   const email=useRef('')
   const password=useRef('')
   const confirmPassword=useRef('')
   //signup form handler
   const signupHandler = async(event)=>{
      event.preventDefault()
     const emailValue=email.current.value
     const passwordValue=password.current.value
     const confirmPasswordValue=confirmPassword.current.value;
     //validations
     if(passwordValue.trim().length<=5){
      return alert("Password must be atleast 6 characters")
     }else if(passwordValue!==confirmPasswordValue){
      return alert("passwords are not matching")
     }
    try{
      const postFormData=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsYyotWR2zesaRukTm4MhJNB9k7RTFZdY`,
      {
         method:'POST',
         body: JSON.stringify({
           email:emailValue,
           password: passwordValue,
           returnSecureToken: true,
         }),
         headers: {
           'Content-Type': 'application/json',
         },
      })//fetch ends
      
      if(postFormData.ok){
        const responseData=await postFormData.json();
        console.log(typeof(responseData.idToken));
        if(responseData.idToken!==''){
          setSignedUp(true);
          history.replace('/login');
        }
      }else{
       const responseData=await postFormData.json();
       throw responseData.error
      }
    }catch(error){
        alert(error.message)
    }
   }//form handler ends

console.log(signedup);


  return <>
   <div className="card">
    <form className="form" onSubmit={signupHandler}>
      <label htmlFor="email">Email</label>
      <input type='email'ref={email}id="email" required></input>
      <label htmlFor="password">Password</label>
      <input type='password'ref={password}id="password" required></input>
      <label htmlFor="confirm">Confirm Password</label>
      <input type='password'ref={confirmPassword}id="confirm" required></input>
      <button type="submit">SignUp</button>
    </form>
    <div>
      <button className="login" onClick={()=>history.replace('/login')}>Already Have An Account? Log In Here</button>
    </div>
   </div>
  
  </>


  

};
export default SignUp;