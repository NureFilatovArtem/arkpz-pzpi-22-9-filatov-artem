const sensorService = require('../services/sensorService');
const Office = require('../models/Office'); // you need to solve that, honey


// Fetch all sensors
exports.getAllSensors = async (req, res) => {
  try {
    const sensors = await sensorService.getAll();
    res.status(200).json(sensors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new sensor
exports.createSensor = async (req, res) => {
  try {
    const office = await Office.findAll(
        {
            where: 
            {
                id: req.body.office_id,
            }
        }
    );
    if (office.length == 0) {
        res.status(401).json({ message: "No office is found with such ID" });
        return;
    }
    const sensor = await sensorService.create(req.body);
    res.status(201).json(sensor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a sensor
exports.updateSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = await sensorService.update(id, req.body);
    res.status(200).json(sensor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a sensor
exports.deleteSensor = async (req, res) => {
  try {
    const { id } = req.params;
    await sensorService.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};