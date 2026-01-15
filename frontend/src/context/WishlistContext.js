'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { wishlistAPI } from '@/services/api';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState({ items: [], count: 0 });
    const [wishlistIds, setWishlistIds] = useState(new Set());
    const [loading, setLoading] = useState(true);

    const fetchWishlist = useCallback(async () => {
        try {
            const data = await wishlistAPI.get();
            setWishlist(data);
            setWishlistIds(new Set(data.items.map(item => item.product_id)));
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    const toggleWishlist = async (productId) => {
        try {
            const result = await wishlistAPI.toggle(productId);
            await fetchWishlist();
            return result.inWishlist;
        } catch (error) {
            console.error('Error toggling wishlist:', error);
            return null;
        }
    };

    const isInWishlist = (productId) => {
        return wishlistIds.has(productId);
    };

    return (
        <WishlistContext.Provider value={{
            wishlist,
            loading,
            toggleWishlist,
            isInWishlist,
            refreshWishlist: fetchWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
