import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/AuthUser";
const LogIn = () => {
  //const[token,setToken]=useState('')
  const userLoginDetails = useSelector((state) => state.auth.isLoggedIn);
  console.log(userLoginDetails);
  const dispatch = useDispatch();
  const email = useRef("");
  const password = useRef("");
  const history = useHistory();
  //const isLoggedIn=!!token;
  //logIn handler
  const logInHandler = async (event) => {
    event.preventDefault();
    try {
      const loginData = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsYyotWR2zesaRukTm4MhJNB9k7RTFZdY`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); //fetch ends
      if (loginData.ok) {
        const response = await loginData.json();
        localStorage.setItem("token", response.idToken);
        localStorage.setItem("email", response.email);
        // setToken(response.idToken);
        dispatch(authActions.login());
        history.replace("/expenses");
      } else {
        const response = await loginData.json();
        throw response.error;
      }
    } catch (error) {
      alert(error);
    }
  }; //login handler ends
  return (
    <>
      <div className="card">
        <form className="form" onSubmit={logInHandler}>
          <label htmlFor="email">Email</label>
          <input type="email" ref={email} id="email" required></input>
          <label htmlFor="password">Password</label>
          <input type="password" ref={password} id="password" required></input>
          <button type="submit">LogIn</button>
        </form>
        <div>
          <center>
            <Link
              to="/forgetpassword"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Forgot Password ?
            </Link>
          </center>
        </div>
        <div>
          <button className="login" onClick={() => history.replace("/signup")}>
            Have No Account? Signup Here
          </button>
        </div>
      </div>
    </>
  );
};
export default LogIn;
