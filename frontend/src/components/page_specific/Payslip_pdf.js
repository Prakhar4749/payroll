import React, { useState, useEffect } from "react";
import { send_pdf_to_email } from "../../controller/Payslip";
import { useLocation, useNavigate } from "react-router-dom";
import { ReceiptEuroIcon } from "lucide-react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import watermark from '../../assets/images/pdf_watermark.jpg';
import { ConfirmDialogue } from "../common/ConfirmDialogue";
import { SuccessfullyDone } from "../common/SuccessfullyDone";
import { InvalidDialogue } from "../common/InvalidDialogue";


export default function Payslip_pdf() {
  const pdfRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(location.state);
  const monthName = new Date(2024, data.salary_details.salary_month - 1).toLocaleString('en-US', { month: 'long' });

  const [showConfirm, setShowConfirm] = useState({ success: false, message: "", onConfirm: () => { } });
  const [showInvalid, setshowInvalid] = useState({ success: false, message: "", onClose: () => { } });
  const [showSuccess, setshowSuccess] = useState({ success: false, message: "", onClose: () => { } });

  const handleDownloadPDF = async () => {
    const input = pdfRef.current;

    // Hide buttons before generating the PDF
    const buttons = document.querySelector(".pdf-buttons");
    if (buttons) buttons.style.display = "none";

    const canvas = await html2canvas(input, { scale: 3, useCORS: true });
    const imgData = canvas.toDataURL("image/jpeg");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 5;
    const availableWidth = pageWidth - margin * 2;
    const availableHeight = pageHeight - margin * 2;

    let imgWidth = availableWidth;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight > availableHeight) {
      const scaleFactor = availableHeight / imgHeight;
      imgWidth *= scaleFactor;
      imgHeight *= scaleFactor;
    }

    const xPos = (pageWidth - imgWidth) / 2;
    const yPos = margin;

    pdf.addImage(imgData, "JPG", xPos, yPos, imgWidth, imgHeight);
    pdf.save(`Payslip_${data.salary_details.e_id}_${monthName}_${data.salary_details.salary_year}.pdf`);

    // Show buttons again after generating the PDF
    if (buttons) buttons.style.display = "flex";
  };




  const handleSendEmail = async () => {
    const input = pdfRef.current;

    // Hide buttons before generating the PDF
    const buttons = document.querySelector(".pdf-buttons");
    if (buttons) buttons.style.display = "none";

    const canvas = await html2canvas(input, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/jpeg");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 5;
    const availableWidth = pageWidth - margin * 2;
    const availableHeight = pageHeight - margin * 2;

    let imgWidth = availableWidth;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight > availableHeight) {
      const scaleFactor = availableHeight / imgHeight;
      imgWidth *= scaleFactor;
      imgHeight *= scaleFactor;
    }

    const xPos = (pageWidth - imgWidth) / 2;
    const yPos = margin;

    pdf.addImage(imgData, "JPG", xPos, yPos, imgWidth, imgHeight);

    const pdfBlob = pdf.output("blob");
    // Show buttons again after generating the PDF
    if (buttons) buttons.style.display = "flex";

    const data_to_send = {
      to: `${data.emp_details.e_email}`,
      subject: `Payslip for ${monthName}, ${data.salary_details.salary_year}`,
      text: "",
      html: `<body style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; color: #333;">
    <p>Dear ${data.emp_details.e_name},</p>

    <p>Your payslip for the month of ${monthName}, ${data.salary_details.salary_year} is attached to this email.</p>

    <p>If you have any questions regarding your salary details, please contact the Accounts department.</p>

    <p>Best Regards,</p>
    <p><strong>UIT RGPV Accounts Department</strong></p>
</body>`,
      file: pdfBlob, // Assuming pdfBlob is the generated PDF Blob
      file_name: `Payslip_${data.salary_details.e_id}_${monthName}_${data.salary_details.salary_year}.pdf`
    };

    try {
      console.log(data_to_send)
      console.log("start")

      const response = await send_pdf_to_email(data_to_send)
      console.log("end")
      console.log("checking email", response)
      setshowSuccess({
        message: response.message,
        success: response.success,
        onClose: () => {  setshowSuccess({
          message: "",
          success: false,
          onClose: () => {}
        })}
    });
    setshowInvalid({
        message: response.message,
        success: !response.success, onClose: () => { setshowInvalid(showInvalid) }
    });

    } catch (error) {
      console.error(error)
      setshowInvalid({
        message: error.message,
        success: true, onClose: () => { setshowInvalid(showInvalid) }
    });

    }



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

       {showSuccess.success && (
                      <div className="fixed inset-0 z-50">
                          <SuccessfullyDone
                              message={showSuccess.message}
                              onClose={showSuccess.onClose}
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
                              onConfirm={()=>{showConfirm.onConfirm();
                                  setShowConfirm({ success: false, message: "", onConfirm: () => { } })
                              }}
                              onCancel={() => setShowConfirm({ message: "", success: false, onConfirm: null }
                              )} // Close without confirming
                          />
                      </div>
                  )}

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
        border: 2px solid black;
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
          <h3 className="text-3xl font-bold tracking-wide mb-2">
            University Institute of Technology
          </h3>
          <h3 className="text-2xl font-semibold tracking-wide mb-3">
            Rajiv Gandhi Proudyogiki Viswavidyalaya
          </h3>
          <h2 className="text-3xl font-bold  inline-block px-8 py-2 rounded-full">
            PAYSLIP - {monthName} {data.salary_details.salary_year}
          </h2>
        </div>

        {/* Employee Details Section */}
        <div className="mb-8 ">
          <table className="w-full table-auto border-collapse text-xl">
            <tbody className="divide-y font-semibold">
              <tr className="">
                <th className="text-left px-4 py-3  w-1/4 ">Employee Id</th>
                <td className="px-4 py-3 w-1/4">{data.emp_details.e_id}</td>
                <th className="text-left px-4 py-3">Name</th>
                <td className="px-4 py-3 ">{data.emp_details.e_name}</td>

              </tr>
              <tr className="">
                <th className="text-left px-4 py-3">Designation</th>
                <td className="px-4 py-3">{data.emp_details.e_designation}</td>

                <th className="text-left px-4 py-3 w-1/4">Department</th>
                <td className="px-4 py-3 w-1/4">{data.dept_details.d_name}</td>

              </tr>
              <tr className="">
                <th className="text-left px-4 py-3">Account No</th>
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
          <h3 className="text-2xl font-bold  mb-4 pb-2 border-b">
            Earnings and Deductions
          </h3>
          <div className="grid grid-cols-2 gap-6 text-xl">
            {/* Earnings Column */}
            <div>
              <table className="w-full border-collapse border border-black">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left border-2  border-black font-bold" colSpan={2}>
                      Earnings
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y font-semibold">
                  <tr className=" font-bold">
                    <td className="px-4 py-2 border-2 border-black font-bold">Basic</td>
                    <td className="px-4 py-2 text-right border-2 border-black font-bold">{data.salary_details.basic_salary}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">Spc./Pers. Pay</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.special_pay}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">Dearness Pay</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.dearness_allowance}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">D.A.</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.DA}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">A.D.A</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.ADA}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">IR</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.interim_relief}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">HRA</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.HRA}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">CCA</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.CCA}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">Conv Allow</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.conveyance}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">Medical</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.medical}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">Wash. Allow</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.washing_allowance}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">BDP/LWP</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.BDP}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">Arrears</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.arrears}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Deductions Column */}
            <div>
              <table className="w-full border-collapse text-xl">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left border-2 border-black font-bold" colSpan={2}>
                      Deductions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y font-semibold">
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">leave deduction amount</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.leave_deduction_amount}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">CPF/GPF</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.deduction_CPF}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">GIS</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.GIS}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">House Rent</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.house_rent}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">Water Charges</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.water_charges}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">Electricity Deduction</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.electricity_charges}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">Vehicle Deduction</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.vehicle_deduction}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">HB Loan</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.HB_loan}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">GPF Loan</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.GPF_loan}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">Festival Loan</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.festival_loan}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">Grain Advance</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.grain_charges}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">Bank Adv./Asso. Ded.</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.bank_advance}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">Advance</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.advance}</td>
                  </tr>
                  <tr className="">
                    <td className="px-4 py-2 border-2 border-black">RGPV Adv./Oth Ded</td>
                    <td className="px-4 py-2 text-right border-2 border-black">{data.salary_details.RGPV_advance}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-6 border-t pt-4 summary-section">
          <table className="w-full text-xl">
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
                <td className="px-4 py-3 font-bold text-2xl">Net Payable</td>
                <td className="px-4 py-3 text-right font-bold text-2xl">{data.salary_details.net_payable}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Section */}
        <div className="mt-4 pt-4 border-t flex justify-between items-end footer-section">
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
