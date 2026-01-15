'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { productsAPI } from '@/services/api';
import { useCart } from '@/context/CartContext';

export default function ProductDetail() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
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

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        for (let i = 0; i < 5; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`w-5 h-5 ${i < fullStars ? 'text-[#FFA41C]' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="aspect-square bg-gray-200 rounded" />
                    <div className="space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                        <div className="h-6 bg-gray-200 rounded w-1/4" />
                        <div className="h-32 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
                <a href="/" className="text-[#007185] hover:underline">Back to shopping</a>
            </div>
        );
    }

    const images = product.images?.length > 0
        ? product.images.map(img => img.image_url)
        : [product.main_image];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="text-sm mb-4">
                <a href="/" className="text-[#007185] hover:underline">Home</a>
                <span className="mx-2 text-gray-400">/</span>
                <a href={`/?category=${product.category?.id}`} className="text-[#007185] hover:underline">
                    {product.category?.name}
                </a>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-600">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Image Gallery */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        {/* Thumbnails */}
                        <div className="flex gap-2 mb-4">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`w-12 h-12 border-2 rounded overflow-hidden ${selectedImage === index ? 'border-[#007185]' : 'border-gray-200'
                                        }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                        {/* Main Image */}
                        <div className="aspect-square bg-white rounded-lg p-4 border">
                            <img
                                src={images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="lg:col-span-1">
                    <h1 className="text-2xl font-medium text-gray-900 mb-2">{product.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex">{renderStars(parseFloat(product.rating) || 4)}</div>
                        <a href="#reviews" className="text-sm text-[#007185] hover:underline">
                            {product.reviews_count?.toLocaleString() || 0} ratings
                        </a>
                    </div>

                    <hr className="my-4" />

                    {/* Price */}
                    <div className="mb-4">
                        <span className="text-sm text-gray-600">Price:</span>
                        <span className="text-3xl font-medium text-[#B12704] ml-2">
                            {formatPrice(product.price)}
                        </span>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="font-bold mb-2">About this item</h3>
                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Specifications */}
                    {product.specifications && Object.keys(product.specifications).length > 0 && (
                        <div className="mb-6">
                            <h3 className="font-bold mb-2">Specifications</h3>
                            <table className="w-full text-sm">
                                <tbody>
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <tr key={key} className="border-b">
                                            <td className="py-2 text-gray-600 font-medium w-1/3">{key}</td>
                                            <td className="py-2 text-gray-900">{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Buy Box */}
                <div className="lg:col-span-1">
                    <div className="bg-white border rounded-lg p-4 sticky top-24">
                        <div className="text-3xl font-medium text-[#B12704] mb-4">
                            {formatPrice(product.price)}
                        </div>

                        <p className="text-sm text-gray-600 mb-2">
                            FREE delivery <span className="font-bold">Tomorrow</span>
                        </p>

                        {/* Stock Status */}
                        <p className={`text-lg mb-4 ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock_quantity > 0
                                ? product.stock_quantity < 10
                                    ? `Only ${product.stock_quantity} left in stock`
                                    : 'In Stock'
                                : 'Out of Stock'
                            }
                        </p>

                        {/* Quantity */}
                        {product.stock_quantity > 0 && (
                            <div className="mb-4">
                                <label className="text-sm text-gray-600 block mb-1">Quantity:</label>
                                <select
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    className="border rounded px-3 py-2 w-20"
                                >
                                    {[...Array(Math.min(10, product.stock_quantity))].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            disabled={isAdding || product.stock_quantity === 0}
                            className={`w-full py-2 rounded-full text-sm font-medium mb-2 transition-colors
                                ${added
                                    ? 'bg-green-500 text-white'
                                    : product.stock_quantity === 0
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900'
                                }`}
                        >
                            {isAdding ? 'Adding...' : added ? 'Added to Cart!' : 'Add to Cart'}
                        </button>

                        {/* Buy Now */}
                        <button
                            onClick={handleBuyNow}
                            disabled={isAdding || product.stock_quantity === 0}
                            className={`w-full py-2 rounded-full text-sm font-medium transition-colors
                                ${product.stock_quantity === 0
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-[#FFA41C] hover:bg-[#FA8900] text-gray-900'
                                }`}
                        >
                            Buy Now
                        </button>

                        {/* Delivery Info */}
                        <div className="mt-4 pt-4 border-t text-sm">
                            <div className="flex gap-2 mb-2">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span className="text-gray-700">Secure transaction</span>
                            </div>
                            <p className="text-gray-600">
                                Sold by <span className="text-[#007185]">Amazon Clone</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
