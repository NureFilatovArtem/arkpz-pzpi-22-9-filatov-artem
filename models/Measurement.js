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
