const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Database connection settings
const sequelize = new Sequelize('postgres', 'postgres', 'Student_1234', {
  host: 'localhost',
  dialect: 'postgres',
});

const runSQLScript = async (filePath) => {
  try {
    const script = fs.readFileSync(filePath, 'utf-8');
    await sequelize.query(script);
    console.log(`Successfully executed: ${filePath}`);
  } catch (error) {
    console.error(`Error executing script ${filePath}:`, error);
  }
};

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

   // Run creation-script.sql
await runSQLScript(path.join(__dirname, '../sql-scripts/creation-script.sql'));

// Run fill-script.sql
await runSQLScript(path.join(__dirname, '../sql-scripts/fill-script.sql'));
    console.log('Database setup completed.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    
  }
})();

module.exports = sequelize;
