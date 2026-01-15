'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
    const { cart, loading, updateQuantity, removeFromCart } = useCart();
    const [updating, setUpdating] = useState(null);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

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

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/4" />
                    <div className="h-32 bg-gray-200 rounded" />
                    <div className="h-32 bg-gray-200 rounded" />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-medium mb-6">Shopping Cart</h1>

            {cart.items.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow text-center">
                    <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-4">Add some items to get started</p>
                    <Link
                        href="/"
                        className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] px-6 py-2 rounded-full font-medium"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-4 border-b">
                                <span className="text-right text-sm text-gray-600 block">Price</span>
                            </div>

                            {cart.items.map((item) => (
                                <div key={item.id} className="p-4 border-b last:border-b-0 flex gap-4">
                                    {/* Product Image */}
                                    <Link href={`/product/${item.product.id}`} className="flex-shrink-0">
                                        <img
                                            src={item.product.main_image || item.product.images?.[0]?.image_url}
                                            alt={item.product.name}
                                            className="w-24 h-24 md:w-32 md:h-32 object-contain"
                                        />
                                    </Link>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <Link href={`/product/${item.product.id}`}>
                                            <h3 className="text-lg font-medium text-gray-900 hover:text-[#C7511F]">
                                                {item.product.name}
                                            </h3>
                                        </Link>

                                        <p className={`text-sm ${item.product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {item.product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                        </p>

                                        <div className="flex items-center gap-4 mt-2">
                                            {/* Quantity Selector */}
                                            <div className="flex items-center border rounded">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                    disabled={updating === item.id || item.quantity <= 1}
                                                    className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                                                >
                                                    -
                                                </button>
                                                <span className="px-3 py-1 border-x">
                                                    {updating === item.id ? '...' : item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                    disabled={updating === item.id || item.quantity >= item.product.stock_quantity}
                                                    className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <span className="text-gray-400">|</span>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                disabled={updating === item.id}
                                                className="text-[#007185] hover:underline text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right">
                                        <span className="text-lg font-bold">
                                            {formatPrice(item.product.price)}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {/* Subtotal */}
                            <div className="p-4 text-right">
                                <span className="text-lg">
                                    Subtotal ({cart.summary.itemCount} items):{' '}
                                    <span className="font-bold">{formatPrice(cart.summary.subtotal)}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow p-4 sticky top-24">
                            <div className="mb-4 pb-4 border-b">
                                <span className="text-green-600 flex items-center gap-1 text-sm">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Your order is eligible for FREE Delivery
                                </span>
                            </div>

                            <div className="text-lg mb-4">
                                Subtotal ({cart.summary.itemCount} items):{' '}
                                <span className="font-bold">{formatPrice(cart.summary.total)}</span>
                            </div>

                            <Link
                                href="/checkout"
                                className="block w-full bg-[#FFD814] hover:bg-[#F7CA00] text-center py-2 rounded-full font-medium"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
