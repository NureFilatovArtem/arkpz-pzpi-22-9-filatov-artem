const Subscription = require('../models/Subscription');

// Создать подписку
exports.createSubscription = async (req, res) => {
  try {
    const { sensor_id, callback_url } = req.body;

    // Проверка существующей подписки
    const existingSubscription = await Subscription.findOne({ where: { sensor_id, callback_url } });
    if (existingSubscription) {
      return res.status(409).json({ message: 'Subscription already exists' });
    }

    const subscription = await Subscription.create({ sensor_id, callback_url });
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

// Удалить подписку
exports.deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findByPk(id);

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    await subscription.destroy();
    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
