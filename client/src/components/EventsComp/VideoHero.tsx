import React from 'react';
import { Search, Calendar } from 'lucide-react';

const VideoHero = () => {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://cdn.coverr.co/videos/coverr-a-concert-crowd-enjoying-the-music-2633/1080p.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
        <div className="relative h-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Experience <span className="text-primary-400">Live</span> Events
              <br />Like Never Before
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
              Discover extraordinary concerts, shows, and experiences in your city
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search events, artists, or venues..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/90 backdrop-blur-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-lg"
                />
              </div>
              <button className="bg-primary-600 text-white px-8 py-4 rounded-xl hover:bg-primary-700 transition-all transform hover:scale-105 font-medium text-lg shadow-lg flex items-center gap-2 whitespace-nowrap">
                <Calendar className="w-5 h-5" />
                Find Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;