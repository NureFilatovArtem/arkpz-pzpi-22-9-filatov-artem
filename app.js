const express = require('express');
const buildingRoutes = require('./routes/buildingRoutes');
const sensorRoutes = require('./routes/sensorRoutes');
const measurementRoutes = require('./routes/measurementRoutes');
const officeRoutes = require('./routes/officeRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api', buildingRoutes);
app.use('/api', sensorRoutes);
app.use('/api', officeRoutes);
app.use('/api', measurementRoutes);


// Business Logic

app.use('/api/users', userRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
