const buildingService = require('../services/buildingService');

// Controller for fetching all buildings
exports.getAllBuildings = async (req, res) => {
  try {
    const buildings = await buildingService.getAll(); // Using the service layer
    res.status(200).json(buildings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for creating a new building
exports.createBuilding = async (req, res) => {
  try {
    const { name, address } = req.body;
    const building = await buildingService.create({ name, address }); // Using the service layer
    res.status(201).json(building);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller for updating a building
exports.updateBuilding = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;
    const building = await buildingService.update(id, { name, address }); // Using the service layer
    res.status(200).json(building);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller for deleting a building
exports.deleteBuilding = async (req, res) => {
  try {
    const { id } = req.params;
    await buildingService.delete(id); // Using the service layer
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
