module.exports = [
    // Electronics (category_id: 1)
    {
        name: 'Apple iPhone 15 Pro Max',
        description: 'The most powerful iPhone ever with A17 Pro chip, titanium design, and advanced camera system. Features a 6.7-inch Super Retina XDR display with ProMotion technology.',
        price: 134900.00,
        stock_quantity: 50,
        category_id: 1,
        main_image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500',
        rating: 4.8,
        reviews_count: 2456,
        specifications: {
            'Display': '6.7-inch Super Retina XDR',
            'Chip': 'A17 Pro',
            'Storage': '256GB',
            'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
            'Battery': 'Up to 29 hours video playback'
        },
        images: [
            'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
            'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500'
        ]
    },
    {
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Premium Android flagship with S Pen, 200MP camera, and Galaxy AI features. Titanium frame with 6.8-inch Dynamic AMOLED 2X display.',
        price: 129999.00,
        stock_quantity: 35,
        category_id: 1,
        main_image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
        rating: 4.7,
        reviews_count: 1892,
        specifications: {
            'Display': '6.8-inch Dynamic AMOLED 2X',
            'Processor': 'Snapdragon 8 Gen 3',
            'Storage': '256GB',
            'Camera': '200MP Main + 12MP Ultra Wide + 50MP Telephoto',
            'Battery': '5000mAh'
        },
        images: [
            'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
            'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500'
        ]
    },
    {
        name: 'MacBook Pro 14-inch M3 Pro',
        description: 'Supercharged for pros. M3 Pro chip delivers exceptional performance for demanding workflows. Stunning Liquid Retina XDR display.',
        price: 199900.00,
        stock_quantity: 20,
        category_id: 1,
        main_image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=500',
        rating: 4.9,
        reviews_count: 856,
        specifications: {
            'Display': '14.2-inch Liquid Retina XDR',
            'Chip': 'Apple M3 Pro',
            'Memory': '18GB Unified Memory',
            'Storage': '512GB SSD',
            'Battery': 'Up to 17 hours'
        },
        images: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=500',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500'
        ]
    },
    {
        name: 'Sony WH-1000XM5 Headphones',
        description: 'Industry-leading noise cancellation with Auto NC Optimizer. Crystal clear hands-free calling with 8 microphones.',
        price: 29990.00,
        stock_quantity: 100,
        category_id: 1,
        main_image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
        rating: 4.6,
        reviews_count: 3421,
        specifications: {
            'Driver': '30mm',
            'Battery Life': '30 hours',
            'Noise Cancellation': 'Adaptive Sound Control',
            'Connectivity': 'Bluetooth 5.2, 3.5mm',
            'Weight': '250g'
        },
        images: [
            'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
        ]
    },
    {
        name: 'Apple Watch Series 9',
        description: 'Smarter. Brighter. Mightier. With S9 chip, Double Tap gesture, and the brightest Always-On Retina display yet.',
        price: 41900.00,
        stock_quantity: 75,
        category_id: 1,
        main_image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500',
        rating: 4.5,
        reviews_count: 1567,
        specifications: {
            'Display': 'Always-On Retina LTPO OLED',
            'Chip': 'S9 SiP',
            'Storage': '64GB',
            'Water Resistance': '50 meters',
            'Battery': '18 hours'
        },
        images: [
            'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500',
            'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500'
        ]
    },

    // Clothing (category_id: 2)
    {
        name: 'Premium Cotton Slim Fit Shirt',
        description: 'Classic slim fit shirt made from 100% premium cotton. Perfect for office wear or casual outings. Wrinkle-resistant fabric.',
        price: 1499.00,
        stock_quantity: 200,
        category_id: 2,
        main_image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
        rating: 4.3,
        reviews_count: 892,
        specifications: {
            'Material': '100% Premium Cotton',
            'Fit': 'Slim Fit',
            'Care': 'Machine Washable',
            'Collar': 'Spread Collar',
            'Available Sizes': 'S, M, L, XL, XXL'
        },
        images: [
            'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
            'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500'
        ]
    },
    {
        name: 'Levis 501 Original Jeans',
        description: 'The original blue jean since 1873. Straight leg, button fly, and iconic leather patch. Made with sustainable cotton.',
        price: 3999.00,
        stock_quantity: 150,
        category_id: 2,
        main_image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
        rating: 4.6,
        reviews_count: 2341,
        specifications: {
            'Material': '99% Cotton, 1% Elastane',
            'Fit': 'Original Fit',
            'Rise': 'Regular',
            'Fly': 'Button Fly',
            'Available Sizes': '28-40'
        },
        images: [
            'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
            'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500'
        ]
    },
    {
        name: 'Nike Air Max Running Shoes',
        description: 'Legendary Air cushioning with modern comfort. Breathable mesh upper with supportive overlays for a secure fit.',
        price: 8995.00,
        stock_quantity: 80,
        category_id: 2,
        main_image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        rating: 4.7,
        reviews_count: 3156,
        specifications: {
            'Upper': 'Mesh with synthetic overlays',
            'Sole': 'Rubber outsole',
            'Cushioning': 'Air Max unit',
            'Closure': 'Lace-up',
            'Available Sizes': 'UK 6-12'
        },
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
            'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500'
        ]
    },
    {
        name: 'Formal Blazer - Navy Blue',
        description: 'Tailored slim fit blazer perfect for business meetings and formal occasions. Premium wool blend fabric with satin lining.',
        price: 7999.00,
        stock_quantity: 45,
        category_id: 2,
        main_image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500',
        rating: 4.4,
        reviews_count: 567,
        specifications: {
            'Material': '65% Wool, 35% Polyester',
            'Fit': 'Slim Fit',
            'Lining': 'Satin',
            'Buttons': 'Two-button closure',
            'Pockets': 'Flap pockets, chest pocket'
        },
        images: [
            'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500',
            'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500'
        ]
    },

    // Home & Kitchen (category_id: 3)
    {
        name: 'InstantPot Duo 7-in-1 Pressure Cooker',
        description: 'Multi-use programmable pressure cooker, slow cooker, rice cooker, steamer, saute, yogurt maker and warmer. 6 qt capacity.',
        price: 8499.00,
        stock_quantity: 60,
        category_id: 3,
        main_image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
        rating: 4.8,
        reviews_count: 4523,
        specifications: {
            'Capacity': '6 Quart',
            'Functions': '7-in-1',
            'Material': 'Stainless Steel',
            'Wattage': '1000W',
            'Programmable': '13 Smart Programs'
        },
        images: [
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
            'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500'
        ]
    },
    {
        name: 'Dyson V15 Detect Vacuum Cleaner',
        description: 'Reveals hidden dust with laser technology. Powerful suction with intelligent optimization. Up to 60 minutes run time.',
        price: 52900.00,
        stock_quantity: 25,
        category_id: 3,
        main_image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500',
        rating: 4.7,
        reviews_count: 1234,
        specifications: {
            'Motor': 'Dyson Hyperdymium',
            'Run Time': 'Up to 60 minutes',
            'Bin Volume': '0.77L',
            'Weight': '3.1kg',
            'Filtration': 'Whole-machine HEPA'
        },
        images: [
            'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500',
            'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=500'
        ]
    },
    {
        name: 'Philips Air Fryer XXL',
        description: 'Rapid Air Technology for crispy results with 90% less fat. Extra large 7.3L capacity for family-sized meals.',
        price: 16999.00,
        stock_quantity: 40,
        category_id: 3,
        main_image: 'https://images.unsplash.com/photo-1695089028114-ce28248f0ab9?q=80&w=987&auto=format&fit=crop',
        rating: 4.5,
        reviews_count: 2890,
        specifications: {
            'Capacity': '7.3L (1.4kg food)',
            'Technology': 'Rapid Air',
            'Power': '2225W',
            'Temperature': '40-200C',
            'Programs': '5 preset programs'
        },
        images: [
            'https://images.unsplash.com/photo-1648455489916-44c1b3feefe9?w=500',
            'https://images.unsplash.com/photo-1626229076202-03d5e4b4c46a?w=500'
        ]
    },
    {
        name: 'Modern L-Shaped Sectional Sofa',
        description: 'Contemporary design with premium fabric upholstery. Modular configuration with reversible chaise. High-density foam cushions.',
        price: 45999.00,
        stock_quantity: 10,
        category_id: 3,
        main_image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
        rating: 4.4,
        reviews_count: 456,
        specifications: {
            'Material': 'Premium Fabric',
            'Frame': 'Solid Wood',
            'Cushion': 'High-Density Foam',
            'Dimensions': '280cm x 160cm x 85cm',
            'Seating': '5-6 persons'
        },
        images: [
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500'
        ]
    },

    // Books (category_id: 4)
    {
        name: 'Atomic Habits by James Clear',
        description: 'The 1 New York Times bestseller. Tiny changes, remarkable results. An easy and proven way to build good habits and break bad ones.',
        price: 499.00,
        stock_quantity: 500,
        category_id: 4,
        main_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
        rating: 4.9,
        reviews_count: 12456,
        specifications: {
            'Author': 'James Clear',
            'Pages': '320',
            'Publisher': 'Penguin Random House',
            'Language': 'English',
            'Format': 'Paperback'
        },
        images: [
            'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
            'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500'
        ]
    },
    {
        name: 'The Psychology of Money',
        description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel. 19 short stories exploring the strange ways people think about money.',
        price: 399.00,
        stock_quantity: 350,
        category_id: 4,
        main_image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500',
        rating: 4.7,
        reviews_count: 8934,
        specifications: {
            'Author': 'Morgan Housel',
            'Pages': '256',
            'Publisher': 'Harriman House',
            'Language': 'English',
            'Format': 'Paperback'
        },
        images: [
            'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500',
            'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500'
        ]
    },
    {
        name: 'Deep Work by Cal Newport',
        description: 'Rules for Focused Success in a Distracted World. Learn the superpower skill of the 21st century - the ability to focus deeply.',
        price: 450.00,
        stock_quantity: 280,
        category_id: 4,
        main_image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500',
        rating: 4.6,
        reviews_count: 5678,
        specifications: {
            'Author': 'Cal Newport',
            'Pages': '304',
            'Publisher': 'Grand Central Publishing',
            'Language': 'English',
            'Format': 'Paperback'
        },
        images: [
            'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500',
            'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500'
        ]
    },
    {
        name: 'Clean Code by Robert C. Martin',
        description: 'A Handbook of Agile Software Craftsmanship. Essential reading for every software developer who wants to write better code.',
        price: 3499.00,
        stock_quantity: 120,
        category_id: 4,
        main_image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500',
        rating: 4.8,
        reviews_count: 4532,
        specifications: {
            'Author': 'Robert C. Martin',
            'Pages': '464',
            'Publisher': 'Pearson',
            'Language': 'English',
            'Format': 'Paperback'
        },
        images: [
            'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500',
            'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500'
        ]
    },

    // Sports & Outdoors (category_id: 5)
    {
        name: 'Yoga Mat Premium Non-Slip',
        description: 'Extra thick 6mm yoga mat with alignment lines. Non-slip surface, eco-friendly TPE material. Includes carrying strap.',
        price: 1299.00,
        stock_quantity: 200,
        category_id: 5,
        main_image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
        rating: 4.5,
        reviews_count: 2341,
        specifications: {
            'Material': 'TPE (Eco-friendly)',
            'Thickness': '6mm',
            'Dimensions': '183cm x 61cm',
            'Weight': '1kg',
            'Features': 'Alignment lines, carrying strap'
        },
        images: [
            'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500'
        ]
    },
    {
        name: 'Resistance Bands Set (5 Pack)',
        description: 'Complete home workout set with 5 resistance levels. Natural latex bands with handles, ankle straps, and door anchor.',
        price: 999.00,
        stock_quantity: 300,
        category_id: 5,
        main_image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500',
        rating: 4.4,
        reviews_count: 3456,
        specifications: {
            'Material': 'Natural Latex',
            'Resistance Levels': '5 (10-50 lbs)',
            'Includes': 'Handles, ankle straps, door anchor',
            'Use': 'Full body workout',
            'Portable': 'Yes'
        },
        images: [
            'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500',
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500'
        ]
    },
    {
        name: 'Adjustable Dumbbell Set (2-24kg)',
        description: 'Quick-change weight system with 15 weight settings per dumbbell. Space-saving design replaces 15 pairs of dumbbells.',
        price: 24999.00,
        stock_quantity: 30,
        category_id: 5,
        main_image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
        rating: 4.7,
        reviews_count: 892,
        specifications: {
            'Weight Range': '2-24kg per dumbbell',
            'Increments': '15 weight settings',
            'Material': 'Steel with rubber coating',
            'Adjusts': 'In under 5 seconds',
            'Warranty': '2 years'
        },
        images: [
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
            'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500'
        ]
    },
    {
        name: 'Camping Tent 4-Person Waterproof',
        description: 'Easy setup dome tent with rain fly. Waterproof rating 3000mm. Mesh windows for ventilation. Includes storage pockets.',
        price: 4999.00,
        stock_quantity: 50,
        category_id: 5,
        main_image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500',
        rating: 4.5,
        reviews_count: 1234,
        specifications: {
            'Capacity': '4 Person',
            'Waterproof': '3000mm rating',
            'Setup': 'Quick setup (under 10 min)',
            'Dimensions': '240cm x 210cm x 130cm',
            'Weight': '4.5kg'
        },
        images: [
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500',
            'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500'
        ]
    }
];
