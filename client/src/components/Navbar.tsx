import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(parsedUser.name);
      setProfilePic(parsedUser.picture || '');
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      const { access_token } = tokenResponse;
      localStorage.setItem('token', access_token);
      try {
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
        );
        localStorage.setItem('user', JSON.stringify(response.data));
        setIsLoggedIn(true);
        setUserName(response.data.name);
        setProfilePic(response.data.picture);
      } catch (error) {
        console.error('Failed to fetch user info', error);
        alert('Failed to retrieve user information. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setLoading(false);
      alert('Google login failed. Please try again.');
    },
  });

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    setProfilePic('');
  };

  return (
    <nav className="bg-white shadow-lg font-montserrat">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-lg font-semibold text-gray-800 hover:text-gray-500">
            Home
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="text-blue-500">Logging in...</div>
          ) : isLoggedIn ? (
            <>
              <button
                onClick={logout}
                className="p-3 border border-gray-300 bg-gray-100 text-black transition rounded-full shadow-sm hover:bg-gray-200"
              >
                Logout
              </button>
              <Link to="/user-details" className="text-lg font-semibold text-gray-800 hover:text-gray-500">
                <img
                  src={profilePic || 'default-profile-pic.png'}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-gray-300 shadow-sm inline-block ml-2"
                />
              </Link>
            </>
          ) : (
            <button
              onClick={() => login()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Login with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
