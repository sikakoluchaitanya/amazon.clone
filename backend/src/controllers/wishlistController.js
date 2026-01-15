const { WishlistItem, Product, ProductImage } = require('../models');

const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || 1;

// Get user's wishlist
const getWishlist = async (req, res, next) => {
    try {
        const wishlistItems = await WishlistItem.findAll({
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

        res.json({
            items: wishlistItems,
            count: wishlistItems.length
        });
    } catch (error) {
        next(error);
    }
};

// Add product to wishlist
const addToWishlist = async (req, res, next) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required' });
        }

        // Check if product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if already in wishlist
        const existing = await WishlistItem.findOne({
            where: { user_id: DEFAULT_USER_ID, product_id: productId }
        });

        if (existing) {
            return res.status(409).json({ error: 'Product already in wishlist' });
        }

        const wishlistItem = await WishlistItem.create({
            user_id: DEFAULT_USER_ID,
            product_id: productId
        });

        res.status(201).json({ message: 'Added to wishlist', wishlistItem });
    } catch (error) {
        next(error);
    }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const wishlistItem = await WishlistItem.findOne({
            where: { user_id: DEFAULT_USER_ID, product_id: productId }
        });

        if (!wishlistItem) {
            return res.status(404).json({ error: 'Product not in wishlist' });
        }

        await wishlistItem.destroy();

        res.json({ message: 'Removed from wishlist' });
    } catch (error) {
        next(error);
    }
};

// Check if product is in wishlist
const checkInWishlist = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const wishlistItem = await WishlistItem.findOne({
            where: { user_id: DEFAULT_USER_ID, product_id: productId }
        });

        res.json({ inWishlist: !!wishlistItem });
    } catch (error) {
        next(error);
    }
};

// Toggle wishlist (add if not present, remove if present)
const toggleWishlist = async (req, res, next) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required' });
        }

        const existing = await WishlistItem.findOne({
            where: { user_id: DEFAULT_USER_ID, product_id: productId }
        });

        if (existing) {
            await existing.destroy();
            res.json({ message: 'Removed from wishlist', inWishlist: false });
        } else {
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            await WishlistItem.create({
                user_id: DEFAULT_USER_ID,
                product_id: productId
            });
            res.json({ message: 'Added to wishlist', inWishlist: true });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    checkInWishlist,
    toggleWishlist
};
