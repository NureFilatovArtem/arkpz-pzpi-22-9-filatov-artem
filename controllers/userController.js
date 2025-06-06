// const User = require('../models/User');
const userService = require('../services/userService');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role'] });
    res.status(200).json(users); // Array of users
  } catch (error) {
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
      role: ['admin', 'user'].includes(role) ? role : 'user',
    });
    const userData = { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role };
    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error: error.message });
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