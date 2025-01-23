import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DEPT_aside = ({ deptData, setdeptData, d_id , d_name}) => {
  const navigate = useNavigate();
  const [dId, setdID] = useState("");
  const [dName, setdName] = useState("");

  function add_dept(){
    navigate("/department/add_form");
  }

  function update() {
    const d = { d_id: d_id, d_name: 'it' };

    if (d_id) {
      navigate("/department/update_form", { state: d });
    }
  }

  // Change button styles based on d_id
  const class_for_btn = d_id ? 'bg-blue-700 hover:bg-blue-800 text-white font-bold' : "bg-gray-700 hover:bg-gray-800";

  // Handle clearing of filters
  function clearFilter() {
    setdID("");
    setdName("");
  }

  return (
    <>
      <aside className="w-1/3 bg-blue-300 flex flex-col mx-auto">
        {/* Sidebar */}
        <div className="flex flex-col items-center justify-center">
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full w-9/12 text-xl my-3 mt-4 sm:w-2/3 truncate"
            onClick={add_dept}
          >
            Add Department
          </button>
          <button
            className={`${class_for_btn} text-white font-bold py-2 px-4 rounded-full w-9/12 text-xl my-3`}
            onClick={update} // Added onClick handler for Update button
          >
            Update Department
          </button>
          <button
            className={`${class_for_btn} text-white font-bold py-2 px-4 rounded-full w-9/12 text-xl my-3`}
          >
            Remove Department
          </button>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl underline mt-4 mx-5">Filter</h1>

          <div className="flex flex-col items-center justify-end">
            <span className="my-1 mt-5 mx-2">
              <label className="text-2xl">D_ID: </label>
              <input type="text" value={dId} onChange={(e) => setdID(e.target.value)} />
            </span>
            <span className="my-1 mx-2">
              <label className="text-2xl">D_Name: </label>
              <input type="text" value={dName} onChange={(e) => setdName(e.target.value)} />
            </span>
          </div>

          <div className="flex-row my-5">
            <div className="flex items-center justify-center">
              <button
                className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-5/12 text-xl"
                onClick={clearFilter} // Clear filters
              >
                Clear filter
              </button>
              <button
                className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-5/12 text-xl ml-1 text-center"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DEPT_aside;
