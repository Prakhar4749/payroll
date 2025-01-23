import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building, Building2, FilterX, Filter } from "lucide-react";

import {removeFromDept} from "../../controller/department.controller"


const DEPT_aside = ({ deptData, deptDatacopy, setdeptDatacopy, d_id ,setdeptData ,setd_id }) => {
  const navigate = useNavigate();
  const [dId, setdID] = useState("");
  const [dName, setdName] = useState("");
  const [dNamec, setdNamec] = useState("");

  useEffect(() => {
    if (d_id) {
      const selectedDept = deptDatacopy.find((dept) => dept.d_id === d_id);
      setdName(selectedDept ? selectedDept.d_name : "");
    } else {
      setdName("");
    }
  }, [d_id, deptDatacopy]);

async  function remove() {
    if (d_id) {
      const confirmDelete = window.confirm(
        `Are you sure you want to remove department ID: ${d_id}?`
      );
      if (confirmDelete) {
        const remove= await removeFromDept(d_id)
        alert(`${d_id} is successfully deleted ...`)
        setd_id("")

        setdeptData([])

      }
    }
  }

  function add_dept() {
    navigate("/department/add_form");
  }

  function update() {
    if (d_id) {
      const d = { d_id: d_id, d_name: dName };
      navigate("/department/update_form", { state: d });
    }
  }

  function clearFilter() {
    setdID(""); // Clear Department ID input
    setdNamec(""); // Clear Department Name input
    setdeptDatacopy(deptData); // Reset the department data to the original list
  }

  function applyFilter() {
    // Filter based on Department ID and/or Department Name
    const filteredData = deptData.filter((dept) => {
      // Filter logic for Department ID (dId)
      const matchesId = dId ? dept.d_id.toString().includes(dId) : true; // Checks if the ID contains the input value
      
      // Filter logic for Department Name (dNamec)
      const matchesName = dNamec
        ? dept.d_name.toLowerCase().includes(dNamec.toLowerCase()) // Case-insensitive matching for the department name
        : true;
  
      // Return departments that match both criteria (if provided)
      return matchesId && matchesName;
    });
  
    setdeptDatacopy(filteredData);  // Update the department data with the filtered results
  }
  

  return (
    <aside className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 flex flex-col gap-4">
        <button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-2"
          onClick={add_dept}
        >
          <Building className="w-4 h-4" />
          Add Department
        </button>
        <button
          className={`w-full font-medium py-2.5 px-4 rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            d_id
              ? "bg-teal-600 hover:bg-teal-700 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          onClick={update}
          disabled={!d_id}
        >
          <Building className="w-4 h-4" />
          Update Department
        </button>
        <button
          className={`w-full font-medium py-2.5 px-4 rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            d_id
              ? "bg-rose-600 hover:bg-rose-700 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          onClick={remove}
          disabled={!d_id}
        >
          <Building2 className="w-4 h-4" />
          Remove Department
        </button>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">
              Filter Options
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="d_id"
              >
                Department ID
              </label>
              <input
                type="text"
                id="d_id"
                value={dId}
                onChange={(e) => setdID(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200"
                placeholder="Search by ID..."
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="d_name"
              >
                Department Name
              </label>
              <input
                type="text"
                id="d_name"
                value={dNamec}
                onChange={(e)=>setdNamec(e.target.value)}
                
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200"
                placeholder="Department name..."
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={clearFilter}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2 px-4 rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              <FilterX className="w-4 h-4" />
              Clear
            </button>
            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-2" onClick={applyFilter}>
              <Filter className="w-4 h-4" />
              Apply
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DEPT_aside;
