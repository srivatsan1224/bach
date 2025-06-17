// src/components/Rental/LatestProductCard.tsx
// (Assuming this is the one imported by RentalHome.tsx)

import React from "react";
import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom"; // Only if this component itself handles navigation

export interface LatestProductCardProps { // Exporting the interface is good practice
  id: string;
  name: string;
  img: string;
  price: number; // CHANGED from rent: string
  category: string;
  originalPrice?: number; // Optional: if you want to show a strikethrough price
  discount?: number;      // Optional: if you want to show a discount
  // Add an onClick prop if the card itself should handle clicks internally
  // onClick?: (id: string, category: string) => void;
}

const LatestProductCard: React.FC<LatestProductCardProps> = ({
  id,
  name,
  img,
  price, // CHANGED: Destructure price
  category,
  originalPrice,
  // onClick, // Destructure if you add onClick prop
}) => {
  // const navigate = useNavigate(); // Only if using internal navigation

  // const handleCardClick = () => {
  //   if (onClick) {
  //     onClick(id, category);
  //   } else {
  //     // Fallback navigation if no onClick prop is provided
  //     // navigate(`/home/rental/${category.toLowerCase().replace(/\s+/g, "-")}/${id}`);
  //   }
  // };

  return (
    // If the parent `motion.div` in RentalHome handles the click, this component doesn't need its own top-level onClick.
    // Otherwise, add onClick={handleCardClick} here.
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full" // Added flex flex-col h-full for better layout
    >
      <div className="relative h-48 w-full"> {/* Ensure image container takes full width */}
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
          {category}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow"> {/* Added flex-grow */}
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate" title={name}>{name}</h3> {/* Added truncate and title for long names */}
        
        <div className="mt-auto"> {/* Pushes price and button to the bottom if content above is short */}
          <div className="flex items-baseline space-x-1 mb-3">
            <span className="text-blue-600 font-bold text-xl">
              ₹{price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-gray-400 line-through text-sm">
                ₹{originalPrice.toFixed(2)}
              </span>
            )}
             <span className="text-sm font-normal text-gray-500">/ month</span> {/* Assuming per month */}
          </div>
          {/* 
            The button below is styled as "View Details".
            Since RentalHome.tsx makes the whole card clickable for navigation,
            this button might be visually redundant or could be an "Add to Cart" button.
            For now, it's just a visual element.
          */}
          <button
            // onClick={handleCardClick} // Only if this button specifically handles navigation
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestProductCard;