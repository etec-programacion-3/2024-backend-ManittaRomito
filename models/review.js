const { connection } = require('../config/db');

/**
 * @typedef {Object} Review
 * @property {number} review_id - Identificador único para cada reseña.
 * @property {number} product_id - Identificador del producto al que pertenece la reseña.
 * @property {number} user_id - Identificador del usuario que escribió la reseña.
 * @property {number} calificación - Calificación del producto (1-5).
 * @property {string} comentario - Comentario del usuario sobre el producto.
 * @property {Date} fecha - Fecha en que se escribió la reseña.
 */

/**
 * Crear una nueva reseña.
 * @param {Review} review - Datos de la reseña.
 * @returns {Promise<void>}
 */
const createReview = async (review) => {
    const query = 'INSERT INTO reviews SET ?';
    await connection.execute(query, [review]);
};

module.exports = { createReview };
