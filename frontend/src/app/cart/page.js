'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useState } from 'react';
import { Button, PriceDisplay } from '@/components/ui';

/**
 * CartPage - Pixel-perfect Amazon-style shopping cart
 * 2-column layout: Cart items | Order summary sidebar
 */
export default function CartPage() {
    const { cart, loading, updateQuantity, removeFromCart } = useCart();
    const [updating, setUpdating] = useState(null);

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        setUpdating(itemId);
        await updateQuantity(itemId, newQuantity);
        setUpdating(null);
    };

    const handleRemove = async (itemId) => {
        setUpdating(itemId);
        await removeFromCart(itemId);
        setUpdating(null);
    };

    // Loading skeleton
    if (loading) {
        return (
            <div className="bg-[#EAEDED] min-h-screen">
                <div className="max-w-[1500px] mx-auto px-4 py-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-10 bg-gray-200 rounded w-1/4" />
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <div className="lg:col-span-3 h-64 bg-gray-200 rounded" />
                            <div className="h-40 bg-gray-200 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#EAEDED] min-h-screen">
            <div className="max-w-[1500px] mx-auto px-4 py-6">

                {cart.items.length === 0 ? (
                    // Empty Cart
                    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                        <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h2 className="text-2xl font-normal text-gray-900 mb-2">Your Amazon Clone Cart is empty</h2>
                        <p className="text-gray-600 mb-4">
                            Your shopping cart is waiting. Give it purpose — fill it with groceries, clothing, electronics, and more.
                        </p>
                        <Link href="/">
                            <Button variant="primary" size="lg">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                        {/* Cart Items - Left Column */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                                <h1 className="text-2xl sm:text-3xl font-normal text-gray-900 pb-4 border-b">
                                    Shopping Cart
                                </h1>

                                {/* Select All / Deselect All */}
                                <div className="py-3 text-sm text-right text-gray-600 border-b">
                                    Price
                                </div>

                                {/* Cart Items */}
                                {cart.items.map((item) => (
                                    <div key={item.id} className="py-4 border-b last:border-b-0">
                                        <div className="flex gap-4">
                                            {/* Product Image */}
                                            <Link href={`/product/${item.product.id}`} className="flex-shrink-0">
                                                <img
                                                    src={item.product.main_image || item.product.images?.[0]?.image_url}
                                                    alt={item.product.name}
                                                    className="w-28 h-28 sm:w-44 sm:h-44 object-contain"
                                                />
                                            </Link>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <Link href={`/product/${item.product.id}`}>
                                                    <h3 className="text-base sm:text-lg font-normal text-[#0F1111] hover:text-[#C7511F] line-clamp-2">
                                                        {item.product.name}
                                                    </h3>
                                                </Link>

                                                {/* Stock Status */}
                                                <p className={`text-xs mt-1 ${item.product.stock_quantity > 0 ? 'text-green-700' : 'text-red-600'}`}>
                                                    {item.product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                                </p>

                                                {/* FREE delivery */}
                                                <p className="text-xs text-gray-600 mt-1">
                                                    FREE delivery <span className="font-medium">Tomorrow</span>
                                                </p>

                                                {/* Actions Row */}
                                                <div className="flex flex-wrap items-center gap-2 mt-3 text-sm">
                                                    {/* Quantity Selector */}
                                                    <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden bg-[#F0F2F2]">
                                                        <button
                                                            onClick={() => item.quantity === 1
                                                                ? handleRemove(item.id)
                                                                : handleUpdateQuantity(item.id, item.quantity - 1)
                                                            }
                                                            disabled={updating === item.id}
                                                            className="px-3 py-1.5 hover:bg-[#E3E6E6] disabled:opacity-50 transition-colors"
                                                        >
                                                            {item.quantity === 1 ? (
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            ) : '−'}
                                                        </button>
                                                        <span className="px-4 py-1.5 border-x border-gray-300 bg-white min-w-[40px] text-center font-medium">
                                                            {updating === item.id ? '...' : item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                            disabled={updating === item.id || item.quantity >= item.product.stock_quantity}
                                                            className="px-3 py-1.5 hover:bg-[#E3E6E6] disabled:opacity-50 transition-colors"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <span className="text-gray-300">|</span>

                                                    {/* Delete Link */}
                                                    <button
                                                        onClick={() => handleRemove(item.id)}
                                                        disabled={updating === item.id}
                                                        className="text-[#007185] hover:text-[#C7511F] hover:underline"
                                                    >
                                                        Delete
                                                    </button>

                                                    <span className="text-gray-300">|</span>

                                                    {/* Save for later */}
                                                    <button className="text-[#007185] hover:text-[#C7511F] hover:underline">
                                                        Save for later
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right flex-shrink-0">
                                                <PriceDisplay
                                                    price={item.product.price}
                                                    size="md"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Subtotal at bottom of cart */}
                                <div className="pt-4 text-right text-lg">
                                    Subtotal ({cart.summary.itemCount} {cart.summary.itemCount === 1 ? 'item' : 'items'}):{' '}
                                    <span className="font-bold">
                                        <PriceDisplay price={cart.summary.subtotal} size="md" className="inline-flex" />
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary - Right Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-4 lg:sticky lg:top-20">
                                {/* Free Delivery Notice */}
                                <div className="text-sm text-green-700 mb-3 flex items-start gap-1">
                                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Your order is eligible for FREE Delivery.</span>
                                </div>

                                {/* Subtotal */}
                                <div className="text-base mb-4">
                                    Subtotal ({cart.summary.itemCount} {cart.summary.itemCount === 1 ? 'item' : 'items'}):{' '}
                                    <span className="font-bold">
                                        <PriceDisplay price={cart.summary.total} size="md" className="inline-flex" />
                                    </span>
                                </div>

                                {/* Proceed to Checkout */}
                                <Link href="/checkout">
                                    <Button variant="primary" fullWidth className="rounded-full">
                                        Proceed to Buy
                                    </Button>
                                </Link>

                                {/* EMI Available */}
                                <div className="mt-4 pt-4 border-t text-xs text-gray-600">
                                    <p>EMI Available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
