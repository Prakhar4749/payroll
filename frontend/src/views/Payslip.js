
import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/common/ConfirmDialog";
import InvalidDialog from "../components/common/InvalidDialog";

export default function Payslip() {
  const [e_id, sete_id] = useState("");
  const [salary_month, setsalary_month] = useState("");
  const [salary_year, setsalary_year] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");

  const navigate = useNavigate();

  const validateInputs = () => {
    if (salary_year > new Date().getFullYear() || salary_year < 2015) {
      setInvalidMessage("Enter a valid salary year.");
      setShowInvalid(true);
      return false;
    }
    if (salary_year == new Date().getFullYear() && salary_month > new Date().getMonth() + 1) {
      setInvalidMessage("Enter a valid salary month.");
      setShowInvalid(true);
      return false;
    }
    return true;
  };

  const Submit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      setShowConfirm(true);
    }
  };

  const clear = () => {
    sete_id("");
    setsalary_month("");
    setsalary_year("");
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    navigate("/payslip/payslip_form", {
      state: { e_id, salary_month, salary_year },
    });
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleInvalidClose = () => {
    setShowInvalid(false);
  };

  return (
    <div className="bg-gray-100 w-full min-h-200">
      <Navbar />

      {showConfirm && (
        <ConfirmDialog
          message="Do you want to proceed?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {showInvalid && (
        <InvalidDialog message={invalidMessage} onClose={handleInvalidClose} />
      )}

      <div className="flex flex-col items-center justify-center py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Employee Payslip
        </h1>

        <form
          className="bg-white shadow-md rounded-lg px-8 py-6 w-full sm:w-3/4 lg:w-2/4"
          onSubmit={Submit}
        >
          {/* Salary Month and Year in Same Row */}
          <div className="flex flex-col sm:flex-row sm:gap-4 mb-6">
            {/* Salary Month Field */}
            <div className="flex-1 mb-4 sm:mb-0">
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="salary_month"
              >
                Salary Month
              </label>
              <select
                id="salary_month"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={salary_month}
                required
                onChange={(e) => setsalary_month(e.target.value)}
              >
                <option value="" disabled>
                  Select Month
                </option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>

            {/* Salary Year Field */}
            <div className="flex-1">
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="salary_year"
              >
                Salary Year
              </label>
              <select
                id="salary_year"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={salary_year}
                required
                onChange={(e) => setsalary_year(e.target.value)}
              >
                <option value="" disabled>
                  Select Year
                </option>
                {Array.from(
                  { length: new Date().getFullYear() - 2000 + 1 },
                  (_, index) => 2000 + index
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Employee ID Field */}
          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="e_id"
            >
              Employee ID
            </label>
            <input
              id="e_id"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={e_id}
              required
              onChange={(e) => sete_id(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-evenly space-x-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-6 rounded-lg text-lg transition duration-200 w-1/2 sm:w-1/4"
              type="button"
              onClick={clear}
            >
               Clear 
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 w-1/2 sm:w-1/4"
              type="submit"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );


}  