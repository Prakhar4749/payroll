import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import {  UserPlus, UserCog, UserMinus, User, FilterX, Filter, FileText } from 'lucide-react';
import { view_emp_by_id, delete_emp_details, all_emp_data } from "../../controller/empController";
import { SuccessfullyDone } from "../common/SuccessfullyDone";
import { ConfirmDialogue } from "../common/ConfirmDialogue";
import ComanLoading from "../common/ComanLoading";

const EMP_aside = ({setshowloading, setalldata, alldata, setempData, selected_e_id, setselected_e_id }) => {

  // const [showloading,setshowloading] = useState(false)
  

  const [e_id, sete_id] = useState("");
  const [e_name, sete_name] = useState("");
  const [e_mob, sete_mob] = useState("");
  const [showDeleteSuccess, setshowDeleteSuccess] = useState({
    message: "", success: false
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState({
    message: "",
    success: false,
    onConfirm: () => { }
  });

  const navigate = useNavigate();

  const onDeleteconfirm = async (selected_e_id) => {

    try {


      // console.log("aside", selected_e_id);
      
      setshowloading(true)
      const response = await delete_emp_details(selected_e_id); // Fetch employee data
      setshowloading(false)
      setshowDeleteSuccess({ message: `${response.message}`, success: response.success })
      setselected_e_id("")

      // console.log("aside show", showDeleteSuccess);
      try {

        const data = await all_emp_data();
        setalldata(data.result);
        setempData(data.result);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }




    } catch (error) {
      console.error("Error fetching employee data:", error.message);
    }

  }

  const addEmp = () => {
    navigate("/employee/addEmployee");
  }

  const DeleteEmp = () => {
    if (!selected_e_id) {
      console.error("No employee ID selected.");
      return; // Avoid making the API call if no ID is selected
    }

    setShowDeleteConfirm({
      message: `Are you sure you want to delete the employee details of E_ID: ${selected_e_id}?`,
      onConfirm: onDeleteconfirm, // Pass the function reference
    });
  };

  const updateEmp = async () => {
    if (!selected_e_id) {
      console.error("No employee ID selected.");
      return; // Avoid making the API call if no ID is selected
    }

    try {
      
      setshowloading(true)
      const response = await view_emp_by_id(selected_e_id); // Fetch employee data
      const data = response.result; // Fetch employee data
      setshowloading(false)

      // console.log("Employee data received:", data);

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
    // console.log(selected_e_id)


    if (!selected_e_id) {
      console.error("No employee ID selected.");
      return; // Avoid making the API call if no ID is selected
    }

    try {
      setshowloading(true)
      const response = await view_emp_by_id(selected_e_id); // Fetch employee data
      const data = response.result; // Fetch employee data
      
      // console.log("Employee data received:", data);
      setshowloading(false)
      
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

  const payslipEmp = async () => {
    if (!selected_e_id) {
      console.error("No employee ID selected.");
      return; // Avoid making the API call if no ID is selected
    }
    navigate("/payslip", { state: { selected_e_id } });
  };


  function apply() {
    if(!alldata) return
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
    const filteredMatch = filteredData.some(
      (employee) => employee.e_id === selected_e_id
    );
    if (!filteredMatch) setselected_e_id(null);


  }

  function clearFilter() {
    setempData(alldata);
    sete_id("");
    sete_name("");
    sete_mob("");
  }

  return (

    <aside className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
       
      {showDeleteSuccess.success && (
        <div className="fixed inset-0 z-50">
          <SuccessfullyDone
            message={showDeleteSuccess.message}
            onClose={() => setshowDeleteSuccess({ message: "", success: false })}
          />
        </div>
      )}
      {showDeleteConfirm.message && (
        <div className="fixed inset-0 z-50">
          <ConfirmDialogue
            message={showDeleteConfirm.message}
            onConfirm={() => {
              showDeleteConfirm.onConfirm(selected_e_id); // Call the confirm callback
              setShowDeleteConfirm({ message: "", onConfirm: null }); // Close the dialog
            }}
            onCancel={() => setShowDeleteConfirm({ message: "", onConfirm: null })} // Close without confirming
          />
        </div>
      )}


      <div className="p-6 flex flex-col gap-4">
        {/* Add Employee Button - Emerald */}
        <button
          className="w-full px-4 py-2.5 text-white font-medium rounded-xl
    bg-emerald-600 hover:bg-emerald-700
    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
    transform transition-all duration-200 hover:scale-[1.02]
    shadow-lg shadow-emerald-600/20
    flex items-center justify-center gap-2 text-sm"
          onClick={addEmp}
        >
          <UserPlus className="w-4 h-4" />
          Add Employee
        </button>

        {/* Update Employee Button - Teal */}
        <button
          className={`w-full px-4 py-2.5 font-medium rounded-xl
    transition-all duration-200 flex items-center justify-center gap-2 text-sm
    ${selected_e_id
              ? "bg-teal-600 text-white hover:bg-teal-700 \
         focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 \
         transform hover:scale-[1.02] shadow-lg shadow-teal-600/20"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          disabled={!selected_e_id}
          onClick={updateEmp}
        >
          <UserCog className="w-4 h-4" />
          Update Employee
        </button>

        {/* Remove Employee Button - Rose */}
        <button
          className={`w-full px-4 py-2.5 font-medium rounded-xl
    transition-all duration-200 flex items-center justify-center gap-2 text-sm
    ${selected_e_id
              ? "bg-rose-600 text-white hover:bg-rose-700 \
         focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 \
         transform hover:scale-[1.02] shadow-lg shadow-rose-600/20"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          disabled={!selected_e_id}
          onClick={DeleteEmp}
        >
          <UserMinus className="w-4 h-4" />
          Remove Employee
        </button>

        {/* View Employee Button - Sky */}
        <button
          className={`w-full px-4 py-2.5 font-medium rounded-xl
    transition-all duration-200 flex items-center justify-center gap-2 text-sm
    ${selected_e_id
              ? "bg-sky-600 text-white hover:bg-sky-700 \
         focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 \
         transform hover:scale-[1.02] shadow-lg shadow-sky-600/20"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          disabled={!selected_e_id}
          onClick={ViewEmp}
        >
          <User className="w-4 h-4" />
          View Employee
        </button>

        {/* Get Payslip Button - Violet */}
        <button
          className={`w-full px-4 py-2.5 font-medium rounded-xl
    transition-all duration-200 flex items-center justify-center gap-2 text-sm
    ${selected_e_id
              ? "bg-violet-600 text-white hover:bg-violet-700 \
         focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 \
         transform hover:scale-[1.02] shadow-lg shadow-violet-600/20"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          disabled={!selected_e_id}
          onClick={payslipEmp}
        >
          <FileText className="w-4 h-4" />
          Get Payslip
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