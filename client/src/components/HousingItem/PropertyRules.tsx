import React from 'react';
import { Cigarette, Music, Clock } from 'lucide-react';

export const PropertyRules: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">PG Rules</h2>
      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <Cigarette className="w-5 h-5 text-gray-600" />
          <span className="text-sm">Smoking</span>
        </div>
        <div className="flex items-center gap-2">
          <Music className="w-5 h-5 text-gray-600" />
          <span className="text-sm">Drinking</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          <span className="text-sm">Entry time</span>
        </div>
      </div>
    </div>
  );
}