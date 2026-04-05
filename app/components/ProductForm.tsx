'use client';

import { useState } from 'react';
import { ProductFormData, ValidationErrors } from '@/types/product';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFormProps {
  initialData: ProductFormData;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  submitLabel: string;
  title: string;
  subtitle: string;
  gradientFrom: string;
  gradientTo: string;
}

const categories = ['Smartphone', 'Audio', 'Wearables', 'Laptops', 'Tablets', 'Accessories', 'Other'];

const ProductForm = ({
  initialData,
  onSubmit,
  onCancel,
  submitLabel,
  title,
  subtitle,
  gradientFrom,
  gradientTo,
}: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormData>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(initialData.imageUrl);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Product name must be at least 2 characters';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Product name must be less than 100 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    } else if (formData.price > 999999999) {
      newErrors.price = 'Price is too high';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImagePreview(imageUrl);
        setFormData({ ...formData, imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    } else {
      toast.error('Please fix the form errors');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="overflow-hidden shadow-lg border-0 bg-blue-50/30 dark:bg-gray-800/50">
        <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} px-6 py-5`}>
          <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
          <p className="text-white/80 text-sm mt-1">{subtitle}</p>
        </div>
        
        <CardContent className="p-6 bg-blue-50/20 dark:bg-transparent">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Product Name */}
            <div>
              <Label htmlFor="name" className="mb-1 block font-semibold text-gray-700 dark:text-gray-300">
                Product Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-400 focus:ring-blue-400"}
                placeholder="e.g., iPhone 15 Pro"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Category - Nicer dropdown */}
            <div>
              <Label htmlFor="category" className="mb-1 block font-semibold text-gray-700 dark:text-gray-300">
                Product Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => {
                  if (value) {
                    setFormData({ ...formData, category: value });
                  }
                }}
              >
                <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400 transition-colors">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg">
                  <div className="py-1">
                    {categories.map((cat) => (
                      <SelectItem 
                        key={cat} 
                        value={cat}
                        className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 px-3 py-2 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700 dark:text-gray-300">{cat}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="mb-1 block font-semibold text-gray-700 dark:text-gray-300">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className={errors.description ? "border-red-500" : "border-gray-300 focus:border-blue-400 focus:ring-blue-400"}
                placeholder="Describe the product features, specifications, benefits, etc."
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              <p className="text-xs text-gray-500 mt-1">
                {formData.description.length}/1000 characters
              </p>
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price" className="mb-1 block font-semibold text-gray-700 dark:text-gray-300">
                Price (LKR) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                className={errors.price ? "border-red-500" : "border-gray-300 focus:border-blue-400 focus:ring-blue-400"}
                placeholder="e.g., 65000"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <Label className="mb-1 block font-semibold text-gray-700 dark:text-gray-300">Product Image</Label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-colors shadow-sm">
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {imagePreview ? 'Image selected ✓' : 'No file chosen'}
                </span>
              </div>
              {imagePreview && (
                <div className="mt-3">
                  <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-lg shadow-md border border-gray-200 dark:border-gray-600" />
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Max size: 5MB. Supported: JPG, PNG, GIF, WebP</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className={`flex-1 bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:opacity-90 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg`}
              >
                {submitLabel}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="flex-1 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;