import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import delivery from "../../assets/DiscountPage/delivery.png";
import returni from "../../assets/DiscountPage/return.png";

const ProductPage: React.FC = () => {
  const location = useLocation();
  const { product } = location.state || {};

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>(
    product?.images?.[0] || ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors?.[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes?.[0] || ""
  );

  if (!product) {
    return (
      <div className="text-center mt-12">
        <h1 className="text-xl font-semibold text-gray-700">Product not found!</h1>
      </div>
    );
  }

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user || !user.id) {
      alert("User not logged in. Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/user/add-to-cart", {
        containerName: "Users",
        userId: user.id,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          color: selectedColor,
          size: selectedSize,
        },
      });

      alert("Product added to cart successfully!");
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      if (error.response && error.response.status === 404) {
        alert("API endpoint not found. Please check the backend server.");
      } else {
        alert("Failed to add product to cart. Please try again later.");
      }
    }
  };

  return (
    <div className="w-4/5 mx-auto flex flex-col md:flex-row bg-white text-black p-8">
      {/* Image Gallery */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Thumbnail Images */}
        <div className="flex flex-col space-y-4">
          {product.images?.map((image: string, index: number) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`w-20 h-20 cursor-pointer border ${
                selectedImage === image ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 flex">
          <img
            src={selectedImage}
            alt="Selected Product"
            className="w-96 max-w-md h-96 border border-gray-300"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 ml-8">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="flex items-center space-x-2 text-sm">
          <span>⭐ {product.rating}</span>
          <span>({product.reviews || "150"} Reviews)</span>
          <span className="text-green-500">
            {product.isInStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <h2 className="text-xl font-semibold mt-4">
          ₹{product.price.toLocaleString()}
        </h2>
        {product.oldPrice && (
          <p className="text-gray-500 line-through">
            ₹{product.oldPrice.toLocaleString()}
          </p>
        )}
        <p className="text-gray-700 mt-2">{product.description}</p>

        {/* Color Options */}
        {product.colors && (
          <div className="mt-4">
            <h3 className="font-semibold">Colors:</h3>
            <div className="flex space-x-2">
              {product.colors.map((color: string) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size Options */}
        {product.sizes && (
          <div className="mt-4">
            <h3 className="font-semibold">Size:</h3>
            <div className="flex space-x-2">
              {product.sizes.map((size: string) => (
                <button
                  key={size}
                  className={`px-4 py-2 border ${
                    selectedSize === size ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="mt-4">
          <h3 className="font-semibold">Quantity:</h3>
          <div className="flex items-center space-x-2">
            <button
              className="px-4 py-2 border border-gray-300"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="px-4 py-2 border border-gray-300"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button className="px-6 py-3 border border-gray-300 rounded hover:border-black">
            Buy Now
          </button>
        </div>

        {/* Delivery & Return Info */}
        <div className="mt-8 w-3/5 border border-gray-300 rounded p-4">
          <div className="flex items-center space-x-4 pb-4 border-b border-gray-300">
            <div className="w-8 h-8">
              <img
                src={delivery}
                alt="Free Delivery Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="font-semibold text-black">Free Delivery</h4>
              <p className="text-gray-500 text-sm">
                Enter your postal code for Delivery Availability
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 pt-4">
            <div className="w-8 h-8">
              <img
                src={returni}
                alt="Return Delivery Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="font-semibold text-black">Return Delivery</h4>
              <p className="text-gray-500 text-sm">
                Free 30 Days Delivery Returns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
