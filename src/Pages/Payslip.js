import React, { useState } from "react";
import Navbar from "./component/Navbar";


const payslip_data = require('./component/payslip_data')



export default function Payslip() {

  const [eName,setEName] = useState("");
  const [eID,setEID] = useState("");

  const submate=()=>{
    let a= payslip_data.emp_data.filter(emp => emp.e_id === eID)
     console.log(payslip_data.emp_data)
     console.log(a)
  }
  const clear=()=>{

  }


  return (
    <div className="bg-blue-300 w-full h-screen">
      <Navbar />

      {/* Main content below the Navbar */}
      <div className="flex flex-col items-center justify-center mt-10">

        <h1 className="text-2xl mb-6">Employee Payslip</h1>

        {/* Form container centered below the Navbar */}
        <div className="flex flex-col items-center w-full sm:w-1/2 lg:w-1/3">

          <div className="w-full mb-4">
            <label className="block text-xl mb-2" htmlFor="e_name">
              E_name
            </label>
            <input
              id="e_name"
              type="text"
              className="w-full p-2 border-2 border-gray-300 rounded-md"
              value={eName}
              onChange={(e)=>{setEName(e.target.value)}}
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-xl mb-2" htmlFor="e_id">
              E_Id
            </label>
            <input
              id="e_id"
              type="text"
              className="w-full p-2 border-2 border-gray-300 rounded-md"
              value={eID}
              onChange={(e)=>{setEID(e.target.value)}}
            />
          </div>

        </div>

        {/* Button Container */}
        <div className="flex items-center justify-center mt-6 w-full sm:w-1/2 lg:w-1/3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-xl mr-4" onClick={clear}>
            Clear
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-xl" onClick={submate}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
