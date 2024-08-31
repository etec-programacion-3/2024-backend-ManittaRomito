const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

/**
 * @route GET /api/reviews/:productId
 * @desc Obtener todas las reseñas de un producto
 * @access Público
 */
router.get('/:productId', reviewController.getProductReviews);

/**
 * @route POST /api/reviews
 * @desc Crear una nueva reseña
 * @access Privado (Usuario autenticado)
 */
router.post('/', reviewController.createReview);

module.exports = router;

