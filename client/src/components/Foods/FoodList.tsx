import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface FoodItem {
  id: string;
  name: string;
  image: string;
  cost: number;
  rating: number;
}

const FoodList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [restaurantName, setRestaurantName] = useState<string>("");

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const foodResponse = await axios.get<FoodItem[]>(`http://localhost:5000/api/restaurants/${id}/food`);
        setFoodItems(foodResponse.data);

        // Fetch restaurant name for the heading
        const restaurantResponse = await axios.get<{ name: string }>(`http://localhost:5000/api/restaurants/${id}`);
        setRestaurantName(restaurantResponse.data.name);
      } catch (error) {
        console.error("Failed to fetch food items:", error);
      }
    };

    fetchFoodItems();
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Menu for {restaurantName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {foodItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 shadow-md rounded-md hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded-md"
            />
            <h3 className="mt-4 text-lg font-bold">{item.name}</h3>
            <p className="mt-2 text-sm">₹{item.cost}</p>
            <p className="mt-2 text-sm">⭐ {item.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;
