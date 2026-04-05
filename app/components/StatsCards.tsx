'use client';

import { StatsData } from '@/types/product';

interface StatsCardsProps {
  stats: StatsData;
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  const cards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Total Value',
      value: `LKR ${stats.totalValue.toLocaleString()}`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Average Price',
      value: `LKR ${Math.round(stats.averagePrice).toLocaleString()}`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Top Category',
      value: stats.topCategory,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      ),
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700"
        >
          <div className="p-6">
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-lg mb-4`}>
              {card.icon}
            </div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{card.value}</p>
          </div>
          <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br ${card.color} opacity-10 rounded-tl-full`} />
        </div>
      ))}
    </div>
  );
};

export default StatsCards;