/**
 * @file reviewRoutes.js
 * @description Rutas relacionadas con las reseñas de productos.
 */

import express from 'express';
import {
    getProductReviews,
    createReview
} from '../controllers/reviewController.js';

const router = express.Router();

/**
 * @route GET /api/reviews/:productId
 * @description Obtener todas las reseñas de un producto.
 * @access Público
 */
router.get('/:productId', getProductReviews);

/**
 * @route POST /api/reviews
 * @description Crear una nueva reseña.
 * @access Privado (Usuario autenticado)
 */
router.post('/', createReview);

export default router;
