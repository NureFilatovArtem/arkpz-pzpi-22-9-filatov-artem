const express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/userController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// router.get('/', getAllUsers);
// router.delete('/:userId', isAdmin, deleteUser);


// Маршрут для получения всех пользователей (только для администраторов)
router.get('/', authenticateToken, isAdmin, getAllUsers);

// Маршрут для удаления пользователя (только для администраторов)
router.delete('/:userId', authenticateToken, isAdmin, deleteUser);

// router.get('/', authenticateToken, isAdmin, getAllUsers);
// router.delete('/:userId', isAdmin, deleteUser); // Проверка роли на DELETE пользователя

module.exports = router;