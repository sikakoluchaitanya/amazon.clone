const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET /api/categories - Get all categories
router.get('/', categoryController.getAllCategories);

// GET /api/categories/:id - Get single category
router.get('/:id', categoryController.getCategoryById);

module.exports = router;
