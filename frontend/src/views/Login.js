// Login.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../controller/authController';

export default function Login() {
  const [user_name, setUserName] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(user_name, user_password);

    if (result.success) {
      alert(result.message);
      navigate('/payslip');
    } else {
      setError(result.error);
    }
  };

  useEffect(() => {
    // Redirect if already logged in
    let login = sessionStorage.getItem('login');
    if (login) {
      navigate('/payslip');
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="user">
              User Name
            </label>
            <input
              type="text"
              id="user"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
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
                value={user_password}
                onChange={(e) => setUserPassword(e.target.value)}
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
          <Link to="/payslip" className="block text-center text-blue-500 hover:underline">
            Try Login
          </Link>
        </form>
      </div>
    </div>
  );
}