// backend/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// GET /api/users/ - Получить всех пользователей (админ)
router.get('/', authenticateToken, isAdmin, userController.getAllUsers);

// POST /api/users/ - Создать нового пользователя (админ)
router.post('/', authenticateToken, isAdmin, userController.createUser);

// --- ДОБАВЬТЕ ЭТОТ РОУТ ---
// PUT /api/users/:userId - Обновить пользователя (админ)
router.put('/:userId', authenticateToken, isAdmin, userController.updateUser);
// -------------------------

// DELETE /api/users/:userId - Удалить пользователя (админ)
router.delete('/:userId', authenticateToken, isAdmin, userController.deleteUser);

module.exports = router;