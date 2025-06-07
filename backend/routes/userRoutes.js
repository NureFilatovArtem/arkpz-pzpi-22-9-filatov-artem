const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Маршрут для получения всех пользователей (только для администраторов)
router.get('/', authenticateToken, isAdmin, userController.getAllUsers);

// Маршрут для создания нового пользователя (только для администраторов)
router.post('/', authenticateToken, isAdmin, userController.createUser);

// Маршрут для удаления пользователя (только для администраторов)
router.delete('/:userId', authenticateToken, isAdmin, userController.deleteUser);

module.exports = router;