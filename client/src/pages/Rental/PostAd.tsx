import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostAd = () => {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    discount: "",
    availability: "in stock",
    imageUrl: "",
    specifications: "",
    offers: "",
    ratings: "",
    rentalType: "short-term",
  });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://bachelors-web.onrender.com/api/rentals",
        {
          ...formData,
          price: Number(formData.price),
          originalPrice:
            Number(formData.originalPrice) || Number(formData.price),
          discount: Number(formData.discount) || 0,
          ratings: Number(formData.ratings) || 0,
          specifications: formData.specifications
            ? JSON.parse(formData.specifications)
            : {},
          offers: formData.offers ? formData.offers.split(",") : [],
        }
      );

      console.log("Ad Posted Successfully:", response.data);
      alert("Ad Posted Successfully!");
      navigate("/home/rental/rental"); // Redirect to homepage
    } catch (error) {
      console.error("Error posting ad:", error);
      alert("Failed to post ad. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Post Your Rental Ad
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Fill in the details below to create your rental listing
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="furniture">Furniture</option>
                <option value="appliances">Appliances</option>
                <option value="electronics">Electronics</option>
                <option value="fitness">Fitness</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Item Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter item name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Provide detailed description of your item"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Pricing Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Rental Price *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full p-3 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="originalPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Original Price
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  placeholder="0.00"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="w-full p-3 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700"
              >
                Discount
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  placeholder="0"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full p-3 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Additional Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="availability"
                className="block text-sm font-medium text-gray-700"
              >
                Availability *
              </label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="in stock">In Stock</option>
                <option value="out of stock">Not In Stock</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="rentalType"
                className="block text-sm font-medium text-gray-700"
              >
                Rental Type
              </label>
              <select
                id="rentalType"
                name="rentalType"
                value={formData.rentalType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="short-term">Short-Term</option>
                <option value="long-term">Long-Term</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="ratings"
                className="block text-sm font-medium text-gray-700"
              >
                Ratings (1-5)
              </label>
              <input
                type="number"
                id="ratings"
                name="ratings"
                placeholder="0"
                min="0"
                max="5"
                step="0.1"
                value={formData.ratings}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <label
              htmlFor="specifications"
              className="block text-sm font-medium text-gray-700"
            >
              Specifications (JSON format)
            </label>
            <textarea
              id="specifications"
              name="specifications"
              placeholder='{"color": "black", "dimensions": "10x20x30", "weight": "5kg"}'
              value={formData.specifications}
              onChange={handleChange}
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter specifications in valid JSON format
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <label
              htmlFor="offers"
              className="block text-sm font-medium text-gray-700"
            >
              Offers (comma separated)
            </label>
            <input
              type="text"
              id="offers"
              name="offers"
              placeholder="Free delivery, 10% off next rental, Extended warranty"
              value={formData.offers}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="mr-1">*</span> Required fields
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => navigate("/home/rental/rental")}
            className="w-1/3 p-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-2/3 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Post Ad
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostAd;
