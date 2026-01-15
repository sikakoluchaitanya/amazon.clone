'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const { cart } = useCart();
    const { wishlist } = useWishlist();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header className="bg-[#131921] text-white sticky top-0 z-50">
            {/* Main Header */}
            <div className="flex items-center px-4 py-2 gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center flex-shrink-0 hover:border hover:border-white p-1 rounded">
                    <span className="text-2xl font-bold text-white">
                        amazon<span className="text-[#FF9900]">.clone</span>
                    </span>
                </Link>

                {/* Deliver to */}
                <div className="hidden md:flex flex-col text-xs hover:border hover:border-white p-1 rounded cursor-pointer">
                    <span className="text-gray-300">Deliver to</span>
                    <span className="font-bold flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        India
                    </span>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 flex">
                    <div className="flex w-full max-w-3xl mx-auto">
                        <select className="bg-gray-100 text-gray-700 text-sm px-2 rounded-l-md border-r border-gray-300 focus:outline-none hidden sm:block">
                            <option>All</option>
                        </select>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Amazon.clone"
                            className="flex-1 px-4 py-2 text-gray-900 focus:outline-none min-w-0"
                        />
                        <button
                            type="submit"
                            className="bg-[#FEBD69] hover:bg-[#F3A847] px-4 py-2 rounded-r-md"
                        >
                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </form>

                {/* Account */}
                <div className="hidden md:flex flex-col text-xs hover:border hover:border-white p-1 rounded cursor-pointer">
                    <span className="text-gray-300">Hello, User</span>
                    <span className="font-bold">Account & Lists</span>
                </div>

                {/* Orders */}
                <Link href="/orders" className="hidden md:flex flex-col text-xs hover:border hover:border-white p-1 rounded">
                    <span className="text-gray-300">Returns</span>
                    <span className="font-bold">& Orders</span>
                </Link>

                {/* Wishlist */}
                <Link href="/wishlist" className="hidden md:flex items-center hover:border hover:border-white p-1 rounded relative">
                    <div className="relative">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {wishlist.count > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                {wishlist.count}
                            </span>
                        )}
                    </div>
                </Link>

                {/* Cart */}
                <Link href="/cart" className="flex items-center hover:border hover:border-white p-1 rounded relative">
                    <div className="relative">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 bg-[#F08804] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {cart.summary?.itemCount || 0}
                        </span>
                    </div>
                    <span className="hidden sm:inline font-bold ml-1">Cart</span>
                </Link>
            </div>

            {/* Sub Header - Categories */}
            <div className="bg-[#232F3E] px-4 py-2 flex items-center gap-4 text-sm overflow-x-auto">
                <button className="flex items-center gap-1 font-bold hover:border hover:border-white px-2 py-1 rounded whitespace-nowrap">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    All
                </button>
                <Link href="/?category=1" className="hover:border hover:border-white px-2 py-1 rounded whitespace-nowrap">Electronics</Link>
                <Link href="/?category=2" className="hover:border hover:border-white px-2 py-1 rounded whitespace-nowrap">Clothing</Link>
                <Link href="/?category=3" className="hover:border hover:border-white px-2 py-1 rounded whitespace-nowrap">Home & Kitchen</Link>
                <Link href="/?category=4" className="hover:border hover:border-white px-2 py-1 rounded whitespace-nowrap">Books</Link>
                <Link href="/?category=5" className="hover:border hover:border-white px-2 py-1 rounded whitespace-nowrap">Sports</Link>
                <Link href="/orders" className="hover:border hover:border-white px-2 py-1 rounded whitespace-nowrap">Your Orders</Link>
            </div>
        </header>
    );
}
