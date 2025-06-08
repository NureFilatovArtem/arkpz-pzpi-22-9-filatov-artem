// src/components/user/layout/UserSidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableViewIcon from '@mui/icons-material/TableView';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

const UserSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const menuItems = [
    { textKey: 'userSidebar.dashboard', path: '/user', icon: <DashboardIcon />, end: true },
    { textKey: 'userSidebar.dataView', path: '/user/data-view', icon: <TableViewIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.textKey} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              selected={item.end ? location.pathname === item.path : location.pathname.startsWith(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={t(item.textKey, item.path.split('/').pop())} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default UserSidebar;