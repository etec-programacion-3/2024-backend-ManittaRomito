import { Sequelize, DataTypes } from 'sequelize';
import { connection as sequelize } from '../config/db.js';

const CartItem = sequelize.define('CartItem', {
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'carts',
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'cart_items',
    timestamps: false
});

/**
 * Crear un nuevo item en el carrito de compras.
 * @param {Object} cartItem - Objeto con los datos del item del carrito.
 * @returns {Promise<void>}
 */
export const createCartItem = async (cartItem) => {
    await CartItem.create(cartItem);
};

export { CartItem };
