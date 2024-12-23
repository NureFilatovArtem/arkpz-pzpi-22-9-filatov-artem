const { DataTypes } = require('sequelize');
const db = require('../config/db'); // подключение базы данных

const Subscription = db.define('Subscription', {
  sensor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sensor', // Matches database table name
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
}, {
  tableName: 'subscriptions', // Explicitly set table name
  timestamps: true, // Automatically manage createdAt and updatedAt
});


module.exports = Subscription;