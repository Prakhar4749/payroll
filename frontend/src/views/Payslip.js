import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import {ConfirmDialogue} from "../components/common/ConfirmDialogue";
import InvalidDialogue from "../components/common/InvalidDialogue";
import { Calendar, UserRound } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50">
      <Navbar />

      {showConfirm && (
        <ConfirmDialogue
          message="Do you want to proceed?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {showInvalid && (
        <InvalidDialogue message={invalidMessage} onClose={handleInvalidClose} />
      )}

      <div className="max-w-4xl mx-auto pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Employee Payslip</h1>
          <p className="text-lg text-gray-600">Generate payslip by entering employee details below</p>
        </div>

        <form onSubmit={Submit} className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="space-y-6">
              {/* Employee ID Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="e_id">
                  Employee ID
                </label>
                <div className="relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="e_id"
                    type="text"
                    value={e_id}
                    onChange={(e) => sete_id(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-400 bg-white"
                    placeholder="Enter employee ID"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Salary Month Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="salary_month">
                    Salary Month
                  </label>
                  <div className="relative rounded-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="salary_month"
                      value={salary_month}
                      onChange={(e) => setsalary_month(e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
                    >
                      <option value="" disabled>Select Month</option>
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
                </div>

                {/* Salary Year Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="salary_year">
                    Salary Year
                  </label>
                  <div className="relative rounded-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="salary_year"
                      value={salary_year}
                      onChange={(e) => setsalary_year(e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
                    >
                      <option value="" disabled>Select Year</option>
                      {Array.from(
                        { length: new Date().getFullYear() - 2014 },
                        (_, index) => 2015 + index
                      ).map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row-reverse sm:justify-between sm:space-x-4 sm:space-x-reverse space-y-3 sm:space-y-0">
              <button
                type="submit"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-700 hover:via-teal-700 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
              >
                Generate Payslip
              </button>
              <button
                type="button"
                onClick={clear}
                className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
              >
                Clear Form
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}