const Sensor = require('../backend/models/Sensor'); // Ensure exact match with file name and path


// Fetch all sensors
exports.getAll = async () => {
  return await Sensor.findAll();
};

// Create a new sensor
exports.create = async (sensorData) => {
  return await Sensor.create(sensorData);
};

// Update a sensor
exports.update = async (id, sensorData) => {
  const sensor = await Sensor.findByPk(id);
  if (!sensor) throw new Error('Sensor not found');
  return await sensor.update(sensorData);
};

// Delete a sensor
exports.delete = async (id) => {
  const sensor = await Sensor.findByPk(id);
  if (!sensor) throw new Error('Sensor not found');
  return await sensor.destroy();
};
