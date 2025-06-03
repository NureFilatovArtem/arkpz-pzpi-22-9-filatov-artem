// src/components/layout/MainLayout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../../styles/components/layout/MainLayout.css'; // Два кроки вгору до src, потім styles...
import { Outlet } from 'react-router-dom'; // To render child routes

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        <Outlet /> {/* Content of the current route will be rendered here */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;