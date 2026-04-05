'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getProductById, deleteProduct } from '@/lib/storage';
import { Product } from '@/types/product';
import Link from 'next/link';
import toast from 'react-hot-toast';
import DeleteConfirmModal from '@/app/components/DeleteConfirmModal';

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const found = getProductById(productId);
    if (found) {
      setProduct(found);
    } else {
      toast.error('Product not found');
      router.push('/products');
    }
    setLoading(false);
  }, [productId, router]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteProduct(productId);
    toast.success('Product deleted successfully');
    router.push('/products');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-blue-600">Dashboard</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-blue-600">Products</Link>
        <span>/</span>
        <span className="text-gray-800 dark:text-gray-200">{product.name}</span>
      </div>

      {/* Product Details Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-8 flex items-center justify-center min-h-[350px]">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="max-w-full max-h-64 object-contain rounded-lg shadow-lg" />
            ) : (
              <div className="text-center">
                <svg className="w-32 h-32 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400">No image available</p>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                {product.category}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">ID: {product.id}</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Sold: {product.soldCount} units</span>
            </div>
            
            {/* Description section */}
            <div className="mb-4">
              <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            {/* Price section */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Price</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">LKR {product.price.toLocaleString()}</p>
            </div>
            
            <div className="flex gap-3">
              <Link
                href={`/products/edit/${product.id}`}
                className="flex-1 text-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                Edit Product
              </Link>
              <button
                onClick={handleDeleteClick}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex justify-center gap-4 mt-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-xl transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </Link>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        productName={product.name}
      />
    </div>
  );
}