const jwt = require('jsonwebtoken');

// Middleware для проверки токена
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']; // Извлекаем заголовок Authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid format' });
  }

  const token = authHeader.split(' ')[1]; // Получаем сам токен (после "Bearer")

  // Проверяем токен
  jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err.message);
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