const measurementService = require('../services/measurementService');
const Sensor = require('../models/Sensor');
const { getStatistics } = require('../services/measurementService');
const Subscription = require('../models/Subscription');
const axios = require('axios'); // For sending notifications to subscribers
const fs = require('fs'); // For logging to a file

// Fetch all measurements
// This remains unchanged from your original code
exports.getAllMeasurements = async (req, res) => {
  try {
    const measurements = await measurementService.getAll();
    res.status(200).json(measurements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new measurement
// This is an updated version of your original `createMeasurement` function
exports.createMeasurement = async (req, res) => {
  try {
    const { sensor_id, value, unit } = req.body;

    // Step 1: Validate that the sensor exists
    // Original logic to check the sensor remains intact
    const sensor = await Sensor.findOne({ where: { id: sensor_id } });
    if (!sensor) {
      return res.status(404).json({ message: 'No sensor is found with such ID' });
    }

    // Step 2: Validate measurement value and unit
    // New validation logic added for more robust error handling
    const validUnits = ['°C', 'dB', 'lux', '%', 'boolean'];
    if (!validUnits.includes(unit)) {
      return res.status(400).json({ message: `Invalid unit. Allowed values are: ${validUnits.join(', ')}` });
    }
    if (unit === '°C' && (value < -50 || value > 100)) {
      return res.status(400).json({ message: 'Temperature value must be between -50 and 100°C' });
    }
    if (unit === '%' && (value < 0 || value > 100)) {
      return res.status(400).json({ message: 'Percentage value must be between 0 and 100%' });
    }
    if (unit === 'dB' && (value < 0 || value > 200)) {
      return res.status(400).json({ message: 'Noise level must be between 0 and 200 dB' });
    }
    if (unit === 'lux' && value < 0) {
      return res.status(400).json({ message: 'Light intensity cannot be negative' });
    }

    // Step 3: Create a new measurement
    // Original logic to save the measurement remains intact
    const measurement = await measurementService.create(req.body);

    // Step 4: Log the created measurement to the console and a file
    // New logic for logging
    const logMessage = `Measurement created: Sensor ${sensor_id}, Value: ${value}, Unit: ${unit}, Timestamp: ${new Date().toISOString()}`;
    console.log(logMessage);
    fs.appendFileSync('logs.txt', logMessage + '\n', 'utf8');

    // Step 5: Fetch all subscriptions for the sensor
    // Original logic for retrieving subscriptions remains intact
    const subscriptions = await Subscription.findAll({
      where: { sensor_id },
    });

    // Step 6: Notify each subscriber's callback URL
    // Original notification logic enhanced with error handling and logging
    for (const sub of subscriptions) {
      try {
        await axios.get(sub.callback_url, { params: measurement });
        const notifyLog = `Notification sent to ${sub.callback_url} for sensor ${sensor_id}`;
        console.log(notifyLog);
        fs.appendFileSync('logs.txt', notifyLog + '\n', 'utf8');
      } catch (err) {
        const errorLog = `Failed to notify ${sub.callback_url}: ${err.message}`;
        console.error(errorLog);
        fs.appendFileSync('logs.txt', errorLog + '\n', 'utf8');
      }
    }

    // Step 7: Respond to the user
    // Original response logic remains intact
    res.status(201).json({
      message: 'Measurement created successfully and notifications sent',
      measurement,
    });
  } catch (error) {
    // Step 8: Handle errors and log them
    const errorLog = `Error creating measurement: ${error.message}`;
    console.error(errorLog);
    fs.appendFileSync('logs.txt', errorLog + '\n', 'utf8');
    res.status(500).json({ message: error.message });
  }
};

// Update a measurement
// This function remains unchanged from your original code
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
// This function remains unchanged from your original code
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
// This function remains unchanged from your original code
exports.getStatistics = async (req, res) => {
  try {
    const { sensorId } = req.params;
    const stats = await getStatistics(sensorId);
    res.status(200).json(stats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};