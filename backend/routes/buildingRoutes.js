const express = require('express');
const buildingController = require('../controllers/buildingController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();
// Get all buildings
router.get('/', buildingController.getAllBuildings);

// Create a new building
router.post('/', authenticateToken, buildingController.createBuilding);

// Update a building
router.put('/:id', authenticateToken, buildingController.updateBuilding);

// Delete a building
router.delete('/:id', authenticateToken, buildingController.deleteBuilding);

module.exports = router;

