'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * HeroCarousel - Amazon-style auto-scrolling infinite image carousel
 * Features: Infinite loop, auto-advance, navigation arrows, dot indicators, smooth transitions
 */
export default function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 because of clone
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef(null);

    // High-quality promotional banner images
    const slides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1600&h=400&fit=crop',
            alt: 'Shop the latest electronics deals',
            gradient: 'from-blue-900/60',
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=400&fit=crop',
            alt: 'Fashion for everyone',
            gradient: 'from-purple-900/60',
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&h=400&fit=crop',
            alt: 'Home & Kitchen essentials',
            gradient: 'from-amber-900/60',
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1600&h=400&fit=crop',
            alt: 'Books for every reader',
            gradient: 'from-emerald-900/60',
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&h=400&fit=crop',
            alt: 'Sports & Fitness gear',
            gradient: 'from-red-900/60',
        },
    ];

    // Create extended slides array with clones for infinite loop
    // [clone of last] [slides...] [clone of first]
    const extendedSlides = [
        slides[slides.length - 1], // Clone of last slide at beginning
        ...slides,
        slides[0], // Clone of first slide at end
    ];

    // Handle seamless loop reset after transition ends
    useEffect(() => {
        if (!isTransitioning) return;

        const handleTransitionEnd = () => {
            // If we're at the clone of the first slide (end), jump to real first
            if (currentIndex === extendedSlides.length - 1) {
                setIsTransitioning(false);
                setCurrentIndex(1);
            }
            // If we're at the clone of the last slide (beginning), jump to real last
            else if (currentIndex === 0) {
                setIsTransitioning(false);
                setCurrentIndex(slides.length);
            }
        };

        timeoutRef.current = setTimeout(handleTransitionEnd, 500);
        return () => clearTimeout(timeoutRef.current);
    }, [currentIndex, extendedSlides.length, slides.length, isTransitioning]);

    // Re-enable transitions after seamless jump
    useEffect(() => {
        if (!isTransitioning) {
            // Small delay to ensure the position reset before re-enabling transition
            const timer = setTimeout(() => setIsTransitioning(true), 50);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    // Auto-advance slides every 4 seconds
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => prev + 1);
        }, 4000);

        return () => clearInterval(interval);
    }, [isPaused]);

    // Get actual slide index (0-based, for dots)
    const actualSlideIndex = currentIndex === 0
        ? slides.length - 1
        : currentIndex === extendedSlides.length - 1
            ? 0
            : currentIndex - 1;

    const goToSlide = useCallback((index) => {
        setCurrentIndex(index + 1); // +1 because of leading clone
    }, []);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => prev - 1);
    }, []);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => prev + 1);
    }, []);

    return (
        <div
            className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Slides Container */}
            <div
                className={`flex h-full ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {extendedSlides.map((slide, index) => (
                    <div
                        key={`${slide.id}-${index}`}
                        className="relative w-full h-full flex-shrink-0"
                    >
                        {/* Background Image */}
                        <img
                            src={slide.image}
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay for text readability */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} to-transparent`} />
                    </div>
                ))}
            </div>

            {/* Bottom Fade Gradient (for category cards overlap effect) */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#EAEDED] to-transparent pointer-events-none" />

            {/* Left Arrow */}
            <button
                onClick={goToPrevious}
                className="absolute left-0 top-0 bottom-24 w-12 md:w-16 flex items-center justify-center
                           bg-white/10 hover:bg-white/30 transition-colors group"
                aria-label="Previous slide"
            >
                <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-gray-700 group-hover:text-gray-900 drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Right Arrow */}
            <button
                onClick={goToNext}
                className="absolute right-0 top-0 bottom-24 w-12 md:w-16 flex items-center justify-center
                           bg-white/10 hover:bg-white/30 transition-colors group"
                aria-label="Next slide"
            >
                <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-gray-700 group-hover:text-gray-900 drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
                                    ${actualSlideIndex === index
                                ? 'bg-white w-6 shadow-md'
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
