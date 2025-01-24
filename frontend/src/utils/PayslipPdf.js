import React from "react";

export default function CreatePayslipPdf() {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  const data = {
    emp_details: {
      e_id: "E001",
      e_name: "Dr. Johnson",
      e_mobile_number: 9876543210,
      e_gender: "Female",
      e_email: "truelink71@gmail.com",
      e_address: "Faculty Quarters 1",
      e_photo: null,
      d_id: "D003",
      e_designation: "Professor",
      e_group: "A",
      e_date_of_joining: "2015-07-30T18:30:00.000Z",
      e_DOB: "1980-03-13T18:30:00.000Z",
    },
    dept_details: {
      d_id: "D003",
      d_name: "Civil Engineering",
    },
    emp_bank_details: {
      e_id: "E001",
      e_name: "Dr. Alice Johnson",
      e_bank_name: "State Bank of India",
      e_bank_acc_number: 123456789012,
      e_pan_number: "PANA1234A",
      e_bank_IFSC: "SBIN0000123",
      e_cpf_or_gpf_number: 2001,
    },
    emp_deduction_details: {
      e_id: "E001",
      e_name: "Dr. Alice Johnson",
      leave_days: 2,
      leave_deduction_amount: 1000,
      deduction_CPF: 5000,
      GIS: 200,
      house_rent: 8000,
      water_charges: 100,
      electricity_charges: 300,
      vehicle_deduction: 200,
      HB_loan: 1000,
      GPF_loan: 500,
      festival_loan: 300,
      grain_charges: 100,
      bank_advance: 0,
      advance: 0,
      RGPV_advance: 0,
      income_tax: 7000,
      professional_tax: 300,
    },
    emp_earning_details: {
      e_id: "E001",
      e_name: "Dr. Alice Johnson",
      basic_salary: 120000,
      special_pay: 10000,
      dearness_allowance: 50000,
      DA: 25000,
      ADA: 12000,
      interim_relief: 5000,
      HRA: 20000,
      CCA: 8000,
      conveyance: 5000,
      medical: 3000,
      washing_allowance: 1000,
      BDP: 2000,
      arrears: 0,
    },
  };

  // Calculating total earnings and deductions
  const totalEarnings =
    data.emp_earning_details.basic_salary +
    data.emp_earning_details.special_pay +
    data.emp_earning_details.dearness_allowance +
    data.emp_earning_details.DA +
    data.emp_earning_details.ADA +
    data.emp_earning_details.interim_relief +
    data.emp_earning_details.HRA +
    data.emp_earning_details.CCA +
    data.emp_earning_details.conveyance +
    data.emp_earning_details.medical +
    data.emp_earning_details.washing_allowance +
    data.emp_earning_details.BDP +
    data.emp_earning_details.arrears;

  const totalDeductions =
    data.emp_deduction_details.deduction_CPF +
    data.emp_deduction_details.GIS +
    data.emp_deduction_details.house_rent +
    data.emp_deduction_details.income_tax +
    data.emp_deduction_details.professional_tax;

  const netPayable = totalEarnings - totalDeductions;

  return (
    <div className="bg-gray-100">
      <div className="bg-white border mx-auto max-w-[800px] print:max-w-full print:shadow-none print:border-none">
       {/* Print-specific styling */}
       <style>
          {`
            @media print {
              @page {
                size: A4;
                margin: 0;
              }
              body {
                margin: 18px;
                padding: 2px;
                font-family: Arial, sans-serif;
                font-size: 14px;
                font-weight: 400;
              }
              .payslip {
                width: 100%;
                padding: 0;
                margin: 0;
                page-break-inside: avoid;
                font-size: 14px;
                font-weight: bold;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                padding: 8px;
                font-size: 14px;
                font-weight: bold;
                border: 1px solid black;
              }
            }
          `}
        </style>

        <h3 className="text-center text-xl font-semibold text-gray-800 ">
          University Institute of Technology
        </h3>
        <h3 className="text-center text-xl font-semibold text-gray-800">
          Rajiv Gandhi Proudyogiki Viswavidyalaya
        </h3>
        <h2 className="text-center mt-2 text-xl font-semibold text-gray-800">
          PAYSLIP - {currentMonth} {currentYear}
        </h2>

           

        <table className="w-full table-auto mt-2 border-collapse">
          <thead>
            <tr>
              <th className="text-left px-2 py-2 bg-gray-200">Employee Id</th>
              <th className="text-left px-2 py-2">{data.emp_details.e_id}</th>
              <th className="text-left px-2 py-2 bg-gray-200">Department</th>
              <th className="text-left px-2 py-2">
                {data.dept_details.d_name}
              </th>
            </tr>
            <tr>
              <th className="text-left px-2 py-2 bg-gray-200">CPF/GPF No</th>
              <th className="text-left px-2 py-2">
                {data.emp_bank_details.e_cpf_or_gpf_number}
              </th>
              <th className="text-left px-2 py-2 bg-gray-200">Bank Name</th>
              <th className="text-left px-2 py-2">
                {data.emp_bank_details.e_bank_name}
              </th>
            </tr>
            <tr>
              <th className="text-left px-2 py-2 bg-gray-200">IT PAN No</th>
              <th className="text-left px-2 py-2">
                {data.emp_bank_details.e_pan_number}
              </th>
              <th className="text-left px-2 py-2 bg-gray-200">Name</th>
              <th className="text-left px-2 py-2">{data.emp_details.e_name}</th>
            </tr>
            <tr>
              <th className="text-left px-2 py-2 bg-gray-200">Designation</th>
              <th className="text-left px-2 py-2">
                {data.emp_details.e_designation}
              </th>
              <th className="text-left px-2 py-2 bg-gray-200">Attendance</th>
              <th className="text-left px-2 py-2">{`Leave Days: ${data.emp_deduction_details.leave_days}`}</th>
            </tr>
            <tr>
              <th className="text-left px-2 py-2 bg-gray-200">A/c No</th>
              <th className="text-left px-2 py-2">
                {data.emp_bank_details.e_bank_acc_number}
              </th>
            </tr>
          </thead>
        </table>

        <h3 className="text-center text-lg font-semibold text-gray-800 mt-6">
          Earnings and Deductions
        </h3>
        <table className="w-full table-auto mt-4 border-collapse border border-black">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border border-black bg-gray-200">
                Earnings
              </th>
              <th className="px-4 py-2 text-left border border-black bg-gray-200">
                Amount
              </th>
              <th className="px-4 py-2 text-left border border-black bg-gray-200">
                Deductions
              </th>
              <th className="px-4 py-2 text-left border border-black bg-gray-200">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-black">Basic</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_earning_details.basic_salary}
              </td>
              <td className="px-4 py-2 border border-black">CPF/GPF</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_deduction_details.deduction_CPF}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">Spc./Pers. Pay</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_earning_details.special_pay}
              </td>
              <td className="px-4 py-2 border border-black">GIS</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_deduction_details.GIS}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">Dearness Pay</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_earning_details.dearness_allowance}
              </td>
              <td className="px-4 py-2 border border-black">House Rent</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_deduction_details.house_rent}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">D.A.</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_earning_details.DA}
              </td>
              <td className="px-4 py-2 border border-black">Water Charges</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_deduction_details.water_charges}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">A.D.A</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_earning_details.ADA}
              </td>
              <td className="px-4 py-2 border border-black">
                Electricity Deduction
              </td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_deduction_details.electricity_charges}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">IR</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_earning_details.interim_relief}
              </td>
              <td className="px-4 py-2 border border-black">
                Vehicle Deduction
              </td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_deduction_details.vehicle_deduction}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">HRA</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_earning_details.HRA}
              </td>
              <td className="px-4 py-2 border border-black">HB Loan</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_deduction_details.HB_loan}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">CCA</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_earning_details.CCA}
              </td>
              <td className="px-4 py-2 border border-black">GPF Loan</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_deduction_details.GPF_loan}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">Conv Allow</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_earning_details.conveyance}
              </td>
              <td className="px-4 py-2 border border-black">Festival Loan</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_deduction_details.festival_loan}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">Medical</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_earning_details.medical}
              </td>
              <td className="px-4 py-2 border border-black">Grain Advance</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_deduction_details.grain_charges}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">Wash. Allow</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_earning_details.washing_allowance}
              </td>
              <td className="px-4 py-2 border border-black">
                Bank Adv./Asso. Ded.
              </td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_deduction_details.bank_advance}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">BDP/LWP</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_earning_details.BDP}
              </td>
              <td className="px-4 py-2 border border-black">Advance</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_deduction_details.advance}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-black">Arrears</td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_earning_details.arrears}
              </td>
              <td className="px-4 py-2 border border-black">
                RGPV Adv./Oth Ded
              </td>
              <td className="px-4 py-2 text-right border border-black">
                {data.emp_deduction_details.RGPV_advance}
              </td>
            </tr>
            <tr>
              <td
                className="px-4 py-2 border border-black font-bold"
                colSpan="2"
              >
                Total Earnings
              </td>
              <td
                className="px-4 py-2 border border-black font-bold text-right"
                colSpan="2"
              >
                {totalEarnings}
              </td>
            </tr>
            <tr>
              <td
                className="px-4 py-2 border border-black font-bold"
                colSpan="2"
              >
                Total Deductions
              </td>
              <td
                className="px-4 py-2 border border-black font-bold text-right"
                colSpan="2"
              >
                {totalDeductions}
              </td>
            </tr>
            <tr>
              <td
                className="px-4 py-2 border border-black font-bold"
                colSpan="2"
              >
                Net Payable
              </td>
              <td
                className="px-4 py-2 border border-black font-bold text-right"
                colSpan="2"
              >
                {netPayable}
              </td>
            </tr>
          </tbody>
        </table>

       
          <p className="text-right text-xl font-bold mt-8">Account Section</p>
          <p className="text-left text-sm text-gray-600 mt-2">
          In case of any discrepancy, please inform us immediately.
          </p>
      </div>
    </div>
  );
}
