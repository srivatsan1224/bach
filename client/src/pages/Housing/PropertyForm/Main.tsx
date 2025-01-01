import React, { useEffect, useState } from 'react';
import { useFormContext } from './FormContext';
import { Link } from 'react-router-dom';

interface UserData {
  name: string;
  email: string;
  location: string;
  mobile: string;
}

const Main: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [userData, setUserData] = useState<UserData>(formData.main?.userData || {
    name: '',
    email: '',
    location: '',
    mobile: '',
  });


  useEffect(() => {
    const fetchUserData = () => {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserData((prev) => ({
          ...prev,
          name: parsedUser.name,
          email: parsedUser.email,
        }));
      }
    };

    const detectLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const data = await response.json();

              const city =
                data?.address?.city ||
                data?.address?.town ||
                data?.address?.village ||
                'Unknown City';

              setUserData((prev) => ({
                ...prev,
                location: city,
              }));
            } catch (error) {
              console.error('Error fetching location:', error);
              setUserData((prev) => ({
                ...prev,
                location: 'Unknown City',
              }));
            }
          },
          (error) => {
            console.error('Geolocation error:', error);
            setUserData((prev) => ({
              ...prev,
              location: 'Location access denied',
            }));
          }
        );
      } else {
        setUserData((prev) => ({
          ...prev,
          location: 'Geolocation not supported',
        }));
      }
    };

    fetchUserData();
    detectLocation();
  }, []);



  
  const handleNext = () => {
    updateFormData('main', { userData });
  };

  return (
    <div className="pt-9 pb-9 flex flex-col items-center justify-center bg-gray-100">
      <button
        className="mb-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 self-start ml-8"
        onClick={() => window.history.back()}
      >
        Back
      </button>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="flex">
          <div
            className="w-1/2 bg-cover bg-center relative"
            style={{
              backgroundImage: `url('/api/placeholder/800/600')`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">Why to post ad?</h2>
              <ul className="space-y-2">
                <li>✅ Zero Brokerage</li>
                <li>✅ Fast Tenants</li>
                <li>
                  <p>
                    ✅ Trusted by 1 Lac+ bachelors
                    <br />
                    BookHome is revolutionizing the rental scene for bachelors, making it easier than ever to find a
                    place to call home.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-1/2 p-8">
            <h1 className="text-2xl font-bold mb-6">Rent your Property For Free</h1>
            <form className="space-y-4">
              <div id="recaptcha-container"></div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
                  value={userData.name}
                  readOnly
                />
                <input
                  type="email"
                  placeholder="Enter your mail"
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
                  value={userData.email}
                  readOnly
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
                  value={userData.mobile}
                  onChange={(e) => setUserData((prev) => ({ ...prev, mobile: e.target.value }))}
                />
                <input
                  type="text"
                  placeholder="Enter your city"
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
                  value={userData.location}
                  readOnly
                />
              </div>
              
              <div className="flex items-center space-x-2 mt-4">
                <input type="checkbox" id="whatsapp" />
                <label htmlFor="whatsapp" className="text-gray-600">
                  Get updates on WhatsApp
                </label>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Residential</h2>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Rent
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-200"
                  >
                    Resale
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-200"
                  >
                    PG/Hostel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-200"
                  >
                    Flatmates
                  </button>
                </div>
              </div>
              <Link to='/propertydetails'>
                <button
                  type="submit"
                  onClick={handleNext}
                  className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
                >
                  Start posting your property for FREE
                </button>
              </Link>
            </form>
            <div className="mt-4 text-center">
              <a href="#" className="text-blue-500 hover:underline">
                Looking for a property? Click Here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;