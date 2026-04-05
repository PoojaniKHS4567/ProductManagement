'use client';

import { Product } from '@/types/product';
import Link from 'next/link';
import { deleteProduct } from '@/lib/storage';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import ProductImage from './ProductImage';
import DeleteConfirmModal from './DeleteConfirmModal';

interface ProductCardProps {
  product: Product;
  onDelete?: () => void;
  compact?: boolean;
  showActions?: boolean;
  showDescription?: boolean;
}

const ProductCard = ({ product, onDelete, compact = false, showActions = true, showDescription = false }: ProductCardProps) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
  setShowDeleteModal(true);
};

const confirmDelete = () => {
  deleteProduct(product.id);
  toast.success(`${product.name} deleted successfully`);
  onDelete?.();
  router.refresh();
  setShowDeleteModal(false);
};

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Smartphone: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      Audio: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      Wearables: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      Laptops: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
      Tablets: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
      Accessories: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  if (compact) {
    return (
      <div className="block group">
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700">
          {/* Fixed Aspect Ratio Image Section - 1:1 Square */}
          <Link href={`/products/${product.id}`}>
            <div className="relative w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden cursor-pointer">
              {product.imageUrl && !imageError ? (
                <ProductImage 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              {/* Sold Count Badge */}
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white font-medium">
                🔥 Sold: {product.soldCount}
              </div>
              
              {/* Hot Sale Badge */}
              {product.soldCount > 50 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                  Hot Sale
                </div>
              )}
            </div>
          </Link>
          
          {/* Content Section */}
          <div className="p-3">
            <div className="mb-2">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(product.category)}`}>
                {product.category}
              </span>
            </div>
            
            <Link href={`/products/${product.id}`}>
              <h4 className="font-semibold text-gray-800 dark:text-white text-sm truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1 cursor-pointer">
                {product.name}
              </h4>
            </Link>
            
            {/* Description - Only show on products page */}
{showDescription && product.description && (
  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-3 mb-2 leading-relaxed">
    {product.description}
  </p>
)}
            
            <div className="flex items-center justify-between mt-2">
              <p className="text-blue-600 dark:text-blue-400 font-bold text-base">
                LKR {product.price.toLocaleString()}
              </p>
            </div>

            {/* View Details Link - Only show on products page */}
            {showDescription && (
              <Link href={`/products/${product.id}`}>
                <span className="text-xs text-blue-500 dark:text-blue-400 hover:underline inline-flex items-center gap-1 mt-2 cursor-pointer">
                  View details
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            )}

            {/* Action Buttons - Only show on products page */}
            {showActions && (
              <div className="flex gap-2 mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                <Link href={`/products/edit/${product.id}`} className="flex-1">
                  <Button variant="ghost" size="sm" className="w-full text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 text-xs">
                    Edit
                  </Button>
                </Link>
                <Button onClick={handleDelete} variant="ghost" size="sm" className="flex-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 text-xs">
                  Delete
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  // Non-compact mode (original full card layout)
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700">
      <Link href={`/products/${product.id}`} className="block overflow-hidden">
<div className="relative w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
          {product.imageUrl && !imageError ? (
           <ProductImage 
  src={product.imageUrl} 
  alt={product.name} 
  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
/>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-20 h-20 text-gray-300 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white font-medium">
            Sold: {product.soldCount}
          </div>
          
          {product.soldCount > 50 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
              🔥 Hot Sale
            </div>
          )}
        </div>
      </Link>

      <CardHeader className="p-4 pb-2">
        <div className="mb-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(product.category)}`}>
            {product.category}
          </span>
        </div>
        <Link href={`/products/${product.id}`} className="block">
          <CardTitle className="text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1">
            {product.name}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-grow">
        <Link href={`/products/${product.id}`} className="block">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            {product.description || 'No description available'}
          </p>
          <span className="text-xs text-blue-500 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
            View details
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between border-t border-gray-100 dark:border-gray-700 mt-auto">
        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
          LKR {product.price.toLocaleString()}
        </span>
        {showActions && (
          <div className="flex gap-1">
            <Link href={`/products/edit/${product.id}`}>
              <Button variant="ghost" size="sm" className="text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30">
                Edit
              </Button>
            </Link>
            <Button onClick={handleDelete} variant="ghost" size="sm" className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30">
              Delete
            </Button>
          </div>
        )}
      </CardFooter>

      <DeleteConfirmModal
      isOpen={showDeleteModal}
      onClose={() => setShowDeleteModal(false)}
      onConfirm={confirmDelete}
      productName={product.name}
    />

    </Card>
  );
};

export default ProductCard;