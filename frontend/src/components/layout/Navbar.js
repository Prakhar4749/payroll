import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-auto">
          {/* Logo */}
          <div className="flex-shrink-0 text-white text-2xl font-bold py-5">
            Payslip App
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 uppercase text-white text-lg font-medium tracking-wide">
            <NavLink
              to="/payslip"
              className={(e) =>
                e.isActive
                  ? "bg-white text-blue-600 px-4 py-2 rounded-md shadow-md"
                  : "hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md transition"
              }
            >
              Payslip
            </NavLink>
            <NavLink
              to="/employee"
              className={(e) =>
                e.isActive
                  ? "bg-white text-blue-600 px-4 py-2 rounded-md shadow-md"
                  : "hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md transition"
              }
            >
              Employee
            </NavLink>
            <NavLink
              to="/department"
              className={(e) =>
                e.isActive
                  ? "bg-white text-blue-600 px-4 py-2 rounded-md shadow-md"
                  : "hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md transition"
              }
            >
              Department
            </NavLink>
            <NavLink
              to="/user/4565"
              className={(e) =>
                e.isActive
                  ? "bg-white text-blue-600 px-4 py-2 rounded-md shadow-md"
                  : "hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md transition"
              }
            >
              User
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-600 rounded-lg py-4 px-6 mb-10">
            <NavLink
              to="/payslip"
              className={(e) =>
                e.isActive
                  ? "block bg-white text-blue-600 px-4 py-2 rounded-md mb-2"
                  : "block text-white hover:bg-blue-700 px-4 py-2 rounded-md mb-2 transition"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Payslip
            </NavLink>
            <NavLink
              to="/employee"
              className={(e) =>
                e.isActive
                  ? "block bg-white text-blue-600 px-4 py-2 rounded-md mb-2"
                  : "block text-white hover:bg-blue-700 px-4 py-2 rounded-md mb-2 transition"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Employee
            </NavLink>
            <NavLink
              to="/department"
              className={(e) =>
                e.isActive
                  ? "block bg-white text-blue-600 px-4 py-2 rounded-md mb-2"
                  : "block text-white hover:bg-blue-700 px-4 py-2 rounded-md mb-2 transition"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Department
            </NavLink>
            <NavLink
              to="/user/4565"
              className={(e) =>
                e.isActive
                  ? "block bg-white text-blue-600 px-4 py-2 rounded-md mb-2"
                  : "block text-white hover:bg-blue-700 px-4 py-2 rounded-md mb-2 transition"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              User
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
