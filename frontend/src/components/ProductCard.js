'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button, PriceDisplay, StarRating, Badge } from './ui';
import WishlistButton from './WishlistButton';

/**
 * ProductCard - Pixel-perfect Amazon-style product card
 * Uses shared UI components for consistent styling (DRY principle)
 */
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

    return (
        <Link href={`/product/${product.id}`} className="group block">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden h-full flex flex-col border border-gray-200">
                {/* Product Image */}
                <div className="relative aspect-square bg-white p-4">
                    <img
                        src={product.main_image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                    />

                    {/* Wishlist Button */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <WishlistButton productId={product.id} className="bg-white shadow-md" />
                    </div>

                    {/* Stock Warning Badge */}
                    {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                        <Badge variant="danger" size="sm" className="absolute top-2 left-2">
                            Only {product.stock_quantity} left
                        </Badge>
                    )}

                    {/* Out of Stock Badge */}
                    {product.stock_quantity === 0 && (
                        <Badge variant="danger" size="sm" className="absolute top-2 left-2">
                            Out of Stock
                        </Badge>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-3 flex flex-col flex-1">
                    {/* Title - 2 lines max */}
                    <h3 className="text-sm text-gray-900 line-clamp-2 group-hover:text-[#C7511F] min-h-[40px] leading-tight">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="mt-1.5">
                        <StarRating
                            rating={product.average_rating || 4.2}
                            count={product.review_count || Math.floor(Math.random() * 500) + 50}
                            size="sm"
                        />
                    </div>

                    {/* Price */}
                    <div className="mt-2">
                        <PriceDisplay
                            price={product.price}
                            mrp={product.mrp || product.price * 1.2}
                            size="md"
                        />
                    </div>

                    {/* Free Delivery */}
                    <p className="text-xs text-gray-600 mt-1">
                        FREE delivery by <span className="font-medium">Tomorrow</span>
                    </p>

                    {/* Add to Cart Button - Pill shaped */}
                    <div className="mt-auto pt-3">
                        <Button
                            variant="primary"
                            size="pill"
                            fullWidth
                            loading={isAdding}
                            disabled={product.stock_quantity === 0}
                            onClick={handleAddToCart}
                        >
                            {added ? '✓ Added' : product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
