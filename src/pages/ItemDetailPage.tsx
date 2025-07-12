import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import ItemGrid from '../components/Items/ItemGrid';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  MapPinIcon, 
  UserIcon, 
  CoinsIcon,
  ArrowRightIcon,
  CalendarIcon,
  TagIcon,
  CheckCircleIcon,
  MessageCircleIcon
} from 'lucide-react';

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, requestSwap } = useApp();
  const { user } = useAuth();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapType, setSwapType] = useState<'swap' | 'points'>('points');
  const [message, setMessage] = useState('');

  const item = items.find(item => item.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Item not found</h2>
          <p className="text-gray-600 mb-4">The item you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/browse')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Browse Items
          </button>
        </div>
      </div>
    );
  }

  const relatedItems = items
    .filter(i => i.id !== item.id && i.category === item.category && i.status === 'available')
    .slice(0, 4);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  const handleSwapRequest = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (swapType === 'points' && user.points < item.pointValue) {
      alert('Insufficient points for this exchange.');
      return;
    }

    requestSwap({
      fromUserId: user.id,
      toUserId: item.uploaderId,
      fromItemId: '', // This would be selected in a real implementation
      toItemId: item.id,
      type: swapType,
      status: 'pending',
      message: message || undefined
    });

    setShowSwapModal(false);
    alert('Swap request sent successfully!');
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'Like New': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Good': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Fair': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'pending': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'swapped': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={item.images[currentImageIndex]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {item.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-emerald-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt={`${item.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getConditionColor(item.condition)}`}>
                  {item.condition}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(item.status)}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-emerald-600 text-2xl font-bold">
                <CoinsIcon className="h-6 w-6" />
                <span>{item.pointValue} Points</span>
              </div>
            </div>

            {/* Item Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg border border-gray-200">
              <div>
                <div className="text-sm text-gray-500">Category</div>
                <div className="font-medium text-gray-900">{item.category}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Type</div>
                <div className="font-medium text-gray-900">{item.type}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Size</div>
                <div className="font-medium text-gray-900">{item.size}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Uploaded</div>
                <div className="font-medium text-gray-900 flex items-center space-x-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {/* Tags */}
            {item.tags.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-1">
                  <TagIcon className="h-4 w-4" />
                  <span>Tags</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Uploader Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Listed by</h3>
              <div className="flex items-center space-x-3">
                {item.uploaderAvatar ? (
                  <img src={item.uploaderAvatar} alt={item.uploaderName} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-gray-500" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.uploaderName}</div>
                  {item.location && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <MapPinIcon className="h-3 w-3" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {item.status === 'available' && user && item.uploaderId !== user.id && (
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setSwapType('points');
                    setShowSwapModal(true);
                  }}
                  disabled={user.points < item.pointValue}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <CoinsIcon className="h-5 w-5" />
                  <span>Redeem with Points ({item.pointValue})</span>
                </button>
                <button
                  onClick={() => {
                    setSwapType('swap');
                    setShowSwapModal(true);
                  }}
                  className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                  <span>Request Swap</span>
                </button>
                {user.points < item.pointValue && (
                  <p className="text-sm text-amber-600 text-center">
                    You need {item.pointValue - user.points} more points for direct redemption
                  </p>
                )}
              </div>
            )}

            {item.status !== 'available' && (
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 text-center">
                <CheckCircleIcon className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">This item is no longer available</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Items</h2>
            <ItemGrid items={relatedItems} />
          </div>
        )}

        {/* Swap Modal */}
        {showSwapModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">
                {swapType === 'points' ? 'Redeem with Points' : 'Request Swap'}
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <img src={item.images[0]} alt={item.title} className="h-12 w-12 rounded-lg object-cover" />
                  <div>
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500">by {item.uploaderName}</div>
                  </div>
                </div>
                {swapType === 'points' && (
                  <div className="text-sm text-gray-600">
                    Cost: {item.pointValue} points (You have: {user?.points} points)
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={swapType === 'points' ? "Add a note to the seller..." : "Describe what you'd like to swap..."}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSwapModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSwapRequest}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-1"
                >
                  {swapType === 'points' ? (
                    <>
                      <CoinsIcon className="h-4 w-4" />
                      <span>Redeem</span>
                    </>
                  ) : (
                    <>
                      <MessageCircleIcon className="h-4 w-4" />
                      <span>Send Request</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetailPage;