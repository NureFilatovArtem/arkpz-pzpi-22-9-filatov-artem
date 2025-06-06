// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi, logout as logoutApi } from '../services/authService';

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

  const login = async ({ email, password }) => {
    const userFromApi = await loginApi({ email, password });
    setUser(userFromApi);
    localStorage.setItem('iotUser', JSON.stringify(userFromApi));
    return userFromApi;
  };

  const logout = () => {
    logoutApi();
    setUser(null);
    localStorage.removeItem('iotUser');
    navigate('/login', { replace: true }); // Redirect to login after logout
  };

  // Value provided to child components
  const value = {
    user,
    setUser,
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