import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { Navigate } from 'react-router-dom';
import { 
  UsersIcon, 
  ShirtIcon, 
  ArrowRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  TrashIcon,
  SearchIcon,
  FilterIcon
} from 'lucide-react';

const AdminPage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { items, updateItemStatus } = useApp();
  const [activeTab, setActiveTab] = useState<'users' | 'listings' | 'swaps'>('listings');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Mock users data for admin view
  const mockUsers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      points: 150,
      joinDate: '2024-01-15',
      status: 'active',
      itemsListed: 5,
      swapsCompleted: 8
    },
    {
      id: '2',
      name: 'Emma Chen',
      email: 'emma@example.com',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      points: 220,
      joinDate: '2024-01-10',
      status: 'active',
      itemsListed: 7,
      swapsCompleted: 12
    },
    {
      id: '3',
      name: 'Michael Rodriguez',
      email: 'michael@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      points: 85,
      joinDate: '2024-01-20',
      status: 'active',
      itemsListed: 3,
      swapsCompleted: 4
    }
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.uploaderName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Users', value: mockUsers.length, icon: UsersIcon, color: 'text-blue-600' },
    { label: 'Active Listings', value: items.filter(item => item.status === 'available').length, icon: ShirtIcon, color: 'text-emerald-600' },
    { label: 'Pending Review', value: items.filter(item => item.status === 'pending').length, icon: FilterIcon, color: 'text-amber-600' }
  ];

  const handleApproveItem = (itemId: string) => {
    updateItemStatus(itemId, 'available');
  };

  const handleRejectItem = (itemId: string) => {
    if (confirm('Are you sure you want to reject this item? This action cannot be undone.')) {
      // In a real app, this would remove the item
      console.log('Rejecting item:', itemId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage users, listings, and platform activity</p>
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
                { id: 'listings', label: 'Manage Listings' },
                { id: 'users', label: 'Manage Users' },
                { id: 'swaps', label: 'Swap Activity' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'listings' && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="relative max-w-md flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search listings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                    <option value="swapped">Swapped</option>
                  </select>
                </div>

                {/* Listings Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Item</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Uploader</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Points</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <img src={item.images[0]} alt={item.title} className="h-12 w-12 rounded-lg object-cover" />
                              <div>
                                <div className="font-medium text-gray-900">{item.title}</div>
                                <div className="text-sm text-gray-500">{item.category} • Size {item.size}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              {item.uploaderAvatar && (
                                <img src={item.uploaderAvatar} alt={item.uploaderName} className="h-8 w-8 rounded-full object-cover" />
                              )}
                              <span className="text-sm text-gray-900">{item.uploaderName}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === 'available' ? 'bg-emerald-100 text-emerald-800' :
                              item.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-900">{item.pointValue}</td>
                          <td className="py-4 px-4 text-sm text-gray-500">
                            {new Date(item.uploadDate).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                <EyeIcon className="h-4 w-4" />
                              </button>
                              {item.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleApproveItem(item.id)}
                                    className="p-1 text-emerald-400 hover:text-emerald-600 transition-colors"
                                  >
                                    <CheckCircleIcon className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleRejectItem(item.id)}
                                    className="p-1 text-red-400 hover:text-red-600 transition-colors"
                                  >
                                    <XCircleIcon className="h-4 w-4" />
                                  </button>
                                </>
                              )}
                              <button className="p-1 text-red-400 hover:text-red-600 transition-colors">
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Points</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Items Listed</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Swaps</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Join Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map((userData) => (
                        <tr key={userData.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <img src={userData.avatar} alt={userData.name} className="h-10 w-10 rounded-full object-cover" />
                              <div>
                                <div className="font-medium text-gray-900">{userData.name}</div>
                                <div className="text-sm text-gray-500">{userData.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-900">{userData.points}</td>
                          <td className="py-4 px-4 text-sm text-gray-900">{userData.itemsListed}</td>
                          <td className="py-4 px-4 text-sm text-gray-900">{userData.swapsCompleted}</td>
                          <td className="py-4 px-4 text-sm text-gray-500">
                            {new Date(userData.joinDate).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                <EyeIcon className="h-4 w-4" />
                              </button>
                              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                                View Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'swaps' && (
              <div className="text-center py-12">
                <ArrowRightIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Swap activity monitoring</h3>
                <p className="text-gray-600">Track and manage all swap transactions in the platform</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;