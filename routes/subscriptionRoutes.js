const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.post('/subscriptions', subscriptionController.createSubscription);
router.get('/subscriptions', subscriptionController.getAllSubscriptions);

module.exports = router;
