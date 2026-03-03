import React from "react";
import { Link } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <div className="navbar">
      <h2>Playlytics AI</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/sports">Sports</Link>
        <Link to="/powerbi">Power BI</Link>

        <button
          className="button-primary"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;