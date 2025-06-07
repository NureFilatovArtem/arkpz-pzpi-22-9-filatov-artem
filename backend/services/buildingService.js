const Building = require('../models/Building');

// Fetch all buildings
exports.getAll = async () => {
  return await Building.findAll();
};

// Create a new building
exports.create = async (buildingData) => {
  return await Building.create(buildingData);
};

// Update a building
exports.update = async (id, buildingData) => {
  const building = await Building.findByPk(id);
  if (!building) {
    throw new Error('Building not found');
  }
  return await building.update(buildingData);
};

// Delete a building
exports.delete = async (id) => {
  const building = await Building.findByPk(id);
  if (!building) {
    throw new Error('Building not found');
  }
  return await building.destroy();
};
