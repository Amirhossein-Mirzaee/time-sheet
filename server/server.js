import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import configRoutes from './routes/config.js';
import dataRoutes from './routes/data.js';

dotenv.config();

// Initialize database
import './database.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - Allow all origins for GitHub Pages
app.use(cors({
  origin: '*', // Allow GitHub Pages and other origins
  credentials: false
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/config', configRoutes);
app.use('/api/data', dataRoutes);

// Root health check (for Railway)
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Timesheet Tracker API is running' });
});

// API health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Timesheet Tracker API is running' });
});

// Start server - bind to 0.0.0.0 for Railway
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ Health check: http://0.0.0.0:${PORT}/`);
  console.log(`✅ API health check: http://0.0.0.0:${PORT}/api/health`);
});

