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

    const discountPercent = mrp && parseInt(mrp) > parseInt(price)
        ? Math.round(((Number(mrp) - Number(price)) / Number(mrp)) * 100)
        : null;

    const sizes = {
        sm: { price: 'text-base', symbol: 'text-xs', mrp: 'text-xs' },
        md: { price: 'text-xl', symbol: 'text-sm', mrp: 'text-sm' },
        lg: { price: 'text-2xl', symbol: 'text-base', mrp: 'text-base' },
        xl: { price: 'text-3xl', symbol: 'text-lg', mrp: 'text-base' },
    };

    const sizeStyles = sizes[size] || sizes.md;

    // Split price into whole and decimal parts for Amazon style
    const [whole, fraction] = Number(price || 0).toFixed(2).split('.');

    return (
        <div className={`flex flex-wrap items-baseline gap-1 ${className}`}>
            {/* Current Price */}
            <span className={`flex items-start font-medium text-amazon-text`}>
                {showSymbol && <span className={`${sizeStyles.symbol} relative top-[0.3em] font-normal`}>₹</span>}
                <span className={`${sizeStyles.price} leading-none`}>{whole}</span>
                <span className={`${sizeStyles.symbol} relative top-[0.3em] font-normal`}>{fraction}</span>
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
