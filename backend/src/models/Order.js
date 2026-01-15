const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    shipping_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    shipping_address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    shipping_city: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    shipping_pincode: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    shipping_phone: {
        type: DataTypes.STRING(15),
        allowNull: false
    }
}, {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Order;
