const { DataTypes } = require('sequelize');
const dbConfig = require('../config/db');
console.log('[models/Sensor.js] Importing sequelize. Received dbConfig.sequelize type:', typeof dbConfig.sequelize, '. Has define method:', dbConfig.sequelize ? typeof dbConfig.sequelize.define : 'undefined');
const sequelize = dbConfig.sequelize;
if (!sequelize || typeof sequelize.define !== 'function') {
  console.error('[models/Sensor.js] CRITICAL ERROR: sequelize is not correctly imported or initialized!');
  throw new Error('Sequelize instance is not available or .define is not a function in Sensor.js');
}

const Sensor = sequelize.define('Sensor', {
  office_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('temperature', 'oxygen', 'noise', 'light', 'motion'),
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  serial_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  installed_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
},  {
  tableName: 'sensors', // Указываем имя таблицы в нижнем регистре
  timestamps: false,      // Отключаем автоматические timestamps
});

module.exports = Sensor;
