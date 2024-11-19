/**
 * @file app.js
 * @description Configuración de la aplicación y rutas principales.
 */

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import { errorHandler } from './controllers/errorHandler.js';
import { authMiddleware } from './controllers/authMiddleware.js';
import { getAllProducts } from './controllers/productsController.js';

const app = express();

// Conexión a la base de datos
connectDB();

// Middlewares globales
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rutas públicas
app.use('/api/auth', authRoutes);

// Ruta GET de productos (pública)
app.get('/api/products', getAllProducts);

// Middleware de autenticación para rutas protegidas
app.use(authMiddleware);

// Rutas protegidas
app.post('/api/products', productRoutes);
app.put('/api/products/:id', productRoutes);
app.delete('/api/products/:id', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
