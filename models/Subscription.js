const { DataTypes } = require('sequelize');
const dbConfig = require('../config/db');
console.log('[models/Subscription.js] Importing sequelize. Received dbConfig.sequelize type:', typeof dbConfig.sequelize, '. Has define method:', dbConfig.sequelize ? typeof dbConfig.sequelize.define : 'undefined');
const sequelize = dbConfig.sequelize;
if (!sequelize || typeof sequelize.define !== 'function') {
  console.error('[models/Subscription.js] CRITICAL ERROR: sequelize is not correctly imported or initialized!');
  throw new Error('Sequelize instance is not available or .define is not a function in Subscription.js');
}

const Subscription = sequelize.define('Subscription', {
  sensor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'sensors',
        key: 'id',
    },
    onDelete: 'CASCADE',
},
callback_url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        isUrl: true,
    },
},
createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set current timestamp
    field: 'createdat', // Map to database column
},
updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set current timestamp
    field: 'updatedat', // Map to database column
},
}, {
tableName: 'subscriptions',
timestamps: false, // Disable Sequelize auto timestamps
});

module.exports = Subscription;