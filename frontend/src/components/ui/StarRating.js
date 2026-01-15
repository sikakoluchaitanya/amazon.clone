'use client';

/**
 * Reusable StarRating component for consistent Amazon-style ratings
 * Shows filled/empty stars with optional review count
 */
export default function StarRating({
    rating = 0,
    maxRating = 5,
    count = null,
    size = 'sm',
    showCount = true,
    className = ''
}) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

    const sizes = {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    const starSize = sizes[size] || sizes.sm;

    const StarIcon = ({ filled, half }) => (
        <svg className={`${starSize} ${filled || half ? 'text-[#FFA41C]' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
            {half ? (
                // Half star using gradient
                <>
                    <defs>
                        <linearGradient id="halfStar">
                            <stop offset="50%" stopColor="#FFA41C" />
                            <stop offset="50%" stopColor="#D1D5DB" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </>
            ) : (
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            )}
        </svg>
    );

    const formatCount = (num) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`;
        }
        return num.toLocaleString('en-IN');
    };

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <div className="flex">
                {/* Full stars */}
                {[...Array(fullStars)].map((_, i) => (
                    <StarIcon key={`full-${i}`} filled />
                ))}
                {/* Half star */}
                {hasHalfStar && <StarIcon half />}
                {/* Empty stars */}
                {[...Array(emptyStars)].map((_, i) => (
                    <StarIcon key={`empty-${i}`} />
                ))}
            </div>

            {/* Rating number */}
            {rating > 0 && (
                <span className="text-sm text-[#007185] ml-1">{rating.toFixed(1)}</span>
            )}

            {/* Review count */}
            {showCount && count !== null && (
                <span className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer">
                    ({formatCount(count)})
                </span>
            )}
        </div>
    );
}
