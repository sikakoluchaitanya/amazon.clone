const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const ProductImage = sequelize.define('ProductImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    image_url: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    display_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'product_images',
    timestamps: false
});

module.exports = ProductImage;
