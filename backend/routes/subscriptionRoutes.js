// routes/subscriptionRoutes.js
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Создать подписку
router.post('/', authenticateToken, subscriptionController.createSubscription);

// Получить все подписки
router.get('/', authenticateToken, subscriptionController.getAllSubscriptions);

// Specific sensor subscriptions by ID
router.get('/:sensor_id', authenticateToken, subscriptionController.getSubscriptionsBySensorId);

// Удалить подписку
router.delete('/:id', authenticateToken, subscriptionController.deleteSubscription);

module.exports = router;