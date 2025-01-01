import React from "react";
import { useNavigate } from "react-router-dom";

interface LatestProductCardProps {
  img: string; // Image URL
  name: string; // Name of the product
  rent: string; // Rent price
  category: string; // Category of the product (e.g., furniture, appliances)
  id: string; // ID of the product
}

const LatestProductCard: React.FC<LatestProductCardProps> = ({
  img,
  name,
  rent,
  category,
  id,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/home/rental/${category}/${id}`);
    console.log(`Navigating to: /home/rental/${category}/${id}`);
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white">
      {/* Image Section */}
      <div className="h-40 w-full overflow-hidden rounded-t-lg">
        <img src={img} alt={name} className="h-full w-full object-cover" />
      </div>
      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-500">Rent</p>
        <p className="text-lg font-semibold">{rent}</p>
        <button
          onClick={handleClick}
          className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default LatestProductCard;
