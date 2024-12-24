// routes/subscriptionRoutes.js
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// Создать подписку
router.post('/subscriptions', subscriptionController.createSubscription);

// Получить все подписки
router.get('/subscriptions', subscriptionController.getAllSubscriptions);

// Specific sensor subscriptions by ID
router.get('/subscriptions/:sensor_id', subscriptionController.getSubscriptionsBySensorId);

// Удалить подписку
router.delete('/subscriptions/:id', subscriptionController.deleteSubscription);

module.exports = router;