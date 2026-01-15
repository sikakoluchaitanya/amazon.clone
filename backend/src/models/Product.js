const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        }
    },
    main_image: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    specifications: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {}
    },
    rating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: true,
        defaultValue: 4.0,
        validate: {
            min: 0,
            max: 5
        }
    },
    reviews_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Product;
