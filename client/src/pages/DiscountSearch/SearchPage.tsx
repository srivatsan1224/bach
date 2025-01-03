import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import groceryImg from "../../assets/DiscountPage/gro.png";
import mobileImg from "../../assets/DiscountPage/mob.png";
import fashionImg from "../../assets/DiscountPage/drs.png";
import watchImg from "../../assets/DiscountPage/watch.png";
import furnitureImg from "../../assets/DiscountPage/fur.png";
import cosmeticsImg from "../../assets/DiscountPage/cos.png";
import accessoriesImg from "../../assets/DiscountPage/acc.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const SearchPage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    isFree: false,
    isExclusive: false,
    priceRange: "",
    rating: "",
    discount: "",
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/products/search", {
        params: {
          search: searchQuery,
          category: selectedCategory,
          isFree: filters.isFree ? "true" : "false",
          isExclusive: filters.isExclusive ? "true" : "false",
          discount: filters.discount || undefined,
          minPrice: filters.priceRange ? filters.priceRange.split("-")[0] : undefined,
          maxPrice: filters.priceRange ? filters.priceRange.split("-")[1] : undefined,
          rating: filters.rating || undefined,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, selectedCategory, filters]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const toggleFilter = (filterKey: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  const updateDropdownFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const handleProductClick = (product: any) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="flex justify-center items-center bg-gray-50">
      <div className="p-6 w-4/5">
        {/* Search Bar and Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center w-full max-w-4xl border border-gray-300 rounded-full overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-6 py-4 text-gray-700 focus:outline-none text-lg"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button
              className="px-8 py-4 bg-purple-600 text-white font-medium rounded-r-full hover:bg-purple-700 transition"
              onClick={fetchProducts}
            >
              Search
            </button>
          </div>

          {/* Filters Section */}
          <div className="flex items-center space-x-4 ml-4">
            <button
              className="flex items-center p-2 px-4 border border-gray-300 rounded-full hover:bg-gray-100 transition"
              onClick={toggleDropdown}
            >
              <FontAwesomeIcon icon={faFilter} size="lg" />
              <span className="ml-2 font-medium">Filters</span>
            </button>
            <button
              className={`p-2 px-4 border border-gray-300 rounded-full hover:bg-gray-100 font-medium transition ${
                filters.isFree ? "bg-purple-100" : ""
              }`}
              onClick={() => toggleFilter("isFree")}
            >
              Free
            </button>
            <button
              className={`p-2 px-4 border border-gray-300 rounded-full hover:bg-gray-100 font-medium transition ${
                filters.isExclusive ? "bg-purple-100" : ""
              }`}
              onClick={() => toggleFilter("isExclusive")}
            >
              Exclusive
            </button>
          </div>
        </div>

        {/* Dropdown Section */}
        {dropdownVisible && (
          <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-lg mb-6">
            <div className="mb-4">
              <label className="block font-medium mb-2">Price Range</label>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={filters.priceRange}
                onChange={(e) => updateDropdownFilter("priceRange", e.target.value)}
              >
                <option value="">Select Price Range</option>
                <option value="0-5000">₹0 - ₹5,000</option>
                <option value="5000-10000">₹5,000 - ₹10,000</option>
                <option value="10000-20000">₹10,000 - ₹20,000</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Ratings</label>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={filters.rating}
                onChange={(e) => updateDropdownFilter("rating", e.target.value)}
              >
                <option value="">Select Ratings</option>
                <option value="3">3 Stars & Above</option>
                <option value="4">4 Stars & Above</option>
                <option value="5">5 Stars</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">Discounts</label>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={filters.discount}
                onChange={(e) => updateDropdownFilter("discount", e.target.value)}
              >
                <option value="">Select Discounts</option>
                <option value="10">10% & Above</option>
                <option value="20">20% & Above</option>
                <option value="30">30% & Above</option>
              </select>
            </div>
          </div>
        )}

        {/* Categories Grid Section */}
        <div className="flex justify-between items-center mt-12">
          {[
            { name: "Grocery", image: groceryImg },
            { name: "Mobile", image: mobileImg },
            { name: "Fashion", image: fashionImg },
            { name: "Watch", image: watchImg },
            { name: "Furniture", image: furnitureImg },
            { name: "Cosmetics", image: cosmeticsImg },
            { name: "Accessories", image: accessoriesImg },
          ].map((category) => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`text-center cursor-pointer ${
                selectedCategory === category.name ? "bg-purple-100" : ""
              }`}
            >
              <div className="w-32 h-32 mx-auto flex items-center justify-center bg-gray-100 rounded-full">
                <img
                  src={category.image}
                  alt={category.name}
                  className="max-w-[80%] max-h-[80%] object-contain"
                />
              </div>
              <p className="mt-2 font-medium">{category.name}</p>
            </div>
          ))}
        </div>

        {/* Search Results */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Search Results</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.length > 0 ? (
                products.map((product: any) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500 line-through">
                        ₹{product.oldPrice.toLocaleString()}
                      </p>
                      <p className="text-lg font-semibold text-purple-600">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">No products found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
