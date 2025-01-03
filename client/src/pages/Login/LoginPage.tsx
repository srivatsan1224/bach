import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import glogo from "../../assets/LoginPage/googlelogo.png";

const LoginPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(parsedUser.name);
      setProfilePic(parsedUser.picture || "");
      navigate("/home");
    }
  }, [navigate]);

  const handleEmailPasswordLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        containerName: "Users",
        email,
        password,
      });
      const { data } = response;

      if (data && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        setUserName(data.user.name);
        navigate("/");
      } else {
        setError(data.message || "Invalid login credentials.");
      }
    } catch (err) {
      setError("Failed to login. Please try again later.");
      console.error("Email-password login error:", err);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;
      try {
        const googleResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
        );

        const userData = googleResponse.data;

        // Call backend to store user details
        const backendResponse = await axios.post("http://localhost:3000/user/google-login", {
          containerName: "Users",
          user: {
            email: userData.email,
            name: userData.name,
            picture: userData.picture,
          },
        });

        const { user } = backendResponse.data;

        // Save user details locally
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
        setUserName(user.name);
        setProfilePic(user.picture || "");
        navigate("/");
      } catch (error) {
        console.error("Google login failed:", error);
        setError("Failed to log in with Google. Please try again.");
      }
    },
    onError: () => {
      setError("Google login failed. Please try again.");
    },
  });

  return (
    <div className="flex items-center justify-center">
      <div className="min-h-screen flex w-4/5 items-center justify-between px-8">
        {/* Left Content */}
        <div className="w-1/2 flex items-start">
          <div className="text-left space-y-4">
            <h1 className="text-5xl font-extrabold text-black leading-tight">
              India’s #1<br />Bachelors App
            </h1>
            <p className="text-gray-700 text-lg">
              Join the largest community of bachelors in India. Connect,
              collaborate, and create memories with like-minded individuals.
            </p>
          </div>
        </div>

        {/* Login Container */}
        <div className="w-1/3 bg-white p-8 shadow-xl rounded-xl">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome to Our App
          </h1>
          {isLoggedIn ? (
            <div className="text-center">
              <img
                src={profilePic}
                alt="User Profile"
                className="w-20 h-20 rounded-full mx-auto border border-gray-300 shadow-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                Welcome, {userName}!
              </h2>
              <p className="text-gray-600 mt-2">
                Redirecting to your dashboard...
              </p>
            </div>
          ) : (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEmailPasswordLogin();
                }}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-medium mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:font-semibold hover:border-gray-300 transition-all text-lg shadow-md"
                >
                  Login with Email
                </button>
              </form>
              <div className="text-center text-gray-500 my-4">
                <span>or</span>
              </div>
              <button
                onClick={() => login()}
                className="w-full py-3 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:shadow-md transition-all text-lg font-medium"
              >
                <img
                  src={glogo}
                  alt="Google Logo"
                  className="w-5 h-5 mr-2"
                />
                Continue with Google
              </button>
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Don’t have an account?{" "}
                  <span
                    className="text-blue-600 font-semibold cursor-pointer hover:underline"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
