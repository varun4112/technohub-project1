import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    handleIsAdmin();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    handleIsAdmin();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    sessionStorage.removeItem("existingUser");
  };

  const handleIsAdmin = () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("existingUser"));
      if (user && user.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Failed to parse user from sessionStorage:", error);
      setIsAdmin(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
