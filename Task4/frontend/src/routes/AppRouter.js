// src/routes/AppRouter.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Лейаути
import MainLayout from '../components/layout/MainLayout';
import AdminLayout from '../components/admin/layout/AdminLayout'; // Імпортуємо AdminLayout

// Сторінки
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import UserDashboardPage from '../pages/UserDashboardPage';
import AdminDashboardPage from '../pages/Admin/AdminDashboardPage';
import UserManagementPage from '../pages/Admin/UserManagementPage'; // Імпортуємо сторінку керування користувачами

// Допоміжні компоненти та хуки
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';


const AppRouter = () => {
  const { isAuthenticated, user, isLoading } = useAuth(); // `user` для fallback роута

  if (isLoading) {
    return <div>App is loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Публічні роути, наприклад, головна сторінка, огортаються в MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
          <Route path="/user" element={<UserDashboardPage />} />
        </Route>
      </Route>

      {/* Захищені роути для адмінів, огортаються в AdminLayout */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
        </Route>
      </Route>

      {/* Fallback роут: перенаправлення на відповідний дашборд, якщо залогінений, або на логін */}
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? (user?.role === 'admin' ? '/admin' : '/user') : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
};

export default AppRouter;