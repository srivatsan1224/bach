import VideoHero from '../../components/EventsComp/VideoHero';
import FeaturedEventBanner from '../../components/EventsComp/FeaturedEventBanner';
import Categories from '../../components/EventsComp/Categories';
import { Calendar, MapPin, Clock, Star, Heart, Share2, ChevronRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <VideoHero />
      <FeaturedEventBanner />
      <Categories />

      {/* Featured Organizers */}
      <div className="py-20 bg-muted">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Top Event Organizers</h2>
          <p className="text-muted-foreground mb-12 text-lg">Learn from the best in the industry</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* ... keep existing code (organizer mapping) */}
          </div>
        </div>
      </div>

      {/* Trending Events */}
      <div className="py-20 bg-background">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Trending Events</h2>
              <p className="text-muted-foreground text-lg">Discover what's popular right now</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <button className="text-primary-600 hover:text-primary-700 font-medium">View All</button>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary-600 hover:border-primary-600">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary-600 hover:border-primary-600">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* ... keep existing code (event mapping) */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;