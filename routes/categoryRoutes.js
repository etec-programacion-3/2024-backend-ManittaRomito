/**
 * @file categoryRoutes.js
 * @description Rutas para la gestión de categorías.
 */

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * @route POST /api/categories
 * @description Crear una nueva categoría.
 * @access Público
 * @param {Object} req.body - Datos de la nueva categoría.
 * @returns {Object} - Categoría creada.
 */
router.post('/', categoryController.createCategory);

/**
 * @route GET /api/categories
 * @description Obtener todas las categorías.
 * @access Público
 * @returns {Array} - Lista de categorías.
 */
router.get('/', categoryController.getAllCategories);

/**
 * @route GET /api/categories/:id
 * @description Obtener una categoría por su ID.
 * @access Público
 * @param {string} req.params.id - ID de la categoría.
 * @returns {Object} - Datos de la categoría.
 */
router.get('/:id', categoryController.getCategoryById);

/**
 * @route PUT /api/categories/:id
 * @description Actualizar una categoría existente.
 * @access Público
 * @param {string} req.params.id - ID de la categoría a actualizar.
 * @param {Object} req.body - Nuevos datos de la categoría.
 * @returns {Object} - Categoría actualizada.
 */
router.put('/:id', categoryController.updateCategory);

/**
 * @route DELETE /api/categories/:id
 * @description Eliminar una categoría existente.
 * @access Público
 * @param {string} req.params.id - ID de la categoría a eliminar.
 * @returns {Object} - Mensaje de éxito.
 */
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
