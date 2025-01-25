import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import EMP_aside from "../components/page_specific/EMP_aside";
import Emp_Table from "../components/page_specific/Emp_Table";
import { all_emp_data } from "../controller/empController";

export default function Employee() {
  const [alldata, setalldata] = useState([]);
  const [empData, setempData] = useState([]);
  const [selected_e_id, setselected_e_id] = useState("");

  useEffect(() => {
    async function getallempData() {
      try {
        const data = await all_emp_data();
        setalldata(data);
        setempData(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    }

    getallempData();
  }, []);

  

  const handleRowSelection = (selectedId) => {
    setselected_e_id(selectedId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar - Fixed at top */}
      <Navbar />

      {/* Main content - Pushed below navbar */}
      <div className="flex-1 pt-16"> {/* Add padding-top equal to navbar height */}
        <div className="flex flex-col lg:flex-row h-full">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 bg-white shadow-lg lg:min-h-[calc(100vh-4rem)]">
            <div className="sticky top-16 overflow-auto max-h-[calc(100vh-4rem)]">
              <EMP_aside
                setalldata={setalldata}
                alldata={alldata}
                setempData={setempData}
                selected_e_id={selected_e_id}
                setselected_e_id={setselected_e_id}
              />
            </div>
          </div>

          {/* Main Content */}
          <main className="w-full lg:w-3/4 p-6 bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Emp_Table 
                data={empData} 
                onRowSelect={handleRowSelection} 
                selectedId={selected_e_id}
                setSelectedId={setselected_e_id}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}