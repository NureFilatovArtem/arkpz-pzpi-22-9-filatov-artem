// Middleware для проверки роли администратора
function isAdmin(req, res, next) {
    // Пример: Вытаскиваем роль из запроса (например, после аутентификации)
    const userRole = req.user && req.user.role;
  
    // Проверка роли
    if (userRole === 'admin') {
      return next(); // Продолжаем выполнение запроса
    }
  
    // Если роль не admin
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  
  // Экспортируем middleware
  module.exports = { isAdmin };