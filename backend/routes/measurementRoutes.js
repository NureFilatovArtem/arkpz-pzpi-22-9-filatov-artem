const express = require('express');
const router = express.Router();
const measurementController = require('../controllers/measurementController');
const { getStatistics } = require('../controllers/measurementController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/', measurementController.getAllMeasurements);

router.post('/', authenticateToken, measurementController.createMeasurement);

router.put('/:id', authenticateToken, measurementController.updateMeasurement);

router.delete('/:id', authenticateToken, measurementController.deleteMeasurement);

router.get('/statistics/:sensorId', measurementController.getStatistics);

module.exports = router;
