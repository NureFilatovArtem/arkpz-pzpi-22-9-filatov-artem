const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Модель пользователя

// Логин и генерация токена
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Лог для отладки
    console.log('Incoming login request:', email, password);

    // Проверка на наличие email и password
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Поиск пользователя по email
    const user = await User.findOne({ where: { email } });

    console.log('User found:', user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Генерация JWT токена
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secretkey', // Дефолтный ключ при отсутствии .env
      { expiresIn: '1h' }
    );

    const userData = { id: user.id, username: user.username, email: user.email, role: user.role };
    res.status(200).json({ token, user: userData });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
