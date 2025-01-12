import React, { useState } from 'react';
import { Search, MapPin, Building, Home, ChevronDown, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("PG/Hostel");
  const [selectedCity, setSelectedCity] = useState("Chennai");
  
  const popularSearches = [
    'PGs in Anna Nagar',
    'Flats in T.Nagar',
    'Hostels in Velachery',
    'Co-living in OMR'
  ];

  return (
    <div className='p-8'>
    
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden p-8 rounded-xl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075')] bg-cover bg-center ">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/90 " />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          <span className="text-white">Find Your Perfect </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
            Bachelor Home
          </span>
        </h1>
        
        <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto animate-fade-in-up">
          Discover verified PGs, apartments, and co-living spaces tailored for bachelors across India
        </p>

        {/* Search Box */}
        <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-2xl max-w-4xl mx-auto animate-fade-in-up">
          <div className="grid md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-5 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-emerald-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search by locality, landmark, or project..."
                className="w-full h-12 pl-12 rounded-xl bg-white/90 hover:bg-white focus:ring-2 focus:ring-emerald-400/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Property Type */}
            <div className="md:col-span-3 relative group">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-emerald-500 transition-colors" size={20} />
              <select 
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/90 hover:bg-white focus:ring-2 focus:ring-emerald-400/50 transition-all appearance-none cursor-pointer"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option>PG/Hostel</option>
                <option>Apartment</option>
                <option>Co-living</option>
                <option>Co-Working Space</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none " size={16} />
            </div>

            {/* City Selection */}
            <div className="md:col-span-2 relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-emerald-500 transition-colors" size={20} />
              <select
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/90 hover:bg-white focus:ring-2 focus:ring-emerald-400/50 transition-all appearance-none cursor-pointer"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option>Chennai</option>
                <option>Bangalore</option>
                <option>Mumbai</option>
                <option>Delhi</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <Link to='/propertylist'>
              <button className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group">
                <span className="flex items-center justify-center gap-2">
                  Search
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              </Link>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center text-white/80 text-sm">
            <span className="text-white/60">Popular:</span>
            {popularSearches.map((item) => (
              <button 
                key={item} 
                className="px-4 py-1 rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Hero;