import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[90%] sm:max-w-md">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Welcome Back</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">Sign in to access your college payslip portal</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-md">
              <p className="text-xs sm:text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700" htmlFor="user">
                Username
              </label>
              <input
                type="text"
                id="user"
                value={user_name}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="mt-1 block w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm placeholder-slate-400
                focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors duration-200"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700" htmlFor="password">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={user_password}
                  onChange={(e) => setUserPassword(e.target.value)}
                  required
                  className="block w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm placeholder-slate-400
                  focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2.5 sm:py-3 text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:from-emerald-700 hover:to-teal-700 
              focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] text-sm sm:text-base font-medium"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs sm:text-sm text-slate-600">
              Need help? Contact your department administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}