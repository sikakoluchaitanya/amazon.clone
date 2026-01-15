const { Op } = require('sequelize');
const { Product, Category, ProductImage } = require('../models');

// Get all products with filters and search
const getAllProducts = async (req, res, next) => {
    try {
        const { search, category, page = 1, limit = 15 } = req.query;
        const offset = (page - 1) * limit;

        // Build filter conditions
        const where = {};

        if (search) {
            where[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } }
            ];
        }

        if (category) {
            where.category_id = category;
        }

        const { count, rows: products } = await Product.findAndCountAll({
            where,
            include: [
                { model: Category, as: 'category', attributes: ['id', 'name'] },
                { model: ProductImage, as: 'images', attributes: ['id', 'image_url', 'display_order'] }
            ],
            order: [['created_at', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset),
            distinct: true  // Fix: Prevent double-counting from image joins
        });

        res.json({
            products,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit),
                totalItems: count,
                itemsPerPage: parseInt(limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get single product by ID
const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id, {
            include: [
                { model: Category, as: 'category', attributes: ['id', 'name'] },
                {
                    model: ProductImage,
                    as: 'images',
                    attributes: ['id', 'image_url', 'display_order'],
                    order: [['display_order', 'ASC']]
                }
            ]
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    getProductById
};
