export default function Features() {
  const features = [
    {
      icon: '🌐',
      title: '360° Virtual Tours',
      description: 'Immersive VR experiences that transport you inside ancient monasteries using cutting-edge Three.js technology.'
    },
    {
      icon: '🗺️',
      title: 'Interactive Maps',
      description: 'Explore monastery locations worldwide with detailed maps showing nearby attractions and historical context.'
    },
    {
      icon: '🎧',
      title: 'Multilingual Narration',
      description: 'Listen to guided tours in English, Hindi, Nepali, and Tibetan with AI-powered voice synthesis.'
    },
    {
      icon: '📚',
      title: 'Digital Archives',
      description: 'Access thousands of digitized manuscripts, artifacts, and historical documents with AI-powered search.'
    },
    {
      icon: '📅',
      title: 'Events & Booking',
      description: 'Discover upcoming monastery events, festivals, and book your visits with integrated calendar system.'
    },
    {
      icon: '🤖',
      title: 'AI-Powered Search',
      description: 'Find specific content using natural language queries like "18th century monasteries with murals".'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cutting-Edge Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience monastery heritage like never before with our advanced technology platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Begin Your Journey?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of users exploring the world's most sacred spaces
            </p>
            <button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}