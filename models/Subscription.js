const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Subscription = sequelize.define('Subscription', {
  sensor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'sensors', key: 'id' },
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isUrl: true },
  },
}, {
  timestamps: true,
  tableName: 'subscription',
});

module.exports = Subscription;
