const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const ProductImage = require('./ProductImage');
const CartItem = require('./CartItem');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const WishlistItem = require('./WishlistItem');

// Category - Product relationship (One-to-Many)
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// Product - ProductImage relationship (One-to-Many)
Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// User - CartItem relationship (One-to-Many)
User.hasMany(CartItem, { foreignKey: 'user_id', as: 'cartItems' });
CartItem.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Product - CartItem relationship (One-to-Many)
Product.hasMany(CartItem, { foreignKey: 'product_id', as: 'cartItems' });
CartItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// User - Order relationship (One-to-Many)
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Order - OrderItem relationship (One-to-Many)
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

// Product - OrderItem relationship (One-to-Many)
Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'orderItems' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// User - WishlistItem relationship (One-to-Many)
User.hasMany(WishlistItem, { foreignKey: 'user_id', as: 'wishlistItems' });
WishlistItem.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Product - WishlistItem relationship (One-to-Many)
Product.hasMany(WishlistItem, { foreignKey: 'product_id', as: 'wishlistItems' });
WishlistItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

module.exports = {
    User,
    Category,
    Product,
    ProductImage,
    CartItem,
    Order,
    OrderItem,
    WishlistItem
};
