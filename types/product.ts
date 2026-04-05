export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string | null;
  soldCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string | null;
}

export interface ValidationErrors {
  name?: string;
  category?: string;
  description?: string;
  price?: string;
}

export interface StatsData {
  totalProducts: number;
  totalValue: number;
  averagePrice: number;
  topCategory: string;
}