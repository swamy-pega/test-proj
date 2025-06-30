import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ width:"100%", margin: "1 auto", padding: "5px" ,display:"inline-flex" }}>
     
    <div style={{padding:"10px"} } ><Link style={{ color: "lightblue"}} to="/">Home</Link></div>
    
     {/*
     <div style={{padding:"10px"} }><Link style={{ color: "lightblue"}} to="/services">Services</Link>  </div>

      <div style={{padding:"10px"} }> <Link style={{ color: "lightblue"}}  to="/MovieResults">Movie land</Link> </div>

      <div style={{padding:"10px"} }><Link style={{ color: "lightblue"}}  to="/UserList">User List</Link> </div> */}
      <div style={{padding:"10px"} }><Link style={{ color: "lightblue"}} to="/quiz-app">Sample Quiz </Link> </div>
   
    </nav>
  );
};


export default Navbar;