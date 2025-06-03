import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import '../../styles/components/layout/Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="app-header">
      <div className="header-logo">
        <Link to={isAuthenticated ? (user?.role === 'admin' ? '/admin' : '/user') : '/'}>
          IOT {t('header.controlPanel')}
        </Link>
      </div>
      <nav className="header-nav">
        {isAuthenticated && user?.role === 'admin' && (
          <Link to="/admin/users">{t('header.userManagement')}</Link>
        )}
        {/* Add more navigation links here as needed */}
      </nav>
      <div className="header-controls">
        <div className="language-switcher">
          <button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>
            {t('english')}
          </button>
          <button onClick={() => changeLanguage('uk')} disabled={i18n.language === 'uk'}>
            {t('ukrainian')}
          </button>
        </div>
        {isAuthenticated ? (
          <button onClick={logout} className="logout-button">{t('header.logout')}</button>
        ) : (
          <Link to="/login" className="login-link">{t('header.login')}</Link>
        )}
      </div>
    </header>
  );
};

export default Header;