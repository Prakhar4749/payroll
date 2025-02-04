import React, { useState } from 'react';
import { Eraser, Save } from 'lucide-react';

export default ({ add_new_user, change_uId, change_uId_password }) => {
  const [formData, setFormData] = useState({
    departmentId: '',
    departmentName: '',
    newUserId: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setFormData({
      departmentId: '',
      departmentName: '',
      newUserId: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (add_new_user) {
      if (formData.newPassword !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      console.log('New User Added:', formData);
    } else if (change_uId) {
      console.log('User ID Changed:', formData.newUserId);
    } else if (change_uId_password) {
      if (formData.newPassword === formData.confirmPassword) {
        console.log('Password Changed:', formData.newPassword);
      } else {
        alert('Passwords do not match!');
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <>
      {/* Add New User Form */}
      {add_new_user && (
        <form onSubmit={handleSubmit} className="px-6 py-8 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">New User Name</label>
              <input
                type="text"
                name="departmentId"
                maxLength="4"
                value={formData.departmentId}
                onChange={handleChange}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword.newPassword ? 'text' : 'password'}
                  name="departmentName"
                  value={formData.departmentName}
                  onChange={handleChange}
                  className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('newPassword')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors duration-200 p-1"
                >
                  {showPassword.newPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors duration-200 p-1"
                >
                  {showPassword.confirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6 items-center justify-around">
            <button
              type="button"
              onClick={clearForm}
              className="w-full md:w-auto px-7 py-3 bg-gray-100 rounded-lg shadow-lg text-gray-600 flex items-center gap-3"
            >
              <Eraser className="h-6 w-6" /> Clear
            </button>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-white rounded-lg shadow-lg flex items-center gap-3"
            >
              <Save className="h-6 w-6" /> Submit
            </button>
          </div>
        </form>
      )}

      {/* Change User ID Form */}
      {change_uId && (
        <form onSubmit={handleSubmit} className="px-6 py-8 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">New User ID</label>
              <input
                type="text"
                name="newUserId"
                value={formData.newUserId}
                onChange={handleChange}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6 items-center justify-around">
            <button
              type="button"
              onClick={clearForm}
              className="w-full md:w-auto px-7 py-3 bg-gray-100 rounded-lg shadow-lg text-gray-600 flex items-center gap-3"
            >
              <Eraser className="h-6 w-6" /> Clear
            </button>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-white rounded-lg shadow-lg flex items-center gap-3"
            >
              <Save className="h-6 w-6" /> Submit
            </button>
          </div>
        </form>
      )}

      {/* Change User Password Form */}
      {change_uId_password && (
        <form onSubmit={handleSubmit} className="px-6 py-8 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <div className="relative">
                <input
                  type={showPassword.newPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('newPassword')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors duration-200 p-1"
                >
                  {showPassword.newPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors duration-200 p-1"
                >
                  {showPassword.confirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6 items-center justify-around">
            <button
              type="button"
              onClick={clearForm}
              className="w-full md:w-auto px-7 py-3 bg-gray-100 rounded-lg shadow-lg text-gray-600 flex items-center gap-3"
            >
              <Eraser className="h-6 w-6" /> Clear
            </button>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-white rounded-lg shadow-lg flex items-center gap-3"
            >
              <Save className="h-6 w-6" /> Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
};
