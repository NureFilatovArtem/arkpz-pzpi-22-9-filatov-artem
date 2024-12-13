const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// коли ти створюєш офіс ти йому міг надати лише ідентифікатор уже наявної будівлі, а не неіснуючої

const Office = sequelize.define('Office', {
  building_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  floor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Office;
