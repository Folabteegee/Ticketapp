// src/components/TicketList.js
import React from "react";

const TicketList = ({ tickets, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "status-open";
      case "in_progress":
        return "status-progress";
      case "closed":
        return "status-closed";
      default:
        return "status-open";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "priority-medium";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (tickets.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tickets found</h3>
        <p>Create your first ticket to get started!</p>
      </div>
    );
  }

  return (
    <div className="ticket-list">
      <div className="tickets-grid">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="ticket-card">
            <div className="ticket-header">
              <h3 className="ticket-title">{ticket.title}</h3>
              <div className={`status-badge ${getStatusColor(ticket.status)}`}>
                {ticket.status.replace("_", " ")}
              </div>
            </div>

            {ticket.description && (
              <p className="ticket-description">{ticket.description}</p>
            )}

            <div className="ticket-meta">
              <div
                className={`priority-badge ${getPriorityColor(
                  ticket.priority
                )}`}
              >
                {ticket.priority} priority
              </div>
              <div className="ticket-date">
                Created: {formatDate(ticket.createdAt)}
              </div>
            </div>

            <div className="ticket-actions">
              <button
                onClick={() => onEdit(ticket)}
                className="btn btn-sm btn-outline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(ticket.id)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;
