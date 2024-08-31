const express = require('express');
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @route POST /api/orders
 * @desc Crea un nuevo pedido
 * @access Private
 */
router.post('/', protect, createOrder);

/**
 * @route GET /api/orders
 * @desc Obtiene todos los pedidos del usuario
 * @access Private
 */
router.get('/', protect, getOrders);

/**
 * @route PUT /api/orders/:id
 * @desc Actualiza el estado de un pedido
 * @access Admin
 */
router.put('/:id', protect, admin, updateOrderStatus);

module.exports = router;
