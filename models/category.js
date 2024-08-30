const { connection } = require('../config/db');

/**
 * @typedef {Object} Category
 * @property {number} category_id - Identificador único para cada categoría.
 * @property {string} nombre - Nombre de la categoría.
 * @property {string} descripción - Descripción de la categoría.
 */

/**
 * Crear una nueva categoría.
 * @param {Category} category - Datos de la categoría.
 * @returns {Promise<void>}
 */
const createCategory = async (category) => {
    const query = 'INSERT INTO categories SET ?';
    await connection.execute(query, [category]);
};

module.exports = { createCategory };
