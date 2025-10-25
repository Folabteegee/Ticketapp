// src/components/Header.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="nav-linki">
            TicketFloww
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {isAuthenticated ? (
              <div className="nav-auth">
                <span className="user-greeting">Hello, {user?.name}</span>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/tickets" className="nav-link">
                  Tickets
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="nav-guest">
                <Link to="/auth/login" className="nav-link">
                  Login
                </Link>
                <Link to="/auth/signup" className="btn btn-primary btn-sm">
                  Get Started
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mobile-nav">
            {isAuthenticated ? (
              <>
                <span className="user-greeting">Hello, {user?.name}</span>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/tickets" className="nav-link">
                  Tickets
                </Link>
                <button onClick={handleLogout} className="btn btn-outline">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
