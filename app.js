/**
 * @file app.js
 * @description Configuración de la aplicación y rutas principales.
 */

import express from 'express';
import { connectDB } from './config/db.js'; // Supongo que tienes una función connectDB exportada
import { authMiddleware } from './controllers/authMiddleware.js';
import { validateData } from './controllers/validateData.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import { errorHandler } from './controllers/errorHandler.js';

const app = express();

// Conexión a la base de datos
connectDB();

// Middlewares
app.use(express.json()); // Middleware para parsear cuerpos JSON
app.use(authMiddleware); // Middleware de autenticación
app.use(validateData); // Middleware de validación de datos

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
