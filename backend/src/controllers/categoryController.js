const { Category } = require('../models');

// Get all categories
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll({
            order: [['name', 'ASC']]
        });

        res.json(categories);
    } catch (error) {
        next(error);
    }
};

// Get single category by ID
const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.json(category);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCategories,
    getCategoryById
};
