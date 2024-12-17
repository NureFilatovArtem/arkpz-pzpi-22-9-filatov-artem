const jwt = require('jsonwebtoken');

// Middleware для проверки токена
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']; // Токен должен быть в заголовке Authorization

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Проверяем токен
  jwt.verify(token.split(' ')[1], 'secretkey', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded; // Добавляем расшифрованные данные в req.user
    next();
  });
}

// Middleware для проверки роли администратора
function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next(); // Продолжаем выполнение запроса
  }
  return res.status(403).json({ message: 'Access denied. Admins only.' });
}

module.exports = { authenticateToken, isAdmin };
