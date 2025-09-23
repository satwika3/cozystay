import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/" className="logo">
            <span className="logo-icon">🏨</span>
            <span className="logo-text">CozyStay</span>
          </Link>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/" className="nav-link">Rooms</Link>
            <Link to="/" className="nav-link">About</Link>
            <Link to="/" className="nav-link">Contact</Link>
            
            <div className="nav-actions">
              {user ? (
                <>
                  {user.role === 'ADMIN' && (
                    <Link to="/admin" className="nav-link">Admin</Link>
                  )}
                  <span className="user-greeting">Hello, {user.name}</span>
                  <button onClick={onLogout} className="btn btn-outline">Logout</button>
                </>
              ) : (
                <Link to="/login" className="btn btn-outline">Login</Link>
              )}
            </div>
          </nav>
          
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;