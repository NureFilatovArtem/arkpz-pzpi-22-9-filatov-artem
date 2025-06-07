const officeService = require('../services/officeService');
const Building = require('../models/Building');

exports.getAllOffices = async (req, res) => {
  try {
    const offices = await officeService.getAll();
    res.status(200).json(offices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOffice = async (req, res) => {
  try {
    const building = await Building.findAll(
        {
            where: 
            {
                id: req.body.building_id,
            }
        }
    );
    if (building.length == 0) {
        res.status(401).json({ message: "No building is found with such ID" });
        return;
    }
    const office = await officeService.create(req.body);
    res.status(201).json(office);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateOffice = async (req, res) => {
  try {
    const { id } = req.params;
    const office = await officeService.update(id, req.body);
    res.status(200).json(office);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOffice = async (req, res) => {
  try {
    const { id } = req.params;
    await officeService.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
