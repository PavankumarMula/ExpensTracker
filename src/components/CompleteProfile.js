import React from "react";
import { useRef } from "react";
const CompleteProfile = (props) => {
    const fullname=useRef('');
    const photourl=useRef('');
 const updateProfileHandler = async(event)=>{
    event.preventDefault();
    const token=localStorage.getItem('token');
    console.log(token,typeof(token))
    const fullName=fullname.current.value;
    const photoUrl=photourl.current.value;
    const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAsYyotWR2zesaRukTm4MhJNB9k7RTFZdY`,
    {
        method:'POST',
        body: JSON.stringify({
            idToken:token,
            displayName:fullName,
            photoUrl:photoUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
    })
    if(response.ok){
       const responseData=await response.json() 
       console.log(responseData);
    }

    
 }   




  return (
    <>
      <div
        style={{
          display: "flex",
          backgroundColor: "white",
          justifyContent: "space-between",
        }}
      >
        <h2>Winners Never quit,Quitters Never Win.</h2>
        <text>
          your profile is 64% completed.A Compete profile has higher chances of
          landing a job,
          <br /> Complete following details
        </text>
      </div>
      <center>
        {" "}
        <div
          style={{
            width: "90%",
            maxWidth: "40rem",
            height: "15rem",
            backgroundColor: "white",
            marginTop: "50px",
            padding: "20px",
            borderRadius: "10px",
            alignItems: "stretch",
          }}
        >
          <form onSubmit={updateProfileHandler}>
            <label htmlFor="fullname" style={{ padding: "5px", margin: "5px" }}>
              Full Name
            </label>
            <br />
            <input
              ref={fullname}
              type="text"
              id="fullname"
              style={{ padding: "8px", width: "35rem", marginBottom: "10px" }}
            ></input>
            <br />
            <label
              htmlFor="phot"
              style={{ padding: "10px", marginTop: "15px" }}
            >
              Photo Url
            </label>
            <br />
            <input
              ref={photourl}
              type="url"
              id="photo"
              style={{
                padding: "8px",
                width: "35rem",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            ></input>
            <br />
            <button
              type="submit"
              style={{
                backgroundColor: "black",
                color: "bisque",
                width: "5rem",
                borderRadius: "5px",
                height: "2rem",
              }}
            >
              update
            </button>
          </form>
        </div>
      </center>
    </>
  );
};
export default CompleteProfile;
