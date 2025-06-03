import React from 'react';
import Header from '../../layout/Header'; // Загальний Header
import Footer from '../../layout/Footer'; // Загальний Footer
import AdminSidebar from './AdminSidebar'; // Імпорт AdminSidebar з тієї ж папки
import { Outlet } from 'react-router-dom';

// Важливо: переконайтеся, що цей CSS файл існує за шляхом:
// frontend/src/styles/components/admin/layout/AdminLayout.css
import '../../../styles/components/layout/AdminLayout.css'; // <--- ЗМІНЕНИЙ ШЛЯХ

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Header />
      <div className="admin-layout-content-wrapper">
        <AdminSidebar />
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;