import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Boxes, Menu, X, Bot, Rocket } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Boxes className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">DropFlow</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/features" className="text-gray-700 hover:text-indigo-600">Features</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-indigo-600">Pricing</Link>
            <Link to="/analytics" className="text-gray-700 hover:text-indigo-600">Analytics & Social</Link>
            <Link to="/product-identifier" className="text-gray-700 hover:text-indigo-600">Product ID</Link>
            <Link to="/lead-extractor" className="text-gray-700 hover:text-indigo-600 flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Lead Bot
            </Link>
            <Link to="/ecomboost" className="text-gray-700 hover:text-indigo-600 flex items-center gap-2">
              <Rocket className="h-5 w-5" />
              EcomBoost AI
            </Link>
            {token ? (
              <button 
                onClick={handleLogout}
                className="text-gray-700 hover:text-indigo-600"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
                <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  Start Free Trial
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link to="/features" className="block px-3 py-2 text-gray-700 hover:bg-indigo-50">Features</Link>
              <Link to="/pricing" className="block px-3 py-2 text-gray-700 hover:bg-indigo-50">Pricing</Link>
              <Link to="/analytics" className="block px-3 py-2 text-gray-700 hover:bg-indigo-50">Analytics & Social</Link>
              <Link to="/product-identifier" className="block px-3 py-2 text-gray-700 hover:bg-indigo-50">Product ID</Link>
              <Link to="/lead-extractor" className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Lead Bot
              </Link>
              <Link to="/ecomboost" className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                EcomBoost AI
              </Link>
              {token ? (
                <button 
                  onClick={handleLogout}
                  className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 w-full text-left"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 text-gray-700 hover:bg-indigo-50">Login</Link>
                  <Link to="/signup" className="block px-3 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg mx-3">
                    Start Free Trial
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}