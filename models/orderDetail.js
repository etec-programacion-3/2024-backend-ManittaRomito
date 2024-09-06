const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db').connection;

const OrderDetail = sequelize.define('OrderDetail', {
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
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
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'order_details',
    timestamps: false
});

/**
 * Crear un nuevo detalle de orden.
 * @param {Object} orderDetail - Datos del detalle de la orden.
 * @returns {Promise<void>}
 */
const createOrderDetail = async (orderDetail) => {
    await OrderDetail.create(orderDetail);
};

module.exports = { OrderDetail, createOrderDetail };
