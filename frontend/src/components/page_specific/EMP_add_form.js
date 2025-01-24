import React, { useState, useEffect } from "react";
import { update_emp_details } from "../../controller/empController";
import { useLocation } from "react-router-dom";

const UpdateForm = () => {

  const [data, setData] = useState(null); // State to store employee data
  


 

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
      
      await update_emp_details(data);
      alert("Employee details updated successfully!");
    } catch (err) {
      alert("Failed to update details.");
    }
  };

  // Render a loading spinner or message until data is ready

  if (!data) return <p className="text-center text-lg font-semibold mt-4">No data available to update.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg mt-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Update Employee Details
        </h1>
  
        {/* Employee Details Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Employee Details</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Employee ID", field: "e_id", disabled: true },
              { label: "Name", field: "e_name" },
              { label: "Mobile Number", field: "e_mobile_number" },
              { label: "Gender", field: "e_gender" },
              { label: "Email", field: "e_email" },
              { label: "Address", field: "e_address" },
              { label: "Designation", field: "e_designation" },
              { label: "Group", field: "e_group" },
              { label: "Date of Joining", field: "e_date_of_joining" },
              { label: "Date of Birth", field: "e_DOB" },
            ].map(({ label, field, disabled }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-600">{label}</label>
                <input
                  type={field.includes("date") ? "date" : "text"}
                  value={data.emp_details[field]}
                  onChange={(e) =>
                    handleInputChange("emp_details", field, e.target.value)
                  }
                  disabled={disabled}
                  className={`w-full mt-1 px-4 py-2 border ${
                    disabled ? "bg-gray-100" : "bg-white"
                  } border-gray-300 rounded-lg`}
                />
              </div>
            ))}
          </div>
        </div>
  
        {/* Bank Details Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Bank Details</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Bank Name", field: "e_bank_name" },
              { label: "Account Number", field: "e_bank_acc_number" },
              { label: "PAN Number", field: "e_pan_number" },
              { label: "Bank IFSC", field: "e_bank_IFSC" },
              { label: "CPF/GPF Number", field: "e_cpf_or_gpf_number" },
            ].map(({ label, field }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-600">{label}</label>
                <input
                  type="text"
                  value={data.emp_bank_details[field]}
                  onChange={(e) =>
                    handleInputChange("emp_bank_details", field, e.target.value)
                  }
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Earning Details Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Earning Details</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(data.emp_earning_details)
              .filter((field) => field !== "e_id" && field !== "e_name")
              .map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-600">
                    {field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </label>
                  <input
                    type="number"
                    value={data.emp_earning_details[field]}
                    onChange={(e) =>
                      handleInputChange("emp_earning_details", field, e.target.value)
                    }
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              ))}
          </div>
        </div>


        {/* Deduction Details Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Deduction Details</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(data.emp_deduction_details)
              .filter((field) => field !== "e_id" && field !== "e_name")
              .map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-600">
                    {field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </label>
                  <input
                    type="number"
                    value={data.emp_deduction_details[field]}
                    onChange={(e) =>
                      handleInputChange("emp_deduction_details", field, e.target.value)
                    }
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              ))}
          </div>
        </div>
  
        
  
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateForm;
