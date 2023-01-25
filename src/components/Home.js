import { Link } from "react-router-dom";
const Home = (props) => {
  return (
    <>
      <div
        className="complete"
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          padding:"10px"
        }}
      >
        <h2>WelCome To Expense Tracker</h2>
        <div><h4>your profile is incomplete <span><Link to='/completeprofile' style={{color:'red'}}>complete now</Link></span></h4></div>
      </div>
    </>
  );
};
export default Home;
