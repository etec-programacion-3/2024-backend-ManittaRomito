/**
 * @file productRoutes.js
 * @description Rutas relacionadas con la gestión de productos.
 */

import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productsController.js';
import { authMiddleware } from '../controllers/authMiddleware.js';
import { validateData } from '../controllers/validateData.js';
import { productSchema } from '../controllers/productValidators.js';

const router = express.Router();

/**
 * @route GET /api/products
 * @description Obtener todos los productos.
 * @access Público
 * @returns {Array} - Lista de productos.
 */
router.get('/', getAllProducts);

/**
 * @route GET /api/products/:id
 * @description Obtener un producto por su ID.
 * @access Público
 * @param {string} req.params.id - ID del producto.
 * @returns {Object} - Datos del producto.
 */
router.get('/:id', getProductById);

/**
 * @route POST /api/products
 * @description Crear un nuevo producto.
 * @access Privado (requiere autenticación)
 * @param {Object} req.body - Datos del nuevo producto.
 * @returns {Object} - Producto creado.
 * @middleware authMiddleware, validateData(productSchema)
 */
router.post('/', authMiddleware, validateData(productSchema), createProduct);

/**
 * @route PUT /api/products/:id
 * @description Actualizar un producto existente.
 * @access Privado (requiere autenticación)
 * @param {string} req.params.id - ID del producto a actualizar.
 * @param {Object} req.body - Nuevos datos del producto.
 * @returns {Object} - Producto actualizado.
 * @middleware authMiddleware, validateData(productSchema)
 */
router.put('/:id', authMiddleware, validateData(productSchema), updateProduct);

/**
 * @route DELETE /api/products/:id
 * @description Eliminar un producto existente.
 * @access Privado (requiere autenticación)
 * @param {string} req.params.id - ID del producto a eliminar.
 * @returns {Object} - Mensaje de éxito.
 * @middleware authMiddleware
 */
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
