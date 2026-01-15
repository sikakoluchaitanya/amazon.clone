'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { productsAPI, categoriesAPI } from '@/services/api';
import { Button } from '@/components/ui';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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
          productsAPI.getAll({ search, category: categoryId, page, limit: 12 }),
          categoriesAPI.getAll()
        ]);
        setProducts(productsData.products);
        setPagination(productsData.pagination);
        setCategories(categoriesData);
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

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      {/* Hero Banner */}
      {!search && !categoryId && (
        <div className="relative h-[300px] md:h-[400px] bg-gradient-to-b from-[#232F3E] to-transparent">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#EAEDED] via-transparent to-transparent" />
        </div>
      )}

      <div className="max-w-[1500px] mx-auto px-4 py-6">
        {/* Category Cards (only on home) */}
        {!search && !categoryId && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 -mt-32 relative z-10 mb-8">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/?category=${category.id}`}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-gray-900 mb-2">{category.name}</h3>
                <div className="aspect-square bg-gray-100 rounded overflow-hidden mb-2">
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline">
                  Shop now
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Results Header */}
        <div className="mb-6">
          {/* Title */}
          {search && (
            <h1 className="text-xl font-medium text-gray-900">
              Search results for "<span className="text-[#C7511F]">{search}</span>"
            </h1>
          )}
          {currentCategory && (
            <h1 className="text-xl font-medium text-gray-900">
              {currentCategory.name}
            </h1>
          )}
          {!search && !categoryId && (
            <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
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

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

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
                            ? 'border-[#007185] bg-white text-[#007185]'
                            : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
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
      </div>
    </div>
  );
}
