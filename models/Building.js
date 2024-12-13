const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Building = sequelize.define('Building', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Building;
