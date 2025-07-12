import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppContextType, ClothingItem, SwapRequest } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockItems: ClothingItem[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic 90s denim jacket in excellent condition. Perfect for layering and adds a vintage touch to any outfit.',
    category: 'Outerwear',
    type: 'Jacket',
    size: 'M',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1584468220943-e804fd1ac78e?w=400&h=400&fit=crop'
    ],
    tags: ['vintage', 'denim', 'casual', '90s'],
    uploaderId: '1',
    uploaderName: 'Sarah Johnson',
    uploaderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    pointValue: 75,
    status: 'available',
    uploadDate: '2024-01-20',
    location: 'New York, NY'
  },
  {
    id: '2',
    title: 'Silk Floral Blouse',
    description: 'Elegant silk blouse with beautiful floral print. Perfect for professional or formal occasions.',
    category: 'Tops',
    type: 'Blouse',
    size: 'S',
    condition: 'New',
    images: [
      'https://images.unsplash.com/photo-1485518882345-15568b007407?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop'
    ],
    tags: ['silk', 'floral', 'professional', 'elegant'],
    uploaderId: '2',
    uploaderName: 'Emma Chen',
    uploaderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    pointValue: 100,
    status: 'available',
    uploadDate: '2024-01-18',
    location: 'Los Angeles, CA'
  },
  {
    id: '3',
    title: 'Wool Winter Coat',
    description: 'Warm and stylish wool coat perfect for cold weather. Features a timeless design that never goes out of style.',
    category: 'Outerwear',
    type: 'Coat',
    size: 'L',
    condition: 'Good',
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop'
    ],
    tags: ['wool', 'winter', 'warm', 'classic'],
    uploaderId: '3',
    uploaderName: 'Michael Rodriguez',
    uploaderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    pointValue: 120,
    status: 'available',
    uploadDate: '2024-01-15',
    location: 'Chicago, IL'
  },
  {
    id: '4',
    title: 'Designer Sneakers',
    description: 'Limited edition designer sneakers in pristine condition. Comfortable and stylish for everyday wear.',
    category: 'Shoes',
    type: 'Sneakers',
    size: '9',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'
    ],
    tags: ['designer', 'sneakers', 'limited edition', 'comfortable'],
    uploaderId: '4',
    uploaderName: 'Alex Kim',
    uploaderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    pointValue: 200,
    status: 'available',
    uploadDate: '2024-01-22',
    location: 'Seattle, WA'
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ClothingItem[]>(mockItems);
  const [swaps, setSwaps] = useState<SwapRequest[]>([]);

  const addItem = (newItem: Omit<ClothingItem, 'id' | 'uploadDate' | 'uploaderId' | 'uploaderName'>) => {
    const item: ClothingItem = {
      ...newItem,
      id: Date.now().toString(),
      uploadDate: new Date().toISOString().split('T')[0],
      uploaderId: '1', // Current user ID
      uploaderName: 'Current User',
      status: 'available'
    };
    setItems(prev => [item, ...prev]);
  };

  const requestSwap = (newRequest: Omit<SwapRequest, 'id' | 'createdDate'>) => {
    const request: SwapRequest = {
      ...newRequest,
      id: Date.now().toString(),
      createdDate: new Date().toISOString().split('T')[0],
    };
    setSwaps(prev => [request, ...prev]);
  };

  const updateItemStatus = (itemId: string, status: ClothingItem['status']) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, status } : item
    ));
  };

  return (
    <AppContext.Provider value={{ 
      items, 
      swaps, 
      addItem, 
      requestSwap, 
      updateItemStatus 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};