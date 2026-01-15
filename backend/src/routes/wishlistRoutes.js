const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// GET /api/wishlist - Get wishlist items
router.get('/', wishlistController.getWishlist);

// POST /api/wishlist - Add to wishlist
router.post('/', wishlistController.addToWishlist);

// POST /api/wishlist/toggle - Toggle wishlist item
router.post('/toggle', wishlistController.toggleWishlist);

// GET /api/wishlist/check/:productId - Check if in wishlist
router.get('/check/:productId', wishlistController.checkInWishlist);

// DELETE /api/wishlist/:productId - Remove from wishlist
router.delete('/:productId', wishlistController.removeFromWishlist);

module.exports = router;
