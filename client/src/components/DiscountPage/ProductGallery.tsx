import React from 'react';
import { Heart } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  name: string;
  discount?: number;
  selectedImage: string;
  isWishlist: boolean;
  onImageSelect: (image: string) => void;
  onWishlistToggle: () => void;
  onAddToCart: () => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  name,
  discount,
  selectedImage,
  isWishlist,
  onImageSelect,
  onWishlistToggle,
  onAddToCart,
}) => {
  return (
    <div className="lg:w-2/5 space-y-4">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        <img
          src={selectedImage}
          alt={name}
          className="w-full h-full object-cover"
        />
        <button 
          onClick={onWishlistToggle}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart className={`w-5 h-5 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
        {discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            {discount}% OFF
          </div>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images?.map((image: string, index: number) => (
          <button
            key={index}
            onClick={() => onImageSelect(image)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
              selectedImage === image ? 'ring-2 ring-indigo-500' : 'ring-1 ring-gray-200'
            }`}
          >
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        <button
          onClick={onAddToCart}
          className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add to Cart
        </button>
        <button className="flex-1 px-6 py-3 text-sm font-semibold text-indigo-600 bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;