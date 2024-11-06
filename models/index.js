import { Product } from './product.js';
import { CartItem } from './cartItem.js';
import { Category } from './category.js';
import { Order } from './order.js';
import { OrderDetail } from './orderDetail.js';
import { Review } from './review.js';
import { ShoppingCart } from './shoppingCart.js';
import { User } from './users.js';

// Definir asociaciones entre los modelos

// Asociación entre Order y OrderDetail
Order.hasMany(OrderDetail, { 
    foreignKey: 'order_id', 
    as: 'items' 
});

OrderDetail.belongsTo(Order, { 
    foreignKey: 'order_id', 
    as: 'order' 
});

// Asociación entre OrderDetail y Product
OrderDetail.belongsTo(Product, { 
    foreignKey: 'product_id', 
    as: 'product' 
});

Product.hasMany(OrderDetail, { 
    foreignKey: 'product_id', 
    as: 'orderDetails' 
});

// Exportar los modelos con las asociaciones ya definidas
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
