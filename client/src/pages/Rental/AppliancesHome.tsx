import React, { useEffect, useState } from "react";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import SearchFilter from "../../components/Rental/SearchFilter";
import Card from "../../components/Rental/Card";
import apiService from "../../services/apiService";

const AppliancesHome: React.FC = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.get("/category/appliances");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching appliances items:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleSearch = async (filters: any) => {
    try {
      setIsLoading(true);
      const response = await apiService.get("/category/appliances", {
        params: { ...filters, search: searchQuery },
      });
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching appliances items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchQuery = async () => {
    await handleSearch({});
  };

  return (
    <div className="min-h-screen bg-gray-50 font-custom">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Appliances on Rent
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Modern appliances to make your life easier. Rent today for a
              hassle-free tomorrow.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Bar */}
        <div className="flex flex-wrap justify-between items-center space-y-4 sm:space-y-0 mb-6">
          {/* Toggle Filter Button */}
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </button>

          {/* Search Bar */}
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search appliances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              onClick={handleSearchQuery}
              className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary-hover transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {isFilterVisible && (
          <div className="bg-white rounded-md shadow-sm p-4 mb-6">
            <SearchFilter onSearch={handleSearch} />
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item: any) => (
                <Card
                  key={item.id}
                  id={item.id}
                  category="appliances"
                  imageUrl={item.imageUrl}
                  name={item.name}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  discount={item.discount}
                  ratings={item.ratings}
                  availability={item.availability ? "In Stock" : "Out of Stock"}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="max-w-sm mx-auto">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No items found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria to find what
                  you're looking for.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliancesHome;
