'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ordersAPI } from '@/services/api';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'text-green-600 bg-green-50';
            case 'shipped': return 'text-blue-600 bg-blue-50';
            case 'delivered': return 'text-green-700 bg-green-100';
            case 'cancelled': return 'text-red-600 bg-red-50';
            default: return 'text-yellow-600 bg-yellow-50';
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await ordersAPI.getAll();
                setOrders(data);
            } catch (err) {
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/4" />
                    <div className="h-32 bg-gray-200 rounded" />
                    <div className="h-32 bg-gray-200 rounded" />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-medium mb-6">Your Orders</h1>

            {orders.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow text-center">
                    <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h2 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h2>
                    <p className="text-gray-600 mb-4">Start shopping to see your orders here</p>
                    <Link
                        href="/"
                        className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] px-6 py-2 rounded-full font-medium"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                            {/* Order Header */}
                            <div className="bg-gray-100 px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-600">ORDER PLACED</p>
                                    <p className="font-medium">{formatDate(order.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">TOTAL</p>
                                    <p className="font-medium">{formatPrice(order.total_amount)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">SHIP TO</p>
                                    <p className="font-medium">{order.shipping_name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-600">ORDER # {order.id}</p>
                                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-4">
                                {order.items?.map((item) => (
                                    <div key={item.id} className="flex gap-4 py-4 border-b last:border-b-0">
                                        <Link href={`/product/${item.product?.id}`}>
                                            <img
                                                src={item.product?.main_image}
                                                alt={item.product?.name}
                                                className="w-24 h-24 object-contain"
                                            />
                                        </Link>
                                        <div className="flex-1">
                                            <Link href={`/product/${item.product?.id}`}>
                                                <h3 className="font-medium text-[#007185] hover:text-[#C7511F] hover:underline">
                                                    {item.product?.name}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Qty: {item.quantity} x {formatPrice(item.price_at_purchase)}
                                            </p>
                                            <div className="mt-3">
                                                <Link
                                                    href={`/product/${item.product?.id}`}
                                                    className="text-sm bg-[#FFD814] hover:bg-[#F7CA00] px-4 py-1 rounded-full"
                                                >
                                                    Buy again
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
