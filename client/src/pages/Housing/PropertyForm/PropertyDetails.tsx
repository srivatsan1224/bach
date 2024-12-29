import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormContext } from "./FormContext";

const PropertyDetailsForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [localState, setLocalState] = useState(formData.propertyDetails || {
    apartmentType: "",
    bhkType: "",
    floor: "",
    totalFloors: "",
    propertyAge: "",
    facing: "",
    builtUpArea: "",
  });

  useEffect(() => {
    updateFormData("propertyDetails", localState);
  }, [localState]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <div className="flex items-center mb-4">
        <button className="text-sm text-gray-600 font-semibold">Back</button>
        <div className="flex-grow h-2 bg-gray-200 mx-4 rounded">
          <div className="h-full bg-green-500 rounded" style={{ width: "10%" }}></div>
        </div>
        <span className="text-sm font-semibold">Completed</span>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <nav className="col-span-3">
          <ul className="space-y-4 text-sm font-medium">
            <li className="text-gray-900 font-bold">Property Details</li>
            <li className="text-gray-600">Locality Details</li>
            <li className="text-gray-600">Rental Details</li>
            <li className="text-gray-600">Amenities</li>
            <li className="text-gray-600">Gallery</li>
            <li className="text-gray-600">Schedule</li>
          </ul>
        </nav>

        <div className="col-span-9">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Property Details</h2>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Apartment Type */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Apartment Type *</label>
              <select
                value={localState.apartmentType}
                onChange={(e) => setLocalState({ ...localState, apartmentType: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option value="Flat">Flat</option>
                <option value="Villa">Villa</option>
                <option value="Independent House">Independent House</option>
              </select>
            </div>

            {/* BHK Type */}
            <div>
              <label className="text-sm font-semibold mb-2 block">BHK Type *</label>
              <select
                value={localState.bhkType}
                onChange={(e) => setLocalState({ ...localState, bhkType: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
              </select>
            </div>

            {/* Floor */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Floor *</label>
              <select
                value={localState.floor}
                onChange={(e) => setLocalState({ ...localState, floor: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option value="Ground Floor">Ground Floor</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>

            {/* Total Floors */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Total Floors *</label>
              <select
                value={localState.totalFloors}
                onChange={(e) => setLocalState({ ...localState, totalFloors: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            {/* Property Age */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Property Age *</label>
              <select
                value={localState.propertyAge}
                onChange={(e) => setLocalState({ ...localState, propertyAge: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option value="0-5 years">0-5 years</option>
                <option value="5-10 years">5-10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>

            {/* Facing */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Facing *</label>
              <select
                value={localState.facing}
                onChange={(e) => setLocalState({ ...localState, facing: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option value="North">North</option>
                <option value="East">East</option>
                <option value="South">South</option>
                <option value="West">West</option>
              </select>
            </div>

            {/* Built Up Area */}
            <div className="col-span-2">
              <label className="text-sm font-semibold mb-2 block">Built Up Area *</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={localState.builtUpArea}
                  onChange={(e) => setLocalState({ ...localState, builtUpArea: e.target.value })}
                  placeholder="Built Up Area"
                  className="flex-grow border p-2 rounded"
                />
                <span className="text-gray-600">Sq.ft</span>
              </div>
            </div>
          </div>

          {/* Helper Message */}
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-gray-800">
              <span className="flex items-center">
                <span className="material-icons text-green-500 mr-2">call</span>
                Don't want to fill all the details? Let us help you!
              </span>
            </p>
            <button className="mt-2 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700">
              I'm Interested
            </button>
          </div>

          {/* Save & Next */}
          <Link to="/locality">
            <button className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded shadow hover:bg-red-700">
              Save & Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsForm;
