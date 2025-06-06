// app.js (бекенд)
require('dotenv').config(); // Має бути на самому початку
const express = require('express');
const cors = require('cors');

// 1. ТІЛЬКИ 'config/db.js' імпортується на верхньому рівні для доступу до initializeDatabase
const { initializeDatabase, sequelize } = require('./config/db'); // Також імпортуємо sequelize для логування тут
console.log('[app.js] db module imported. Sequelize instance type:', typeof sequelize, sequelize ? typeof sequelize.define : 'undefined');

// Створення екземпляру Express додатка
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  allowedHeaders: ['Content-Type', 'Authorization'],
  // credentials: true, // Uncomment if you use cookies/sessions
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle pre-flight requests for all routes

// Middleware для парсингу JSON тіл запитів
app.use(express.json()); 

// Визначення порту
const PORT = process.env.APP_PORT || 5000;

// Головна функція для запуску сервера
const startServer = async () => {
  try {
    // 2. Ініціалізація бази даних (чекаємо завершення)
    console.log('[app.js] Starting database initialization...');
    await initializeDatabase(); 
    console.log('[app.js] Database initialization completed successfully.');
    console.log('[app.js] After DB init. Sequelize instance type:', typeof sequelize, sequelize ? typeof sequelize.define : 'undefined');


    // 3. ІМПОРТ РОУТІВ ТІЛЬКИ ПІСЛЯ ІНІЦІАЛІЗАЦІЇ БД
    // Це гарантує, що моделі (які імпортуються сервісами/контролерами, що викликаються роутами)
    // будуть завантажені вже ПІСЛЯ того, як 'sequelize' з 'config/db.js' повністю готовий.
    const buildingRoutes = require('./routes/buildingRoutes');
    const sensorRoutes = require('./routes/sensorRoutes');
    const measurementRoutes = require('./routes/measurementRoutes');
    const officeRoutes = require('./routes/officeRoutes');
    const userRoutes = require('./routes/userRoutes');
    const authRoutes = require('./routes/authRoutes'); 
    const subscriptionRoutes = require('./routes/subscriptionRoutes');
    console.log('[app.js] All routes imported.');

    // 4. Реєстрація роутів
    app.use('/api/buildings', buildingRoutes);
    app.use('/api/sensors', sensorRoutes);
    app.use('/api/offices', officeRoutes);
    app.use('/api/measurements', measurementRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/subscriptions', subscriptionRoutes);
    app.use('/api/users', userRoutes);
    console.log('[app.js] All routes mounted.');

    // 5. Запуск Express сервера
    app.listen(PORT, () => {
      console.log(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
      console.log(`🚀 Server is up and running on http://localhost:${PORT} 🚀`);
      console.log(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
    });

  } catch (error) {
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error('💥 Failed to initialize database or start server: 💥', error);
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    process.exit(1); 
  }
};

// Виклик функції запуску сервера
startServer();