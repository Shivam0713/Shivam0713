'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';

interface Monastery {
  id: number;
  name: string;
  location: string;
  image: string;
  description: string;
  founded: number;
  languages: string[];
}

export default function ExplorePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  
  const monasteries: Monastery[] = [
    {
      id: 1,
      name: 'Tashilhunpo Monastery',
      location: 'Shigatse, Tibet',
      image: '/api/placeholder/400/300',
      description: 'One of the largest functioning monasteries in Tibet, founded in 1447.',
      founded: 1447,
      languages: ['English', 'Tibetan', 'Hindi', 'Nepali']
    },
    {
      id: 2,
      name: 'Hemis Monastery',
      location: 'Ladakh, India',
      image: '/api/placeholder/400/300',
      description: 'The largest and richest monastery in Ladakh, famous for its annual festival.',
      founded: 1630,
      languages: ['English', 'Hindi', 'Tibetan']
    },
    {
      id: 3,
      name: 'Rumtek Monastery',
      location: 'Sikkim, India',
      image: '/api/placeholder/400/300',
      description: 'The largest monastery in Sikkim and the seat of the Karmapa.',
      founded: 1966,
      languages: ['English', 'Hindi', 'Nepali']
    }
  ];

  const languages = ['English', 'Hindi', 'Nepali', 'Tibetan'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Sacred Monasteries
          </h1>
          <p className="text-xl text-gray-600">
            Take immersive 360° virtual tours of monasteries around the world
          </p>
        </div>

        {/* Language Selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Narration Language:
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Monastery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {monasteries.map((monastery) => (
            <div key={monastery.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center">
                <span className="text-white text-6xl">🏛️</span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {monastery.name}
                </h3>
                <p className="text-gray-600 mb-2">📍 {monastery.location}</p>
                <p className="text-gray-600 mb-2">📅 Founded: {monastery.founded}</p>
                <p className="text-gray-700 mb-4">{monastery.description}</p>
                
                <div className="mb-4">
                  <span className="text-sm text-gray-500">Available in: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {monastery.languages.map((lang) => (
                      <span
                        key={lang}
                        className={`px-2 py-1 text-xs rounded-full ${
                          lang === selectedLanguage
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-2 px-4 rounded-md transition-all duration-200">
                  Start 360° Tour
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Demo VR Viewer Placeholder */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">360° Virtual Tour Viewer</h2>
          <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">🥽</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Immersive VR Experience
            </h3>
            <p className="text-gray-600 mb-4">
              Experience monasteries in full 360° with WebXR support for VR headsets
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md">
                🎧 Audio Guide
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                🥽 VR Mode
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                📱 AR Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}