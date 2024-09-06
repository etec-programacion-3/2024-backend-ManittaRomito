const { Order, OrderDetail, Product } = require('../models');

/**
 * @desc Crea un nuevo pedido
 * @route POST /api/orders
 * @access Private
 */
exports.createOrder = async (req, res) => {
    const { items, totalPrice } = req.body;

    try {
        // Crear el pedido
        const order = await Order.create({
            userId: req.user.id,
            totalPrice,
        });

        // Crear los detalles del pedido
        const orderItems = await Promise.all(items.map(async (item) => {
            const product = await Product.findByPk(item.productId);
            if (!product) {
                throw new Error(`Producto con ID ${item.productId} no encontrado`);
            }
            return await OrderDetail.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
            });
        }));

        res.status(201).json({ order, items: orderItems });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc Obtiene todos los pedidos de un usuario
 * @route GET /api/orders
 * @access Private
 */
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: {
                model: OrderDetail,
                as: 'items',
                include: {
                    model: Product,
                    as: 'product',
                },
            },
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc Actualiza el estado de un pedido
 * @route PUT /api/orders/:id
 * @access Admin
 */
exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        order.status = status;
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
