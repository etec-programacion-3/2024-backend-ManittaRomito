const { connection } = require('../config/db');

/**
 * @typedef {Object} Product
 * @property {number} product_id - Identificador único para cada producto.
 * @property {string} nombre - Nombre del producto.
 * @property {string} descripción - Descripción detallada del producto.
 * @property {number} precio - Precio del producto.
 * @property {number} stock - Cantidad disponible en inventario.
 * @property {string} imagen - URL de la imagen del producto.
 * @property {number} category_id - Identificador de la categoría a la que pertenece el producto.
 */

/**
 * Crear un nuevo producto.
 * @param {Product} product - Datos del producto.
 * @returns {Promise<void>}
 */
const createProduct = async (product) => {
    const query = 'INSERT INTO products SET ?';
    await connection.execute(query, [product]);
};

module.exports = { createProduct };
