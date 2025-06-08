// src/pages/Admin/UserManagementPage.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Select, MenuItem, FormControl, InputLabel,
  Alert, CircularProgress, Chip
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { fetchUsers, createUser, updateUser, deleteUser } from '../../services/userService';

const UserManagementPage = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [formLoading, setFormLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err?.response?.data?.message || t('userManagement.loadFailed'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleOpenAddModal = () => {
    setFormData({ username: '', email: '', password: '', role: 'user' });
    setIsAddModalOpen(true);
    setError('');
    setSuccess('');
  };

  const handleOpenEditModal = (user) => {
    setCurrentUser(user);
    setFormData({ username: user.username, email: user.email, password: '', role: user.role });
    setIsEditModalOpen(true);
    setError('');
    setSuccess('');
  };

  const handleOpenDeleteModal = (user) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
    setError('');
    setSuccess('');
  };

  const handleCloseModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setCurrentUser(null);
    setFormData({ username: '', email: '', password: '', role: 'user' });
    setFormLoading(false);
    setError('');
    setSuccess('');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async () => {
    setFormLoading(true);
    setError('');
    try {
      await createUser(formData);
      setSuccess(t('userManagement.addUserSuccess'));
      handleCloseModals();
      loadUsers();
    } catch (err) {
      setError(err?.response?.data?.message || t('userManagement.createFailed'));
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    setFormLoading(true);
    setError('');
    try {
      await updateUser(currentUser.id, formData);
      setSuccess(t('userManagement.updateSuccess'));
      handleCloseModals();
      loadUsers();
    } catch (err) {
      setError(err?.response?.data?.message || t('userManagement.updateFailed'));
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setFormLoading(true);
    setError('');
    try {
      await deleteUser(currentUser.id);
      setSuccess(t('userManagement.deleteSuccess'));
      handleCloseModals();
      loadUsers();
    } catch (err) {
      setError(err?.response?.data?.message || t('userManagement.deleteFailed'));
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {t('userManagement.title', 'User Management')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddModal}
          color="primary"
        >
          {t('userManagement.addUser', 'Add New User')}
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>{t('userManagement.table.id', 'ID')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{t('userManagement.table.username', 'Username')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{t('userManagement.table.email', 'Email')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{t('userManagement.table.role', 'Role')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{t('userManagement.table.actions', 'Actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    icon={user.role === 'admin' ? <AdminPanelSettingsIcon /> : <PersonIcon />}
                    label={t(`roles.${user.role}`, user.role)}
                    color={user.role === 'admin' ? 'warning' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenEditModal(user)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleOpenDeleteModal(user)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  {t('userManagement.noUsers', 'No users found.')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add User Modal */}
      <Dialog open={isAddModalOpen} onClose={handleCloseModals} maxWidth="sm" fullWidth>
        <DialogTitle>{t('userManagement.addUser')}</DialogTitle>
        <DialogContent>
          <TextField
            label={t('userManagement.usernameLabel')}
            name="username"
            value={formData.username}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label={t('userManagement.emailLabel')}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label={t('userManagement.passwordLabel')}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>{t('userManagement.roleLabel')}</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleFormChange}
              label={t('userManagement.roleLabel')}
            >
              <MenuItem value="user">{t('roles.user')}</MenuItem>
              <MenuItem value="admin">{t('roles.admin')}</MenuItem>
            </Select>
          </FormControl>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModals}>{t('userManagement.actions.cancel')}</Button>
          <Button
            onClick={handleCreateUser}
            variant="contained"
            disabled={formLoading}
            color="primary"
          >
            {formLoading ? <CircularProgress size={24} /> : t('userManagement.actions.save')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={isEditModalOpen} onClose={handleCloseModals} maxWidth="sm" fullWidth>
        <DialogTitle>{t('userManagement.editUser')}</DialogTitle>
        <DialogContent>
          <TextField
            label={t('userManagement.usernameLabel')}
            name="username"
            value={formData.username}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label={t('userManagement.emailLabel')}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label={t('userManagement.passwordLabel')}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            helperText={t('userManagement.actions.leaveBlank')}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>{t('userManagement.roleLabel')}</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleFormChange}
              label={t('userManagement.roleLabel')}
            >
              <MenuItem value="user">{t('roles.user')}</MenuItem>
              <MenuItem value="admin">{t('roles.admin')}</MenuItem>
            </Select>
          </FormControl>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModals}>{t('userManagement.actions.cancel')}</Button>
          <Button
            onClick={handleUpdateUser}
            variant="contained"
            disabled={formLoading}
            color="primary"
          >
            {formLoading ? <CircularProgress size={24} /> : t('userManagement.actions.save')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete User Modal */}
      <Dialog open={isDeleteModalOpen} onClose={handleCloseModals}>
        <DialogTitle>{t('userManagement.deleteUser')}</DialogTitle>
        <DialogContent>
          <Typography>
            {t('userManagement.deleteUserConfirm')}
          </Typography>
          {currentUser && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {currentUser.username} ({currentUser.email})
            </Typography>
          )}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModals}>{t('userManagement.actions.cancel')}</Button>
          <Button
            onClick={handleDeleteUser}
            variant="contained"
            disabled={formLoading}
            color="error"
          >
            {formLoading ? <CircularProgress size={24} /> : t('userManagement.actions.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagementPage;