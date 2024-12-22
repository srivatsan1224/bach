import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Home: React.FC = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;
      localStorage.setItem('token', access_token);
      try {
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
        );
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        console.error('Failed to fetch user info', error);
      }
    },
    onError: () => {
      console.error('Login failed');
    },
  });

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={() => login()}>Login with Google</button>
    </div>
  );
};

export default Home;