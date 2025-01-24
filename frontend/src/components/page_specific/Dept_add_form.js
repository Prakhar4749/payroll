import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { checkDepartment, addToDepartment } from "../../controller/department.controller";
import SuccessfullyDone from "../common/SuccessfullyDone";

const DeptAddForm = () => {
  const navigate = useNavigate();

  const [dId, setDId] = useState("");
  const [dName, setDName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);  // State to manage success message

  // Reset form fields
  const clearForm = () => {
    setDId("");
    setDName("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if department ID starts with 'D' and last three characters are numeric
    if (dId[0] !== "D") {
      alert("Department ID should start with letter 'D'.");
      return;
    }

    if (!/^\d{3}$/.test(dId.slice(-3))) {
      alert("Department ID's last three characters should be numeric.");
      return;
    }

    // Check if department already exists
    const result = await checkDepartment(dId, dName);

    if (result.d_id && result.d_name) {
      alert("Both Department ID and Department Name already exist.");
    } else if (result.d_id) {
      alert("Department ID already exists.");
    } else if (result.d_name) {
      alert("Department Name already exists.");
    } else {
      // If department doesn't exist, proceed to add it
      const departmentData = {
        d_id: dId,
        d_name: dName,
      };

      try {
        await addToDepartment(departmentData);

        // Show success message
        setShowSuccess(true);
        console.log("Department added successfully, showing success message.");
        // Redirect after a delay
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/department");
        }, 3000);
      } catch (err) {
        console.error("Error adding department:", err);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Add New Department</h1>

        {showSuccess && (
          <SuccessfullyDone message="Department Name is added successfully!" onClose={() => {setShowSuccess(false); navigate("/department")} } />
        )}

        <form onSubmit={handleSubmit}>
          {/* Department ID Field */}
          <div className="mb-4">
            <label htmlFor="d_id" className="block text-sm font-medium">
              Department ID
            </label>
            <input
              maxLength="4"
              type="text"
              id="d_id"
              value={dId}
              onChange={(e) => setDId(e.target.value.toUpperCase())}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Department Name Field */}
          <div className="mb-4">
            <label htmlFor="d_name" className="block text-sm font-medium">
              Department Name
            </label>
            <input
              type="text"
              id="d_name"
              value={dName}
              onChange={(e) => setDName(e.target.value)}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {/* Clear Button */}
            <button
              type="button"
              onClick={clearForm}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Clear
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DeptAddForm;
