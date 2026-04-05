'use client';

import { useEffect, useState, Suspense } from 'react';
import { getProducts } from '@/lib/storage';
import { Product } from '@/types/product';
import ProductCard from '../components/ProductCard';
import SearchFilter from '../components/SearchFilter';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Component that uses useSearchParams (must be wrapped in Suspense)
function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      const filtered = products.filter(p => p.category === categoryParam);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
    setCurrentPage(1);
  }, [products, categoryParam]);

  const loadProducts = () => {
    const allProducts = getProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  };

  const handleSearch = (searchTerm: string, priceRange: { min: number; max: number }) => {
    let filtered = [...products];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term)
      );
    }
    
    filtered = filtered.filter(p => 
      p.price >= priceRange.min && p.price <= priceRange.max
    );
    
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Add button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Products</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and organize your product catalog</p>
        </div>
        <Link
          href="/products/add"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Product
        </Link>
      </div>

      {/* Search and Filter */}
      <SearchFilter onSearch={handleSearch} />

      {/* Category Filter Indicator */}
      {categoryParam && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="text-blue-700 dark:text-blue-300">
              Filtering by category: <strong>{categoryParam}</strong>
            </span>
          </div>
          <Link href="/products" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
            Clear filter
          </Link>
        </div>
      )}

      {/* Products Grid - Using compact mode like dashboard cards */}
      {currentProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
   {currentProducts.map((product) => (
  <ProductCard 
    key={product.id} 
    product={product} 
    showDescription={true}   // Shows description on products page
    showActions={false}      // Hide Edit/Delete buttons
    onDelete={loadProducts}
  />
))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === number
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400">No products found matching your criteria.</p>
          <button
            onClick={() => {
              window.location.href = '/products';
            }}
            className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

// Loading fallback component
function ProductsLoading() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsContent />
    </Suspense>
  );
}