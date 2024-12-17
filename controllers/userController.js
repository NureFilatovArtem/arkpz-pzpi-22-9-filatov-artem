// const User = require('../models/User');
const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    try {
      console.log('Fetching all users...'); // Добавлено для проверки
      const users = await userService.getAll();
      console.log('Users:', users); // Логируем результат
      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found.' });
      }
      res.status(200).json({ message: 'Users retrieved successfully.', data: users });
    } catch (error) {
      console.error('Error fetching users:', error.message);
      res.status(500).json({ message: 'Failed to fetch users. Please try again later.', error: error.message });
    }
  };

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Проверка на пустой ID
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const result = await userService.delete(userId);

    if (result.success) {
      res.status(200).json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ message: 'User not found. Deletion unsuccessful.' });
    }
  } catch (error) {
    console.error(`Error deleting user with ID ${req.params.userId}:`, error.message);
    res.status(500).json({ message: 'An error occurred while deleting the user.', error: error.message });
  }
};