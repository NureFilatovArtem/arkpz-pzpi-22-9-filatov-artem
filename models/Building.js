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
  tableName: 'buildings', // Указываем имя таблицы в нижнем регистре
  timestamps: false,      // Отключаем автоматические timestamps
});

module.exports = Building;
