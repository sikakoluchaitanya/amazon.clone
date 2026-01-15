'use client';

/**
 * Reusable PriceDisplay component for consistent Amazon-style price formatting
 * Shows current price with optional MRP strikethrough and discount percentage
 */
export default function PriceDisplay({
    price,
    mrp = null,
    size = 'md',
    showSymbol = true,
    className = ''
}) {
    const formatPrice = (value) => {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0
        }).format(value);
    };

    const discountPercent = mrp && mrp > price
        ? Math.round(((mrp - price) / mrp) * 100)
        : null;

    const sizes = {
        sm: { price: 'text-base', symbol: 'text-xs', mrp: 'text-xs' },
        md: { price: 'text-xl', symbol: 'text-sm', mrp: 'text-sm' },
        lg: { price: 'text-2xl', symbol: 'text-base', mrp: 'text-base' },
        xl: { price: 'text-3xl', symbol: 'text-lg', mrp: 'text-base' },
    };

    const sizeStyles = sizes[size] || sizes.md;

    return (
        <div className={`flex flex-wrap items-baseline gap-2 ${className}`}>
            {/* Current Price */}
            <span className={`font-medium text-gray-900`}>
                {showSymbol && <span className={`${sizeStyles.symbol} align-top`}>₹</span>}
                <span className={`${sizeStyles.price} font-semibold`}>{formatPrice(price)}</span>
            </span>

            {/* MRP with strikethrough */}
            {mrp && mrp > price && (
                <span className={`${sizeStyles.mrp} text-gray-500`}>
                    M.R.P: <span className="line-through">₹{formatPrice(mrp)}</span>
                </span>
            )}

            {/* Discount percentage */}
            {discountPercent && discountPercent > 0 && (
                <span className={`${sizeStyles.mrp} text-red-600 font-medium`}>
                    ({discountPercent}% off)
                </span>
            )}
        </div>
    );
}
