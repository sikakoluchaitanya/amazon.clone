const sequelize = require('../config');
const { Order, OrderItem, CartItem, Product, ProductImage } = require('../models');
const { sendOrderConfirmation } = require('../services/emailService');

// Default user ID (for development)
const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || 1;

// Place a new order
const createOrder = async (req, res, next) => {
    const transaction = await sequelize.transaction();

    try {
        const { shippingName, shippingAddress, shippingCity, shippingPincode, shippingPhone, email } = req.body;

        // Validate required fields
        if (!shippingName || !shippingAddress || !shippingCity || !shippingPincode || !shippingPhone) {
            return res.status(400).json({ error: 'All shipping fields are required' });
        }

        // Get cart items
        const cartItems = await CartItem.findAll({
            where: { user_id: DEFAULT_USER_ID },
            include: [{ model: Product, as: 'product' }]
        });

        if (cartItems.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        // Validate stock and calculate total
        let totalAmount = 0;
        for (const item of cartItems) {
            if (item.product.stock_quantity < item.quantity) {
                await transaction.rollback();
                return res.status(400).json({
                    error: `Insufficient stock for ${item.product.name}`
                });
            }
            totalAmount += parseFloat(item.product.price) * item.quantity;
        }

        // Create order
        const order = await Order.create({
            user_id: DEFAULT_USER_ID,
            status: 'confirmed',
            total_amount: totalAmount,
            shipping_name: shippingName,
            shipping_address: shippingAddress,
            shipping_city: shippingCity,
            shipping_pincode: shippingPincode,
            shipping_phone: shippingPhone
        }, { transaction });

        // Create order items and update stock
        for (const item of cartItems) {
            await OrderItem.create({
                order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity,
                price_at_purchase: item.product.price
            }, { transaction });

            // Reduce stock
            await Product.update(
                { stock_quantity: item.product.stock_quantity - item.quantity },
                { where: { id: item.product_id }, transaction }
            );
        }

        // Clear cart
        await CartItem.destroy({
            where: { user_id: DEFAULT_USER_ID },
            transaction
        });

        await transaction.commit();

        res.status(201).json({
            message: 'Order placed successfully',
            orderId: order.id,
            totalAmount: order.total_amount
        });

        // Send confirmation email asynchronously (if email provided from authenticated user)
        if (email) {
            const orderForEmail = {
                id: order.id,
                user_email: email, // Use email from authenticated user
                total_amount: totalAmount,
                created_at: order.created_at,
                details: {
                    items: cartItems.map(item => ({
                        name: item.product.name,
                        quantity: item.quantity,
                        price: item.product.price
                    })),
                    shippingAddress: {
                        name: shippingName,
                        address: shippingAddress,
                        city: shippingCity,
                        pincode: shippingPincode
                    }
                }
            };

            sendOrderConfirmation(orderForEmail).catch(err =>
                console.error('Failed to send order confirmation email:', err)
            );
        }
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

// Get all orders for current user
const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            where: { user_id: DEFAULT_USER_ID },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                            attributes: ['id', 'name', 'main_image']
                        }
                    ]
                }
            ],
            order: [['created_at', 'DESC']]
        });

        res.json(orders);
    } catch (error) {
        next(error);
    }
};

// Get single order by ID
const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const order = await Order.findOne({
            where: { id, user_id: DEFAULT_USER_ID },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                            attributes: ['id', 'name', 'main_image', 'description']
                        }
                    ]
                }
            ]
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById
};
