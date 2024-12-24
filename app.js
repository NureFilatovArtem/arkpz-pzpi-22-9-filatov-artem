const db = require('./config/db'); 
require('dotenv').config(); // Подключение переменных окружения
const express = require('express');
const buildingRoutes = require('./routes/buildingRoutes');
const sensorRoutes = require('./routes/sensorRoutes');
const measurementRoutes = require('./routes/measurementRoutes');
const officeRoutes = require('./routes/officeRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); 
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();

// Синхронизация базы данных
(async () => {
  try {
    await db.sync(); // Создает таблицы, если их нет
    console.log('Database synchronized successfully!');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
})();

const Sensor = require('./models/Sensor');
const Subscription = require('./models/Subscription');


// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api', buildingRoutes);
app.use('/api', sensorRoutes);
app.use('/api', officeRoutes);
app.use('/api', measurementRoutes);
app.use('/api', authRoutes); // Обрабатывает логин (POST /api/login)
app.use('/api', subscriptionRoutes); // Subscriptions
app.use('/api/users', userRoutes);



// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
