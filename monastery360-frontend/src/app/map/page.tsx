'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';

interface MapLocation {
  id: number;
  name: string;
  lat: number;
  lon: number;
  country: string;
  description: string;
  type: 'monastery' | 'attraction';
}

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  
  const locations: MapLocation[] = [
    {
      id: 1,
      name: 'Tashilhunpo Monastery',
      lat: 29.2675,
      lon: 88.8707,
      country: 'Tibet',
      description: 'Historic monastery founded in 1447',
      type: 'monastery'
    },
    {
      id: 2,
      name: 'Hemis Monastery',
      lat: 34.0082,
      lon: 77.6619,
      country: 'India',
      description: 'Largest monastery in Ladakh',
      type: 'monastery'
    },
    {
      id: 3,
      name: 'Rumtek Monastery',
      lat: 27.3012,
      lon: 88.5587,
      country: 'India',
      description: 'Seat of the Karmapa in Sikkim',
      type: 'monastery'
    },
    {
      id: 4,
      name: 'Tiger\'s Nest Monastery',
      lat: 27.4916,
      lon: 89.3639,
      country: 'Bhutan',
      description: 'Cliffside monastery in Bhutan',
      type: 'monastery'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive Monastery Map
          </h1>
          <p className="text-xl text-gray-600">
            Discover monasteries and nearby attractions around the world
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 relative flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Interactive Map
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Mapbox integration coming soon
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                      🛰️ Satellite View
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
                      🗺️ Street View
                    </button>
                  </div>
                </div>
                
                {/* Sample Map Markers */}
                <div className="absolute inset-0 pointer-events-none">
                  {locations.map((location, index) => (
                    <div
                      key={location.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
                      style={{
                        left: `${20 + index * 15}%`,
                        top: `${30 + index * 10}%`
                      }}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200">
                        {location.type === 'monastery' ? '🏛️' : '📍'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Map Controls */}
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex flex-wrap gap-2">
                  <button className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                    🏛️ Monasteries
                  </button>
                  <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    🏨 Hotels
                  </button>
                  <button className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    🍽️ Restaurants
                  </button>
                  <button className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    🎭 Attractions
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Location Details
              </h2>
              
              {selectedLocation ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {selectedLocation.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    📍 {selectedLocation.country}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {selectedLocation.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Coordinates: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lon.toFixed(4)}
                  </p>
                  
                  <div className="space-y-2">
                    <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md">
                      Start Virtual Tour
                    </button>
                    <button className="w-full border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white py-2 px-4 rounded-md">
                      View Gallery
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-md">
                      Get Directions
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">📍</div>
                  <p>Click on a map marker to view location details</p>
                </div>
              )}
            </div>

            {/* Nearby Attractions */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Nearby Attractions
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">🏨</span>
                  <div>
                    <h4 className="font-medium text-gray-900">Mountain Resort</h4>
                    <p className="text-sm text-gray-600">2.3 km away</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">🍽️</span>
                  <div>
                    <h4 className="font-medium text-gray-900">Local Restaurant</h4>
                    <p className="text-sm text-gray-600">1.8 km away</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">🎭</span>
                  <div>
                    <h4 className="font-medium text-gray-900">Cultural Center</h4>
                    <p className="text-sm text-gray-600">3.1 km away</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}