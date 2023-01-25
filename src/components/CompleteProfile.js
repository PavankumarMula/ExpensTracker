import React, { useEffect, useState } from "react";

const CompleteProfile = (props) => {
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[photo,setPhoto]=useState('');
    const [fullname,setFullName]=useState('')
    const [photourl,setPhotoUrl]=useState('')
    useEffect(()=>{
        const tokenId=localStorage.getItem('token')
         fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAsYyotWR2zesaRukTm4MhJNB9k7RTFZdY`,
       {
        method:'POST',
        body: JSON.stringify({
            idToken:tokenId,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
       }).then((res)=>res.json().then(data=>
          {
            setFullName(data.users[0].displayName)
            setPhotoUrl(data.users[0].photoUrl)
          }
        ))
      
    },[])

 const updateProfileHandler = async(event)=>{
    event.preventDefault();
    const token=localStorage.getItem('token');
    let fullName=fullname;
    let photoUrl=photourl;
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
      const data=await response.json();
      setName(data.displayName);
      setEmail(data.email);
      setPhoto(data.photoUrl)
      
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
        <p>
          your profile is 64% completed.A Compete profile has higher chances of
          landing a job,
          <br /> Complete following details
        </p>
      </div>
      <center>
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
              value={fullname}
              onChange={(e)=>setFullName(e.target.value)}
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
             value={photourl}
             onChange={(e)=>setPhoto(e.target.value)}
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
        <div>
           {name && <h3>display Name is {name}</h3>}<br/>
           {email &&<h3> email is {email}</h3>}<br/>
            {photo &&<h3>photo url  is {photo}</h3>}<br/>
        </div>
      </center>
    </>
  );
};
export default CompleteProfile;
