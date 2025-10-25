// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    in_progress: 0,
    closed: 0,
  });

  useEffect(() => {
    // Get storage key based on current user
    const getStorageKey = () => {
      return user ? `tickets_${user.id}` : "tickets";
    };

    const loadStats = () => {
      try {
        const storageKey = getStorageKey();
        const savedTickets = localStorage.getItem(storageKey);
        const tickets = savedTickets ? JSON.parse(savedTickets) : [];

        const total = tickets.length;
        const open = tickets.filter(
          (ticket) => ticket.status === "open"
        ).length;
        const in_progress = tickets.filter(
          (ticket) => ticket.status === "in_progress"
        ).length;
        const closed = tickets.filter(
          (ticket) => ticket.status === "closed"
        ).length;

        setStats({ total, open, in_progress, closed });
      } catch (error) {
        console.error("Error loading stats:", error);
        setStats({ total: 0, open: 0, in_progress: 0, closed: 0 });
      }
    };

    loadStats();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-page">
      <Header />

      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Here's your ticket management overview</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total">📊</div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Tickets</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon open">✅</div>
            <div className="stat-info">
              <h3>{stats.open}</h3>
              <p>Open Tickets</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon progress">🔄</div>
            <div className="stat-info">
              <h3>{stats.in_progress}</h3>
              <p>In Progress</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon closed">🔒</div>
            <div className="stat-info">
              <h3>{stats.closed}</h3>
              <p>Closed Tickets</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/tickets" className="btn btn-primary">
              Manage Tickets
            </Link>
            <Link to="/tickets?create=true" className="btn btn-secondary">
              Create New Ticket
            </Link>
            <button onClick={handleLogout} className="btn btn-outline">
              Logout
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
