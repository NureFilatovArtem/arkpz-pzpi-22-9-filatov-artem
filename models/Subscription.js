const { DataTypes } = require('sequelize');
const db = require('../config/db'); // подключение базы данных

const Subscription = db.define('Subscriptions', {
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