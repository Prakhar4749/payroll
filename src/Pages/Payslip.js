import React from "react";
import Navbar from "./component/Navbar";

export default function Payslip() {
  return (
    <div className=" bg-blue-300">
      <Navbar />
      <h1>Employee Payslip </h1>

      <div  className="flex flex-col bg-blue-300 items-center justify-evenly ">

        <span className="m-3">
          <label >E_name </label>
          <input type="text" className="bg-slate-300" />
        </span>
        <span className="m-3">
          <label >E_Id </label>
          <input type="text" className="bg-slate-300" />
        </span>

              <div className="flex items-center justify-evenly mt-5">
                <button className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full  text-xl">
                  Clear
                </button>
                <button className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full  text-xl  text-center ">
                  Submit
                </button>
              </div>
      </div>
    </div>
  );
}
