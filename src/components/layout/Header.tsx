import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-700">
              Naturah
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/collections/all" className="text-gray-600 hover:text-green-700">
              Products
            </Link>
            <Link href="/collections/watercolor-kits" className="text-gray-600 hover:text-green-700">
              Watercolor Kits
            </Link>
            <Link href="/collections/brushes" className="text-gray-600 hover:text-green-700">
              Brushes
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-green-700">
              About
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-green-700">
              <span className="sr-only">Search</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-green-700">
              <span className="sr-only">Cart</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 