const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Measurement = sequelize.define('Measurement', {
  sensor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
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
  timestamps: true,
});

module.exports = Measurement;
