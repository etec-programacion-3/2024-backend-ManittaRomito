// models/index.js

/**
 * @file Centraliza la importación y exportación de todos los modelos de la aplicación.
 * Este archivo permite importar todos los modelos desde un solo punto, facilitando la gestión de dependencias.
 */

import { Product } from './product.js';
import  { CartItem } from './cartItem.js';
import { Category } from './category.js';
import { Order } from './order.js';
import { OrderDetail } from './orderDetail.js';
import { Review } from './review.js';
import { ShoppingCart } from './shoppingCart.js';
import { User } from './users.js';

/**
 * Exporta todos los modelos disponibles en la carpeta `models`.
 * @module models
 * 
 * @property {Model} Product - El modelo de los productos.
 * @property {Model} CartItem - El modelo de los ítems en el carrito.
 * @property {Model} Category - El modelo de las categorías de productos.
 * @property {Model} Order - El modelo de las órdenes de compra.
 * @property {Model} OrderDetail - El modelo de los detalles de las órdenes.
 * @property {Model} Review - El modelo de las reseñas de productos.
 * @property {Model} ShoppingCart - El modelo del carrito de compras.
 * @property {Model} Users - El modelo de los usuarios.
 */
export {
    Product,
    CartItem,
    Category,
    Order,
    OrderDetail,
    Review,
    ShoppingCart,
    User
};
