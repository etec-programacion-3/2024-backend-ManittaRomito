const { connection } = require('../config/db');

/**
 * @typedef {Object} ShoppingCart
 * @property {number} cart_id - Identificador único para cada carrito.
 * @property {number} user_id - Identificador del usuario dueño del carrito.
 * @property {Date} fecha_creación - Fecha en que se creó el carrito.
 */

/**
 * Crear un nuevo carrito de compras.
 * @param {ShoppingCart} cart - Datos del carrito.
 * @returns {Promise<void>}
 */
const createCart = async (cart) => {
    const query = 'INSERT INTO shopping_carts SET ?';
    await connection.execute(query, [cart]);
};

module.exports = { createCart };
