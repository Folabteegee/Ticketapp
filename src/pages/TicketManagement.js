// src/pages/TicketManagement.js
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";

const TicketManagement = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [showForm, setShowForm] = useState(
    searchParams.get("create") === "true"
  );
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    // Get storage key based on current user
    const getStorageKey = () => {
      return user ? `tickets_${user.id}` : "tickets";
    };

    const loadTickets = () => {
      try {
        const storageKey = getStorageKey();
        const savedTickets = localStorage.getItem(storageKey);

        if (savedTickets) {
          setTickets(JSON.parse(savedTickets));
        } else {
          setTickets([]);
        }
      } catch (error) {
        console.error("Error loading tickets:", error);
        setTickets([]);
      }
    };

    loadTickets();
  }, [user]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const saveTickets = (newTickets) => {
    try {
      const storageKey = user ? `tickets_${user.id}` : "tickets";
      localStorage.setItem(storageKey, JSON.stringify(newTickets));
      setTickets(newTickets);
    } catch (error) {
      console.error("Error saving tickets:", error);
      showToast("Error saving tickets", "error");
    }
  };

  const handleCreateTicket = (ticketData) => {
    const newTicket = {
      id: Date.now(),
      ...ticketData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedTickets = [...tickets, newTicket];
    saveTickets(updatedTickets);
    setShowForm(false);
    showToast("Ticket created successfully!");
  };

  const handleUpdateTicket = (ticketData) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === editingTicket.id
        ? { ...ticketData, id: ticket.id, updatedAt: new Date().toISOString() }
        : ticket
    );

    saveTickets(updatedTickets);
    setEditingTicket(null);
    setShowForm(false);
    showToast("Ticket updated successfully!");
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
    setShowForm(true);
  };

  const handleDeleteTicket = (ticketId) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
      saveTickets(updatedTickets);
      showToast("Ticket deleted successfully!");
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTicket(null);
  };

  return (
    <div className="ticket-management-page">
      <Header />

      <div className="container">
        <div className="page-header">
          <h1>Ticket Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
            disabled={showForm}
          >
            Create New Ticket
          </button>
        </div>

        {showForm ? (
          <TicketForm
            ticket={editingTicket}
            onSubmit={editingTicket ? handleUpdateTicket : handleCreateTicket}
            onCancel={handleCancelForm}
          />
        ) : (
          <TicketList
            tickets={tickets}
            onEdit={handleEditTicket}
            onDelete={handleDeleteTicket}
          />
        )}
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}

      <Footer />
    </div>
  );
};

export default TicketManagement;
