'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '@/services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState({ items: [], summary: { itemCount: 0, subtotal: '0.00', total: '0.00' } });
    const [loading, setLoading] = useState(true);

    const fetchCart = useCallback(async () => {
        try {
            const data = await cartAPI.get();
            setCart(data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addToCart = async (productId, quantity = 1) => {
        try {
            await cartAPI.add(productId, quantity);
            await fetchCart();
            return true;
        } catch (error) {
            console.error('Error adding to cart:', error);
            return false;
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        try {
            await cartAPI.update(itemId, quantity);
            await fetchCart();
            return true;
        } catch (error) {
            console.error('Error updating cart:', error);
            return false;
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await cartAPI.remove(itemId);
            await fetchCart();
            return true;
        } catch (error) {
            console.error('Error removing from cart:', error);
            return false;
        }
    };

    const clearCart = async () => {
        try {
            await cartAPI.clear();
            await fetchCart();
            return true;
        } catch (error) {
            console.error('Error clearing cart:', error);
            return false;
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            refreshCart: fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
