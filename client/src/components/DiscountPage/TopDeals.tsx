import React from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice: string;
  discount: string;
  image: string; // URL of the image
}

const products: Product[] = [
  {
    id: 1,
    name: "Singo Maple",
    price: "₹ 1.264.000",
    oldPrice: "₹ 1.500.000",
    discount: "20% Off",
    image: "https://via.placeholder.com/150?text=Product+1", // Sample image
  },
  {
    id: 2,
    name: "Singo Ebony",
    price: "₹ 1.264.000",
    oldPrice: "₹ 1.500.000",
    discount: "20% Off",
    image: "https://via.placeholder.com/150?text=Product+2", // Sample image
  },
  {
    id: 3,
    name: "Rakai Ebony",
    price: "₹ 1.118.000",
    oldPrice: "₹ 1.280.000",
    discount: "15% Off",
    image: "https://via.placeholder.com/150?text=Product+3", // Sample image
  },
  {
    id: 4,
    name: "Way Kambas Mini Maple",
    price: "₹ 1.024.000",
    oldPrice: "₹ 1.280.000",
    discount: "10% Off",
    image: "https://via.placeholder.com/150?text=Product+4", // Sample image
  },
  {
    id: 5,
    name: "Way Kambas Mini Maple",
    price: "₹ 1.024.000",
    oldPrice: "₹ 1.280.000",
    discount: "10% Off",
    image: "https://via.placeholder.com/150?text=Product+5", // Sample image
  },
];

const TopDeals: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/product/${id}`); // Navigate to the product details page
  };

  return (
    <div className="container mx-auto w-[90%] my-8">
      <h2 className="text-2xl font-semibold mb-6">Top Deals</h2>
      <div className="grid grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-50 border rounded-lg overflow-hidden shadow-md relative group cursor-pointer"
            onClick={() => handleNavigate(product.id)} // Navigate on click
          >
            {/* Product Image */}
            <div className="w-full h-60 bg-gray-200 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {/* Product Details */}
            <div className="p-4">
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.discount}</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-xl font-semibold">{product.price}</span>
                <span className="text-sm line-through text-gray-400">
                  {product.oldPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default TopDeals;
