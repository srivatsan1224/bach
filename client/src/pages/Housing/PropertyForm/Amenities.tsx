import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormContext } from "./FormContext";

const AmenitiesForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [localState, setLocalState] = useState(formData.amenities || {
    bathrooms: 0,
    balcony: 0,
    waterSupply: "",
    selectedAmenities: [],
    secondaryNumber: "",
    directions: "",
  });

  const toggleAmenity = (amenity: string) => {
    setLocalState((prev) => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenity)
        ? prev.selectedAmenities.filter((item) => item !== amenity)
        : [...prev.selectedAmenities, amenity],
    }));
  };

  useEffect(() => {
    updateFormData("amenities", localState);
  }, [localState]);

  const amenitiesList = [
    "Lift",
    "Air Conditioner",
    "Intercom",
    "Children Play Area",
    "Servant Room",
    "Gas Pipeline",
    "Rain Water Harvesting",
    "House Keeping",
    "Visitor Parking",
    "Internet Services",
    "Club House",
    "Swimming Pool",
    "Fire Safety",
    "Shopping Center",
    "Park",
    "Sewage Treatment Plant",
    "Power Backup",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <div className="flex items-center mb-4">
        <button className="text-sm text-gray-600 font-semibold">Back</button>
        <div className="flex-grow h-2 bg-gray-200 mx-4 rounded">
          <div className="h-full bg-green-500 rounded" style={{ width: "90%" }}></div>
        </div>
        <span className="text-sm font-semibold">Completed</span>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <nav className="col-span-3">
          <ul className="space-y-4 text-sm font-medium">
            <li className="text-gray-600">Property Details</li>
            <li className="text-gray-600">Locality Details</li>
            <li className="text-gray-600">Rental Details</li>
            <li className="text-gray-900 font-bold">Amenities</li>
            <li className="text-gray-600">Gallery</li>
            <li className="text-gray-600">Schedule</li>
          </ul>
        </nav>

        <div className="col-span-9">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Amenities</h2>

          {/* Bathroom, Balcony, Water Supply */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Bathrooms</label>
              <div className="flex items-center border rounded p-2">
                <button
                  onClick={() => setLocalState((prev) => ({ ...prev, bathrooms: Math.max(0, prev.bathrooms - 1) }))}
                  className="px-3 py-1"
                >
                  -
                </button>
                <span className="flex-grow text-center">{localState.bathrooms}</span>
                <button
                  onClick={() => setLocalState((prev) => ({ ...prev, bathrooms: prev.bathrooms + 1 }))}
                  className="px-3 py-1"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Balcony</label>
              <div className="flex items-center border rounded p-2">
                <button
                  onClick={() => setLocalState((prev) => ({ ...prev, balcony: Math.max(0, prev.balcony - 1) }))}
                  className="px-3 py-1"
                >
                  -
                </button>
                <span className="flex-grow text-center">{localState.balcony}</span>
                <button
                  onClick={() => setLocalState((prev) => ({ ...prev, balcony: prev.balcony + 1 }))}
                  className="px-3 py-1"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Water Supply</label>
              <select
                value={localState.waterSupply}
                onChange={(e) => setLocalState({ ...localState, waterSupply: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option value="24 hours">24 Hours</option>
                <option value="Limited">Limited</option>
              </select>
            </div>
          </div>

          {/* Secondary Number and Directions */}
          <div className="mb-6">
            <label className="text-sm text-gray-600 mb-2 block">Secondary Number</label>
            <div className="flex">
              <span className="flex items-center px-3 bg-gray-200 border">+91</span>
              <input
                type="text"
                value={localState.secondaryNumber}
                onChange={(e) => setLocalState({ ...localState, secondaryNumber: e.target.value })}
                className="flex-grow border p-2 rounded-r"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-600 mb-2 block">Add Directions Tip for your tenants</label>
            <input
              type="text"
              value={localState.directions}
              onChange={(e) => setLocalState({ ...localState, directions: e.target.value })}
              className="w-full border p-2 rounded"
              placeholder="Eg: Take the road opposite to Amrita College, take right after 300m..."
            />
          </div>

          {/* Amenities List */}
          <h3 className="text-sm font-bold text-gray-900 mb-4">Select the available amenities</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {amenitiesList.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={localState.selectedAmenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>

          {/* Save & Next */}
          <Link to="/gallery">
            <button className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded shadow hover:bg-red-700">
              Save & Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesForm;
