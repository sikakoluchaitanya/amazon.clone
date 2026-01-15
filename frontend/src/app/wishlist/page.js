'use client';

import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useState } from 'react';

export default function WishlistPage() {
    const { wishlist, loading, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [movingToCart, setMovingToCart] = useState(null);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleMoveToCart = async (productId) => {
        setMovingToCart(productId);
        const success = await addToCart(productId, 1);
        if (success) {
            await toggleWishlist(productId);
        }
        setMovingToCart(null);
    };

    const handleRemove = async (productId) => {
        await toggleWishlist(productId);
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/4" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-64 bg-gray-200 rounded" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-medium mb-6 flex items-center gap-2">
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                My Wishlist ({wishlist.count} items)
            </h1>

            {wishlist.items.length === 0 ? (
                <div className="bg-amazon-white p-8 rounded-lg shadow text-center">
                    <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h2 className="text-xl font-medium text-amazon-text mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-600 mb-4">Save items you love by clicking the heart icon</p>
                    <Link
                        href="/"
                        className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] px-6 py-2 rounded-full font-medium"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {wishlist.items.map((item) => (
                        <div key={item.id} className="bg-amazon-white rounded-lg shadow-sm overflow-hidden group">
                            <Link href={`/product/${item.product.id}`} className="block">
                                <div className="relative aspect-square bg-amazon-white p-4">
                                    <img
                                        src={item.product.main_image || item.product.images?.[0]?.image_url}
                                        alt={item.product.name}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                                    />
                                    {/* Remove button */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleRemove(item.product.id);
                                        }}
                                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-600"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </Link>

                            <div className="p-4">
                                <Link href={`/product/${item.product.id}`}>
                                    <h3 className="text-sm font-medium text-amazon-text line-clamp-2 hover:text-amazon-link-hover min-h-[40px]">
                                        {item.product.name}
                                    </h3>
                                </Link>

                                <div className="mt-2">
                                    <span className="text-xl font-medium text-gray-900">
                                        {formatPrice(item.product.price)}
                                    </span>
                                </div>

                                <p className={`text-sm mt-1 ${item.product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                </p>

                                <button
                                    onClick={() => handleMoveToCart(item.product.id)}
                                    disabled={movingToCart === item.product.id || item.product.stock_quantity === 0}
                                    className={`mt-3 w-full py-2 rounded-full text-sm font-medium transition-colors
                                        ${item.product.stock_quantity === 0
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900'
                                        }`}
                                >
                                    {movingToCart === item.product.id ? 'Moving...' : 'Move to Cart'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
