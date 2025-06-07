const express = require('express');
const buildingController = require('../backend/controllers/buildingController');
const router = express.Router();
// Get all buildings
router.get('/buildings', buildingController.getAllBuildings);

// Create a new building
router.post('/buildings', buildingController.createBuilding);

// Update a building
router.put('/buildings/:id', buildingController.updateBuilding);

// Delete a building
router.delete('/buildings/:id', buildingController.deleteBuilding);

module.exports = router;

