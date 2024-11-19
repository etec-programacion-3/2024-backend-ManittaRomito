/**
 * @file productRoutes.js
 * @description Rutas relacionadas con la gestión de productos.
 */

import express from 'express';
import { createProduct, updateProduct, deleteProduct } from '../controllers/productsController.js';
import { authMiddleware } from '../controllers/authMiddleware.js';

const router = express.Router();

// Rutas que requieren autenticación
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
