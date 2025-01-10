import React from 'react';
import { Bath, Wind, Square, BookOpen, Shield } from 'lucide-react';

interface RoomDetailsProps {
  type: 'double' | 'triple';
  rent: number;
  deposit: number;
}

export const RoomDetails: React.FC<RoomDetailsProps> = ({ type, rent, deposit }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">
        {type === 'double' ? 'Double' : 'Triple'} Sharing Room Details
      </h2>
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600">Rent for {type} Occupancy</p>
          <p className="font-semibold">₹ {rent.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Security Deposit</p>
          <p className="font-semibold">₹ {deposit.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col items-center">
          <Bath className="w-6 h-6 text-gray-600" />
          <span className="text-sm mt-1">Attached bathroom</span>
        </div>
        <div className="flex flex-col items-center">
          <Wind className="w-6 h-6 text-gray-600" />
          <span className="text-sm mt-1">Air conditioner</span>
        </div>
        <div className="flex flex-col items-center">
          <Square className="w-6 h-6 text-gray-600" />
          <span className="text-sm mt-1">Cupboard</span>
        </div>
        <div className="flex flex-col items-center">
          <BookOpen className="w-6 h-6 text-gray-600" />
          <span className="text-sm mt-1">Bedding</span>
        </div>
        <div className="flex flex-col items-center">
          <Shield className="w-6 h-6 text-gray-600" />
          <span className="text-sm mt-1">Gated</span>
        </div>
      </div>
    </div>
  );
}