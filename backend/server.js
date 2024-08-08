// Packages
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

// Files
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'

// Configuration
dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 3000;

// Routes
app.use('/api/v1/users', userRoutes)

app.listen(port, () =>
    console.log(`Server running on port: ${port}`)
);
