const { connection } = require('../config/db');

/**
 * @typedef {Object} Order
 * @property {number} order_id - Identificador único para cada orden.
 * @property {number} user_id - Identificador del usuario que realizó la orden.
 * @property {Date} fecha - Fecha en que se realizó la orden.
 * @property {string} estado - Estado de la orden (pendiente, completada, cancelada).
 * @property {number} total - Total de la orden.
 */

/**
 * Crear una nueva orden.
 * @param {Order} order - Datos de la orden.
 * @returns {Promise<void>}
 */
const createOrder = async (order) => {
    const query = 'INSERT INTO orders SET ?';
    await connection.execute(query, [order]);
};

module.exports = { createOrder };
