import React from 'react';
import { Wallet, FileText, Clock, Calendar, Home } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Our Services</h2>
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <div className="bg-red-100 p-2 rounded-full mb-2">
            <Wallet className="w-6 h-6 text-red-600" />
          </div>
          <span className="text-sm">Pay</span>
          <span className="text-sm">secure Rent</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-2 rounded-full mb-2">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-sm">Create</span>
          <span className="text-sm">Agreement</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-green-100 p-2 rounded-full mb-2">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-sm">Schedule</span>
          <span className="text-sm">Viewing Call</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-purple-100 p-2 rounded-full mb-2">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-sm">Book</span>
          <span className="text-sm">House Services</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-orange-100 p-2 rounded-full mb-2">
            <Home className="w-6 h-6 text-orange-600" />
          </div>
          <span className="text-sm">Rent/Buy</span>
          <span className="text-sm">Furniture</span>
        </div>
      </div>
    </div>
  );
}