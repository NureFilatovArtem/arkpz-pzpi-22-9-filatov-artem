const { DataTypes } = require('sequelize');
const db = require('../config/db'); // подключение базы данных

const Subscription = db.define('Subscription', {
  sensor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Sensors', // название таблицы сенсоров
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  callback_url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true, // Проверка, что это корректный URL
    },
  },
});

module.exports = Subscription;