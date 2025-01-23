import React, { useState } from "react";

const EMP_aside = ({ empData, setEMPData, selected_e_id }) => {
  const [e_id, sete_id] = useState("");
  const [e_name, sete_name] = useState("");
  const [eMob, setEMob] = useState("");

  // Apply filter function
  function apply() {
    const filteredData = empData.filter((employee) => {
      const idMatch = e_id
        ? employee.e_id.toLowerCase().includes(e_id.toLowerCase())
        : true;
      const nameMatch = e_name
        ? employee.e_name.toLowerCase().includes(e_name.toLowerCase())
        : true;
      const mobMatch = eMob
        ? employee.e_mobile_number.includes(eMob)
        : true;
      return idMatch && nameMatch && mobMatch;
    });
    setEMPData(filteredData);
  }

  // Clear all filters
  function clearFilter() {
    sete_id("");
    sete_name("");
    setEMob("");
    setEMPData(empData); // Reset to original data
  }

  return (
    <aside className="w-full bg-white shadow-lg rounded-md p-6 mx-auto flex flex-col gap-6">
      {/* Sidebar Buttons */}
      <div className="flex flex-col items-center gap-4">
        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-center text-lg transition-transform transform active:scale-95">
          Add Employee
        </button>
        <button
          className={`w-full font-bold py-2 px-4 rounded-lg text-center text-lg transition-transform transform active:scale-95 ${
            selected_e_id
              ? "bg-purple-500 hover:bg-purple-600 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          disabled={!selected_e_id}
        >
          Update Employee
        </button>
        <button
          className={`w-full font-bold py-2 px-4 rounded-lg text-center text-lg transition-transform transform active:scale-95 ${
            selected_e_id
            
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          disabled={!selected_e_id}
        >
          Remove Employee
        </button>
        <button
          className={`w-full font-bold py-2 px-4 rounded-lg text-center text-lg transition-transform transform active:scale-95 ${
            selected_e_id
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          disabled={!selected_e_id}
        >
          View Employee
        </button>
      </div>

      {/* Filter Section */}
      <div className="mt-6">
        <h1 className="text-2xl font-semibold underline text-gray-700">Filter</h1>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="e_id">
              E_ID
            </label>
            <input
              type="text"
              id="e_id"
              value={e_id}
              onChange={(e) => sete_id(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="e_name">
              E_Name
            </label>
            <input
              type="text"
              id="e_name"
              value={e_name}
              onChange={(e) => sete_name(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="eMob">
              E_Mob
            </label>
            <input
              type="text"
              id="eMob"
              value={eMob}
              onChange={(e) => setEMob(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition-transform transform active:scale-95"
            onClick={clearFilter}
          >
            Clear Filter
          </button>
          <button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-transform transform active:scale-95"
            onClick={apply}
          >
            Apply
          </button>
        </div>
      </div>
    </aside>
  );
};

export default EMP_aside;
