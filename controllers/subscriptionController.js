const Subscription = require('../models/Subscription');

// Создать подписку
exports.createSubscription = async (req, res) => {
  try {
    const { sensor_id, url } = req.body;
    const subscription = await Subscription.create({ sensor_id, url });
    res.status(201).json({ message: 'Subscription created successfully', subscription });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Получить все подписки
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
