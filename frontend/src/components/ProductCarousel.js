'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button, PriceDisplay, Badge } from './ui';

/**
 * ProductCarousel - Horizontal scrolling product carousel (Amazon-style)
 * Used for displaying products in a category with left/right navigation
 */
export default function ProductCarousel({ title, products, categoryId, badgeText }) {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollAmount = container.clientWidth * 0.8;
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    const { addToCart } = useCart();

    if (!products || products.length === 0) return null;

    return (
        <div className="bg-white p-4 mb-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-amazon-text">{title}</h2>
                    {badgeText && (
                        <Badge variant="danger" size="sm">{badgeText}</Badge>
                    )}
                </div>
                {categoryId && (
                    <Link
                        href={`/?category=${categoryId}`}
                        className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline"
                    >
                        See all offers
                    </Link>
                )}
            </div>

            {/* Carousel Container */}
            <div className="relative group">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-24 
                               bg-white shadow-lg border border-gray-200 rounded-r
                               flex items-center justify-center
                               opacity-0 group-hover:opacity-100 transition-opacity
                               hover:bg-gray-50"
                    aria-label="Scroll left"
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Products Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="flex-shrink-0 w-[180px] group/card"
                        >
                            {/* Product Image */}
                            <div className="aspect-square bg-gray-50 rounded overflow-hidden mb-2">
                                <img
                                    src={product.main_image}
                                    alt={product.name}
                                    className="w-full h-full object-contain group-hover/card:scale-105 transition-transform"
                                />
                            </div>
                            {/* Product Title */}
                            <h3 className="text-sm text-amazon-text line-clamp-2 group-hover/card:text-[#C7511F] mb-1">
                                {product.name}
                            </h3>
                            {/* Price */}
                            <div className="flex items-baseline gap-1">
                                <span className="text-lg font-medium text-amazon-text">
                                    ₹{product.price.toLocaleString()}
                                </span>
                                {product.mrp && product.mrp > product.price && (
                                    <span className="text-xs text-gray-500 line-through">
                                        ₹{product.mrp.toLocaleString()}
                                    </span>
                                )}
                            </div>
                            {/* Prime Badge */}
                            <div className="flex items-center gap-1 mt-1">
                                <span className="bg-[#00A8E1] text-white text-[9px] font-bold px-1 py-[1px] rounded-[2px] italic">
                                    prime
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-24 
                               bg-white shadow-lg border border-gray-200 rounded-l
                               flex items-center justify-center
                               opacity-0 group-hover:opacity-100 transition-opacity
                               hover:bg-gray-50"
                    aria-label="Scroll right"
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
