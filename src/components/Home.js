import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/AuthUser";
const Home = (props) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const verifyEmailHandler = async (e) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAsYyotWR2zesaRukTm4MhJNB9k7RTFZdY`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setEmail(data.email);
      } else {
        const jsonData = response.json();
        throw jsonData.error;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/login");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <h2>WelCome To Expense Tracker</h2>
        <div>
          <h4>
            your profile is incomplete
            <span>
              <Link to="/completeprofile" style={{ color: "red" }}>
                complete now
              </Link>
              <Link to="/expenses" style={{ color: "red", marginLeft: "50px" }}>
                Expenses
              </Link>
            </span>
          </h4>
        </div>
        <button
          onClick={logoutHandler}
          style={{
            width: "120px",
            height: "40px",
            margin: "15px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "10px",
          }}
        >
          LogOut
        </button>
      </div>
      <div>
        <center>
          <button
            onClick={verifyEmailHandler}
            style={{
              backgroundColor: "black",
              color: "red",
              marginTop: "20px",
              padding: "10px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Verify Email
          </button>
        </center>
      </div>
      {email !== "" && (
        <center>
          <h3>your mail is verified</h3>
        </center>
      )}
    </>
  );
};
export default Home;
