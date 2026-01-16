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

    // Deterministic random helper based on product ID string
    const getPseudoRandom = (seedString) => {
        let hash = 0;
        for (let i = 0; i < seedString.length; i++) {
            hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
        }
        const x = Math.sin(hash) * 10000;
        return x - Math.floor(x);
    };

    // Calculate dynamic values strictly based on product ID to avoid hydration mismatch
    const randomVal = getPseudoRandom(product.id.toString());

    // Random MRP: Discount between 10% (0.1) and 60% (0.6)
    // If product.mrp exists, use it. Else calculate: price / (1 - discount)
    const discount = 0.1 + (randomVal * 0.5);
    const calculatedMRP = product.mrp || Math.ceil(product.price / (1 - discount));

    // Random Delivery Date
    const getDeliveryDate = () => {
        const daysToAdd = Math.floor(randomVal * 5); // 0 to 4 days
        const date = new Date();
        date.setDate(date.getDate() + daysToAdd + 1); // +1 because minimum is tomorrow

        if (daysToAdd === 0) return "Tomorrow";

        // Format: "Saturday, 18 Jan"
        return date.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'short'
        });
    };

    const deliveryDate = getDeliveryDate();

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
            <div className="bg-amazon-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden h-full flex flex-col border border-gray-200">
                {/* Product Image */}
                <div className="relative aspect-square bg-amazon-white p-4">
                    <img
                        src={product.main_image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                    />

                    {/* Wishlist Button */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <WishlistButton productId={product.id} className="bg-amazon-white shadow-md" />
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
                    <h3 className="text-sm text-amazon-text line-clamp-2 group-hover:text-amazon-link-hover min-h-[40px] leading-tight">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="mt-1.5">
                        <StarRating
                            rating={product.average_rating || 4.2}
                            count={product.review_count || Math.floor(randomVal * 2000) + 50}
                            size="sm"
                        />
                    </div>

                    {/* Price */}
                    <div className="mt-1">
                        <PriceDisplay
                            price={product.price}
                            mrp={calculatedMRP}
                            size="md"
                        />
                    </div>

                    {/* Prime Badge */}
                    <div className="flex items-center gap-1 mt-1 mb-1">
                        <span className="bg-[#00A8E1] text-white text-[10px] font-bold px-1 py-[1px] rounded-[2px] italic leading-none">
                            prime
                        </span>
                        <span className="text-xs text-gray-500">Get it by <span className="font-bold text-gray-700">{deliveryDate}</span></span>
                    </div>

                    {/* Delivery Info */}
                    <p className="text-xs text-gray-500">
                        FREE Delivery by Amazon
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
