import React from 'react';
import { Gift, ShoppingBag, Sparkles } from 'lucide-react';

const Promotions: React.FC = () => {
  return (
    <div className="w-[90%] mx-auto my-16 grid grid-cols-10 gap-6">
      {/* First Column (8 spans) */}
      <div className="col-span-8 grid grid-rows-2 gap-6">
        {/* First Row */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Holiday Special</h3>
              <p className="text-purple-100 mb-4">Up to 40% off on selected items</p>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-medium hover:bg-purple-50 transition-colors">
                Shop Now
              </button>
            </div>
            <Gift className="absolute bottom-0 right-0 h-32 w-32 text-white/20 transform translate-x-8 translate-y-8 group-hover:translate-y-4 transition-transform" />
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Flash Sale</h3>
              <p className="text-blue-100 mb-4">24 hours only - Don't miss out!</p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors">
                Shop Now
              </button>
            </div>
            <Sparkles className="absolute bottom-0 right-0 h-32 w-32 text-white/20 transform translate-x-8 translate-y-8 group-hover:translate-y-4 transition-transform" />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Fashion Week</h3>
              <p className="text-pink-100 mb-4">New arrivals every day</p>
              <button className="bg-white text-pink-600 px-6 py-2 rounded-full font-medium hover:bg-pink-50 transition-colors">
                Explore
              </button>
            </div>
            <ShoppingBag className="absolute bottom-0 right-0 h-32 w-32 text-white/20 transform translate-x-8 translate-y-8 group-hover:translate-y-4 transition-transform" />
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Clearance Sale</h3>
              <p className="text-amber-100 mb-4">Up to 70% off everything</p>
              <button className="bg-white text-orange-600 px-6 py-2 rounded-full font-medium hover:bg-orange-50 transition-colors">
                Shop Now
              </button>
            </div>
            <Gift className="absolute bottom-0 right-0 h-32 w-32 text-white/20 transform translate-x-8 translate-y-8 group-hover:translate-y-4 transition-transform" />
          </div>
        </div>
      </div>

      {/* Second Column (2 spans) */}
      <div className="col-span-2 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-xl p-8 relative overflow-hidden group">
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Premium Collection</h3>
            <p className="text-emerald-100 mb-4">Exclusive designs for you</p>
          </div>
          <button className="bg-white text-emerald-600 px-6 py-2 rounded-full font-medium hover:bg-emerald-50 transition-colors mt-auto">
            Discover
          </button>
        </div>
        <Sparkles className="absolute bottom-0 right-0 h-32 w-32 text-white/20 transform translate-x-8 translate-y-8 group-hover:translate-y-4 transition-transform" />
      </div>
    </div>
  );
};

export default Promotions;