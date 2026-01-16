'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { productsAPI } from '@/services/api';
import { useCart } from '@/context/CartContext';
import { Button, PriceDisplay, StarRating, Badge } from '@/components/ui';
import WishlistButton from '@/components/WishlistButton';

/**
 * ProductDetail - Pixel-perfect Amazon-style product detail page
 * 3-column layout: Image Gallery | Product Info | Buy Box
 * Includes: Related products, product highlights, specifications
 */
export default function ProductDetail() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productsAPI.getById(params.id);
                setProduct(data);

                // Fetch related products from the same category
                if (data.category?.id) {
                    try {
                        const related = await productsAPI.getAll({
                            category: data.category.id,
                            limit: 8
                        });
                        // Filter out the current product
                        setRelatedProducts(
                            related.products.filter(p => p.id !== data.id).slice(0, 6)
                        );
                    } catch (e) {
                        console.error('Failed to fetch related products');
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [params.id]);

    const handleAddToCart = async () => {
        setIsAdding(true);
        const success = await addToCart(product.id, quantity);
        setIsAdding(false);
        if (success) {
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        }
    };

    const handleBuyNow = async () => {
        setIsAdding(true);
        const success = await addToCart(product.id, quantity);
        setIsAdding(false);
        if (success) {
            router.push('/checkout');
        }
    };

    // Loading skeleton
    if (loading) {
        return (
            <div className="max-w-[1500px] mx-auto px-4 py-6">
                <div className="animate-pulse grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4 aspect-square bg-gray-200 rounded" />
                    <div className="lg:col-span-5 space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                        <div className="h-6 bg-gray-200 rounded w-1/4" />
                        <div className="h-32 bg-gray-200 rounded" />
                    </div>
                    <div className="lg:col-span-3 h-64 bg-gray-200 rounded" />
                </div>
            </div>
        );
    }

    // Error state
    if (error || !product) {
        return (
            <div className="max-w-[1500px] mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
                <a href="/" className="text-[#007185] hover:underline hover:text-[#C7511F]">
                    ← Back to shopping
                </a>
            </div>
        );
    }

    const images = product.images?.length > 0
        ? product.images.map(img => img.image_url)
        : [product.main_image];

    // Product highlights (Amazon-style feature bullets)
    const highlights = [
        { icon: '🚚', text: 'Free Delivery on orders above ₹499' },
        { icon: '↩️', text: '7 Day Replacement Policy' },
        { icon: '💳', text: 'Cash on Delivery available' },
        { icon: '🔒', text: '1 Year Warranty' },
        { icon: '✅', text: 'Amazon Fulfilled' },
    ];

    return (
        <div className="bg-amazon-bg min-h-screen">
            <div className="max-w-[1500px] mx-auto px-4 py-4">
                {/* Breadcrumb */}
                <nav className="text-sm mb-4 text-gray-600 bg-white px-4 py-2 rounded">
                    <a href="/" className="text-[#007185] hover:underline hover:text-[#C7511F]">Home</a>
                    <span className="mx-2">›</span>
                    <a href={`/?category=${product.category?.id}`} className="text-[#007185] hover:underline hover:text-[#C7511F]">
                        {product.category?.name}
                    </a>
                    <span className="mx-2">›</span>
                    <span className="text-gray-500 line-clamp-1">{product.name}</span>
                </nav>

                {/* Main Product Section */}
                <div className="bg-white rounded-lg p-4 lg:p-6 mb-4">
                    {/* Main Grid - Amazon 3-column layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">

                        {/* Column 1: Image Gallery */}
                        <div className="lg:col-span-4">
                            <div className="lg:sticky lg:top-20">
                                <div className="flex gap-3">
                                    {/* Thumbnails - Vertical */}
                                    <div className="flex flex-col gap-2">
                                        {images.map((img, index) => (
                                            <button
                                                key={index}
                                                onMouseEnter={() => setSelectedImage(index)}
                                                onClick={() => setSelectedImage(index)}
                                                className={`w-10 h-10 sm:w-12 sm:h-12 border-2 rounded overflow-hidden transition-all
                                                    ${selectedImage === index
                                                        ? 'border-[#007185] shadow-sm'
                                                        : 'border-gray-200 hover:border-[#007185]'
                                                    }`}
                                            >
                                                <img src={img} alt="" className="w-full h-full object-contain" />
                                            </button>
                                        ))}
                                    </div>

                                    {/* Main Image */}
                                    <div className="flex-1 aspect-square bg-white border rounded-lg p-4 relative">
                                        <img
                                            src={images[selectedImage]}
                                            alt={product.name}
                                            className="w-full h-full object-contain"
                                        />
                                        {/* Wishlist Button */}
                                        <div className="absolute top-2 right-2">
                                            <WishlistButton productId={product.id} className="bg-white shadow-md" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Product Info */}
                        <div className="lg:col-span-5">
                            {/* Title */}
                            <h1 className="text-xl sm:text-2xl font-normal text-[#0F1111] leading-tight mb-2">
                                {product.name}
                            </h1>

                            {/* Brand */}
                            <p className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer mb-2">
                                Visit the {product.category?.name || 'Amazon Clone'} Store
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200">
                                <StarRating
                                    rating={parseFloat(product.rating) || 4.2}
                                    count={product.reviews_count || 1234}
                                    size="md"
                                />
                            </div>

                            {/* Price Section */}
                            <div className="pb-3 mb-3 border-b border-gray-200">
                                <PriceDisplay
                                    price={product.price}
                                    mrp={product.mrp || Math.round(product.price * 1.3)}
                                    size="xl"
                                />
                                <p className="text-xs text-gray-600 mt-1">Inclusive of all taxes</p>

                                {/* EMI Option */}
                                <p className="text-sm text-gray-700 mt-2">
                                    EMI starts at ₹{Math.round(product.price / 12)}/month.
                                    <span className="text-[#007185] cursor-pointer hover:underline"> EMI options</span>
                                </p>
                            </div>

                            {/* Product Highlights */}
                            <div className="mb-4 pb-4 border-b border-gray-200">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {highlights.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm">
                                            <span className="text-lg">{item.icon}</span>
                                            <span className="text-gray-700">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* About this item */}
                            <div className="mb-4">
                                <h3 className="font-bold text-[#0F1111] mb-2">About this item</h3>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Specifications */}
                            {product.specifications && Object.keys(product.specifications).length > 0 && (
                                <div className="mb-4">
                                    <h3 className="font-bold text-[#0F1111] mb-2">Product Details</h3>
                                    <table className="w-full text-sm">
                                        <tbody>
                                            {Object.entries(product.specifications).map(([key, value]) => (
                                                <tr key={key} className="border-b border-gray-100">
                                                    <td className="py-2 text-gray-600 font-medium w-2/5">{key}</td>
                                                    <td className="py-2 text-gray-900">{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* Column 3: Buy Box */}
                        <div className="lg:col-span-3">
                            <div className="lg:sticky lg:top-20 border border-gray-300 rounded-lg p-4 bg-white">
                                {/* Price in Buy Box */}
                                <PriceDisplay
                                    price={product.price}
                                    size="lg"
                                    className="mb-2"
                                />

                                {/* Delivery Info */}
                                <p className="text-sm text-gray-700 mb-1">
                                    FREE delivery <span className="font-bold text-[#0F1111]">Tomorrow, 9 AM - 1 PM</span>
                                </p>
                                <p className="text-sm text-gray-600 mb-3">
                                    Or fastest delivery <span className="font-bold text-[#0F1111]">Today</span>
                                </p>

                                {/* Location */}
                                <div className="flex items-center gap-1 text-sm text-[#007185] mb-3 cursor-pointer hover:text-[#C7511F]">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Deliver to India</span>
                                </div>

                                {/* Stock Status */}
                                <p className={`text-lg font-medium mb-3 ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.stock_quantity > 0
                                        ? product.stock_quantity < 10
                                            ? `Only ${product.stock_quantity} left in stock - order soon.`
                                            : 'In Stock'
                                        : 'Currently unavailable'
                                    }
                                </p>

                                {/* Quantity Selector */}
                                {product.stock_quantity > 0 && (
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-700 mr-2">Qty:</label>
                                        <select
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-[#F0F2F2] hover:bg-[#E3E6E6] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#007185]"
                                        >
                                            {[...Array(Math.min(10, product.stock_quantity))].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Add to Cart Button */}
                                <Button
                                    variant="primary"
                                    fullWidth
                                    loading={isAdding && !added}
                                    disabled={product.stock_quantity === 0}
                                    onClick={handleAddToCart}
                                    className="mb-2 rounded-full"
                                >
                                    {added ? '✓ Added to Cart' : 'Add to Cart'}
                                </Button>

                                {/* Buy Now Button */}
                                <Button
                                    variant="secondary"
                                    fullWidth
                                    disabled={product.stock_quantity === 0}
                                    onClick={handleBuyNow}
                                    className="rounded-full"
                                >
                                    Buy Now
                                </Button>

                                {/* Secure Transaction */}
                                <div className="mt-4 pt-4 border-t border-gray-200 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <span>Secure transaction</span>
                                    </div>

                                    <div className="space-y-1 text-xs text-gray-600">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Ships from</span>
                                            <span>Amazon Clone</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Sold by</span>
                                            <span className="text-[#007185]">Amazon Clone</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Gift option */}
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                        <span>Add gift options</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="bg-white rounded-lg p-4 lg:p-6 mb-4">
                        <h2 className="text-xl font-bold text-amazon-text mb-4">
                            Products related to this item
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {relatedProducts.map((relatedProduct) => (
                                <Link
                                    key={relatedProduct.id}
                                    href={`/product/${relatedProduct.id}`}
                                    className="group"
                                >
                                    <div className="aspect-square bg-gray-50 rounded overflow-hidden mb-2">
                                        <img
                                            src={relatedProduct.main_image}
                                            alt={relatedProduct.name}
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                    <h3 className="text-sm text-amazon-text line-clamp-2 group-hover:text-[#C7511F] mb-1">
                                        {relatedProduct.name}
                                    </h3>
                                    <StarRating rating={4.2} count={100} size="xs" />
                                    <p className="text-lg font-medium text-amazon-text mt-1">
                                        ₹{relatedProduct.price.toLocaleString()}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Customer Reviews Section Placeholder */}
                <div className="bg-white rounded-lg p-4 lg:p-6 mb-4">
                    <h2 className="text-xl font-bold text-amazon-text mb-4">Customer Reviews</h2>
                    <div className="flex items-center gap-6 pb-4 border-b border-gray-200">
                        <div>
                            <div className="flex items-center gap-2">
                                <StarRating rating={parseFloat(product.rating) || 4.2} size="lg" />
                                <span className="text-lg font-medium">{product.rating || '4.2'} out of 5</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                {product.reviews_count || 1234} global ratings
                            </p>
                        </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="py-4 space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => (
                            <div key={stars} className="flex items-center gap-3 text-sm">
                                <span className="text-[#007185] w-16 cursor-pointer hover:underline">{stars} star</span>
                                <div className="flex-1 h-5 bg-gray-200 rounded overflow-hidden">
                                    <div
                                        className="h-full bg-[#FFA41C]"
                                        style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%` }}
                                    />
                                </div>
                                <span className="text-[#007185] w-12 text-right cursor-pointer hover:underline">
                                    {stars === 5 ? '70%' : stars === 4 ? '20%' : stars === 3 ? '5%' : stars === 2 ? '3%' : '2%'}
                                </span>
                            </div>
                        ))}
                    </div>

                    <Button variant="outline" className="mt-4">
                        Write a customer review
                    </Button>
                </div>
            </div>
        </div>
    );
}

