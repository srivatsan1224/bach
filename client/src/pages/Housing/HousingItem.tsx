import React from 'react';
import { PropertyHeader } from '../../components/HousingItem/PropertyHeader';
import { PropertyGallery } from '../../components/HousingItem/PropertyGallery';
import { RoomDetails } from '../../components/HousingItem/RoomDetails';
import { Services } from '../../components/HousingItem/Services';
import { PropertyRules } from '../../components/HousingItem/PropertyRules';
import { PropertyMap } from '../../components/HousingItem/PropertyMap';

export const HousingItem: React.FC=()=> {
  return( <>
    <div className="min-h-screen bg-gray-50">
      <PropertyHeader 
        title="PG For Boys In 2k, Station Rd, Near Seeman Textiles, Radha Nagar, Chromepet, Chennai"
        location="Station Rd near Seeman Textiles, 2k Station Rd, near seeman textiles, Radha Nagar, Chromepet, Chennai, Tamil Nadu"
        rent={8000}
        deposit={6000}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <PropertyGallery 
          images={[
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          ]} 
        />
        
        <RoomDetails type="double" rent={7000} deposit={7000} />
        <RoomDetails type="triple" rent={6000} deposit={6000} />
        
        <Services />
        <PropertyRules />
        <PropertyMap />
      </div>
    </div>
    </>
        );
}