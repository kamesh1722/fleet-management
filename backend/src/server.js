import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.js';
import insuranceRoutes from './routes/insuranceRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Fleet Vehicle Management API',
    version: '1.0.0',
  });
});

// Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/alerts', alertRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[Server] Fleet Management API running on port ${PORT}`);
  console.log(`[Server] Client Origin: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});
