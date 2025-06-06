import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
  Skeleton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchUsers, createUser, updateUser, deleteUser, createAdmin } from '../../services/userService';

const roles = [
  { value: 'admin', labelKey: 'roles.admin' },
  { value: 'user', labelKey: 'roles.user' },
  { value: 'editor', labelKey: 'roles.editor' },
];

const UserManagementPage = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openAddAdmin, setOpenAddAdmin] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'user' });
  const [formLoading, setFormLoading] = useState(false);

  // Fetch users on mount
  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Handlers for Add User/Admin
  const handleOpenAddUser = () => {
    setForm({ username: '', email: '', password: '', role: 'user' });
    setOpenAddUser(true);
  };
  const handleOpenAddAdmin = () => {
    setForm({ username: '', email: '', password: '', role: 'admin' });
    setOpenAddAdmin(true);
  };
  const handleCloseAddUser = () => setOpenAddUser(false);
  const handleCloseAddAdmin = () => setOpenAddAdmin(false);

  const handleAddUser = async () => {
    setFormLoading(true);
    setError('');
    try {
      await createUser(form);
      setSuccess(t('userManagement.addUserSuccess', 'User added successfully.'));
      setOpenAddUser(false);
      loadUsers();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to add user');
    } finally {
      setFormLoading(false);
    }
  };
  const handleAddAdmin = async () => {
    setFormLoading(true);
    setError('');
    try {
      await createAdmin(form);
      setSuccess(t('userManagement.addAdminSuccess', 'Administrator added successfully.'));
      setOpenAddAdmin(false);
      loadUsers();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to add administrator');
    } finally {
      setFormLoading(false);
    }
  };

  // Handlers for Edit
  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setForm({ username: user.username, email: user.email, password: '', role: user.role });
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);
  const handleEditUser = async () => {
    setFormLoading(true);
    setError('');
    try {
      await updateUser(selectedUser.id, form);
      setSuccess(t('userManagement.actions.edit'));
      setOpenEdit(false);
      loadUsers();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to update user');
    } finally {
      setFormLoading(false);
    }
  };

  // Handlers for Delete
  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);
  const handleDeleteUser = async () => {
    setFormLoading(true);
    setError('');
    try {
      await deleteUser(selectedUser.id);
      setSuccess(t('userManagement.actions.delete'));
      setOpenDelete(false);
      loadUsers();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to delete user');
    } finally {
      setFormLoading(false);
    }
  };

  // Form change handler
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>{t('userManagement.title')}</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
          onClick={handleOpenAddUser}
        >
          {t('userManagement.addUser')}
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="secondary"
          onClick={handleOpenAddAdmin}
        >
          {t('userManagement.addAdmin', 'Add Administrator')}
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>{t('userManagement.table.username')}</TableCell>
                <TableCell>{t('userManagement.table.email')}</TableCell>
                <TableCell>{t('userManagement.table.role')}</TableCell>
                <TableCell>{t('userManagement.table.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{t(`roles.${user.role}`, user.role)}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenEdit(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleOpenDelete(user)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    {t('userManagement.noUsers')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add User Dialog */}
      <Dialog open={openAddUser} onClose={handleCloseAddUser} maxWidth="sm" fullWidth>
        <DialogTitle>{t('userManagement.addUser')}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label={t('userManagement.table.username')}
              name="username"
              value={form.username}
              onChange={handleFormChange}
              required
              fullWidth
            />
            <TextField
              label={t('userManagement.table.email')}
              name="email"
              value={form.email}
              onChange={handleFormChange}
              required
              fullWidth
              type="email"
            />
            <TextField
              label={t('loginPage.passwordLabel')}
              name="password"
              value={form.password}
              onChange={handleFormChange}
              required
              fullWidth
              type="password"
            />
            <TextField
              label={t('userManagement.table.role')}
              name="role"
              value={form.role}
              disabled
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddUser}>{t('userManagement.actions.cancel', 'Cancel')}</Button>
          <Button onClick={handleAddUser} variant="contained" disabled={formLoading} color="primary">
            {formLoading ? <CircularProgress size={24} /> : t('userManagement.addUser')}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Add Admin Dialog */}
      <Dialog open={openAddAdmin} onClose={handleCloseAddAdmin} maxWidth="sm" fullWidth>
        <DialogTitle>{t('userManagement.addAdmin', 'Add Administrator')}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label={t('userManagement.table.username')}
              name="username"
              value={form.username}
              onChange={handleFormChange}
              required
              fullWidth
            />
            <TextField
              label={t('userManagement.table.email')}
              name="email"
              value={form.email}
              onChange={handleFormChange}
              required
              fullWidth
              type="email"
            />
            <TextField
              label={t('loginPage.passwordLabel')}
              name="password"
              value={form.password}
              onChange={handleFormChange}
              required
              fullWidth
              type="password"
            />
            <TextField
              label={t('userManagement.table.role')}
              name="role"
              value={form.role}
              disabled
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddAdmin}>{t('userManagement.actions.cancel', 'Cancel')}</Button>
          <Button onClick={handleAddAdmin} variant="contained" disabled={formLoading} color="secondary">
            {formLoading ? <CircularProgress size={24} /> : t('userManagement.addAdmin', 'Add Administrator')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>{t('userManagement.actions.edit')}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label={t('userManagement.table.username')}
              name="username"
              value={form.username}
              onChange={handleFormChange}
              required
              fullWidth
            />
            <TextField
              label={t('userManagement.table.email')}
              name="email"
              value={form.email}
              onChange={handleFormChange}
              required
              fullWidth
              type="email"
            />
            <TextField
              label={t('userManagement.table.role')}
              name="role"
              value={form.role}
              onChange={handleFormChange}
              select
              fullWidth
            >
              {roles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {t(role.labelKey)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label={t('loginPage.passwordLabel')}
              name="password"
              value={form.password}
              onChange={handleFormChange}
              fullWidth
              type="password"
              helperText={t('userManagement.actions.leaveBlank', 'Leave blank to keep current password')}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>{t('userManagement.actions.cancel', 'Cancel')}</Button>
          <Button onClick={handleEditUser} variant="contained" disabled={formLoading}>
            {formLoading ? <CircularProgress size={24} /> : t('userManagement.actions.edit')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete} maxWidth="xs">
        <DialogTitle>{t('userManagement.actions.delete')}</DialogTitle>
        <DialogContent>
          <Typography>{t('userManagement.actions.confirmDelete', 'Are you sure you want to delete this user?')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>{t('userManagement.actions.cancel', 'Cancel')}</Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained" disabled={formLoading}>
            {formLoading ? <CircularProgress size={24} /> : t('userManagement.actions.delete')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success */}
      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
      {/* Snackbar for error */}
      <Snackbar open={!!error && !loading} autoHideDuration={4000} onClose={() => setError('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagementPage;