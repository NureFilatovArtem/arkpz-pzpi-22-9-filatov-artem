// src/components/admin/layout/AdminSidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../../styles/components/layout/AdminSidebar.css'; // <--- ЗМІНЕНИЙ ШЛЯХ // Шлях до стилів

const AdminSidebar = () => {
  const { t } = useTranslation();

  return (
    <aside className="admin-sidebar">
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/admin" 
              className={({ isActive }) => isActive ? "active-link" : ""}
              end // 'end' ensures this link is only active for exactly "/admin"
            >
              {t('adminSidebar.dashboard')}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/users" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              {t('adminSidebar.userManagement')}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/data" // Припустимо, буде така сторінка
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              {t('adminSidebar.dataManagement')}
            </NavLink>
          </li>
          {/* Додайте інші посилання тут у майбутньому */}
          {/* <li>
            <NavLink 
              to="/admin/settings"
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              {t('adminSidebar.settings')}
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;