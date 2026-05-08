import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar-brand">MERN Stack Developer Practical Task</h2>
      <Link to="/" className="navbar-home-link">Home</Link>
    </nav>
  );
};

export default Navbar;