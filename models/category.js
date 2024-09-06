const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db').connection;

const Category = sequelize.define('Category', {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripción: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'categories',
    timestamps: false
});

/**
 * Crear una nueva categoría.
 * @param {Object} category - Datos de la categoría.
 * @returns {Promise<void>}
 */
const createCategory = async (category) => {
    await Category.create(category);
};

module.exports = { Category, createCategory };

