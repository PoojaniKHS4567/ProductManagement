'use client';

import { useState } from 'react';

interface SearchFilterProps {
  onSearch: (searchTerm: string, priceRange: { min: number; max: number }) => void;
}

const SearchFilter = ({ onSearch }: SearchFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm, {
      min: minPrice ? parseInt(minPrice) : 0,
      max: maxPrice ? parseInt(maxPrice) : Infinity,
    });
  };

  const handleClear = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    onSearch('', { min: 0, max: Infinity });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search by name or category
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="iPhone, Laptop, Smartwatch..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="w-36">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Min Price (LKR)
          </label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="w-36">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Max Price (LKR)
          </label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Any"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="flex gap-2 items-end">
          <button
            onClick={handleSearch}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Search
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-xl transition-all duration-200"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;