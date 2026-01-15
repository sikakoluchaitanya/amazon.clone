const { CartItem, Product, ProductImage } = require('../models');

// Default user ID (for development)
const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || 1;

// Get cart items for current user
const getCart = async (req, res, next) => {
    try {
        const cartItems = await CartItem.findAll({
            where: { user_id: DEFAULT_USER_ID },
            include: [
                {
                    model: Product,
                    as: 'product',
                    include: [
                        { model: ProductImage, as: 'images', attributes: ['image_url'], limit: 1 }
                    ]
                }
            ],
            order: [['created_at', 'DESC']]
        });

        // Calculate totals
        const subtotal = cartItems.reduce((sum, item) => {
            return sum + (parseFloat(item.product.price) * item.quantity);
        }, 0);

        res.json({
            items: cartItems,
            summary: {
                itemCount: cartItems.length,
                subtotal: subtotal.toFixed(2),
                total: subtotal.toFixed(2)
            }
        });
    } catch (error) {
        next(error);
    }
};

// Add item to cart
const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity = 1 } = req.body;

        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required' });
        }

        // Check if product exists and has stock
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.stock_quantity < quantity) {
            return res.status(400).json({ error: 'Insufficient stock' });
        }

        // Check if item already in cart
        let cartItem = await CartItem.findOne({
            where: { user_id: DEFAULT_USER_ID, product_id: productId }
        });

        if (cartItem) {
            // Update quantity
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Create new cart item
            cartItem = await CartItem.create({
                user_id: DEFAULT_USER_ID,
                product_id: productId,
                quantity
            });
        }

        res.status(201).json({ message: 'Item added to cart', cartItem });
    } catch (error) {
        next(error);
    }
};

// Update cart item quantity
const updateCartItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ error: 'Valid quantity is required' });
        }

        const cartItem = await CartItem.findOne({
            where: { id, user_id: DEFAULT_USER_ID }
        });

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        // Check stock
        const product = await Product.findByPk(cartItem.product_id);
        if (product.stock_quantity < quantity) {
            return res.status(400).json({ error: 'Insufficient stock' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.json({ message: 'Cart updated', cartItem });
    } catch (error) {
        next(error);
    }
};

// Remove item from cart
const removeFromCart = async (req, res, next) => {
    try {
        const { id } = req.params;

        const cartItem = await CartItem.findOne({
            where: { id, user_id: DEFAULT_USER_ID }
        });

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        await cartItem.destroy();

        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        next(error);
    }
};

// Clear entire cart
const clearCart = async (req, res, next) => {
    try {
        await CartItem.destroy({
            where: { user_id: DEFAULT_USER_ID }
        });

        res.json({ message: 'Cart cleared' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};
