import React, { useState, useEffect } from "react";
import HeroSection from "../../components/EventsComp/HeroSection";
import EventCard from "../../components/EventsComp/EventCard";
import CategoryCard from "../../components/EventsComp/CategoryCard";
import NewsletterSection from "../../components/EventsComp/NewsletterSection";

// Sample categories data (remains static)
const categories = [
  { name: "Music", icon: "Music", gradient: "from-pink-500 to-rose-500", count: "2.5k events" },
  { name: "Sports", icon: "Dumbbell", gradient: "from-blue-500 to-cyan-500", count: "1.8k events" },
  { name: "Arts", icon: "Palette", gradient: "from-violet-500 to-purple-500", count: "3.2k events" },
  { name: "Food", icon: "UtensilsCrossed", gradient: "from-orange-500 to-amber-500", count: "1.5k events" },
  { name: "Technology", icon: "Laptop", gradient: "from-emerald-500 to-teal-500", count: "2.1k events" },
  { name: "Business", icon: "Briefcase", gradient: "from-blue-600 to-indigo-600", count: "1.9k events" },
  { name: "Lifestyle", icon: "Heart", gradient: "from-red-500 to-pink-500", count: "2.7k events" },
  { name: "Education", icon: "GraduationCap", gradient: "from-amber-500 to-orange-500", count: "2.3k events" },
];

const Index = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch upcoming events from backend API
    const fetchUpcomingEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        const data = await response.json();
        console.log(data);
        setUpcomingEvents(data); // Set fetched data into state
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <h2 className="text-3xl font-bold text-gray-100 mb-6">Upcoming Events</h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading events...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <p className="col-span-full text-center text-gray-600">No upcoming events found.</p>
            )}
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore by Category</h2>
          <p className="text-xl text-gray-600">Find the perfect event that matches your interests</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default Index;
