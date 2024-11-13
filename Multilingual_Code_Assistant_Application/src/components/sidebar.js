import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import '../styles/sidebar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';


const Sidebar = ({ isOpen, toggle, user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toggle(); // Close the sidebar on logout
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <FaTimes className="close-icon" onClick={toggle} />
        </div>
        <ul className="sidebar-links">
          <li>
            <Link to="/" onClick={toggle}>Home</Link>
          </li>
          <li>
            <Link to="/multilingual" onClick={toggle}>Multilingual</Link>
          </li>
          <li>
            <Link to="/code-analyze" onClick={toggle}>Code Analyze</Link>
          </li>
          {!user ? (
            <button className="login-btn" onClick={toggle}>
              Login
            </button>
          ) : (
            <>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={toggle}></div>}
    </>
  );
};

export default Sidebar;
