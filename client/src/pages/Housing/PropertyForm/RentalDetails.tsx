import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormContext } from "./FormContext";

const RentalDetailsForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [localState, setLocalState] = useState(formData.rentalDetails || {
    propertyType: "onlyRent",
    expectedRent: "",
    expectedDeposit: "",
    rentNegotiable: false,
    monthlyMaintenance: "",
    availableFrom: "",
    preferredTenants: [], // Ensure it's always an array
    furnishing: "",
    parking: "",
    description: "",
  });

  const toggleTenantPreference = (preference: string) => {
    setLocalState((prev) => ({
      ...prev,
      preferredTenants: prev.preferredTenants?.includes(preference)
        ? prev.preferredTenants.filter((item) => item !== preference)
        : [...(prev.preferredTenants || []), preference], // Fallback to empty array
    }));
  };

  useEffect(() => {
    updateFormData("rentalDetails", localState);
  }, [localState]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <div className="flex items-center mb-4">
        <button className="text-sm text-gray-600 font-semibold">Back</button>
        <div className="flex-grow h-2 bg-gray-200 mx-4 rounded">
          <div className="h-full bg-green-500 rounded" style={{ width: "60%" }}></div>
        </div>
        <span className="text-sm font-semibold">Completed</span>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <nav className="col-span-3">
          <ul className="space-y-4 text-sm font-medium">
            <li className="text-gray-600">Property Details</li>
            <li className="text-gray-600">Locality Details</li>
            <li className="text-gray-900 font-bold">Rental Details</li>
            <li className="text-gray-600">Amenities</li>
            <li className="text-gray-600">Gallery</li>
            <li className="text-gray-600">Schedule</li>
          </ul>
        </nav>

        <div className="col-span-9">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Rental Details</h2>

          {/* Preferred Tenants */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-2 block">Preferred Tenants *</label>
            <div className="flex items-center space-x-4">
              {["Anyone", "Family", "Bachelor Female", "Bachelor Male", "Company"].map(
                (tenant) => (
                  <label key={tenant} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={localState.preferredTenants?.includes(tenant) || false}
                      onChange={() => toggleTenantPreference(tenant)}
                    />
                    <span>{tenant}</span>
                  </label>
                )
              )}
            </div>
          </div>

          <Link to="/amenities">
            <button className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded shadow hover:bg-red-700">
              Save & Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RentalDetailsForm;
