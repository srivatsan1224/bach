import React from "react";
import { Calendar, MapPin, Star, Heart } from "lucide-react";

interface EventProps {
  id: number;
  title: string;
  image: string;
  date: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  tag: string;
}

const EventCard: React.FC<{ event: EventProps; onClick: () => void }> = ({ event, onClick }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={onClick} // Add this onClick handler
    >
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-indigo-600">
            {event.tag}
          </span>
        </div>
        <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors group">
          <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <span>{event.date}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
          {event.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4 text-indigo-600" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium">{event.rating}</span>
            <span className="text-gray-500">({event.reviews})</span>
          </div>
          <span className="font-bold text-lg text-indigo-600">{event.price}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
