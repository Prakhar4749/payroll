import React, { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { useState } from "react";
import EMP_aside from "../components/page_specific/EMP_aside";
import Emp_Table from "../components/page_specific/Emp_Table";
import { all_emp_data } from "../controller/empController";

export default function Employee() {
  const [alldata,setalldata] = useState([]);
  const [empData,setempData] = useState([]);
  useEffect(() => {

    async function getallempData() {
      try {
        const data = await all_emp_data();
        setalldata(data);
        console.log("fetched data", alldata)  // Await the async function
        setempData(data);  // Update state with resolved data
        
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    }

    getallempData();
  
  },[]);

  const [selected_e_id , setselected_e_id] = useState("");

  const handleRowSelection = (selectedId) => {
    
      setselected_e_id(selectedId);
      
  };
  useEffect( ()=>{
    console.log(selected_e_id)
  },[selected_e_id])
  return (
    <>
      {/* Navbar */}
      <Navbar />
  
      <div className="flex flex-col lg:flex-row w-full bg-blue-50 min-h-screen">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-white shadow-md">
          <EMP_aside empData={empData} alldata={alldata} setempData={setempData} selected_e_id={selected_e_id}  />
        </div>
  
        {/* Main Content */}
        <main className="w-full lg:w-3/4 bg-white p-4 shadow-md">
          <div className="overflow-x-auto">
          <Emp_Table data={empData} onRowSelect={handleRowSelection} />
          </div>
        </main>
      </div>
    </>
  );
  
}
