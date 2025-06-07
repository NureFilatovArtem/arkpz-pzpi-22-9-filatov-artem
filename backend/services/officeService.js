const Building = require('../models/Building');
const Office = require('../models/Office');

exports.getAll = async () => {
  return await Office.findAll();
};

exports.create = async (officeData) => {
    
  return await Office.create(officeData);
};

exports.update = async (id, officeData) => {
  const office = await Office.findByPk(id);
  if (!office) throw new Error('Office not found');
  return await office.update(officeData);
};

exports.delete = async (id) => {
  const office = await Office.findByPk(id);
  if (!office) throw new Error('Office not found');
  return await office.destroy();
};

