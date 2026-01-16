/**
 * Dynamic Product Seeder - Fetches products from DummyJSON API
 * Creates a rich, cluttered Amazon-like product catalog
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const sequelize = require('../config');
const { User, Category, Product, ProductImage } = require('../models');

const DUMMYJSON_PRODUCTS_URL = 'https://dummyjson.com/products?limit=194';
const DUMMYJSON_CATEGORIES_URL = 'https://dummyjson.com/products/categories';
const USD_TO_INR = 83; // Conversion rate

/**
 * Fetch data from DummyJSON API
 */
const fetchFromAPI = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
    }
    return response.json();
};

/**
 * Map DummyJSON category to a simpler structure
 * Fetches first product from each category to use its thumbnail as category image
 */
const mapCategories = async () => {
    const categoriesData = await fetchFromAPI(DUMMYJSON_CATEGORIES_URL);

    // Create a mapping of slug -> local category id
    const categoryMapping = {};

    // First, clear existing categories and create new ones
    await Category.destroy({ where: {}, truncate: true, cascade: true });

    for (let i = 0; i < categoriesData.length; i++) {
        const cat = categoriesData[i];

        // Fetch first product from this category to get a real image
        let categoryImage = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(cat.name);
        try {
            const categoryProducts = await fetchFromAPI(`https://dummyjson.com/products/category/${cat.slug}?limit=1`);
            if (categoryProducts.products && categoryProducts.products.length > 0) {
                categoryImage = categoryProducts.products[0].thumbnail;
            }
        } catch (e) {
            console.warn(`Could not fetch image for category ${cat.name}, using placeholder`);
        }

        const category = await Category.create({
            name: cat.name,
            description: `Browse our collection of ${cat.name.toLowerCase()}`,
            image_url: categoryImage
        });
        categoryMapping[cat.slug] = category.id;
    }

    console.log(`Created ${Object.keys(categoryMapping).length} categories from DummyJSON.`);
    return categoryMapping;
};

/**
 * Transform DummyJSON product to local schema
 */
const transformProduct = (product, categoryMapping) => {
    // Get category ID from mapping, default to 1 if not found
    const categoryId = categoryMapping[product.category] || 1;

    // Convert USD to INR and round
    const priceINR = Math.round(product.price * USD_TO_INR);

    // Calculate MRP based on discount percentage
    const mrp = product.discountPercentage > 0
        ? Math.round(priceINR / (1 - product.discountPercentage / 100))
        : Math.round(priceINR * 1.2);

    return {
        name: product.title,
        description: product.description,
        price: priceINR,
        mrp: mrp,
        stock_quantity: product.stock || Math.floor(Math.random() * 100) + 10,
        category_id: categoryId,
        main_image: product.thumbnail,
        rating: product.rating || 4.0,
        reviews_count: (product.reviews?.length || 1) * Math.floor(Math.random() * 200) + 50,
        specifications: {
            brand: product.brand || 'Generic',
            sku: product.sku || `SKU-${product.id}`,
            weight: product.weight ? `${product.weight}g` : 'N/A',
            warranty: product.warrantyInformation || '1 Year Warranty',
            shipping: product.shippingInformation || 'Ships in 3-5 business days'
        },
        images: product.images || [product.thumbnail]
    };
};

/**
 * Seed products from DummyJSON
 */
const seedProducts = async (categoryMapping) => {
    const data = await fetchFromAPI(DUMMYJSON_PRODUCTS_URL);
    const products = data.products;

    console.log(`Fetched ${products.length} products from DummyJSON.`);

    // Clear existing products and images
    await ProductImage.destroy({ where: {}, truncate: true });
    await Product.destroy({ where: {}, truncate: true, cascade: true });

    let createdCount = 0;

    for (const productData of products) {
        try {
            const transformed = transformProduct(productData, categoryMapping);
            const { images, ...productFields } = transformed;

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

            createdCount++;
        } catch (error) {
            console.error(`Failed to create product "${productData.title}":`, error.message);
        }
    }

    console.log(`Created ${createdCount} products with images.`);
    return createdCount;
};

/**
 * Ensure default user exists
 */
const ensureDefaultUser = async () => {
    const [user, created] = await User.findOrCreate({
        where: { id: 1 },
        defaults: {
            id: 1,
            name: 'Default User',
            email: 'user@amazon-clone.com',
            address: 'Mumbai, India'
        }
    });

    if (created) {
        console.log('Default user created:', user.email);
    } else {
        console.log('Default user already exists:', user.email);
    }

    return user;
};

/**
 * Main seeding function
 */
const seedDynamicProducts = async (forceReseed = false) => {
    try {
        console.log('Starting dynamic product seeding from DummyJSON...');

        // Sync database schema
        await sequelize.sync({ alter: true });

        // Check if we should skip seeding
        if (!forceReseed) {
            const productCount = await Product.count();
            if (productCount >= 100) {
                console.log(`Database already has ${productCount} products. Skipping seed.`);
                console.log('To reseed, run with --force flag.');
                return;
            }
        }

        console.log('Fetching fresh data from DummyJSON API...');

        // Ensure default user exists
        await ensureDefaultUser();

        // Seed categories first
        const categoryMapping = await mapCategories();

        // Seed products
        const productCount = await seedProducts(categoryMapping);

        console.log('='.repeat(50));
        console.log('✅ Dynamic seeding completed successfully!');
        console.log(`   Categories: ${Object.keys(categoryMapping).length}`);
        console.log(`   Products: ${productCount}`);
        console.log('='.repeat(50));

    } catch (error) {
        console.error('❌ Error during dynamic seeding:', error);
        throw error;
    }
};

// Execute if run directly
if (require.main === module) {
    const forceReseed = process.argv.includes('--force');
    seedDynamicProducts(forceReseed)
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

module.exports = seedDynamicProducts;
