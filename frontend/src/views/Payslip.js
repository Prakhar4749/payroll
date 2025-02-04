import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { useNavigate, useLocation, Await } from "react-router-dom";
import { ConfirmDialogue } from "../components/common/ConfirmDialogue";
import { InvalidDialogue } from "../components/common/InvalidDialogue";
import { SuccessfullyDone } from "../components/common/SuccessfullyDone";
import { Calendar, UserRound } from 'lucide-react';
import { check_id, check_payslip_in_archive, get_payslip, fetch_form, create_salary_archive } from "../controller/Payslip";

export default function Payslip() {

  const navigate = useNavigate();
  const location = useLocation();
  const selected_e_id = location.state && location.state.selected_e_id
    ? location.state.selected_e_id
    : null;
 
  
  
  const [salary_details, setsalary_details] = useState({ e_id: selected_e_id , salary_month: String(new Date().getMonth() + 1).padStart(2, '0') , salary_year: new Date().getFullYear() });

  const [showConfirm, setShowConfirm] = useState({ success: false, message: "", onConfirm: () => { } });
  const [showInvalid, setShowInvalid] = useState({ success: false, message: "", onClose: () => { } });
  const [showSuccess, setShowSuccess] = useState({ success: false, message: "", onClose: () => { } });






  const validateInputs = async() => {
    // Check if the employee ID is valid
    const idResponse = await check_id(salary_details.e_id);
    if (!idResponse.result.e_id) {
      setShowInvalid({
        success: true,
        message: "Enter a valid Employee ID! e_id does not exist",
        onClose: () => { setShowInvalid(showInvalid) }
      });
      return;
    }
    if (salary_details.salary_year > new Date().getFullYear() || salary_details.salary_year < 2015) {
      setShowInvalid({ success: true, message: "Enter a valid salary year.", onClose: () => { setShowInvalid(showInvalid) } });

      return false;
    }
    if (salary_details.salary_year == new Date().getFullYear() && salary_details.salary_month > new Date().getMonth() + 1) {
      setShowInvalid({ success: true, message: "Enter a valid salary month.", onClose: () => { setShowInvalid(showInvalid) } });
      return false;
    }
    return true;
  };

  const Submit = async (e) => {
    e.preventDefault();
    console.log(salary_details)

    if (! await validateInputs()) {
      return;
    }

    try {
      

      // Check if the payslip is generated for the given employee, month, and year
      const payslipResponse = await check_payslip_in_archive({
        e_id: salary_details.e_id,
        salary_month: salary_details.salary_month,
        salary_year: salary_details.salary_year
      });
      if (!payslipResponse.result.payslip) {
        setShowConfirm({
          success: true,
          message: `Payslip of E_id:${salary_details.e_id} is not generated yet for ${salary_details.salary_month}, ${salary_details.salary_year}. would you like to generate payslip.`,
          onConfirm: () => {
            navigate("/payslip/form", { state: salary_details });
          }
        });
        return;
      }

      if (payslipResponse.result.payslip) {
        setShowConfirm({
          success: true,
          message: `Payslip of E_id:${salary_details.e_id} is already generated  for ${salary_details.salary_month}, ${salary_details.salary_year}.  would you like to get payslip.` ,
          onConfirm: async () => {
            let response = {}
           
                try {
                  response = await get_payslip(salary_details);
                  if (response.success) {
                    console.log(response.result);
                    
                  } else {
                    console.error("Error:", response.message);
                  }
                } catch (error) {
                  console.error("API call failed:", error);
                }
            navigate("/payslip/payslip_pdf", { state: response.result });
          }
        });
        return;
      }

      // Further actions can be added here based on the success of the above checks

    } catch (error) {
      // Handle any errors that occurred during the API calls
      console.error("Error during form submission:", error);
      setShowInvalid({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
        onClose: () => { setShowInvalid(showInvalid) }
      });
    }
  };

  const clear = () => {
    setsalary_details({ e_id: "" , salary_month: new Date().getMonth() + 1 , salary_year: new Date().getFullYear() });
  };



  const handleCancel = () => {

  };

  const handleInvalidClose = () => {

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50">
      <Navbar />

      {showSuccess.success && (
        <div className="fixed inset-0 z-50">
          <SuccessfullyDone
            message={showSuccess.message}
            onClose={setShowSuccess.onClose()
            }
          />
        </div>
      )}
      {showInvalid.success && (
        <div className="fixed inset-0 z-50">
          <InvalidDialogue
            message={showInvalid.message}
            onClose={() => { showInvalid.onClose() }}
          />
        </div>
      )}
      {showConfirm.success && (
        <div className="fixed inset-0 z-50">
          <ConfirmDialogue
            message={showConfirm.message}
            onConfirm={() => {
              showConfirm.onConfirm(); // Call the confirm callback
              setShowConfirm({ message: "", success: false, onConfirm: null }); // Close the dialog
            }}
            onCancel={() => setShowConfirm({ message: "", success: false, onConfirm: null }
            )} // Close without confirming
          />
        </div>
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
                    value={salary_details.e_id}
                    onChange={(e) => setsalary_details((prevDetails) => ({
                      ...prevDetails,
                      e_id: e.target.value, // Update only e_id, keep the rest unchanged
                    }))}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-400 bg-white"
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
                      value={salary_details.salary_month}
                      onChange={(e) => setsalary_details((prevDetails) => ({
                        ...prevDetails,
                        salary_month: e.target.value, // Update only e_id, keep the rest unchanged
                      }))}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="salary_details.salary_year">
                    Salary Year
                  </label>
                  <div className="relative rounded-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="salary_details.salary_year"
                      value={salary_details.salary_year}
                      onChange={(e) => setsalary_details((prevDetails) => ({
                        ...prevDetails,
                        salary_year: e.target.value, // Update only e_id, keep the rest unchanged
                      }))}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
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