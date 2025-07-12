import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import ItemCarousel from '../components/Items/ItemCarousel';
import { 
  ArrowRightIcon, 
  RecycleIcon, 
  UsersIcon, 
  HeartIcon,
  ShirtIcon,
  CoinsIcon,
  TrendingUpIcon
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const { items } = useApp();
  const { user } = useAuth();
  const featuredItems = items.slice(0, 8);

  const categories = [
    { name: 'Tops', image: 'https://images.unsplash.com/photo-1485518882345-15568b007407?w=300&h=300&fit=crop', count: 45 },
    { name: 'Outerwear', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&h=300&fit=crop', count: 32 },
    { name: 'Dresses', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop', count: 28 },
    { name: 'Pants', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop', count: 38 },
    { name: 'Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop', count: 25 },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=300&fit=crop', count: 19 }
  ];

  const stats = [
    { label: 'Items Exchanged', value: '10,000+', icon: RecycleIcon },
    { label: 'Active Members', value: '5,000+', icon: UsersIcon },
    { label: 'CO2 Saved', value: '50 tons', icon: HeartIcon }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Give Your Clothes a 
                  <span className="text-emerald-600"> Second Life</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join the sustainable fashion revolution. Exchange unworn clothes with a community 
                  that cares about style and the planet.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <>
                    <Link
                      to="/browse"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                    >
                      <span>Start Browsing</span>
                      <ArrowRightIcon className="h-5 w-5" />
                    </Link>
                    <Link
                      to="/add-item"
                      className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
                    >
                      List an Item
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                    >
                      <span>Start Swapping</span>
                      <ArrowRightIcon className="h-5 w-5" />
                    </Link>
                    <Link
                      to="/browse"
                      className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
                    >
                      Browse Items
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop" 
                      alt="Fashion items" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop" 
                      alt="Sustainable fashion" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop" 
                      alt="Clothing exchange" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&h=300&fit=crop" 
                      alt="Vintage clothing" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full">
                  <stat.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Discover amazing pieces in every category</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/browse?category=${category.name}`}
                className="group text-center space-y-3 hover:scale-105 transition-transform duration-300"
              >
                <div className="aspect-square rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">{category.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ItemCarousel 
            items={featuredItems} 
            title="Featured Items" 
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How ReWear Works</h2>
            <p className="text-xl text-gray-600">Simple steps to start your sustainable fashion journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full">
                <ShirtIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">List Your Items</h3>
              <p className="text-gray-600">
                Upload photos and details of clothes you no longer wear. 
                Set your preferences for swaps or point values.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-full">
                <UsersIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Connect & Browse</h3>
              <p className="text-gray-600">
                Discover items from our community. Request swaps or use points 
                to get pieces you love.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-full">
                <CoinsIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Earn & Exchange</h3>
              <p className="text-gray-600">
                Complete swaps to earn points. Use points for future exchanges 
                and build your sustainable wardrobe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Ready to Transform Your Wardrobe?</h2>
            <p className="text-xl text-gray-300">
              Join thousands of fashion lovers making sustainable choices every day.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user && (
              <Link
                to="/signup"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Join ReWear Today</span>
                <TrendingUpIcon className="h-5 w-5" />
              </Link>
            )}
            <Link
              to="/browse"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              Explore Items
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;