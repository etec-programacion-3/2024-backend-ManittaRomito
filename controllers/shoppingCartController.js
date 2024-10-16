import { ShoppingCart, CartItem, Product } from '../models/index.js';

/**
 * @desc Obtiene el carrito de compras del usuario
 * @route GET /api/cart
 * @access Private
 */
export const getCart = async (req, res) => {
    try {
        const cart = await ShoppingCart.findOne({
            where: { userId: req.user.id },
            include: {
                model: CartItem,
                as: 'items',
                include: {
                    model: Product,
                    as: 'product',
                },
            },
        });

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener carrito', error });
    }
};

/**
 * @desc Agrega un producto al carrito
 * @route POST /api/cart
 * @access Private
 */
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        let cart = await ShoppingCart.findOne({ where: { userId: req.user.id } });

        if (!cart) {
            cart = await ShoppingCart.create({ userId: req.user.id });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const [cartItem, created] = await CartItem.findOrCreate({
            where: { shoppingCartId: cart.id, productId },
            defaults: { quantity },
        });

        if (!created) {
            cartItem.quantity += quantity;
            await cartItem.save();
        }

        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar producto al carrito', error });
    }
};

/**
 * @desc Elimina un producto del carrito
 * @route DELETE /api/cart/:id
 * @access Private
 */
export const removeFromCart = async (req, res) => {
    try {
        const cartItem = await CartItem.findOne({
            where: {
                id: req.params.id,
                shoppingCartId: req.user.id,
            },
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }

        await cartItem.destroy();
        res.json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto del carrito', error });
    }
};
