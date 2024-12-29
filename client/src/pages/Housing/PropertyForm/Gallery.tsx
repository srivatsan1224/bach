import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "./FormContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Gallery: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [localState, setLocalState] = useState(formData.gallery || {
    startTime: "",
    endTime: "",
    availableAllDay: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    updateFormData("gallery", localState);
  }, [localState]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    toast.info("Submitting your data, please wait...");

    // Simulate a task
    setTimeout(() => {
      console.log("Final Form Data:", formData);
      toast.success("Data submitted successfully!");
      setIsSubmitting(false);
      navigate("/propertydashboard");
    }, 2000);
  };

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
            <li className="text-gray-600">Amenities</li>
            <li className="text-gray-900 font-bold">Gallery</li>
            <li className="text-gray-600">Schedule</li>
          </ul>
        </nav>

        <div className="col-span-9">
          <div className="p-6 bg-gray-50 rounded mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Gallery</h2>
            <p className="text-sm text-gray-600 mb-4">
              Add photos to get 5X more responses. 90% tenants contact on properties with photos.
            </p>
            <button className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded shadow hover:bg-green-600">
              Add Photos
            </button>
          </div>

          <div className="p-6 bg-gray-50 rounded">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Schedule</h2>
            <div className="flex space-x-4 mb-4">
              <button className="px-4 py-2 text-sm font-medium border rounded hover:bg-gray-100">
                Everyday
              </button>
              <button className="px-4 py-2 text-sm font-medium border rounded hover:bg-gray-100">
                Weekday
              </button>
              <button className="px-4 py-2 text-sm font-medium border rounded hover:bg-gray-100">
                Weekend
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-gray-600">Start Time</label>
                <input
                  type="time"
                  value={localState.startTime}
                  onChange={(e) => setLocalState({ ...localState, startTime: e.target.value })}
                  className="w-full p-2 border rounded mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">End Time</label>
                <input
                  type="time"
                  value={localState.endTime}
                  onChange={(e) => setLocalState({ ...localState, endTime: e.target.value })}
                  className="w-full p-2 border rounded mt-1"
                />
              </div>
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={localState.availableAllDay}
                onChange={(e) => setLocalState({ ...localState, availableAllDay: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-600">Available All Day</span>
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`mt-6 w-full px-4 py-2 text-sm font-medium rounded shadow ${
              isSubmitting ? "bg-gray-500 text-gray-200" : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
