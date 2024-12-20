const measurementService = require('../services/measurementService');
const Sensor = require('../models/Sensor');
const { getStatistics } = require('../services/measurementService');
const Subscription = require('../models/Subscription');
const axios = require('axios'); // Заменяем import на require

// Fetch all measurements
exports.getAllMeasurements = async (req, res) => {
  try {
    const measurements = await measurementService.getAll();
    res.status(200).json(measurements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new measurement
exports.createMeasurement = async (req, res) => {
  try {
    // Проверка сенсора
    const sensor = await Sensor.findOne({ where: { id: req.body.sensor_id } });
    if (!sensor) {
      return res.status(404).json({ message: 'No sensor is found with such ID' });
    }

    // Создание нового измерения
    const measurement = await measurementService.create(req.body);

    // Получение подписок
    const subscriptions = await Subscription.findAll({
      where: { sensor_id: req.body.sensor_id },
    });

    // Отправка уведомлений подписчикам
    for (const sub of subscriptions) {
      try {
        await axios.get(sub.url, { params: measurement });
        console.log(`Notification sent to ${sub.url} for sensor ${sensor.id}`);
      } catch (err) {
        console.error(`Failed to notify ${sub.url}:`, err.message);
      }
    }

    // Ответ пользователю
    res.status(201).json({
      message: 'Measurement created successfully and notifications sent',
      measurement,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a measurement
exports.updateMeasurement = async (req, res) => {
  try {
    const { id } = req.params;
    const measurement = await measurementService.update(id, req.body);
    res.status(200).json(measurement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a measurement
exports.deleteMeasurement = async (req, res) => {
  try {
    const { id } = req.params;
    await measurementService.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get statistics for a sensor
exports.getStatistics = async (req, res) => {
  try {
    const { sensorId } = req.params;
    const stats = await getStatistics(sensorId);
    res.status(200).json(stats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
