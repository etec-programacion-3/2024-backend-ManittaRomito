/**
 * @file app.js
 * @description Archivo principal de configuración de la aplicación Express.
 */

const express = require('express');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const { authMiddleware } = require('./middlewares/authMiddleware');
const { validateData } = require('./middlewares/validateData');

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

module.exports = app;
