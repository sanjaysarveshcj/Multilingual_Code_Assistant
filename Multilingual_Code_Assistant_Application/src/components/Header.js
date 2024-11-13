import React from 'react';
import '../styles/header.css';


const Header = () => {
  return (
    <header>
      <div className="navbar-logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <h1>Multilingual Code Assistant</h1>
    </header>
  );
};

export default Header;