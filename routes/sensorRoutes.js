const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.get('/sensors', sensorController.getAllSensors);
router.post('/sensors', sensorController.createSensor);
router.put('/sensors/:id', sensorController.updateSensor);
router.delete('/sensors/:id', sensorController.deleteSensor);

module.exports = router;
