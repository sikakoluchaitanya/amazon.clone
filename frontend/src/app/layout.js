import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Amazon Clone - E-Commerce Platform",
  description: "A full-featured e-commerce platform built with Next.js and Express.js",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-amazon-bg`}>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
