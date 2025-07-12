import React from 'react';
import { Link } from 'react-router-dom';
import { ShirtIcon, HeartIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <ShirtIcon className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold">ReWear</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Building a sustainable fashion community through clothing exchanges. 
              Reduce waste, discover new styles, and connect with eco-conscious fashion lovers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm flex items-center justify-center space-x-1">
            <span>Made with</span>
            <HeartIcon className="h-4 w-4 text-emerald-400" />
            <span>for a sustainable future</span>
          </p>
          <p className="text-gray-400 text-xs mt-2">
            © 2025 ReWear. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs mt-2">
           Gpd by the ReWear Team.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;