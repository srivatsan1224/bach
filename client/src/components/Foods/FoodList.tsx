import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaHeart, FaSearch, FaFilter } from "react-icons/fa";
import { IoRestaurant } from "react-icons/io5";
import axios from "axios";
import { useCart } from './context/CartContext';

interface FoodItem {
  id: string;
  name: string;
  image: string;
  cost: number;
  rating: number;
  ingredients: string;
}

const FoodList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const foodResponse = await axios.get<FoodItem[]>(`http://localhost:5000/api/restaurants/${id}/food`);
        setFoodItems(foodResponse.data);

        const restaurantResponse = await axios.get<{ name: string }>(`http://localhost:5000/api/restaurants/${id}`);
        setRestaurantName(restaurantResponse.data.name);
      } catch (error) {
        console.error("Failed to fetch food items:", error);
      }
    };

    fetchFoodItems();
  }, [id]);

  const handleAddToCart = (item: FoodItem) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.id,
        name: item.name,
        cost: item.cost,
        quantity: 1,
        restaurantId: id!,
        restaurantName,
        image: item.image,
      },
    });
  };

  const toggleFavorite = (itemId: string) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavorites(newFavorites);
  };

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.ingredients.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceFilter === "all" ||
                        (priceFilter === "low" && item.cost <= 300) ||
                        (priceFilter === "medium" && item.cost > 300 && item.cost <= 600) ||
                        (priceFilter === "high" && item.cost > 600);
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Restaurant Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <IoRestaurant className="w-16 h-16 mx-auto text-orange-500 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {restaurantName}
          </h1>
          <p className="text-lg text-gray-600">
            Explore our delicious menu
          </p>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search dishes or ingredients..."
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Prices</option>
              <option value="low">Under ₹300</option>
              <option value="medium">₹300 - ₹600</option>
              <option value="high">Above ₹600</option>
            </select>
          </div>
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <FaHeart
                    className={`transition-colors ${
                      favorites.has(item.id) ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white font-semibold">₹{item.cost}</p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                  <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Ingredients:</h4>
                  <p className="text-sm text-gray-600">{item.ingredients}</p>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-500 text-lg mb-2">No dishes found matching your criteria</p>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodList;