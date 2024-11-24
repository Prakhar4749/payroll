import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProtectedRoute from './component/ProtectedRoute';

export default function Login() {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLogedIn, setIsLogedIn] = useState(false);

  const auth = {
    user: "Prakhar",
    password: "1234"
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    console.log("user:", user);
    console.log("Password:", password);
    console.log(auth.user);
    console.log(auth.password);
    // Add login logic here (e.g., call an API)
    if (user === auth.user && password === auth.password) {

      setError('');
      setIsLogedIn(true);
      localStorage.setItem('login', true);


    } else {
      setError('Invalid username or password');
      setIsLogedIn(false);
    }
    console.log(isLogedIn);
  };
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem('login');
    if (login){
      navigate('/payslip');

    }
    });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="user">
              User Name
            </label>
            <input
              type="text"
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 focus:outline-none"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>


          </div>


          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
          <Link to="/payslip">try login</Link>
        </form>
      </div>
    </div>
  );
}


