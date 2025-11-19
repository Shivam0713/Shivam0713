import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-red-100 opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Discover Ancient
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
              Monastery Heritage
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience immersive 360° virtual tours of sacred monasteries around the world. 
            Explore ancient architecture, listen to multilingual narrations, and discover 
            centuries of spiritual heritage through cutting-edge technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/explore"
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transform hover:scale-105 transition-all duration-200"
            >
              Start Exploring
            </Link>
            <Link 
              href="/map"
              className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-200"
            >
              View Map
            </Link>
          </div>
          
          {/* Statistics */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">50+</div>
              <div className="text-gray-600">Monasteries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">4</div>
              <div className="text-gray-600">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">1000+</div>
              <div className="text-gray-600">Artifacts</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-200 rounded-full opacity-20"></div>
    </div>
  );
}