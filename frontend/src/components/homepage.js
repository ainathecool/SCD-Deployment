import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function NavbarHP() {
 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <NavLink className="navbar-brand" to="/">
       <img style={{"width" : 250 + '%'}} src="https://static.vecteezy.com/system/resources/thumbnails/003/421/462/small/people-in-cafe-horizontal-illustration-vector.jpg"></img>
       </NavLink>  
     </nav>
   </div>
 );
}