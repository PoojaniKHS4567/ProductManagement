import { Product } from '@/types/product';

const STORAGE_KEY = 'productmpro_data';

export const getProducts = (): Product[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Galaxy A4 Phone',
        category: 'Smartphone',
        description: 'Latest Samsung Galaxy A4 with 128GB storage, 6.5" Super AMOLED display, 50MP camera, and 5000mAh battery. Perfect for everyday use with excellent performance.',
        price: 65000,
        imageUrl: '/images/SamA4.jpg',
        soldCount: 24,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Wireless Headphones',
        category: 'Audio',
        description: 'Premium noise-cancelling Bluetooth headphones with 30-hour battery life, comfortable ear cushions, and crystal clear sound quality.',
        price: 12500,
        imageUrl: '/images/headphone.jpg',
        soldCount: 56,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Smart Watch Pro',
        category: 'Wearables',
        description: 'Advanced fitness tracker with heart rate monitor, GPS, sleep tracking, and 7-day battery life. Water resistant up to 50m.',
        price: 28900,
        imageUrl: '/images/smartWatch.jpg',
        soldCount: 42,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Gaming Laptop',
        category: 'Laptops',
        description: 'High-performance gaming laptop with RTX 3060, 16GB RAM, 512GB SSD, and 144Hz display.',
        price: 185000,
        imageUrl: '/images/gamingLap.jpg',
        soldCount: 12,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '5',
        name: 'Tablet Pro',
        category: 'Tablets',
        description: '10.9" tablet with stylus support, 128GB storage, and all-day battery life. Perfect for work and entertainment.',
        price: 75000,
        imageUrl: '/images/tab.jpg',
        soldCount: 18,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleProducts));
    return sampleProducts;
  }
  
  return JSON.parse(stored);
};

export const saveProducts = (products: Product[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'soldCount'>): Product => {
  const products = getProducts();
  
  // Find the highest existing ID number
  let maxId = 0;
  products.forEach(p => {
    const idNum = parseInt(p.id);
    if (!isNaN(idNum) && idNum > maxId) {
      maxId = idNum;
    }
  });
  
  // Create new ID as maxId + 1
  const newId = (maxId + 1).toString();
  
  const newProduct: Product = {
    ...product,
    id: newId,
    soldCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>): Product | null => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  products[index] = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveProducts(products);
  return products[index];
};

export const deleteProduct = (id: string): boolean => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
};

export const getProductById = (id: string): Product | undefined => {
  const products = getProducts();
  return products.find(p => p.id === id);
};

export const getStats = () => {
  const products = getProducts();
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;
  
  const categoryCount: { [key: string]: number } = {};
  products.forEach(p => {
    categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
  });
  const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
  
  return { totalProducts, totalValue, averagePrice, topCategory };
};