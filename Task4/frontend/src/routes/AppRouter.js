import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage'; // Ви мали цей компонент
import UserDashboardPage from '../pages/UserDashboardPage'; // Ви мали цей
import AdminDashboardPage from '../pages/Admin/AdminDashboardPage'; // Ви мали цей
import AdminLayout from '../components/admin/layout/AdminLayout';
// Додайте UserManagementPage etc. сюди пізніше
// import UserManagementPage from '../pages/Admin/UserManagementPage';

import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';


const AppRouter = () => {
  const { isAuthenticated, isLoading } = useAuth(); // To handle redirection if already logged in

  if (isLoading) {
    return <div>App is loading...</div>; // Or a more sophisticated loader
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Routes accessible to everyone, possibly wrapped in MainLayout if needed */}
      {/* Let's make HomePage a public landing page */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} /> {/* Landing Page, for example */}
      </Route>

      {/* Protected User Routes */}
      <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}> {/* Admins can also see user page */}
        <Route element={<MainLayout />}>
          <Route path="/user" element={<UserDashboardPage />} />
          {/* Add more user-specific routes here */}
        </Route>
      </Route>

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<MainLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          {/* <Route path="/admin/users" element={<UserManagementPage />} /> */}
          {/* Add more admin-specific routes here */}
        </Route>
      </Route>

      {/* Fallback route for non-matching paths */}
      <Route path="*" element={<Navigate to={isAuthenticated ? (localStorage.getItem('iotUser') && JSON.parse(localStorage.getItem('iotUser')).role === 'admin' ? '/admin' : '/user') : "/login"} replace />} />
    </Routes>
  );
};

export default AppRouter;