import { Order, OrderDetail } from '../models/index.js';

/**
 * @desc Crea un nuevo pedido
 * @route POST /api/orders
 * @access Private
 */
export const createOrder = async (req, res) => {
    const { items, totalPrice } = req.body;

    try {
        const order = await Order.create({
            userId: req.user.id,
            totalPrice,
        });

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
export const getOrders = async (req, res) => {
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
export const updateOrderStatus = async (req, res) => {
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

/**
 * @desc Elimina un pedido
 * @route DELETE /api/orders/:id
 * @access Admin
 */
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        await order.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc Obtiene un pedido por ID
 * @route GET /api/orders/:id
 * @access Private
 */
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: {
                model: OrderDetail,
                as: 'items',
                include: {
                    model: Product,
                    as: 'product',
                },
            },
        });

        if (!order) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
