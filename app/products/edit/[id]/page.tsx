'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getProductById, updateProduct } from '@/lib/storage';
import { ProductFormData } from '@/types/product';
import toast from 'react-hot-toast';
import ProductForm from '@/app/components/ProductForm';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  
  const [initialData, setInitialData] = useState<ProductFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const product = getProductById(productId);
    if (product) {
      setInitialData({
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    } else {
      toast.error('Product not found');
      router.push('/products');
    }
    setLoading(false);
  }, [productId, router]);

  const handleSubmit = (data: ProductFormData) => {
    updateProduct(productId, data);
    toast.success('Product updated successfully!');
    router.push(`/products/${productId}`);
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!initialData) return null;

  return (
    <ProductForm
      initialData={initialData}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      submitLabel="Update Product"
      title="Edit Product"
      subtitle="Update the product details below"
      gradientFrom="from-amber-500"
      gradientTo="to-orange-500"
    />
  );
}