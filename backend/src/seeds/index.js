require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const sequelize = require('../config');
const { User, Category, Product, ProductImage } = require('../models');
const categoriesData = require('./data/categories');
const productsData = require('./data/products');

const seedDatabase = async () => {
    try {
        console.log('Checking database status...');

        // Check if data already exists
        // We use alter: true to update schema if needed, instead of force: true which wipes it
        await sequelize.sync({ alter: true });

        const productCount = await Product.count();
        if (productCount > 0) {
            console.log('Database already initialized (Products found). Skipping seed.');
            // Only exit if run directly
            if (require.main === module) {
                process.exit(0);
            }
            return;
        }

        console.log('Database is empty. Starting seeding...');

        // Force sync only if we are seeding completely fresh
        // await sequelize.sync({ force: true }); 
        // Note: We already synced with alter: true above. 
        // If we want to be safe for fresh seed, we can clear tables manually or just rely on empty DB.
        // But original logic used force: true. 
        // Let's stick to using data checks. If empty, just insert.

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
