const { DataTypes } = require('sequelize');
const dbConfig = require('../config/db');
console.log('[models/Office.js] Importing sequelize. Received dbConfig.sequelize type:', typeof dbConfig.sequelize, '. Has define method:', dbConfig.sequelize ? typeof dbConfig.sequelize.define : 'undefined');
const sequelize = dbConfig.sequelize;
if (!sequelize || typeof sequelize.define !== 'function') {
  console.error('[models/Office.js] CRITICAL ERROR: sequelize is not correctly imported or initialized!');
  throw new Error('Sequelize instance is not available or .define is not a function in Office.js');
}

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
},  {
  tableName: 'offices', // Указываем имя таблицы в нижнем регистре
  timestamps: false,      // Отключаем автоматические timestamps
});

module.exports = Office;
