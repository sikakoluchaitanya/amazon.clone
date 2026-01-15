'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ordersAPI } from '@/services/api';

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, loading: cartLoading, refreshCart } = useCart();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        shippingName: '',
        shippingAddress: '',
        shippingCity: '',
        shippingPincode: '',
        shippingPhone: ''
    });

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const result = await ordersAPI.create(formData);
            await refreshCart();
            router.push(`/order-confirmation?orderId=${result.orderId}`);
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    };

    if (cartLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/4" />
                    <div className="h-64 bg-gray-200 rounded" />
                </div>
            </div>
        );
    }

    if (cart.items.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <a href="/" className="text-[#007185] hover:underline">Continue shopping</a>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-medium mb-6">Checkout</h1>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Shipping Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                            <span className="bg-[#232F3E] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                            Shipping Address
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="shippingName"
                                        value={formData.shippingName}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#F3A847] focus:border-transparent"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Address</label>
                                    <textarea
                                        name="shippingAddress"
                                        value={formData.shippingAddress}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#F3A847] focus:border-transparent"
                                        placeholder="Street address, apartment, building, floor, etc."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">City</label>
                                    <input
                                        type="text"
                                        name="shippingCity"
                                        value={formData.shippingCity}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#F3A847] focus:border-transparent"
                                        placeholder="Mumbai"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">PIN Code</label>
                                    <input
                                        type="text"
                                        name="shippingPincode"
                                        value={formData.shippingPincode}
                                        onChange={handleChange}
                                        required
                                        pattern="[0-9]{6}"
                                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#F3A847] focus:border-transparent"
                                        placeholder="400001"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="shippingPhone"
                                        value={formData.shippingPhone}
                                        onChange={handleChange}
                                        required
                                        pattern="[0-9]{10}"
                                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#F3A847] focus:border-transparent"
                                        placeholder="9876543210"
                                    />
                                </div>
                            </div>

                            <hr className="my-6" />

                            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                                <span className="bg-[#232F3E] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                                Review Items
                            </h2>

                            <div className="space-y-4">
                                {cart.items.map((item) => (
                                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                                        <img
                                            src={item.product.main_image || item.product.images?.[0]?.image_url}
                                            alt={item.product.name}
                                            className="w-16 h-16 object-contain"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">{item.product.name}</p>
                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="font-bold">
                                            {formatPrice(item.product.price * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full mt-6 bg-[#FFD814] hover:bg-[#F7CA00] py-3 rounded-full font-medium disabled:opacity-50"
                            >
                                {submitting ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow p-4 sticky top-24">
                        <h2 className="font-bold mb-4">Order Summary</h2>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Items ({cart.summary.itemCount}):</span>
                                <span>{formatPrice(cart.summary.subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span className="text-green-600">FREE</span>
                            </div>
                        </div>

                        <hr className="my-4" />

                        <div className="flex justify-between text-lg font-bold text-[#B12704]">
                            <span>Order Total:</span>
                            <span>{formatPrice(cart.summary.total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
