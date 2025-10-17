import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import tradeRoutes from './routes/tradeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { limiter } from './middleware/rateLimiter.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(limiter); // Rate limiting

// Routes
app.use('/api/trades', tradeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tokens', tokenRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'FluxTrade API is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});
