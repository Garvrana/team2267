export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  points: number;
  joinDate: string;
  location?: string;
}

export interface ClothingItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  images: string[];
  tags: string[];
  uploaderId: string;
  uploaderName: string;
  uploaderAvatar?: string;
  pointValue: number;
  status: 'available' | 'pending' | 'swapped';
  uploadDate: string;
  location?: string;
}

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromItemId: string;
  toItemId?: string;
  type: 'swap' | 'points';
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message?: string;
  createdDate: string;
}

export interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface AppContextType {
  items: ClothingItem[];
  swaps: SwapRequest[];
  addItem: (item: Omit<ClothingItem, 'id' | 'uploadDate' | 'uploaderId' | 'uploaderName'>) => void;
  requestSwap: (request: Omit<SwapRequest, 'id' | 'createdDate'>) => void;
  updateItemStatus: (itemId: string, status: ClothingItem['status']) => void;
}