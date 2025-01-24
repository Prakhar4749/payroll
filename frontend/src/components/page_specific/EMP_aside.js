import React, { useState, useEffect } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import { Search, UserPlus, UserCog, UserMinus, User, FilterX, Filter } from 'lucide-react';
import { view_emp_by_id } from "../../controller/empController";

const EMP_aside = ({  alldata, setempData, selected_e_id,setselected_e_id }) => {
  const [e_id, sete_id] = useState("");
  const [e_name, sete_name] = useState("");
  const [e_mob, sete_mob] = useState("");
  const navigate = useNavigate();

  const addEmp = ()=> {
    navigate("/employee/addEmployee");
  }

  const updateEmp = async()=> {
    if (!selected_e_id) {
      console.error("No employee ID selected.");
      return; // Avoid making the API call if no ID is selected
    }
  
    try {
      const data = await view_emp_by_id(selected_e_id); // Fetch employee data
  
      console.log("Employee data received:", data);
  
      if (data && Object.keys(data).length > 0) {
        // Navigate to the view page with the employee data
        navigate("/employee/updateEmployee", { state: { data } });
      } else {
        // If no data, navigate to a fallback page
        console.warn("No data found for the given employee ID.");
        navigate("/*"); // Replace `/*` with an actual fallback route if necessary
      }
    } catch (error) {
      console.error("Error fetching employee data:", error.message);
    }

  }

  const ViewEmp = async () => {
    if (!selected_e_id) {
      console.error("No employee ID selected.");
      return; // Avoid making the API call if no ID is selected
    }
  
    try {
      const data = await view_emp_by_id(selected_e_id); // Fetch employee data
  
      console.log("Employee data received:", data);
  
      if (data && Object.keys(data).length > 0) {
        // Navigate to the view page with the employee data
        navigate("/employee/viewEmployee", { state: { data } });
      } else {
        // If no data, navigate to a fallback page
        console.warn("No data found for the given employee ID.");
        navigate("/*"); // Replace `/*` with an actual fallback route if necessary
      }
    } catch (error) {
      console.error("Error fetching employee data:", error.message);
    }
  };


  function apply() {
    const filteredData = alldata.filter((employee) => {
      const idMatch = e_id
        ? employee.e_id.toLowerCase().includes(e_id.toLowerCase())
        : true;
      const nameMatch = e_name
        ? employee.e_name.toLowerCase().includes(e_name.toLowerCase())
        : true;
      const mobMatch = e_mob 
        ? String(employee.e_mobile_number).includes(e_mob)
        : true;
      return idMatch && nameMatch && mobMatch;
    });
    setempData(filteredData);

    setselected_e_id("");


  }

  function clearFilter() {
    setempData(alldata);
    sete_id("");
    sete_name("");
    sete_mob("");
  }

  return (
    <aside className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      

      <div className="p-6 flex flex-col gap-4">
        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-2" onClick={addEmp} >
          <UserPlus className="w-4 h-4" />
          Add Employee
        </button>
        <button
          className={`w-full font-medium py-2.5 px-4 rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            selected_e_id
              ? "bg-teal-600 hover:bg-teal-700 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!selected_e_id}
        onClick={updateEmp}>
          <UserCog className="w-4 h-4" />
          Update Employee
        </button>
        <button
          className={`w-full font-medium py-2.5 px-4 rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            selected_e_id
              ? "bg-rose-600 hover:bg-rose-700 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!selected_e_id}
        >
          <UserMinus className="w-4 h-4" />
          Remove Employee
        </button>
        <button
          className={`w-full font-medium py-2.5 px-4 rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            selected_e_id
              ? "bg-sky-600 hover:bg-sky-700 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!selected_e_id} onClick={ViewEmp}
        >
          <User className="w-4 h-4" />
          View Employee
        </button>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">Filter Options</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="e_id">
                Employee ID
              </label>
              <input
                type="text"
                id="e_id"
                value={e_id}
                onChange={(e) => sete_id(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200"
                placeholder="Search by ID..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="e_name">
                Employee Name
              </label>
              <input
                type="text"
                id="e_name"
                value={e_name}
                onChange={(e) => sete_name(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200"
                placeholder="Search by name..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="e_mob">
                Mobile Number
              </label>
              <input
                type="text"
                id="e_mob"
                value={e_mob}
                onChange={(e) => sete_mob(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200"
                placeholder="Search by mobile..."
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
            <button
              onClick={apply}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Apply
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default EMP_aside;