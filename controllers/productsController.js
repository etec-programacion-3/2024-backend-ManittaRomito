import { Product } from '../models/index.js';

/**
 * @desc Crear un nuevo producto
 * @route POST /api/products
 * @access Private
 */
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @desc Obtener todos los productos
 * @route GET /api/products
 * @access Public
 */
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @desc Obtener un producto por ID
 * @route GET /api/products/:id
 * @access Public
 */
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @desc Actualizar un producto
 * @route PUT /api/products/:id
 * @access Private
 */
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        await product.update(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @desc Eliminar un producto
 * @route DELETE /api/products/:id
 * @access Private
 */
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        await product.destroy();
        res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
