import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="flex justify-center space-x-4 gap-4 	text-transform: uppercase text-lg font-serif font-normal tracking-2">
        <NavLink
          to="/payslip"
          className= {(e)=>{return e.isActive? "bg-blue-600 text-white px-6 py-2 rounded-md " : "text-gray-600 hover:bg-gray-200 px-6 py-2 rounded-md" }
          }
        >
          Payslip
        </NavLink>
        <NavLink
          to="/employee"
          className= {(e)=>{return e.isActive? "bg-blue-600 text-white px-6 py-2 rounded-md " : "text-gray-600 hover:bg-gray-200 px-6 py-2 rounded-md" }
          }
        >
          Employee
        </NavLink>
        <NavLink
          to="/department"
          className= {(e)=>{return e.isActive? "bg-blue-600 text-white px-6 py-2 rounded-md " : "text-gray-600 hover:bg-gray-200 px-6 py-2 rounded-md" }
          }
        >
          Department
        </NavLink>
        <NavLink
          to="/user"
          className= {(e)=>{return e.isActive? "bg-blue-600 text-white px-6 py-2 rounded-md " : "text-gray-600 hover:bg-gray-200 px-6 py-2 rounded-md" }
          }
        >
          User
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
