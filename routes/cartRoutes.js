/**
 * @file shoppingCartRoutes.js
 * @description Rutas relacionadas con el carrito de compras.
 */

import express from 'express';
import { getCart, addToCart, removeFromCart } from '../controllers/shoppingCartController.js';
import { authMiddleware } from '../controllers/authMiddleware.js';

const router = express.Router();

/**
 * @route GET /api/cart
 * @desc Obtiene el carrito de compras del usuario
 * @access Privado
 */
router.get('/', authMiddleware, getCart);

/**
 * @route POST /api/cart
 * @desc Agrega un producto al carrito
 * @access Privado
 */
router.post('/', authMiddleware, addToCart);

/**
 * @route DELETE /api/cart/:id
 * @desc Elimina un producto del carrito
 * @access Privado
 */
router.delete('/:id', authMiddleware, removeFromCart);

export default router;
