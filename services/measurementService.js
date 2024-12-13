const Measurement = require('../models/Measurement');


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