'use client';

import Link from 'next/link';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-[#232F3E] text-white mt-auto">
            {/* Back to top */}
            <button
                onClick={scrollToTop}
                className="w-full bg-[#37475A] hover:bg-[#485769] py-3 text-sm"
            >
                Back to top
            </button>

            {/* Footer Links */}
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-bold mb-3">Get to Know Us</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link href="#" className="hover:underline">About Us</Link></li>
                        <li><Link href="#" className="hover:underline">Careers</Link></li>
                        <li><Link href="#" className="hover:underline">Press Releases</Link></li>
                        <li><Link href="#" className="hover:underline">Amazon Science</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-3">Connect with Us</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link href="#" className="hover:underline">Facebook</Link></li>
                        <li><Link href="#" className="hover:underline">Twitter</Link></li>
                        <li><Link href="#" className="hover:underline">Instagram</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-3">Make Money with Us</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link href="#" className="hover:underline">Sell on Amazon</Link></li>
                        <li><Link href="#" className="hover:underline">Sell under Amazon Accelerator</Link></li>
                        <li><Link href="#" className="hover:underline">Protect and Build Your Brand</Link></li>
                        <li><Link href="#" className="hover:underline">Amazon Global Selling</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-3">Let Us Help You</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link href="#" className="hover:underline">COVID-19 and Amazon</Link></li>
                        <li><Link href="#" className="hover:underline">Your Account</Link></li>
                        <li><Link href="/orders" className="hover:underline">Your Orders</Link></li>
                        <li><Link href="#" className="hover:underline">Returns Centre</Link></li>
                        <li><Link href="#" className="hover:underline">Help</Link></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-600">
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col items-center gap-4">
                    <Link href="/" className="text-2xl font-bold">
                        amazon<span className="text-[#FF9900]">.clone</span>
                    </Link>
                    <p className="text-xs text-gray-400">
                        This is a demo project for educational purposes. Not affiliated with Amazon.
                    </p>
                    <p className="text-xs text-gray-400">
                        Built with Next.js, Express.js, and PostgreSQL
                    </p>
                </div>
            </div>
        </footer>
    );
}
