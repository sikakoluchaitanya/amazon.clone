'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Badge } from './ui';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

/**
 * Header - Pixel-perfect Amazon-style header
 * Colors: Main #131921, Sub-nav #232F3E, Search button #FEBD69
 */
export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const router = useRouter();
    const { cart } = useCart();
    const { wishlist } = useWishlist();
    const { user } = useUser();

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.set('search', searchQuery.trim());
        if (selectedCategory !== 'all') params.set('category', selectedCategory);
        router.push(`/?${params.toString()}`);
    };

    const categories = [
        { id: 'all', name: 'All' },
        { id: '1', name: 'Electronics' },
        { id: '2', name: 'Clothing' },
        { id: '3', name: 'Home & Kitchen' },
        { id: '4', name: 'Books' },
        { id: '5', name: 'Sports' },
    ];

    return (
        <header className="sticky top-0 z-50">
            {/* Main Header - Dark Blue */}
            <div className="bg-amazon-dark text-white">
                <div className="flex items-center px-2 sm:px-4 py-2 gap-2 sm:gap-4 max-w-[1500px] mx-auto">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center flex-shrink-0 px-2 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white"
                    >
                        <span className="text-xl sm:text-2xl font-bold text-white">
                            amazon<span className="text-[#FF9900]">.clone</span>
                        </span>
                    </Link>

                    {/* Deliver to - Hidden on mobile */}
                    <div className="hidden lg:flex flex-col text-xs px-2 py-1.5 rounded cursor-pointer hover:outline hover:outline-1 hover:outline-white">
                        <span className="text-gray-400 text-[11px]">Deliver to</span>
                        <span className="font-bold text-sm flex items-center gap-0.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            India
                        </span>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex-1 flex min-w-0">
                        <div className="flex w-full rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#FEBD69]">
                            {/* Category Dropdown */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="hidden sm:block bg-[#E6E6E6] hover:bg-[#D4D4D4] text-gray-700 text-sm px-2.5 py-2.5 border-r border-gray-300 focus:outline-none cursor-pointer rounded-l-md"
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>

                            {/* Search Input */}
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Amazon.clone"
                                className="flex-1 px-3 py-2.5 bg-amazon-white text-amazon-text text-base focus:outline-none min-w-0 sm:rounded-l-none rounded-l-md placeholder-gray-500"
                            />

                            {/* Search Button */}
                            <button
                                type="submit"
                                className="bg-[#FEBD69] hover:bg-[#F3A847] px-3 sm:px-4 py-2.5 rounded-r-md flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Account - Hidden on small mobile */}
                    <div className="hidden md:flex flex-col justify-center px-2 py-1.5 rounded cursor-pointer hover:outline hover:outline-1 hover:outline-white">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <div>
                                    <span className="text-gray-400 text-[11px] block leading-3">Hello, sign in</span>
                                    <span className="font-bold text-sm flex items-center mt-0.5">
                                        Account & Lists
                                        <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </div>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <div className="flex items-center gap-2">
                                <div className="text-xs">
                                    <span className="text-gray-400 block text-[11px] leading-3">Hello, {user?.firstName}</span>
                                    <span className="font-bold text-sm">Account</span>
                                </div>
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </SignedIn>
                    </div>

                    {/* Orders */}
                    <Link
                        href="/orders"
                        className="hidden md:flex flex-col text-xs px-2 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white"
                    >
                        <span className="text-gray-400 text-[11px]">Returns</span>
                        <span className="font-bold text-sm">& Orders</span>
                    </Link>

                    {/* Wishlist */}
                    <Link
                        href="/wishlist"
                        className="hidden sm:flex items-center px-2 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white relative"
                        title="Wishlist"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {wishlist.count > 0 && (
                            <Badge variant="primary" size="count" className="absolute -top-0.5 -right-0.5">
                                {wishlist.count}
                            </Badge>
                        )}
                    </Link>

                    {/* Cart */}
                    <Link
                        href="/cart"
                        className="flex items-center px-2 py-1 rounded hover:outline hover:outline-1 hover:outline-white"
                    >
                        <div className="relative">
                            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <Badge variant="primary" size="count" className="absolute -top-1 right-2.5 text-base">
                                {cart.summary?.itemCount || 0}
                            </Badge>
                        </div>
                        <span className="hidden sm:inline font-bold text-sm ml-0.5">Cart</span>
                    </Link>
                </div>
            </div>

            {/* Sub Navigation - Lighter Blue */}
            <div className="bg-amazon-blue text-white">
                <div className="flex items-center px-2 sm:px-4 py-1.5 gap-1 sm:gap-2 overflow-x-auto scrollbar-hide max-w-[1500px] mx-auto">
                    {/* All Menu */}
                    <button className="flex items-center gap-1 font-bold text-sm px-2 py-1 rounded hover:outline hover:outline-1 hover:outline-white whitespace-nowrap">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        All
                    </button>

                    {/* Category Links */}
                    {categories.slice(1).map(cat => (
                        <Link
                            key={cat.id}
                            href={`/?category=${cat.id}`}
                            className="text-sm px-2 py-1 rounded hover:outline hover:outline-1 hover:outline-white whitespace-nowrap"
                        >
                            {cat.name}
                        </Link>
                    ))}

                    {/* Divider */}
                    <span className="text-gray-500 hidden sm:inline">|</span>

                    {/* Additional Links */}
                    <Link href="/orders" className="text-sm px-2 py-1 rounded hover:outline hover:outline-1 hover:outline-white whitespace-nowrap hidden sm:inline-block">
                        Your Orders
                    </Link>
                    <Link href="/wishlist" className="text-sm px-2 py-1 rounded hover:outline hover:outline-1 hover:outline-white whitespace-nowrap hidden sm:inline-block">
                        Wishlist
                    </Link>
                </div>
            </div>
        </header>
    );
}
