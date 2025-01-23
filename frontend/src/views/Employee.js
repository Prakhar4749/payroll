import React from "react";
import Navbar from "../components/layout/Navbar";
import { useState } from "react";
import EMP_aside from "../components/page_specific/EMP_aside";
import Emp_Table from "../components/page_specific/Emp_Table";

export default function Employee() {

  const emp= [
    {
      e_id: "1",
      e_name: "John Doe",
      e_mobile_number: "1234567890",
      e_email: "john@example.com",
      e_designation: "Manager",
      e_address: "123 Main St",
    },
    {
      e_id: "7",
      e_name: "John Doe",
      e_mobile_number: "1234567890",
      e_email: "john@example.com",
      e_designation: "Manager",
      e_address: "123 Main St",
    },
    {
      e_id: "6",
      e_name: "John Doe",
      e_mobile_number: "1234567890",
      e_email: "john@example.com",
      e_designation: "Manager",
      e_address: "123 Main St",
    },
    {
      e_id: "5",
      e_name: "John Doe",
      e_mobile_number: "1234567890",
      e_email: "john@example.com",
      e_designation: "Manager",
      e_address: "123 Main St",
    },
    {
      e_id: "4",
      e_name: "John Doe",
      e_mobile_number: "1234567890",
      e_email: "john@example.com",
      e_designation: "Manager",
      e_address: "123 Main St",
    },
    {
      e_id: "3",
      e_name: "John Doe",
      e_mobile_number: "1234567890",
      e_email: "john@example.com",
      e_designation: "Manager",
      e_address: "123 Main St",
    },
    {
      e_id: "2",
      e_name: "John Doe",
      e_mobile_number: "1234567890",
      e_email: "john@example.com",
      e_designation: "Manager",
      e_address: "123 Main St",
    }
  ];

  const [empData,setEMPData] = useState(emp);

  const handleRowSelection = (selectedId) => {
    console.log("Selected Employee ID:", selectedId);
  };
  return (
    <>
      {/* Navbar */}
      <Navbar />
  
      <div className="flex flex-col lg:flex-row w-full bg-blue-50 min-h-screen">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-white shadow-md">
          <EMP_aside empData={emp} setEMPData={setEMPData} />
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
