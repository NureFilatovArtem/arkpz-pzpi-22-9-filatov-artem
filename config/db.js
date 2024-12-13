const { Sequelize } = require('sequelize');

// Database connection settings
const sequelize = new Sequelize('postgres', 'postgres', 'Student_1234', {
  host: 'localhost',
  dialect: 'postgres',
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
