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
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/tickets" className="nav-link">
                  Tickets
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
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/tickets" className="nav-link">
                  Tickets
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
