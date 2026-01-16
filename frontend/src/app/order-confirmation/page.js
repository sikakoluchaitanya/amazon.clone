'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { ordersAPI } from '@/services/api';

// Separate component that uses useSearchParams
function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    useEffect(() => {
        const fetchOrder = async () => {
            if (orderId) {
                try {
                    const data = await ordersAPI.getById(orderId);
                    setOrder(data);
                } catch (err) {
                    console.error('Error fetching order:', err);
                }
            }
            setLoading(false);
        };
        fetchOrder();
    }, [orderId]);

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/2" />
                    <div className="h-32 bg-gray-200 rounded" />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow p-8 text-center">
                {/* Success Icon */}
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-2xl font-medium text-gray-900 mb-2">
                    Order Placed Successfully!
                </h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your order. We'll send a confirmation email shortly.
                </p>

                {orderId && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="text-xl font-bold text-[#007185]">#{orderId}</p>
                    </div>
                )}

                {order && (
                    <div className="text-left border-t pt-6">
                        <h2 className="font-bold mb-4">Order Details</h2>

                        <div className="space-y-4 mb-6">
                            {order.items?.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <img
                                        src={item.product?.main_image}
                                        alt={item.product?.name}
                                        className="w-16 h-16 object-contain"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium">{item.product?.name}</p>
                                        <p className="text-sm text-gray-600">
                                            Qty: {item.quantity} x {formatPrice(item.price_at_purchase)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <h3 className="font-medium mb-2">Shipping Address</h3>
                            <p className="text-gray-700">
                                {order.shipping_name}<br />
                                {order.shipping_address}<br />
                                {order.shipping_city}, {order.shipping_pincode}<br />
                                Phone: {order.shipping_phone}
                            </p>
                        </div>

                        <div className="flex justify-between text-lg font-bold border-t pt-4">
                            <span>Total Paid:</span>
                            <span className="text-[#B12704]">{formatPrice(order.total_amount)}</span>
                        </div>
                    </div>
                )}

                <div className="flex gap-4 justify-center mt-8">
                    <Link
                        href="/orders"
                        className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50"
                    >
                        View Orders
                    </Link>
                    <Link
                        href="/"
                        className="px-6 py-2 bg-[#FFD814] hover:bg-[#F7CA00] rounded-full font-medium"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Loading fallback for Suspense
function OrderConfirmationLoading() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto" />
                <div className="h-32 bg-gray-200 rounded" />
            </div>
        </div>
    );
}

// Main page component with Suspense boundary
export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={<OrderConfirmationLoading />}>
            <OrderConfirmationContent />
        </Suspense>
    );
}

