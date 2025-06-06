// models/Building.js
const { DataTypes } = require('sequelize');
const dbConfig = require('../config/db'); // Імпортуємо весь об'єкт

// Логування після імпорту
console.log('[models/Building.js] Importing sequelize. Received dbConfig.sequelize type:', typeof dbConfig.sequelize, '. Has define method:', dbConfig.sequelize ? typeof dbConfig.sequelize.define : 'undefined');

const sequelize = dbConfig.sequelize; // Дістаємо екземпляр sequelize з імпортованого об'єкта

if (!sequelize || typeof sequelize.define !== 'function') {
  console.error('[models/Building.js] CRITICAL ERROR: sequelize is not correctly imported or initialized!');
  throw new Error('Sequelize instance is not available or .define is not a function in Building.js');
}

const Building = sequelize.define('Building', {
  // ... твої атрибути
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: false },
}, {
  tableName: 'buildings',
  timestamps: false,
});

module.exports = Building;