'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Monastery360</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/explore" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
              Explore
            </Link>
            <Link href="/map" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
              Map
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
              Events
            </Link>
            <Link href="/archives" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
              Archives
            </Link>
            <Link href="/login" className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link href="/" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/explore" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
              Explore
            </Link>
            <Link href="/map" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
              Map
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
              Events
            </Link>
            <Link href="/archives" className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium">
              Archives
            </Link>
            <Link href="/login" className="bg-orange-600 hover:bg-orange-700 text-white block px-3 py-2 rounded-md text-base font-medium">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}