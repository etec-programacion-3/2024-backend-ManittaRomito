const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/shoppingCartController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @route GET /api/cart
 * @desc Obtiene el carrito de compras del usuario
 * @access Private
 */
router.get('/', protect, getCart);

/**
 * @route POST /api/cart
 * @desc Agrega un producto al carrito
 * @access Private
 */
router.post('/', protect, addToCart);

/**
 * @route DELETE /api/cart/:id
 * @desc Elimina un producto del carrito
 * @access Private
 */
router.delete('/:id', protect, removeFromCart);

module.exports = router;
