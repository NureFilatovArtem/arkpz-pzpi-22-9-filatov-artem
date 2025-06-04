// src/components/admin/layout/AdminSidebar.js
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import StorageIcon from '@mui/icons-material/Storage';
// import SettingsIcon from '@mui/icons-material/Settings'; // Якщо розкоментуєте секцію налаштувань

// Визначимо ширину сайдбару
const drawerWidth = 240;

const AdminSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation(); // Для визначення активного шляху

  const menuItems = [
    {
      textKey: 'adminSidebar.dashboard',
      path: '/admin',
      icon: <DashboardIcon />,
      end: true, // Для точного співпадіння NavLink
    },
    {
      textKey: 'adminSidebar.userManagement',
      path: '/admin/users',
      icon: <PeopleIcon />,
    },
    {
      textKey: 'adminSidebar.dataManagement',
      path: '/admin/data',
      icon: <StorageIcon />,
    },
    // {
    //   textKey: 'adminSidebar.settings',
    //   path: '/admin/settings',
    //   icon: <SettingsIcon />,
    // },
  ];

  const drawerContent = (
    <List sx={{ paddingTop: 0 }}> {/* sx - це пропс для швидкого додавання стилів в MUI */}
      {menuItems.map((item) => (
        <ListItem key={item.textKey} disablePadding>
          <ListItemButton
            component={NavLink}
            to={item.path}
            // Використовуємо location.pathname для визначення selected
            // NavLink сам по собі обробить клас 'active', але selected дає кращу візуальну інтеграцію з MUI
            selected={item.end ? location.pathname === item.path : location.pathname.startsWith(item.path)}
            end={item.end}
            sx={{ // Стилізація для ListItemButton
              '&.Mui-selected': { // Стилі для активного (selected) елемента
                backgroundColor: 'rgba(26, 188, 156, 0.15)', // Світлий фон активного
                borderLeft: `3px solid #1abc9c`, // Акцентний бордер зліва
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                  color: '#1abc9c', // Колір іконки та тексту активного елемента
                },
              },
              '&:hover': {
                 backgroundColor: 'rgba(0, 0, 0, 0.08)', // Фон при наведенні
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}> {/* Трохи зменшимо відступ для іконки */}
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={t(item.textKey)} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Drawer
      variant="permanent" // Робить Drawer завжди видимим
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { // Стилі для паперу (внутрішньої частини) Drawer
            width: drawerWidth, 
            boxSizing: 'border-box',
            backgroundColor: '#2c3e50', // Темний фон для сайдбару
            color: '#ecf0f1', // Світлий текст
            borderRight: 'none', // Заберемо стандартний бордер
         },
         // Стилізація іконок та тексту всередині Drawer
         '& .MuiListItemIcon-root': {
            color: '#bdc3c7', // Колір іконок (неактивних)
         },
         '& .MuiListItemText-primary': {
            color: '#ecf0f1', // Колір тексту (неактивних)
         },
      }}
      anchor="left"
    >
      {/* Можна додати Toolbar для відступу зверху, якщо хедер фіксований */}
      {/* <Toolbar />  потрібно імпортувати з @mui/material, якщо використовується */}
      {/* <Divider />    потрібно імпортувати з @mui/material */}
      {drawerContent}
    </Drawer>
  );
};

export default AdminSidebar;