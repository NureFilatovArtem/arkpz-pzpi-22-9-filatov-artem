// app.js (backend)
require('dotenv').config(); // Always at the very top
const express = require('express');
const cors = require('cors');

// Import DB initialization
const { initializeDatabase, sequelize } = require('./config/db');
console.log('[app.js] db module imported. Sequelize instance type:', typeof sequelize, sequelize ? typeof sequelize.define : 'undefined');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  allowedHeaders: ['Content-Type', 'Authorization'],
  // credentials: true, // Uncomment if you use cookies/sessions
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle pre-flight requests for all routes

app.use(express.json());

const PORT = process.env.APP_PORT || 5000;

const startServer = async () => {
  try {
    console.log('[app.js] Starting database initialization...');
    await initializeDatabase();
    console.log('[app.js] Database initialization completed successfully.');
    console.log('[app.js] After DB init. Sequelize instance type:', typeof sequelize, sequelize ? typeof sequelize.define : 'undefined');

    // Import routes AFTER DB is ready, using correct relative paths
    const buildingRoutes = require('./routes/buildingRoutes');
    const sensorRoutes = require('./routes/sensorRoutes');
    const measurementRoutes = require('./routes/measurementRoutes');
    const officeRoutes = require('./routes/officeRoutes');
    const userRoutes = require('./routes/userRoutes');
    const authRoutes = require('./routes/authRoutes');
    const subscriptionRoutes = require('./routes/subscriptionRoutes');
    console.log('[app.js] All routes imported.');

    // Register routes
    app.use('/api/buildings', buildingRoutes);
    app.use('/api/sensors', sensorRoutes);
    app.use('/api/offices', officeRoutes);
    app.use('/api/measurements', measurementRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/subscriptions', subscriptionRoutes);
    app.use('/api/users', userRoutes);
    console.log('[app.js] All routes mounted.');

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

startServer();