import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "../layout/Navbar";
import {checkDepartment} from "../../controller/department.controller"

const DeptUpdateForm = (d_id,d_name) => {
  // State for the form fields
  const [dId, setDId] = useState(d_id);
  const [dName, setDName] = useState(d_name);

  // Reset form fields
  const clearForm = () => {
    setDId('');
    setDName('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

     const result = await checkDepartment(dId, dName)
     console.log('ewdwedewd')
     console.log(result)

     if(result.d_id === false && result.d_name===false){

     }

    // Assuming you want to send the updated department info to an API
    const updatedDepartment = {
      d_id: dId,
      d_name: dName,
    };

    console.log("Updated Department: ", updatedDepartment);
    
    // Reset the form after submission
    clearForm();
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Update Department</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Department ID Field */}
          <div className="mb-4">
            <label htmlFor="d_id" className="block text-sm font-medium">Department ID</label>
            <input
              maxlength="4"
              size="4"
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
            <label htmlFor="d_name" className="block text-sm font-medium">Department Name</label>
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

export default DeptUpdateForm;
