'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import HeroCarousel from '@/components/HeroCarousel';
import ProductCarousel from '@/components/ProductCarousel';
import DealCard from '@/components/DealCard';
import { productsAPI, categoriesAPI } from '@/services/api';
import { Button } from '@/components/ui';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const search = searchParams.get('search') || '';
  const categoryId = searchParams.get('category') || '';
  const page = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [productsData, categoriesData] = await Promise.all([
          productsAPI.getAll({ search, category: categoryId, page, limit: 15 }),
          categoriesAPI.getAll()
        ]);
        setProducts(productsData.products);
        setPagination(productsData.pagination);
        setCategories(categoriesData);

        // On homepage, fetch products for each category for the carousel/deal sections
        if (!search && !categoryId && categoriesData.length > 0) {
          const categoryProductsData = {};
          await Promise.all(
            categoriesData.map(async (cat) => {
              try {
                const data = await productsAPI.getAll({ category: cat.id, limit: 15 });
                categoryProductsData[cat.id] = data.products;
              } catch (e) {
                categoryProductsData[cat.id] = [];
              }
            })
          );
          setCategoryProducts(categoryProductsData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search, categoryId, page]);

  const currentCategory = categories.find(c => c.id === parseInt(categoryId));

  // Build pagination URL helper
  const buildPageUrl = (newPage) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (categoryId) params.set('category', categoryId);
    if (newPage > 1) params.set('page', newPage.toString());
    const queryString = params.toString();
    return queryString ? `/?${queryString}` : '/';
  };

  // Calculate result range (Amazon style: "1-12 of 21 results")
  const getResultRange = () => {
    if (!pagination || products.length === 0) return null;
    const start = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
    const end = start + products.length - 1;
    return { start, end };
  };

  const resultRange = getResultRange();

  // Homepage layout (no search or category filter)
  const isHomepage = !search && !categoryId;

  // Filter and sort categories by product count (most products first)
  // Carousels need at least 8 products to look full
  const categoriesWithProducts = categories
    .filter(cat => categoryProducts[cat.id] && categoryProducts[cat.id].length >= 4)
    .sort((a, b) => (categoryProducts[b.id]?.length || 0) - (categoryProducts[a.id]?.length || 0));

  // Categories with 8+ products are good for carousels
  const carouselCategories = categoriesWithProducts.filter(
    cat => categoryProducts[cat.id] && categoryProducts[cat.id].length >= 8
  );

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      {/* Hero Carousel - Only on homepage */}
      {isHomepage && <HeroCarousel />}

      <div className="max-w-[1500px] mx-auto px-4 py-6">
        {/* Homepage: Amazon-style mixed layout */}
        {isHomepage && (
          <>
            {/* Deal Cards Grid (2x2 product cards) - Float over carousel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 -mt-40 relative z-10 mb-6">
              {categoriesWithProducts.slice(0, 4).map((category) => (
                <DealCard
                  key={category.id}
                  title={`${category.name}`}
                  products={categoryProducts[category.id] || []}
                  categoryId={category.id}
                  linkText="See all deals"
                />
              ))}
            </div>

            {/* Horizontal Product Carousels by Category - Only categories with 8+ products */}
            {carouselCategories.slice(0, 3).map((category) => (
              <ProductCarousel
                key={category.id}
                title={`Top picks in ${category.name}`}
                products={categoryProducts[category.id] || []}
                categoryId={category.id}
                badgeText="Up to 70% off"
              />
            ))}

            {/* Featured Products Section */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-amazon-text mb-4">Featured Products</h2>
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                      <div className="aspect-square bg-gray-200 rounded mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                      <div className="h-6 bg-gray-200 rounded w-1/3" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Pagination for Featured Products */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-1 mt-8">
                  <a
                    href={page > 1 ? buildPageUrl(page - 1) : undefined}
                    className={`px-4 py-2 border rounded-l-lg text-sm font-medium transition-colors
                      ${page > 1
                        ? 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    onClick={(e) => page <= 1 && e.preventDefault()}
                  >
                    ← Previous
                  </a>
                  <span className="px-4 py-2 text-sm text-gray-600">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <a
                    href={page < pagination.totalPages ? buildPageUrl(page + 1) : undefined}
                    className={`px-4 py-2 border rounded-r-lg text-sm font-medium transition-colors
                      ${page < pagination.totalPages
                        ? 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    onClick={(e) => page >= pagination.totalPages && e.preventDefault()}
                  >
                    Next →
                  </a>
                </div>
              )}
            </div>
          </>
        )}

        {/* Results Header - Only when searching or filtering by category */}
        {!isHomepage && (
          <div className="mb-6">
            {/* Title */}
            {search && (
              <h1 className="text-xl font-medium text-amazon-text">
                Search results for "<span className="text-[#C7511F]">{search}</span>"
              </h1>
            )}
            {currentCategory && (
              <h1 className="text-xl font-medium text-amazon-text">
                {currentCategory.name}
              </h1>
            )}

            {/* Result Count - Amazon style */}
            {pagination && (
              <p className="text-sm text-gray-600 mt-1">
                {resultRange && (
                  <>
                    <span className="font-medium">{resultRange.start}-{resultRange.end}</span>
                    {' '}of{' '}
                    <span className="font-medium">{pagination.totalItems.toLocaleString()}</span>
                    {' '}results
                    {currentCategory && ` for "${currentCategory.name}"`}
                    {search && ` for "${search}"`}
                  </>
                )}
              </p>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Product Grid - Only on search/category pages */}
        {!isHomepage && (
          <>
            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-gray-600 text-lg mb-2">No products found</p>
                <p className="text-gray-500 text-sm mb-4">Try adjusting your search or filter</p>
                <a href="/" className="text-[#007185] hover:underline hover:text-[#C7511F]">
                  Browse all products
                </a>
              </div>
            ) : (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination - Amazon style */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-1 mt-8">
                    {/* Previous Button */}
                    <a
                      href={page > 1 ? buildPageUrl(page - 1) : undefined}
                      className={`px-4 py-2 border rounded-l-lg text-sm font-medium transition-colors
                    ${page > 1
                          ? 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
                          : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      onClick={(e) => page <= 1 && e.preventDefault()}
                    >
                      ← Previous
                    </a>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {[...Array(Math.min(7, pagination.totalPages))].map((_, i) => {
                        let pageNum;
                        const totalPages = pagination.totalPages;

                        if (totalPages <= 7) {
                          pageNum = i + 1;
                        } else if (page <= 4) {
                          pageNum = i + 1;
                        } else if (page >= totalPages - 3) {
                          pageNum = totalPages - 6 + i;
                        } else {
                          pageNum = page - 3 + i;
                        }

                        if (pageNum < 1 || pageNum > totalPages) return null;

                        return (
                          <a
                            key={pageNum}
                            href={buildPageUrl(pageNum)}
                            className={`w-10 h-10 flex items-center justify-center border text-sm font-medium transition-colors
                          ${page === pageNum
                                ? 'border-amazon-link bg-amazon-white text-amazon-link'
                                : 'border-gray-300 bg-amazon-white hover:bg-gray-50 text-amazon-text'
                              }`}
                          >
                            {pageNum}
                          </a>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <a
                      href={page < pagination.totalPages ? buildPageUrl(page + 1) : undefined}
                      className={`px-4 py-2 border rounded-r-lg text-sm font-medium transition-colors
                    ${page < pagination.totalPages
                          ? 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
                          : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      onClick={(e) => page >= pagination.totalPages && e.preventDefault()}
                    >
                      Next →
                    </a>
                  </div>
                )}

                {/* Page Info */}
                {pagination && pagination.totalPages > 1 && (
                  <p className="text-center text-sm text-gray-500 mt-3">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
