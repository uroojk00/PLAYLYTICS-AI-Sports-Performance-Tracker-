import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children, darkMode, setDarkMode }) {
  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;