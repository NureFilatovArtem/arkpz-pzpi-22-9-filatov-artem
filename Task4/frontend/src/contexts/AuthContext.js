// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user: { username: '...', role: '...' } or null
  const [isLoading, setIsLoading] = useState(true); // To check initial auth status
  const navigate = useNavigate();

  // Check for saved user in localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('iotUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    // --- MOCK AUTHENTICATION ---
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' && password === 'admin') {
          const userData = { username: 'admin', role: 'admin' };
          localStorage.setItem('iotUser', JSON.stringify(userData));
          setUser(userData);
          resolve(userData);
        } else if (username === 'user' && password === 'user') {
          const userData = { username: 'user', role: 'user' };
          localStorage.setItem('iotUser', JSON.stringify(userData));
          setUser(userData);
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500); // Simulate network delay
    });
  };

  const logout = () => {
    localStorage.removeItem('iotUser');
    setUser(null);
    navigate('/login', { replace: true }); // Redirect to login after logout
  };

  // Value provided to child components
  const value = {
    user,
    isAuthenticated: !!user, // True if user object exists
    isAdmin: user?.role === 'admin',
    login,
    logout,
    isLoading, // To handle initial loading state
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};