import React from 'react';
import { Truck, Headset as HeadsetMic, ShieldCheck } from 'lucide-react';

const AdSection: React.FC = () => {
  return (
    <div className="w-[90%] mx-auto my-16">
      {/* Main Ad Banner */}
      <div className="relative h-[300px] rounded-xl overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Special Offer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="text-white p-12">
            <h2 className="text-4xl font-bold mb-4">Special Offer</h2>
            <p className="text-xl mb-6 max-w-md">
              Get an extra 20% off when you spend $100 or more
            </p>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-3 gap-8">
        {[
          {
            icon: Truck,
            title: "Free Shipping",
            description: "Free shipping on all orders over $50",
          },
          {
            icon: HeadsetMic,
            title: "24/7 Support",
            description: "Round the clock customer service",
          },
          {
            icon: ShieldCheck,
            title: "Secure Payment",
            description: "100% secure payment methods",
          },
        ].map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center group"
          >
            <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors mb-4">
              <Icon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdSection;