// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getProducts, getStats } from '@/lib/storage';
import { Product, StatsData } from '@/types/product';
import ProductCard from './components/ProductCard';
import StatsCards from './components/StatsCards';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProductImage from './components/ProductImage';

export default function DashboardPage() {
  const router = useRouter();
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<StatsData>({
    totalProducts: 0,
    totalValue: 0,
    averagePrice: 0,
    topCategory: 'None',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const products = getProducts();
    const statsData = getStats();
    setStats(statsData);
    
    // Filter products with soldCount > 20 for best sellers
    const productsWithGoodSales = products.filter(p => p.soldCount > 20);
    const sortedBySales = [...productsWithGoodSales].sort((a, b) => b.soldCount - a.soldCount);
    setBestSellers(sortedBySales.slice(0, 4));
    
    const sortedByDate = [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setRecentProducts(sortedByDate.slice(0, 4));
  };

  const categories = ['Smartphone', 'Audio', 'Wearables', 'Laptops', 'Tablets', 'Accessories'];

  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section with Image on Right */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-8 text-white">
        <div className="relative z-10 flex items-center justify-between">
          {/* Left side - Text content */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Welcome to ProductMPro</h1>
            <p className="text-base md:text-lg text-white/90 mb-6 max-w-2xl">
              Manage your product inventory with ease. Track sales, update details, and organize your catalog in one place.
            </p>
            <Link
              href="/products/add"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-5 py-2.5 rounded-xl font-semibold transition-all border border-white/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Product
            </Link>
          </div>

          {/* Right side - Square Image */}
          <div className="hidden md:block ml-8">
            <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 shadow-xl overflow-hidden">
              <ProductImage
                src="/images/store.jpg"
                alt="ProductMPro Store"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute right-0 bottom-0 opacity-10">
          <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 4h16v16H4z" />
          </svg>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Categories Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">All Categories Available</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Best Sale Products - Only showing products with more than 20 sales */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">🔥 Best Sale Products</h2>
          <Link href="/products" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
            View All →
          </Link>
        </div>
        {bestSellers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bestSellers.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                showDescription={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-gray-500 dark:text-gray-400">No products with more than 20 sales yet.</p>
          </div>
        )}
      </div>

      {/* Recent Products */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">🆕 Recently Added</h2>
          <Link href="/products" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
            View All →
          </Link>
        </div>
        {recentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                showActions={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-gray-500 dark:text-gray-400">No products yet. Add your first product!</p>
          </div>
        )}
      </div>
    </div>
  );
}