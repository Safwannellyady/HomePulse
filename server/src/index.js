import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

import authRoutes from './routes/authRoutes.js';
import meterRoutes from './routes/meterRoutes.js';
import insightsRoutes from './routes/insightsRoutes.js';
import applianceRoutes from './routes/applianceRoutes.js';

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'HomePulse API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/meter', meterRoutes);
app.use('/api/insights', insightsRoutes);
app.use('/api/appliances', applianceRoutes);

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    iotSimulator.start();
});

import { iotSimulator } from './utils/iotSimulator.js';

