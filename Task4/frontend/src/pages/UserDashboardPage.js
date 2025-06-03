// src/pages/UserDashboardPage.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const UserDashboardPage = () => {
  const { t } = useTranslation();
  // Припустимо, у вас є або будуть ключі для цієї сторінки
  return (
    <div>
      <h1>{t('userDashboard.title', 'User Dashboard')}</h1>
      <p>{t('userDashboard.welcomeMessage', 'Welcome to your dashboard!')}</p>
      {/* Сюди буде додаватися контент для користувача */}
    </div>
  );
};

export default UserDashboardPage;