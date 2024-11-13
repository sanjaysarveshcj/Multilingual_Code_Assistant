import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Multilingual from './components/Multilingual';
import CodeAnalyze from './components/CodeAnalyze';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/styles.css'

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <Header />
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/multilingual" element={<Multilingual />} />
          <Route path="/code-analyze" element={<CodeAnalyze />} />
        </Routes>
      </div>
      {location.pathname === '/' && <Footer />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
