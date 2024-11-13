import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { FaBars } from 'react-icons/fa';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth'; 
import { auth, provider } from '../firebase';
import Sidebar from './sidebar';


const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); 
  };


  return (
    <>
    <nav className="navbar"> 
    <FaBars className="sidebar-toggle" onClick={toggleSidebar} />
      <div className="navbar-links">
        <div className='login'>
        {!user ? (
          <button className="login-btn" onClick={handleGoogleLogin}>
            Login
          </button>
        ) : (
          <span>Welcome, {user.displayName}!</span>
        )}
        </div>
      </div>
    </nav>
    <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} user={user} />
    </>
  );
};

export default Navbar;
