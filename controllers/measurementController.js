const measurementService = require('../services/measurementService');
const Sensor = require('../models/Sensor');

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
        const sensor = await Sensor.findAll(
            {
                where: 
                {
                    id: req.body.sensor_id,
                }
            }
        );
        if (sensor.length == 0) {
            res.status(401).json({ message: "No sensor is found with such ID" });
            return;
        }
      const measurement = await measurementService.create(req.body); // Pass request body to the service
      res.status(201).json(measurement);
    } catch (error) {
      res.status(400).json({ message: error.message });
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

// Business logic of retrieving agregated data from DB

const { getStatistics } = require('../services/measurementService');

exports.getStatistics = async (req, res) => {
  try {
    const { sensorId } = req.params;
    const stats = await getStatistics(sensorId);
    res.status(200).json(stats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



