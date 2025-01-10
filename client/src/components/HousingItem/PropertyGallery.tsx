import React from 'react';

interface PropertyGalleryProps {
  images: string[];
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images }) => {
  return (
    <div className="relative h-[400px] overflow-hidden rounded-lg">
      <img 
        src={images[0]} 
        alt="Property" 
        className="w-full h-full object-cover"
      />
    </div>
  );
}