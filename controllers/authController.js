const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Модель пользователя

// Логин и генерация токена
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

console.log('Checking user with:', email, password);
console.log('User found:', user);

    // Находим пользователя по username и password
    const user = await User.findOne({ where: { username, password } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Логін з JWT ключем з файлику .env

    const token = jwt.sign(
        { id: user.id, role: user.role }, 
        process.env.JWT_SECRET, // Используем секретный ключ из .env
        { expiresIn: '1h' }
      );


    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
