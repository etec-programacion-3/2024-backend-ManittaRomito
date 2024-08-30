const { connection } = require('../config/db');

/**
 * @typedef {Object} CartItem
 * @property {number} cart_id - Identificador del carrito de compras.
 * @property {number} product_id - Identificador del producto.
 * @property {number} cantidad - Cantidad del producto en el carrito.
 */

/**
 * Crear un nuevo item en el carrito de compras.
 * @param {CartItem} cartItem - Datos del item del carrito.
 * @returns {Promise<void>}
 */
const createCartItem = async (cartItem) => {
    const query = 'INSERT INTO cart_items SET ?';
    await connection.execute(query, [cartItem]);
};

module.exports = { createCartItem };
