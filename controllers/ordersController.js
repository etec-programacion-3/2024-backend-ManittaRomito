import { order, orderDetail } from '../models/index.js';

/**
 * @desc Crea un nuevo pedido
 * @route POST /api/orders
 * @access Private
 */
export const createorder = async (req, res) => {
    const { items, totalPrice } = req.body;

    try {
        const order = await order.create({
            user_id: req.user.id,
            precio,
        });

        const orderItems = await Promise.all(items.map(async (item) => {
            const product = await product.findByPk(item.productId);
            if (!product) {
                throw new Error(`producto con ID ${item.productId} no encontrado`);
            }
            return await orderDetail.create({
                order_id: order.id,
                product_id: item.productId,
                cantidad: item.quantity,
                precio: product.price,
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
export const getorders = async (req, res) => {
    try {
        const orders = await order.findAll({
            where: { user_id: req.user.id },
            include: {
                model: orderDetail,
                as: 'items',
                include: {
                    model: products,
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
export const updateorderStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const order = await order.findByPk(req.params.id);
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
export const deleteorder = async (req, res) => {
    try {
        const order = await order.findByPk(req.params.id);
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
export const getorderById = async (req, res) => {
    try {
        const order = await order.findByPk(req.params.id, {
            include: {
                model: orderDetail,
                as: 'items',
                include: {
                    model: products,
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
