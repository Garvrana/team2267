import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import ItemGrid from '../components/Items/ItemGrid';
import { 
  UserIcon, 
  CoinsIcon, 
  PlusIcon, 
  CalendarIcon,
  MapPinIcon,
  EditIcon,
  TrendingUpIcon,
  ShirtIcon,
  ArrowRightIcon
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { items, swaps } = useApp();
  const [activeTab, setActiveTab] = useState<'listings' | 'swaps' | 'activity'>('listings');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please sign in</h2>
          <p className="text-gray-600 mb-4">You need to be signed in to access your dashboard.</p>
          <Link
            to="/login"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const userItems = items.filter(item => item.uploaderId === user.id);
  const userSwaps = swaps.filter(swap => swap.fromUserId === user.id || swap.toUserId === user.id);
  const activeListings = userItems.filter(item => item.status === 'available').length;
  const completedSwaps = userSwaps.filter(swap => swap.status === 'completed').length;

  const stats = [
    { label: 'Points Balance', value: user.points, icon: CoinsIcon, color: 'text-emerald-600' },
    { label: 'Active Listings', value: activeListings, icon: ShirtIcon, color: 'text-blue-600' },
    { label: 'Completed Swaps', value: completedSwaps, icon: TrendingUpIcon, color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your listings and track your swapping activity</p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full object-cover" />
              ) : (
                <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <UserIcon className="h-8 w-8 text-emerald-600" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                {user.location && (
                  <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                    <MapPinIcon className="h-3 w-3" />
                    <span>{user.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                  <CalendarIcon className="h-3 w-3" />
                  <span>Member since {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <EditIcon className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
              <Link
                to="/add-item"
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                <PlusIcon className="h-4 w-4" />
                <span>List New Item</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'listings', label: 'My Listings', count: userItems.length },
                { id: 'swaps', label: 'Swap Requests', count: userSwaps.length },
                { id: 'activity', label: 'Recent Activity', count: null }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.id ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'listings' && (
              <div>
                {userItems.length > 0 ? (
                  <ItemGrid items={userItems} />
                ) : (
                  <div className="text-center py-12">
                    <ShirtIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No items listed yet</h3>
                    <p className="text-gray-600 mb-6">Start by listing your first item to begin swapping</p>
                    <Link
                      to="/add-item"
                      className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      <PlusIcon className="h-5 w-5" />
                      <span>List Your First Item</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'swaps' && (
              <div>
                {userSwaps.length > 0 ? (
                  <div className="space-y-4">
                    {userSwaps.map((swap) => {
                      const item = items.find(i => i.id === swap.toItemId);
                      const isIncoming = swap.toUserId === user.id;
                      
                      return (
                        <div key={swap.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              {item && (
                                <img src={item.images[0]} alt={item.title} className="h-12 w-12 rounded-lg object-cover" />
                              )}
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {isIncoming ? 'Incoming' : 'Outgoing'} {swap.type === 'points' ? 'Point Redemption' : 'Swap Request'}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {item?.title} • {new Date(swap.createdDate).toLocaleDateString()}
                                </p>
                                {swap.message && (
                                  <p className="text-sm text-gray-500 mt-1">"{swap.message}"</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                swap.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                                swap.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                                swap.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
                              </span>
                              <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ArrowRightIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No swap requests yet</h3>
                    <p className="text-gray-600 mb-6">Start browsing items to make your first swap request</p>
                    <Link
                      to="/browse"
                      className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      <span>Browse Items</span>
                      <ArrowRightIcon className="h-5 w-5" />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="text-center py-12">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Activity feed coming soon</h3>
                <p className="text-gray-600">Track all your ReWear activities in one place</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;