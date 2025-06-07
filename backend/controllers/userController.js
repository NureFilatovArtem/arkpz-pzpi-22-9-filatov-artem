// backend/controllers/userController.js
const User = require('../models/User'); // Правильний шлях до моделі User
const bcrypt = require('bcryptjs');
// const userService = require('../services/userService'); // <--- ВИДАЛЯЄМО ЦЕЙ РЯДОК, він більше не потрібен

exports.getAllUsers = async (req, res) => {
  try {
    console.log('[userController] Fetching all users directly from User model...');
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role'] });
    if (!users || users.length === 0) {
      console.log('[userController] No users found.');
      return res.status(200).json([]); // Повертаємо порожній масив, якщо користувачів немає
    }
    console.log(`[userController] Found ${users.length} users.`);
    res.status(200).json(users);
  } catch (error) {
    console.error('[userController] Error fetching users:', error.message);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required.' });
    }
    const existingUser = await User.findOne({ where: { [User.sequelize.Op.or]: [{ email }, { username }] } });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email or username already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: ['admin', 'user', 'editor'].includes(role) ? role : 'user', // Додав 'editor' на випадок
    });
    // Не повертаємо пароль
    const userDataToReturn = { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role };
    res.status(201).json(userDataToReturn);
  } catch (error) {
    console.error('[userController] Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }
    
    const userToDelete = await User.findByPk(userId);
    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await userToDelete.destroy(); // Видаляємо користувача напряму через модель
    
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error(`[userController] Error deleting user with ID ${req.params.userId}:`, error.message);
    res.status(500).json({ message: 'An error occurred while deleting the user.', error: error.message });
  }
};