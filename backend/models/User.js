const { DataTypes } = require('sequelize');
const dbConfig = require('../config/db');
console.log('[models/User.js] Importing sequelize. Received dbConfig.sequelize type:', typeof dbConfig.sequelize, '. Has define method:', dbConfig.sequelize ? typeof dbConfig.sequelize.define : 'undefined');
const sequelize = dbConfig.sequelize;
if (!sequelize || typeof sequelize.define !== 'function') {
  console.error('[models/User.js] CRITICAL ERROR: sequelize is not correctly imported or initialized!');
  throw new Error('Sequelize instance is not available or .define is not a function in User.js');
}

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    allowNull: false,
    defaultValue: 'user',
  },
}, {
  tableName: 'users', // Явно указываем имя таблицы в нижнем регистре
  timestamps: false,
});

module.exports = User;