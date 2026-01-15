'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { productsAPI, categoriesAPI } from '@/services/api';

export default function Home() {
  const searchParams = useSearchParams();
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

  return (
    <div className="min-h-screen">
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

      <div className="max-w-7xl mx-auto px-4 py-6">
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

        {/* Page Title */}
        <div className="mb-6">
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
          {pagination && (
            <p className="text-sm text-gray-600 mt-1">
              Showing {products.length} of {pagination.totalItems} results
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
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found</p>
            <a href="/" className="text-[#007185] hover:underline mt-2 inline-block">
              Browse all products
            </a>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {page > 1 && (
                  <a
                    href={`/?${new URLSearchParams({ search, category: categoryId, page: page - 1 }).toString()}`}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Previous
                  </a>
                )}
                <span className="px-4 py-2 text-gray-700">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                {page < pagination.totalPages && (
                  <a
                    href={`/?${new URLSearchParams({ search, category: categoryId, page: page + 1 }).toString()}`}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Next
                  </a>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
