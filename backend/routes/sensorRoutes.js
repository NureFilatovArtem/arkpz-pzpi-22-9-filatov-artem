const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/', sensorController.getAllSensors);
router.post('/', authenticateToken, sensorController.createSensor);
router.put('/:id', authenticateToken, sensorController.updateSensor);
router.delete('/:id', authenticateToken, sensorController.deleteSensor);

// Для статистики сенсорів (можна залишити публічним або захистити)
// Для послідовності, давайте також захистимо його.
router.get('/stats', authenticateToken, sensorController.getSensorStats);

module.exports = router;
