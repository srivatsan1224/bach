import React, { useState } from 'react';
import { Calendar, Music, Users, Dumbbell, Theater as Theatre, PlaneTakeoff, Film, PartyPopper, ArrowRight, Star, Heart, Zap, Sparkles } from 'lucide-react';

const categories = [
  { icon: <Users className="w-10 h-10" />, name: 'Community Hangouts', color: 'from-pink-500 to-rose-500' },
  { icon: <Calendar className="w-10 h-10" />, name: 'Workshops & Skills', color: 'from-purple-500 to-indigo-500' },
  { icon: <PartyPopper className="w-10 h-10" />, name: 'Festive Celebrations', color: 'from-yellow-500 to-orange-500' },
  { icon: <Music className="w-10 h-10" />, name: 'Music Nights', color: 'from-green-500 to-teal-500' },
  { icon: <Dumbbell className="w-10 h-10" />, name: 'Health & Fitness', color: 'from-blue-500 to-cyan-500' },
  { icon: <Theatre className="w-10 h-10" />, name: 'Comedy & Arts', color: 'from-red-500 to-pink-500' },
  { icon: <PlaneTakeoff className="w-10 h-10" />, name: 'Adventures', color: 'from-violet-500 to-purple-500' },
  { icon: <Film className="w-10 h-10" />, name: 'Movies & Shows', color: 'from-fuchsia-500 to-pink-500' },
];

const events = [
  {
    title: 'Neon Night Festival 2024',
    date: 'Sat, Jan 6th | 9pm',
    price: '₹999',
    enrolled: '15k+ Going',
    tags: ['Music', 'Party', 'Dance'],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2000&q=80',
    featured: true
  },
  {
    title: 'Silent Disco Party',
    date: 'Fri, Jan 5th | 8pm',
    price: '₹799',
    enrolled: '8k+ Going',
    tags: ['Dance', 'Music'],
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=2000&q=80'
  },
  {
    title: 'Gaming Tournament',
    date: 'Sun, Jan 7th | 2pm',
    price: '₹499',
    enrolled: '5k+ Going',
    tags: ['Gaming', 'Competition'],
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&q=80'
  },
  {
    title: 'Street Food Festival',
    date: 'Sat, Jan 13th | 11am',
    price: 'Free Entry',
    enrolled: '20k+ Going',
    tags: ['Food', 'Festival'],
    image: 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?auto=format&fit=crop&w=2000&q=80'
  }
];

function DiscoBall({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 animate-pulse-disco">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      </div>
      <div className="absolute inset-0 animate-disco-sparkle">
        <Sparkles className="w-full h-full text-white/50" />
      </div>
    </div>
  );
}

function EventsHome() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#020B2D] text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-[600px]">
        {/* Background with stars effect */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-[#020B2D]/80"></div>
          {/* Animated light beams */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="light-beam-1"></div>
            <div className="light-beam-2"></div>
            <div className="light-beam-3"></div>
          </div>
        </div>

        {/* Multiple Disco Balls */}
        <DiscoBall className="absolute top-10 right-10 w-32 h-32 animate-spin-slow" />
        <DiscoBall className="absolute top-20 left-20 w-24 h-24 animate-spin-slow-reverse" />
        <DiscoBall className="absolute bottom-40 right-32 w-16 h-16 animate-spin-slow" />
        <DiscoBall className="absolute top-40 right-1/4 w-20 h-20 animate-spin-slow-reverse" />

        {/* 3D Glasses decorations */}
        <div className="absolute top-10 left-10 w-32 h-32 transform -rotate-12">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-blue-500/30 rounded-lg transform skew-x-6 animate-pulse"></div>
            <div className="absolute inset-0 bg-red-500/30 rounded-lg transform -skew-x-6 animate-pulse delay-75"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Navigation */}
          <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-2">
              <div className="relative">
                <PartyPopper className="w-8 h-8 text-pink-500 animate-bounce" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                Bachelors
              </span>
              <span className="text-3xl font-bold text-pink-500 animate-pulse">EVENTS</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm">
                Login
              </button>
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-colors animate-pulse">
                Sign Up
              </button>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center pt-16 pb-24 relative">
            {/* Floating party elements */}
            <div className="absolute inset-0 pointer-events-none">
              <Music className="absolute top-0 left-1/4 w-8 h-8 text-pink-500 animate-float" />
              <Star className="absolute top-1/3 right-1/4 w-6 h-6 text-yellow-500 animate-float delay-100" />
              <Heart className="absolute bottom-1/4 left-1/3 w-6 h-6 text-red-500 animate-float delay-200" />
            </div>

            <h1 className="text-7xl font-bold mb-6 leading-tight animate-text-glow">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                Book tickets to India's best events
              </span>
            </h1>
            <p className="text-2xl text-gray-300 mb-12">
              exclusively on bachelors.com
            </p>
            <div className="flex justify-center gap-6">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-colors text-xl font-bold flex items-center gap-2 animate-pulse-glow">
                Explore Events <ArrowRight className="w-6 h-6" />
              </button>
              <button className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-xl font-bold backdrop-blur-sm">
                Host Event
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020B2D] to-transparent"></div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          Find Your Vibe
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl p-6 card-hover cursor-pointer"
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`mb-4 p-4 rounded-xl bg-gradient-to-r ${category.color} transform transition-transform duration-300 ${hoveredCategory === index ? 'scale-110' : ''}`}>
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Events */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          Hot & Happening
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, index) => (
            <div key={index} className="glass-effect rounded-2xl overflow-hidden card-hover group">
              <div className="relative">
                <img src={event.image} alt={event.title} className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex gap-2">
                    {event.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white/20 text-sm backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {event.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4" /> Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 group-hover:text-pink-400 transition-colors">{event.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{event.date}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg bg-gradient-to-r from-violet-400 to-pink-400 text-transparent bg-clip-text">
                    {event.price}
                  </span>
                  <span className="flex items-center gap-1 text-gray-300">
                    <Heart className="w-4 h-4 text-pink-500" /> {event.enrolled}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsHome;