// src/hooks/useAuth.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (session) {
      try {
        const userData = JSON.parse(session);
        setIsAuthenticated(true);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem("ticketapp_session");
      }
    }
  }, []);

  const login = async (email, password) => {
    // Simple validation
    if (email && password) {
      const userData = {
        id: email, // Use email as ID for simplicity
        email: email,
        name: email.split("@")[0],
      };

      localStorage.setItem("ticketapp_session", JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
      return { success: true };
    }

    return {
      success: false,
      error: "Invalid email or password",
    };
  };

  const signup = async (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return {
        success: false,
        error: "Passwords do not match",
      };
    }

    if (email && password) {
      const userData = {
        id: email, // Use email as ID
        email: email,
        name: email.split("@")[0],
      };

      localStorage.setItem("ticketapp_session", JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
      return { success: true };
    }

    return {
      success: false,
      error: "Please fill all fields",
    };
  };

  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
