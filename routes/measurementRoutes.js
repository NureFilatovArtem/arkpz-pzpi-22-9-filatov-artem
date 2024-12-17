const express = require('express');
const router = express.Router();
const measurementController = require('../controllers/measurementController');
const { getStatistics } = require('../controllers/measurementController');

router.get('/measurements', measurementController.getAllMeasurements);

router.post('/measurements', measurementController.createMeasurement);

router.put('/measurements/:id', measurementController.updateMeasurement);

router.delete('/measurements/:id', measurementController.deleteMeasurement);

router.get('/statistics/:sensorId', measurementController.getStatistics);


module.exports = router;
