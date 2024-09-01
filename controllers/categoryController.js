const Category = require('../models/category');

/**
 * @desc Crear una nueva categoría
 * @route POST /api/categories
 * @access Private
 */
exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @desc Obtener todas las categorías
 * @route GET /api/categories
 * @access Public
 */
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @desc Obtener una categoría por ID
 * @route GET /api/categories/:id
 * @access Public
 */
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @desc Actualizar una categoría
 * @route PUT /api/categories/:id
 * @access Private
 */
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @desc Eliminar una categoría
 * @route DELETE /api/categories/:id
 * @access Private
 */
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        res.status(200).json({ message: "Categoría eliminada" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
