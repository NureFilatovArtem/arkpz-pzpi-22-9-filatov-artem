const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Убедитесь, что путь к модели верный

// Логин и генерация токена
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Incoming login request for email:', email);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log(`Login failed: No user found with email ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // --- КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ ---
    // Поскольку пароли в вашей базе данных НЕ хешированы,
    // мы временно отключаем bcrypt и используем простое сравнение строк.
    // Это только для отладки, чтобы вы смогли войти в систему.
    
    // Старый код с bcrypt, который не работал с вашими данными:
    // const isMatch = await bcrypt.compare(password, user.password);
    
    // НОВЫЙ код для временной проверки:
    const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
return res.status(401).json({ message: 'Invalid credentials' });
}

    // Если проверка пройдена, генерируем токен
    console.log(`Login successful for user: ${user.username} (${user.role})`);

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    const userData = { id: user.id, username: user.username, email: user.email, role: user.role };
    
    res.status(200).json({ token, user: userData });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed due to a server error.', error: error.message });
  }
};