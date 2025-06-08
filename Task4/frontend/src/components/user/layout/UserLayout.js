// src/components/user/layout/UserLayout.js
import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

// --- ИСПРАВЛЕННЫЙ ИМПОРТ (без расширения) ---
import UserSidebar from './UserSidebar'; 

import Header from '../../layout/Header'; 

const UserLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <UserSidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar /> 
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserLayout;