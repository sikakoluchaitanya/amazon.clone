require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const sequelize = require('../config');
const { User, Category, Product, ProductImage } = require('../models');
const categoriesData = require('./data/categories');
const productsData = require('./data/products');

const seedDatabase = async () => {
    try {
        console.log('Starting database seeding...');

        // Sync database (recreate tables)
        await sequelize.sync({ force: true });
        console.log('Database tables created.');

        // Create default user
        const defaultUser = await User.create({
            id: 1,
            name: 'Default User',
            email: 'user@amazon-clone.com',
            address: 'Mumbai, India'
        });
        console.log('Default user created:', defaultUser.email);

        // Create categories
        const categories = await Category.bulkCreate(categoriesData);
        console.log(`Created ${categories.length} categories.`);

        // Create products with images
        for (const productData of productsData) {
            const { images, ...productFields } = productData;

            // Create product
            const product = await Product.create(productFields);

            // Create product images
            if (images && images.length > 0) {
                const imageRecords = images.map((url, index) => ({
                    product_id: product.id,
                    image_url: url,
                    display_order: index
                }));
                await ProductImage.bulkCreate(imageRecords);
            }
        }
        console.log(`Created ${productsData.length} products with images.`);

        console.log('Database seeding completed successfully!');
        // Only exit if run directly
        if (require.main === module) {
            process.exit(0);
        }
    } catch (error) {
        console.error('Error seeding database:', error);
        if (require.main === module) {
            process.exit(1);
        } else {
            throw error;
        }
    }
};

// Execute if run directly
if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;
