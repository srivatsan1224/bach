import { Gift, Clock, ChevronRight } from 'lucide-react';

const FeaturedEventBanner = () => {
  return (
    <div className="bg-background py-6 animate-fade-in">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-white/90 mb-2">
              <div className="bg-white/10 p-2 rounded-lg">
                <Gift className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Special Offer</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              New Year's Eve Gala 2024
            </h3>
            <p className="text-white/90 mb-4">
              Early bird tickets available with 30% off! Don't miss the biggest celebration of the year.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 px-4 py-2 rounded-lg text-white backdrop-blur-md">
                <span className="font-bold">₹1999</span>
                <span className="text-white/70 line-through ml-2">₹2999</span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg text-white flex items-center gap-2 backdrop-blur-md">
                <Clock className="w-4 h-4" />
                <span>Offer ends in 3 days</span>
              </div>
            </div>
          </div>
          <button className="bg-white text-primary-700 px-6 py-3 rounded-lg hover:bg-primary-50 transition-all transform hover:scale-105 font-medium flex items-center gap-2 shadow-lg">
            Book Early Bird Tickets
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEventBanner;