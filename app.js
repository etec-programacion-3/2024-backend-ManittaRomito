/**
 * @file app.js
 * @description Configuración de la aplicación y rutas principales.
 */

import express from 'express';
import  cors from 'cors'
import { connectDB } from './config/db.js'; // Función para conectar a la base de datos
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import { errorHandler } from './controllers/errorHandler.js';
import { authMiddleware } from './controllers/authMiddleware.js'; // Middleware de autenticación

const app = express();

// Conexión a la base de datos
connectDB();

// Middlewares
app.use(express.json()); // Middleware para parsear cuerpos JSON
app.use(cors())
// Rutas públicas
app.use('/api/auth', authRoutes); // Rutas de autenticación (sin middleware de autenticación)

// Rutas protegidas (que requieren autenticación)
app.use(authMiddleware); // Middleware de autenticación para las siguientes rutas
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewRoutes);

// Middleware de manejo de errores
app.use(errorHandler); // Middleware para manejar errores

export default app;
