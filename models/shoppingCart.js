const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db').connection;

const ShoppingCart = sequelize.define('ShoppingCart', {
    cart_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    fecha_creación: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'shopping_carts',
    timestamps: false
});

/**
 * Crear un nuevo carrito de compras.
 * @param {Object} cart - Datos del carrito.
 * @returns {Promise<void>}
 */
const createCart = async (cart) => {
    await ShoppingCart.create(cart);
};

module.exports = { ShoppingCart, createCart };
