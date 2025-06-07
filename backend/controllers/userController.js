const User = require('../models/User'); // Убедитесь, что путь к модели верный
const bcrypt = require('bcryptjs');

/**
 * Получение всех пользователей из базы данных.
 */
exports.getAllUsers = async (req, res) => {
  try {
    console.log('[userController] Fetching all users from User model...');
    // Возвращаем только безопасные поля
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role'] });
    
    if (!users || users.length === 0) {
      console.log('[userController] No users found.');
      return res.status(200).json([]);
    }

    console.log(`[userController] Found ${users.length} users.`);
    res.status(200).json(users);

  } catch (error) {
    console.error('[userController] Error fetching users:', error.message);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};


/**
 * Создание нового пользователя.
 */
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    // Проверка на существование пользователя (более надежный вариант)
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ message: `User with email '${email}' already exists.` });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(409).json({ message: `User with username '${username}' already exists.` });
    }

    // --- ГЛАВНОЕ ИСПРАВЛЕНИЕ ---
    // "Нормализация" роли, полученной с фронтенда.
    // Приводим к нижнему регистру, чтобы избежать ошибок с ENUM ('Admin' vs 'admin').
    const finalRole = (role && typeof role === 'string' && role.toLowerCase() === 'admin') 
      ? 'admin' 
      : 'user';

    // Хеширование пароля перед сохранением
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя с "безопасной" ролью
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: finalRole, 
    });
    
    // Формируем объект пользователя для ответа, не включая пароль
    const userDataToReturn = { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role };

    console.log('Successfully created new user:', userDataToReturn);
    res.status(201).json(userDataToReturn);

  } catch (error) {
    // Этот лог поможет в будущем отлавливать ошибки базы данных
    console.error('[userController] CRITICAL error creating user:', error);
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
};


/**
 * Удаление пользователя по ID.
 */
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
    
    if (req.user && req.user.id === parseInt(userId, 10)) {
        return res.status(403).json({ message: 'You cannot delete your own account.' });
    }

    await userToDelete.destroy();
    
    console.log(`User with ID ${userId} was deleted by ${req.user.username}.`);
    res.status(200).json({ message: 'User deleted successfully.' });

  } catch (error) {
    console.error(`[userController] Error deleting user with ID ${req.params.userId}:`, error.message);
    res.status(500).json({ message: 'An error occurred while deleting the user.', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, role, password } = req.body;

    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) userToUpdate.username = username;
    if (email) userToUpdate.email = email;
    if (role && ['user', 'admin'].includes(role.toLowerCase())) {
        userToUpdate.role = role.toLowerCase();
    }

    if (password && password.length > 0) { // Проверка, что пароль не пустой
      const hashedPassword = await bcrypt.hash(password, 10);
      userToUpdate.password = hashedPassword;
    }
    
    await userToUpdate.save();
    
    const updatedUserData = {
      id: userToUpdate.id,
      username: userToUpdate.username,
      email: userToUpdate.email,
      role: userToUpdate.role
    };

    res.status(200).json(updatedUserData);
    
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Email or username already in use.' });
    }
    console.error(`[userController] Error updating user ${req.params.userId}:`, error);
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};