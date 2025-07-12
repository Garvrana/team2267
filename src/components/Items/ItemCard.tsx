import React from 'react';
import { Link } from 'react-router-dom';
import { ClothingItem } from '../../types';
import { MapPinIcon, UserIcon, CoinsIcon } from 'lucide-react';

interface ItemCardProps {
  item: ClothingItem;
  className?: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, className = '' }) => {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New': return 'text-emerald-600 bg-emerald-50';
      case 'Like New': return 'text-blue-600 bg-blue-50';
      case 'Good': return 'text-amber-600 bg-amber-50';
      case 'Fair': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-emerald-600 bg-emerald-50';
      case 'pending': return 'text-amber-600 bg-amber-50';
      case 'swapped': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Link to={`/item/${item.id}`} className={`group ${className}`}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title and Points */}
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
              {item.title}
            </h3>
            <div className="flex items-center space-x-1 text-emerald-600 font-semibold">
              <CoinsIcon className="h-4 w-4" />
              <span>{item.pointValue}</span>
            </div>
          </div>

          {/* Category and Size */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="bg-gray-100 px-2 py-1 rounded-full">{item.category}</span>
            <span className="bg-gray-100 px-2 py-1 rounded-full">Size {item.size}</span>
          </div>

          {/* Condition and Status */}
          <div className="flex items-center space-x-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getConditionColor(item.condition)}`}>
              {item.condition}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(item.status)}`}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </div>

          {/* Uploader Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              {item.uploaderAvatar ? (
                <img src={item.uploaderAvatar} alt={item.uploaderName} className="h-6 w-6 rounded-full object-cover" />
              ) : (
                <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserIcon className="h-3 w-3 text-gray-500" />
                </div>
              )}
              <span className="text-xs">{item.uploaderName}</span>
            </div>
            {item.location && (
              <div className="flex items-center space-x-1">
                <MapPinIcon className="h-3 w-3" />
                <span className="text-xs">{item.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;