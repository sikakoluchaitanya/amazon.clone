'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [added, setAdded] = useState(false);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAdding(true);
        const success = await addToCart(product.id, 1);
        setIsAdding(false);
        if (success) {
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
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
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <svg key={i} className="w-4 h-4 text-[#FFA41C]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <svg key={i} className="w-4 h-4 text-[#FFA41C]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            }
        }
        return stars;
    };

    return (
        <Link href={`/product/${product.id}`} className="group">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden h-full flex flex-col">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 p-4">
                    <img
                        src={product.main_image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                    {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            Only {product.stock_quantity} left
                        </span>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-[#C7511F] min-h-[40px]">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-1">
                        <div className="flex">{renderStars(parseFloat(product.rating) || 4)}</div>
                        <span className="text-xs text-[#007185]">({product.reviews_count?.toLocaleString() || 0})</span>
                    </div>

                    {/* Price */}
                    <div className="mt-2">
                        <span className="text-xl font-medium text-gray-900">
                            {formatPrice(product.price)}
                        </span>
                    </div>

                    {/* Category */}
                    <p className="text-xs text-gray-500 mt-1">
                        {product.category?.name}
                    </p>

                    {/* Stock Status */}
                    <p className={`text-sm mt-2 ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </p>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding || product.stock_quantity === 0}
                        className={`mt-auto pt-3 w-full py-2 rounded-full text-sm font-medium transition-colors
                            ${added
                                ? 'bg-green-500 text-white'
                                : product.stock_quantity === 0
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900'
                            }`}
                    >
                        {isAdding ? 'Adding...' : added ? 'Added!' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </Link>
    );
}

