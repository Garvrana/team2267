import React from 'react';
import { ClothingItem } from '../../types';
import ItemCard from './ItemCard';

interface ItemGridProps {
  items: ClothingItem[];
  className?: string;
}

const ItemGrid: React.FC<ItemGridProps> = ({ items, className = '' }) => {
  if (items.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-400 text-lg mb-2">No items found</div>
        <p className="text-gray-500 text-sm">Try adjusting your search or browse different categories.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemGrid;