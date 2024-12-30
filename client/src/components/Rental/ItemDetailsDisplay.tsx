import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Star,
  ShoppingCart,
  CreditCard,
  Heart,
} from "lucide-react";

interface ItemDetailsProps {
  item: {
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    availability: string;
    imageUrl: string;
    specifications?: { [key: string]: string };
    ratings?: number;
    offers?: string[];
    rentalType: string;
    createdAt: string;
    updatedAt: string;
  };
}

const ItemDetailsDisplay: React.FC<ItemDetailsProps> = ({ item }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(item.imageUrl);

  const toggleDropdown = (section: string) => {
    setActiveDropdown(activeDropdown === section ? null : section);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 font-custom bg-gray-50">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center space-x-2">
          <li>
            <span className="text-gray-500">Home</span>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li>
            <span className="text-gray-500">Products</span>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li>
            <span className="text-primary font-medium">{item.name}</span>
          </li>
        </ol>
      </nav>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Image Gallery */}
          <div className="lg:w-1/2 p-6 bg-gray-50">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white">
              <img
                src={selectedImage || "https://via.placeholder.com/600"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {[item.imageUrl, item.imageUrl, item.imageUrl].map(
                (url, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(url)}
                    className={`relative aspect-square rounded-lg overflow-hidden ${
                      selectedImage === url ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <img
                      src={url || "https://via.placeholder.com/100"}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover hover:opacity-75 transition"
                    />
                  </button>
                )
              )}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="lg:w-1/2 p-6 lg:p-8 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {item.name}
                </h1>
                <div className="mt-2 flex items-center space-x-4">
                  {item.ratings && (
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">
                        {item.ratings}
                      </span>
                    </div>
                  )}
                  <span className="text-sm text-gray-500">|</span>
                  <span
                    className={`text-sm font-medium ${
                      item.availability === "In Stock"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.availability}
                  </span>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Heart className="w-6 h-6 text-gray-400 hover:text-red-500 transition" />
              </button>
            </div>

            <p className="text-gray-600 leading-relaxed">{item.description}</p>

            <div className="space-y-2">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{item.price}
                </span>
                <span className="text-lg text-gray-500">/month</span>
              </div>
              {item.originalPrice && (
                <div className="flex items-center space-x-3">
                  <span className="text-lg text-gray-400 line-through">
                    ₹{item.originalPrice}
                  </span>
                  {item.discount && (
                    <span className="px-2 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                      Save {item.discount}%
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex space-x-4">
                <button className="flex-1 flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition shadow-lg shadow-primary/25">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button className="flex-1 flex items-center justify-center px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition shadow-lg shadow-black/25">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Buy Now
                </button>
              </div>
            </div>

            {/* Offers Section */}
            {item.offers && item.offers.length > 0 && (
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Special Offers
                </h3>
                <div className="space-y-3">
                  {item.offers.map((offer, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 text-lg font-semibold">
                          %
                        </span>
                      </div>
                      <p className="text-green-800 text-sm">{offer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="pt-6 border-t border-gray-100 text-sm text-gray-500 grid grid-cols-2 gap-4">
              <div>
                <span className="block text-gray-400">Rental Type</span>
                <span className="font-medium text-gray-900">
                  {item.rentalType}
                </span>
              </div>
              <div>
                <span className="block text-gray-400">Last Updated</span>
                <span className="font-medium text-gray-900">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Product Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(item.specifications || {}).map(([key, value]) => (
            <div key={key} className="flex space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-1/3">
                <span className="font-medium text-gray-700 capitalize">
                  {key}
                </span>
              </div>
              <div className="w-2/3">
                <span className="text-gray-600">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="mt-8 space-y-4">
        {[
          {
            title: "Cancellation And Returns",
            content: "Free cancellations within 24 hours.",
            icon: "🔄",
          },
          {
            title: "Care Instructions",
            content: "Keep the product in a dry place.",
            icon: "💧",
          },
          {
            title: "Quality Performance",
            content: "Certified for durability and reliability.",
            icon: "✨",
          },
          {
            title: "FAQ",
            content: "Frequently asked questions.",
            icon: "❓",
          },
        ].map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleDropdown(section.title)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{section.icon}</span>
                <span className="font-medium text-gray-900">
                  {section.title}
                </span>
              </div>
              {activeDropdown === section.title ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {activeDropdown === section.title && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <p className="text-gray-600">{section.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDetailsDisplay;
