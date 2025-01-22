import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = () => {
  const token = sessionStorage.getItem('token');

  // Function to validate the JWT token
  const isValidToken = () => {
    if (!token) return false;

    try {
      const decoded = jwtDecode(token); // Decode the token
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decoded.exp > currentTime; // Check if token is expired
    } catch (err) {
      console.error("Invalid token:", err);
      return false;
    }
  };

  const isAuthenticated = isValidToken();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
