const { DataTypes } = require('sequelize');
const dbConfig = require('../config/db');
console.log('[models/Measurement.js] Importing sequelize. Received dbConfig.sequelize type:', typeof dbConfig.sequelize, '. Has define method:', dbConfig.sequelize ? typeof dbConfig.sequelize.define : 'undefined');
const sequelize = dbConfig.sequelize;
if (!sequelize || typeof sequelize.define !== 'function') {
  console.error('[models/Measurement.js] CRITICAL ERROR: sequelize is not correctly imported or initialized!');
  throw new Error('Sequelize instance is not available or .define is not a function in Measurement.js');
}

const Measurement = sequelize.define('Measurement', {
  sensor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  unit: {
    type: DataTypes.ENUM('°C', 'dB', 'lux', '%', 'boolean'),
    allowNull: false,
  },
}, {
  tableName: 'measurements', // Указываем имя таблицы в нижнем регистре
  timestamps: false,      // Отключаем автоматические timestamps
});

module.exports = Measurement;
