import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number;
  image: string;
}

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get<Restaurant[]>("http://localhost:5000/api/restaurants");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white p-4 shadow-md rounded-md hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-4 text-xl font-bold">{restaurant.name}</h3>
            <p className="mt-2 text-gray-600">{restaurant.address}</p>
            <p className="mt-2 text-sm">⭐ {restaurant.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
