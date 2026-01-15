'use client';

/**
 * Reusable Button component with Amazon-style variants
 * Follows DRY principle for consistent button styling across the app
 */
export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    className = ''
}) {
    const baseStyles = 'font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1';

    const variants = {
        primary: 'bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0C14B] text-gray-900 border border-[#FCD200] focus:ring-[#F7CA00] shadow-sm',
        secondary: 'bg-[#FFA41C] hover:bg-[#FF8F00] active:bg-[#E77600] text-white border border-[#FF8F00] focus:ring-[#FFA41C]',
        outline: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 focus:ring-gray-300',
        link: 'bg-transparent hover:underline text-[#007185] p-0 border-none shadow-none',
        danger: 'bg-red-600 hover:bg-red-700 text-white border border-red-600 focus:ring-red-500',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs rounded-lg',
        md: 'px-4 py-2 text-sm rounded-lg',
        lg: 'px-6 py-3 text-base rounded-lg',
        pill: 'px-4 py-2 text-sm rounded-full',  // Amazon-style pill button
    };

    const disabledStyles = disabled || loading
        ? 'opacity-60 cursor-not-allowed'
        : 'cursor-pointer';

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${sizes[size]}
                ${disabledStyles}
                ${widthStyles}
                ${className}
            `.trim().replace(/\s+/g, ' ')}
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {children}
                </span>
            ) : children}
        </button>
    );
}
