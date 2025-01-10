import React from 'react';
import { Share } from 'lucide-react';

interface PropertyHeaderProps {
  title: string;
  location: string;
  rent: number;
  deposit: number;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({ title, location, rent, deposit }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex-1">
        <h1 className="text-lg font-medium text-gray-900 mb-2">{title}</h1>
        <p className="text-sm text-gray-600">{location}</p>
      </div>
      <div className="flex items-center gap-8">
        <div>
          <p className="text-sm text-gray-600">Monthly Rent</p>
          <p className="font-semibold">₹{rent.toLocaleString()}+</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Deposit</p>
          <p className="font-semibold">₹{deposit.toLocaleString()}</p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Share className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}