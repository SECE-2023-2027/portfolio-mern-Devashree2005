import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">CarRental</div>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/cars">Cars</Link></li>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/Signup">Signup</Link></li>

      </ul>
    </nav>
  );
}

export default Navbar;
