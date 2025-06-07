// config/db.js
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelizeInstance = new Sequelize(process.env.DB_NAME || 'postgres', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD || 'Student_1234', {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  logging: false, 
});
// Логування після створення екземпляру
console.log('[config/db.js] Sequelize instance created. Type:', typeof sequelizeInstance, '. Has define method:', sequelizeInstance ? typeof sequelizeInstance.define : 'undefined');


const runSQLScript = async (filePath, scriptName) => { /* ... твій код runSQLScript ... */ };

const initializeDatabase = async () => {
  try {
    await sequelizeInstance.authenticate(); // Використовуємо sequelizeInstance
    console.log('[config/db.js] Database connection authenticated successfully.');
    // ... твій код для виконання SQL скриптів з runSQLScript, використовуючи sequelizeInstance ...
    console.log('[config/db.js] Running SQL scripts for database setup...');
    await runSQLScript(path.join(__dirname, '../sql-scripts/creation-script.sql'), 'Creation Script');
    await runSQLScript(path.join(__dirname, '../sql-scripts/fill-script.sql'), 'Fill Script');
    console.log('[config/db.js] All SQL scripts executed.');
  } catch (error) {
    console.error('[config/db.js] Critical error during database initialization:', error);
    throw error;
  }
};

// Логування перед експортом
const exportsObject = { sequelize: sequelizeInstance, initializeDatabase };
console.log('[config/db.js] Exporting object. Sequelize type in export:', typeof exportsObject.sequelize, '. Has define method:', exportsObject.sequelize ? typeof exportsObject.sequelize.define : 'undefined');

module.exports = exportsObject;