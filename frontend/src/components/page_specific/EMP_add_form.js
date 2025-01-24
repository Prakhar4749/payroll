import React, { useState, useEffect } from "react";
import { add_emp_details } from "../../controller/empController";
import { emp_data_model } from "../../models/EmpModel";
import { User, Mail, Phone, MapPin, Briefcase, Building2, Calendar, CreditCard, Building, DollarSign, Wallet, FileText, BanknoteIcon as BanknotesIcon, Calculator, MinusCircle,Save } from 'lucide-react';


const AddForm = () => {

  const [data, setData] = useState(emp_data_model); // State to store employee data

  const [scrolled, setScrolled] = useState(false);

 
  


 

  // Handle input change for nested objects
  const handleInputChange = (section, field, value) => {
    setData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const result = await add_emp_details(data);
      alert(result);
    } catch (err) {
      alert(err);
    }
  };

  // Render a loading spinner or message until data is ready

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="px-6 py-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600"
          >
            <h1 className={`text-2xl font-bold transition-colors duration-300 ${
              scrolled ? 'text-emerald-600' : 'text-white'
            }`}>
              Add Employee Details
            </h1>
            <p className={`mt-2 transition-colors duration-300 ${
              scrolled ? 'text-gray-600' : 'text-white/90'
            }`}>
              Please fill in all the required information below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-8">
            {/* Employee Details Section */}
            <div className="space-y-6">
              <div className="flex items-center">
                <User className="h-5 w-5 text-emerald-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Employee Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Employee ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={data.emp_details.e_id}
                      disabled
                      className="block w-full pl-10 pr-3 py-2 border bg-gray-50 border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={data.emp_details.e_name}
                      onChange={(e) => handleInputChange("emp_details", "e_name", e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={data.emp_details.e_mobile_number}
                      onChange={(e) => handleInputChange("emp_details", "e_mobile_number", e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      value={data.emp_details.e_gender}
                      onChange={(e) => handleInputChange("emp_details", "e_gender", e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={data.emp_details.e_email}
                      onChange={(e) => handleInputChange("emp_details", "e_email", e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={data.emp_details.e_address}
                      onChange={(e) => handleInputChange("emp_details", "e_address", e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                {/* Continue with the rest of the fields following the same pattern */}
                {/* ... */}
              </div>
            </div>

            {/* Bank Details Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <Building className="h-5 w-5 text-emerald-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Bank Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Bank fields following the same pattern */}
                {/* ... */}
              </div>
            </div>

            {/* Earning Details Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-emerald-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Earning Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Earning fields following the same pattern */}
                {/* ... */}
              </div>
            </div>

            {/* Deduction Details Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <MinusCircle className="h-5 w-5 text-emerald-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Deduction Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Deduction fields following the same pattern */}
                {/* ... */}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-700 hover:via-teal-700 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
              >
                <Save className="h-5 w-5 mr-2" />
                Save details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
  

export default AddForm;
