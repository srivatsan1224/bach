import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { useFormContext } from "./FormContext";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const LocalityDetailsForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [localState, setLocalState] = useState(formData.localityDetails || {
    city: "Chennai",
    locality: "",
    landmark: "",
    mapCenter: { lat: 13.0827, lng: 80.2707 },
    markerPosition: { lat: 13.0827, lng: 80.2707 },
  });

  useEffect(() => {
    updateFormData("localityDetails", localState);
  }, [localState]);

  const handleMarkerDragEnd = (event: L.DragEndEvent) => {
    const latlng = event.target.getLatLng();
    setLocalState((prev) => ({
      ...prev,
      markerPosition: {
        lat: latlng.lat,
        lng: latlng.lng,
      },
    }));
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocalState((prev) => ({
          ...prev,
          mapCenter: { lat, lng },
          markerPosition: { lat, lng },
        }));
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <div className="flex items-center mb-4">
        <button className="text-sm text-gray-600 font-semibold">Back</button>
        <div className="flex-grow h-2 bg-gray-200 mx-4 rounded">
          <div className="h-full bg-green-500 rounded" style={{ width: "30%" }}></div>
        </div>
        <span className="text-sm font-semibold">Completed</span>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <nav className="col-span-3">
          <ul className="space-y-4 text-sm font-medium">
            <li className="text-gray-600">Property Details</li>
            <li className="text-gray-900 font-bold">Locality Details</li>
            <li className="text-gray-600">Rental Details</li>
            <li className="text-gray-600">Amenities</li>
            <li className="text-gray-600">Gallery</li>
            <li className="text-gray-600">Schedule</li>
          </ul>
        </nav>

        <div className="col-span-9">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Locality Details</h2>

          {/* City */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-2 block">City *</label>
            <select
              value={localState.city}
              onChange={(e) => setLocalState({ ...localState, city: e.target.value })}
              className="w-full border p-2 rounded"
            >
              <option value="Chennai">Chennai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          {/* Locality */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-2 block">Locality *</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={localState.locality}
                onChange={(e) => setLocalState({ ...localState, locality: e.target.value })}
                placeholder="Enter location / society name"
                className="flex-grow border p-2 rounded"
              />
              <button
                onClick={handleUseCurrentLocation}
                className="text-sm text-blue-600 font-medium"
              >
                Use Current Location
              </button>
            </div>
          </div>

          {/* Landmark */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-2 block">Landmark / Street *</label>
            <input
              type="text"
              value={localState.landmark}
              onChange={(e) => setLocalState({ ...localState, landmark: e.target.value })}
              placeholder="e.g. Evergreen street"
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Leaflet Map */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Mark Locality on Map</h3>
            <p className="text-sm text-gray-600 mb-2">
              Set property location by moving the map marker
            </p>
            <MapContainer
              center={localState.mapCenter}
              zoom={14}
              scrollWheelZoom={false}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={localState.markerPosition}
                draggable={true}
                eventHandlers={{
                  dragend: handleMarkerDragEnd,
                }}
              >
                <Popup>Drag to adjust location</Popup>
              </Marker>
            </MapContainer>
          </div>

          <Link to="/rentaldetails">
            <button className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded shadow hover:bg-red-700">
              Save & Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocalityDetailsForm;
