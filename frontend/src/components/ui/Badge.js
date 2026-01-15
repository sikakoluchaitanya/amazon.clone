'use client';

/**
 * Reusable Badge component for consistent Amazon-style badges
 * Used for cart count, stock warnings, deals, etc.
 */
export default function Badge({
    children,
    variant = 'default',
    size = 'sm',
    className = ''
}) {
    const variants = {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-[#F08804] text-white',       // Cart badge
        success: 'bg-green-100 text-green-800',   // In stock
        warning: 'bg-yellow-100 text-yellow-800', // Limited stock
        danger: 'bg-red-100 text-red-800',        // Out of stock / Deal
        deal: 'bg-red-600 text-white',            // Deal badge
        prime: 'bg-blue-600 text-white',          // Prime badge
    };

    const sizes = {
        xs: 'text-[10px] px-1.5 py-0.5',
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-1',
        count: 'text-xs font-bold w-5 h-5 flex items-center justify-center', // Cart count
    };

    return (
        <span className={`
            inline-flex items-center justify-center rounded-full font-medium
            ${variants[variant]}
            ${sizes[size]}
            ${className}
        `.trim().replace(/\s+/g, ' ')}>
            {children}
        </span>
    );
}
