import React from "react";
import { useNavigate } from "react-router-dom";

interface CategoryButtonProps {
  img: string;
  name: string;
  description: string; // Added for the subtitle
  route: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  img,
  name,
  description,
  route,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      className="flex flex-col items-start p-6 bg-white border border-gray-200 rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      {/* Icon/Image */}
      <img src={img} alt={name} className="h-16 w-16 mb-4 object-contain" />

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2">{name}</h3>

      {/* Subtitle */}
      <p className="text-sm text-gray-500 mb-4">{description}</p>

      {/* Explore Link */}
      <div className="text-blue-600 font-medium flex items-center">
        Explore
        <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
    </div>
  );
};

export default CategoryButton;
