import React, { useState, useEffect } from "react";
import { get_payslip } from "../../controller/Payslip";
import { useLocation, useNavigate } from "react-router-dom";
import { ReceiptEuroIcon } from "lucide-react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import watermark from '../../assets/images/pdf_watermark.jpg';


export default function Payslip_pdf() {
  const pdfRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(location.state);
  const monthName = new Date(2024, data.salary_details.salary_month - 1).toLocaleString('en-US', { month: 'long' });
  console.log(location.state)
  console.log("data", data)


  const handleDownloadPDF = () => {
    const input = pdfRef.current;

    // Temporarily hide buttons before generating the PDF
    const buttons = document.querySelector(".pdf-buttons");
    if (buttons) buttons.style.display = "none";

    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {


      const imgData = canvas.toDataURL("image/jpeg"); // Use JPEG & lower quality (0.6 = 60%)

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 5; // Set uniform margins (adjustable)
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      let imgWidth = availableWidth;
      let imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      // Scale down to fit within the A4 page height if needed
      if (imgHeight > availableHeight) {
        const scaleFactor = availableHeight / imgHeight;
        imgWidth *= scaleFactor;
        imgHeight *= scaleFactor;
      }

      const xPos = (pageWidth - imgWidth) / 2; // Center horizontally
      const yPos = margin; // Apply top margin



      pdf.addImage(imgData, "JPG", xPos, yPos, imgWidth, imgHeight);
      pdf.save(`Payslip_${data.salary_details.e_id}_${monthName}_${data.salary_details.salary_year}.pdf`);

      // Show buttons again after generating the PDF
      if (buttons) buttons.style.display = "flex";
    });
  };




  const handleSendEmail = () => {
    // Call API to send email with PDF attachment
    alert("Payslip sent to your email!");
  };



  const handleGoBack = () => {
    navigate("/payslip");
  };

  const style_watermark = {
    backgroundImage: `url(${watermark})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    opacity: 0.2, // Reduce image opacity
    position: 'absolute',
    top: '48%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center the watermark
    width: '100%',
    height: '100%',
    zIndex: 2, // Send it behind content
  };


  return (
    <div className="bg-gray-100 py-8">

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
        font-family: "Times New Roman", serif; /* Change font here */
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .payslip, .summary-section, .footer-section {
        width: 100%;
        padding: 0;
        margin: 0;
        page-break-inside: avoid;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        padding: 8px;
        border: 1px solid black;
      }
      .bg-gray-50 {
        background-color: #F9FAFB !important;
      }
    }
  `}
      </style>

      <div ref={pdfRef} className="bg-white border mx-auto max-w-[1000px] p-6 shadow-md print:max-w-full print:shadow-none print:border-none relative pt-serif-regular">
        <div style={style_watermark} className="absolute"></div>


        {/* Header Section */}
        <div className="text-center border-b pb-4 mb-6">
          <h3 className="text-2xl font-bold tracking-wide mb-2">
            University Institute of Technology
          </h3>
          <h3 className="text-xl font-semibold tracking-wide mb-3">
            Rajiv Gandhi Proudyogiki Viswavidyalaya
          </h3>
          <h2 className="text-2xl font-bold  inline-block px-8 py-2 rounded-full">
            PAYSLIP - {monthName} {data.salary_details.salary_year}
          </h2>
        </div>

        {/* Employee Details Section */}
        <div className="mb-8">
          <table className="w-full table-auto border-collapse text-sm">
            <tbody className="divide-y">
              <tr className="">
                <th className="text-left px-4 py-3  w-1/4">Employee Id</th>
                <td className="px-4 py-3 w-1/4">{data.emp_details.e_id}</td>
                <th className="text-left px-4 py-3">Name</th>
                <td className="px-4 py-3 font-medium">{data.emp_details.e_name}</td>

              </tr>
              <tr className="">
                <th className="text-left px-4 py-3">Designation</th>
                <td className="px-4 py-3">{data.emp_details.e_designation}</td>

                <th className="text-left px-4 py-3 w-1/4">Department</th>
                <td className="px-4 py-3 w-1/4">{data.dept_details.d_name}</td>

              </tr>
              <tr className="">
                <th className="text-left px-4 py-3">A/c No</th>
                <td className="px-4 py-3 number-font">{data.bank_details.e_bank_acc_number}</td>

                <th className="text-left px-4 py-3">Bank Name</th>
                <td className="px-4 py-3">{data.bank_details.e_bank_name}</td>

              </tr>
              <tr className="">

                <th className="text-left px-4 py-3">IT PAN No</th>
                <td className="px-4 py-3">{data.bank_details.e_pan_number}</td>
                <th className="text-left px-4 py-3">Leave days</th>
                <td className="px-4 py-3">{` ${data.salary_details.leave_days}`}</td>
              </tr>
              <tr className="">
                <th className="text-left px-4 py-3">CPF/GPF No</th>
                <td className="px-4 py-3">{data.bank_details.e_cpf_or_gpf_number}</td>
                <th className="text-left px-4 py-3"></th>
                <td className="px-4 py-3"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Earnings and Deductions Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold  mb-4 pb-2 border-b">
            Earnings and Deductions
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {/* Earnings Column */}
            <div>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left  font-bold" colSpan={2}>
                      Earnings
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y ">
                  <tr className="">
                    <td className="px-4 py-2 border">Basic</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.basic_salary}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">Spc./Pers. Pay</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.special_pay}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">Dearness Pay</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.dearness_allowance}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">D.A.</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.DA}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">A.D.A</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.ADA}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">IR</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.interim_relief}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">HRA</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.HRA}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">CCA</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.CCA}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">Conv Allow</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.conveyance}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">Medical</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.medical}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">Wash. Allow</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.washing_allowance}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">BDP/LWP</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.BDP}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">Arrears</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.arrears}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Deductions Column */}
            <div>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left border font-bold" colSpan={2}>
                      Deductions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="">
                    <td className="px-4 py-2 border">leave deduction amount</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.leave_deduction_amount}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">CPF/GPF</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.deduction_CPF}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">GIS</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.GIS}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">House Rent</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.house_rent}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">Water Charges</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.water_charges}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">Electricity Deduction</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.electricity_charges}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">Vehicle Deduction</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.vehicle_deduction}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">HB Loan</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.HB_loan}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">GPF Loan</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.GPF_loan}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">Festival Loan</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.festival_loan}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">Grain Advance</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.grain_charges}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">Bank Adv./Asso. Ded.</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.bank_advance}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">Advance</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.advance}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border">RGPV Adv./Oth Ded</td>
                    <td className="px-4 py-2 text-right border">{data.salary_details.RGPV_advance}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-6 border-t pt-4 summary-section">
          <table className="w-full text-sm">
            <tbody>
              <tr className="">
                <td className="px-4 py-3 font-bold">Total Earnings</td>
                <td className="px-4 py-3 text-right font-bold">{data.salary_details.total_earning}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold">Total Deductions</td>
                <td className="px-4 py-3 text-right font-bold">-{data.salary_details.total_deduction}</td>
              </tr>
              <tr className="">
                <td className="px-4 py-3 font-bold text-lg">Net Payable</td>
                <td className="px-4 py-3 text-right font-bold text-lg">{data.salary_details.net_payable}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Section */}
        <div className="mt-8 pt-4 border-t flex justify-between items-end footer-section">
          <p className="text-sm text-gray-600">
            In case of any discrepancy, please inform us immediately.
          </p>
          <div className="text-right">
            <p className="text-lg font-bold">Account Section</p>
            <p className="text-sm text-gray-500 mt-1">Generated on {data.salary_details.payslip_issue_date}</p>
          </div>
        </div>

      </div>
      {/* Buttons Section */}
      <div className="pdf-buttons mt-6 flex justify-evenly">
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={handleSendEmail}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:cursor-pointer"
        >
          Send to Email
        </button>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:cursor-pointer"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
