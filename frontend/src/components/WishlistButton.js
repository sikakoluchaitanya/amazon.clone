'use client';

import { useState } from 'react';
import { useWishlist } from '@/context/WishlistContext';

export default function WishlistButton({ productId, className = '' }) {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const [isToggling, setIsToggling] = useState(false);

    const inWishlist = isInWishlist(productId);

    const handleToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsToggling(true);
        await toggleWishlist(productId);
        setIsToggling(false);
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isToggling}
            className={`p-2 rounded-full transition-all ${className} ${inWishlist
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-gray-400 hover:text-red-500'
                } ${isToggling ? 'opacity-50' : ''}`}
            title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
            <svg
                className="w-6 h-6"
                fill={inWishlist ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        </button>
    );
}
