import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice: string;
  discount: string;
  image: string;
}

const TopDeals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-[90%] mx-auto my-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto my-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Today's Best Deals</h2>
        <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <div className="absolute top-3 left-3">
                <span className="bg-red-500 text-white px-2 py-1 text-sm rounded-full">
                  {product.discount}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2 truncate">{product.name}</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-blue-600">{product.price}</span>
                  <span className="ml-2 text-sm text-gray-400 line-through">{product.oldPrice}</span>
                </div>
                <button className="bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition-colors">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDeals;