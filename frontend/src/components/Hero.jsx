import React, { useState, useEffect } from 'react';
import { Mountain, Star, ArrowRight, Play } from 'lucide-react';

export default function NepalHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Optional subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
      
      {/* Main Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Simple Badge */}
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full mb-8">
              <Mountain className="w-4 h-4 text-orange-500 mr-2" />
              <span className="text-gray-700 text-sm font-medium">Discover Nepal</span>
            </div>
          </div>

          {/* Clean Headline */}
          <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="block">Experience the</span>
              <span className="block text-orange-500">Heart of Nepal</span>
            </h1>
          </div>

          {/* Simplified Subheading */}
          <div className={`transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Explore ancient temples, majestic mountains, and rich cultural heritage in the world's most captivating destination.
            </p>
          </div>

          {/* Clean CTA Buttons */}
          <div className={`transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              
              {/* Primary CTA */}
              <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center space-x-2">
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA */}
              <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300">
                <Play className="w-4 h-4" />
                <a href="https://youtu.be/QLEiZJdvyZ4?si=GJzl_ogdmHKgrVRU" target="_blank" rel="noopener noreferrer">
                  Watch Video
                </a>
              </button>
            </div>
          </div>

          {/* Minimal Stats */}
          <div className={`transform transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">8,848m</div>
                <div className="text-gray-500 text-sm">Everest Height</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">125+</div>
                <div className="text-gray-500 text-sm">Ethnic Groups</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">2,500+</div>
                <div className="text-gray-500 text-sm">Years History</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}