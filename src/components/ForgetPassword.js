import { useRef } from "react";
import { useHistory } from "react-router-dom";

const ForgetPassword = () => {
  const email = useRef("");
  const history = useHistory();
  //reset password handler
  const resetPasswordHandler = async(event) => {
    event.preventDefault();
  try {
    const sendEmail=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAsYyotWR2zesaRukTm4MhJNB9k7RTFZdY`,
    {
     method:'POST',
     body: JSON.stringify({
       requestType:"PASSWORD_RESET",  
       email:email.current.value,
       returnSecureToken: true,
     }),
     headers: {
       'Content-Type': 'application/json',
     },
    })//fetch ends
    if(sendEmail.ok){
     const response=await sendEmail.json()
     history.replace('/login');
     console.log(response)
    }else{
     const response=await sendEmail.json()
     throw response.error   
    }
  } catch (error) {
    alert(error.message)
  }
  }//password form ends
  return (
    <>
      <div className="card">
        <form className="form" onSubmit={resetPasswordHandler}>
          <label htmlFor="reset">Enter The Email You Registered with</label>
          <input type="email" ref={email} id="reset"></input>
          <center>
            <button type="submit"
             style={{
                backgroundColor: "black",
                color: "red",
                cursor: "pointer",
                width:'6rem'
              }}
            >Send Link</button>
          </center>
        </form>
      </div>
      <div>
        <center>
          <button
            style={{
              backgroundColor: "gold",
              color: "black",
              cursor: "pointer",
              width:'35rem',
              height:'3rem'
            }}
            onClick={() => {
              history.replace("/login");
            }}
          >
            Already user LogIn Here
          </button>
        </center>
      </div>
    </>
  );
};
export default ForgetPassword;
