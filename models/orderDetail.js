const { connection } = require('../config/db');

/**
 * @typedef {Object} OrderDetail
 * @property {number} order_id - Identificador de la orden.
 * @property {number} product_id - Identificador del producto.
 * @property {number} cantidad - Cantidad del producto en la orden.
 * @property {number} precio - Precio del producto al momento de la compra.
 */

/**
 * Crear un nuevo detalle de orden.
 * @param {OrderDetail} orderDetail - Datos del detalle de la orden.
 * @returns {Promise<void>}
 */
const createOrderDetail = async (orderDetail) => {
    const query = 'INSERT INTO order_details SET ?';
    await connection.execute(query, [orderDetail]);
};

module.exports = { createOrderDetail };
