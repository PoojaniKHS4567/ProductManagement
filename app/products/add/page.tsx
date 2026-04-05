'use client';

import { useRouter } from 'next/navigation';
import { addProduct } from '@/lib/storage';
import { ProductFormData } from '@/types/product';
import toast from 'react-hot-toast';
import ProductForm from '@/app/components/ProductForm';

export default function AddProductPage() {
  const router = useRouter();

  const initialData: ProductFormData = {
    name: '',
    category: 'Smartphone',
    description: '',
    price: 0,
    imageUrl: null,
  };

  const handleSubmit = (data: ProductFormData) => {
    addProduct(data);
    toast.success('Product added successfully!');
    router.push('/products');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ProductForm
      initialData={initialData}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      submitLabel="Save Product"
      title="Add New Product"
      subtitle="Fill in the details to add a new product to your catalog"
      gradientFrom="from-blue-600"
      gradientTo="to-purple-600"
    />
  );
}