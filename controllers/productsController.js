const Product = require('../models/product');

/**
 * @desc Crear un nuevo producto
 * @route POST /api/products
 * @access Private
 */
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
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
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
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
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
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
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
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
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
