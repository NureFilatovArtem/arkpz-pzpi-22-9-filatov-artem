const Measurement = require('../models/Measurement');
const { Sequelize } = require('sequelize');

// Fetch all measurements
exports.getAll = async () => {
  return await Measurement.findAll();
};

// Create a new measurement
exports.create = async (measurementData) => {
  return await Measurement.create(measurementData);
};

// Update a measurement
exports.update = async (id, measurementData) => {
  const measurement = await Measurement.findByPk(id);
  if (!measurement) throw new Error('Measurement not found');
  return await measurement.update(measurementData);
};

// Delete a measurement
exports.delete = async (id) => {
  const measurement = await Measurement.findByPk(id);
  if (!measurement) throw new Error('Measurement not found');
  return await measurement.destroy();
};

// Business logic implementation
exports.getStatistics = async (sensorId) => {
  return await Measurement.findAll({
    attributes: [
      'sensor_id',
      [Sequelize.fn('AVG', Sequelize.col('value')), 'average_value'],
      [Sequelize.fn('MAX', Sequelize.col('value')), 'max_value'],
    ],
    where: { sensor_id: sensorId }, // фильтр по конкретному сенсору
    group: ['sensor_id'],
  });
};