import { Review, Product, User } from '../models';

/**
 * @desc Crea una nueva reseña para un producto
 * @route POST /api/reviews
 * @access Private
 */
export const createReview = async (req, res) => {
    const { productId, comment, rating } = req.body;

    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const review = await Review.create({
            userId: req.user.id,
            productId,
            comment,
            rating,
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc Obtiene todas las reseñas de un producto
 * @route GET /api/reviews/:productId
 * @access Public
 */
export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { productId: req.params.productId },
            include: {
                model: User,
                as: 'user',
            },
        });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc Elimina una reseña
 * @route DELETE /api/reviews/:id
 * @access Private
 */
export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }

        if (review.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'No autorizado' });
        }

        await review.destroy();
        res.json({ message: 'Reseña eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
