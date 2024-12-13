const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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
}, {
  timestamps: true,
});

module.exports = Sensor;
