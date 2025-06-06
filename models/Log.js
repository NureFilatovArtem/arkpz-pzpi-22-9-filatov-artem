const { DataTypes } = require('sequelize');
const dbConfig = require('../config/db');
console.log('[models/Log.js] Importing sequelize. Received dbConfig.sequelize type:', typeof dbConfig.sequelize, '. Has define method:', dbConfig.sequelize ? typeof dbConfig.sequelize.define : 'undefined');
const sequelize = dbConfig.sequelize;
if (!sequelize || typeof sequelize.define !== 'function') {
  console.error('[models/Log.js] CRITICAL ERROR: sequelize is not correctly imported or initialized!');
  throw new Error('Sequelize instance is not available or .define is not a function in Log.js');
}

const Log = sequelize.define('Log', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'logs',
  timestamps: false,
});

module.exports = Log;
