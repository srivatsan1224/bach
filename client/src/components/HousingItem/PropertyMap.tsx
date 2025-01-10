import React from 'react';
import { MapPin } from 'lucide-react';

export const PropertyMap: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Neighbourhood</h2>
      <div className="h-[400px] bg-gray-100 rounded-lg relative">
        <div className="absolute top-4 left-4 bg-white rounded-md shadow p-2 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-600" />
          <span className="text-sm">Your Location</span>
        </div>
        {/* Map would be integrated here */}
      </div>
    </div>
  );
}