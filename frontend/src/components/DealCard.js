'use client';

import Link from 'next/link';

/**
 * DealCard - Amazon-style 2x2 grid category card with deals
 * Shows 4 products in a grid layout with a category title and link
 */
export default function DealCard({ title, products, categoryId, linkText = "See all deals" }) {
    if (!products || products.length === 0) return null;

    // Take first 4 products for the 2x2 grid
    const gridProducts = products.slice(0, 4);

    return (
        <div className="bg-white p-5 h-full flex flex-col">
            {/* Title */}
            <h3 className="text-lg font-bold text-amazon-text mb-3 leading-tight">
                {title}
            </h3>

            {/* 2x2 Product Grid */}
            <div className="grid grid-cols-2 gap-3 flex-1">
                {gridProducts.map((product) => (
                    <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="group"
                    >
                        <div className="aspect-square bg-gray-50 rounded overflow-hidden mb-1">
                            <img
                                src={product.main_image}
                                alt={product.name}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                            />
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-1 group-hover:text-[#C7511F]">
                            {product.name}
                        </p>
                    </Link>
                ))}
            </div>

            {/* See All Link */}
            <Link
                href={`/?category=${categoryId}`}
                className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline mt-3"
            >
                {linkText}
            </Link>
        </div>
    );
}
