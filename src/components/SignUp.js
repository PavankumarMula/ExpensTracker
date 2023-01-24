import "./SignUp.css";
import { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const[loadToken,setLoadToken]=useState('');
  const isLoggedIn=!!loadToken
  useEffect(()=>{
    setLoadToken(prevToken=>{
        if(localStorage.getItem('token')){
           return prevToken=localStorage.getItem('token') 
        }else return prevToken=''
      })
  },[])
  
  let url;
      if(isLoggedIn===true){
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsYyotWR2zesaRukTm4MhJNB9k7RTFZdY'
      }else{
        url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsYyotWR2zesaRukTm4MhJNB9k7RTFZdY'
      }


  const formhandler = async (e) => {
    e.preventDefault();
    if(isLoggedIn===false){
        if (password.trim().length <= 5) {
            return alert("password must be atleast 6 characters");
          } else if (password !== confirmpassword) {
            return alert("passwords are not matching");
          }
    }
    
    try {
      
      
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
      
        const jsonresponse = await response.json();
        console.log(jsonresponse.idToken);
        localStorage.setItem('token',jsonresponse.idToken);
        localStorage.setItem('email',jsonresponse.email);
        props.loginstatus(isLoggedIn);
        
      } else {
        const jsondata = await response.json();
        throw jsondata.error;
      }
    } catch (err) {
      alert(err.message);
    }
  };

 const buttonHandler=(e)=>{
    setLoadToken(prevState=>!prevState);
    setEmail('')
    setPassword('')
    setConfirmpassword('')
 }

  


  return (
    <div className="card">
      <form onSubmit={formhandler} className="form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <label htmlFor="password">password</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
       {!isLoggedIn&& <label htmlFor="confirmpswd">Confirm password</label>}
        {!isLoggedIn&&<input
          type="text"
          id="confirmpswd"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
          required
        ></input>}
        <button type="submit" id="signup">
          {isLoggedIn===true? 'LogIN':'SignUp'}
        </button>
      </form>
      {isLoggedIn===true&& <Link to='/forgetpassword'><center>Forget the password ?</center></Link>}
      <button className="login" onClick={buttonHandler}>{isLoggedIn===true ?'Dont Have An Account Sign Up Here':'Have An Account? Sign in here'}</button>
    </div>
  );
};
export default SignUp;
