import React, { useState, useEffect } from "react";
import { send_pdf_to_email } from "../../controller/Payslip";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Download, Calendar, FileText, } from "lucide-react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";
import watermark from '../../assets/images/pdf_watermark.jpg';
import { ConfirmDialogue } from "../common/ConfirmDialogue";
import { SuccessfullyDone } from "../common/SuccessfullyDone";
import { InvalidDialogue } from "../common/InvalidDialogue";
import { LoadingDialogue } from "../common/LoadingDailogue";
import Navbar from "../layout/Navbar";
import { BackButton } from "../common/backButton";


export default function Payslip_pdf() {
  const pdfRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(location.state);
  const monthName = new Date(2024, data.salary_details.salary_month - 1).toLocaleString('en-US', { month: 'long' });

  const [showLoading, setShowLoading] = useState({ message: "", isOpen: false});
  const [showConfirm, setShowConfirm] = useState({ success: false, message: "", onConfirm: () => { } });
  const [showInvalid, setshowInvalid] = useState({ success: false, message: "", onClose: () => { } });
  const [showSuccess, setshowSuccess] = useState({ success: false, message: "", onClose: () => { } });
  // useEffect(() => {
  //   if (window.innerWidth < 768) {
  //     document.body.style.zoom = "0.8"; // Adjust for mobile
  //   }
  //   if (window.innerWidth < 408) {
  //     document.body.style.zoom = "0.3"; // Adjust for mobile
  //   }
  // }, []);


  const handleDownloadPDF = async () => {
    setShowLoading({message: "Please wait while your Pdf is downloading", isOpen:true})
    let originalStyle = null

    const input = pdfRef.current;
    if (!input) return;

    // Hide buttons before capturing


    try {
      // Temporarily make the component visible (for hidden elements)
      console.log(input.style.display)
      const screenWidth = window.innerWidth;

      originalStyle = input.style.display;
      if (screenWidth < 1024) { // lg = 1024px in Tailwind
        input.style.display = "block";
        input.style.position = "absolute";
        input.style.top = "-9999px";
      }

      // Wait a bit for rendering
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Capture the component as an image
      const canvas = await html2canvas(input, {
        scale: 2, // Ensures high resolution
        useCORS: true, // Fixes issues with external images
        backgroundColor: "#ffffff", // Prevents transparent background
        logging: false, // Logs useful debugging info
        onclone: (document) => {
          // Ensure all elements are properly loaded before capture
          document.getElementById("pdf-content").style.display = "block";
        }
      });

      // Restore original state

      if (screenWidth < 1024) {
        input.style.display = originalStyle;
        input.style.position = "relative";
        input.style.top = "auto";
      }


      // Convert canvas to image
      const imgData = canvas.toDataURL("image/png", 0.9);
      if (!imgData.startsWith("data:image/png;base64,")) {
        throw new Error("Failed to generate valid image data.");
      }

      // Create the PDF
      const pdf = new jsPDF("p", "mm", "a4", true);
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

      pdf.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);
      pdf.save(`Payslip_${data.salary_details.e_id}_${monthName}_${data.salary_details.salary_year}.pdf`);

      setShowLoading({message: "", isOpen:false})
      setshowSuccess({
        message: "Your payslip has been successfully downloaded—check it out now!",
        success: true,
        onClose: () => {
          setshowSuccess({
            message: "",
            success: false,
            onClose: () => { }
          })
        }
      });

    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Failed to generate PDF. Please try again.");
    }

    // Show buttons again after PDF download

  };











  const handleSendEmail = async () => {
    setShowLoading({message: "We are sending your payslip to your email. Please hold on.", isOpen:true})
    let originalStyle = null

    const input = pdfRef.current;
    if (!input) return;

    // Hide buttons before capturing
      // Temporarily make the component visible (for hidden elements)
      console.log(input.style.display)
      const screenWidth = window.innerWidth;

      originalStyle = input.style.display;
      if (screenWidth < 1024) { // lg = 1024px in Tailwind
        input.style.display = "block";
        input.style.position = "absolute";
        input.style.top = "-9999px";
      }

      // Wait a bit for rendering
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Capture the component as an image
      const canvas = await html2canvas(input, {
        scale: 2, // Ensures high resolution
        useCORS: true, // Fixes issues with external images
        backgroundColor: "#ffffff", // Prevents transparent background
        logging: false, // Logs useful debugging info
        onclone: (document) => {
          // Ensure all elements are properly loaded before capture
          document.getElementById("pdf-content").style.display = "block";
        }
      });

      // Restore original state

      if (screenWidth < 1024) {
        input.style.display = originalStyle;
        input.style.position = "relative";
        input.style.top = "auto";
      }


      // Convert canvas to image
      const imgData = canvas.toDataURL("image/png", 0.9);
      if (!imgData.startsWith("data:image/png;base64,")) {
        throw new Error("Failed to generate valid image data.");
      }

      // Create the PDF
      const pdf = new jsPDF("p", "mm", "a4", true);
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

      pdf.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);
    const pdfBlob = pdf.output("blob");
    // Show buttons again after generating the PDF
   

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
      // console.log(data_to_send)
      // console.log("start")

      const response = await send_pdf_to_email(data_to_send)
      // console.log("end")
      // console.log("checking email", response)
      setShowLoading({message: "", isOpen:false})
      setshowSuccess({
        message: "An email has been successfully sent from our side, and the employee is expected to receive it shortly.",
        success: response.success,
        onClose: () => {
          setshowSuccess({
            message: "",
            success: false,
            onClose: () => { }
          })
        }
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="w-full lg:max-w-[1215px] mx-auto mt-20 px-4 sm:px-4 lg:px-8">
        {/* loading Dialog */}
        {showLoading.isOpen && (
          <div className="fixed inset-0 z-50">
            <LoadingDialogue
              message={showLoading.message}
              isOpen={showLoading.isOpen}
            />
          </div>
        )}
        {/* Success Dialog */}
        {showSuccess.success && (
          <div className="fixed inset-0 z-50">
            <SuccessfullyDone
              message={showSuccess.message}
              onClose={showSuccess.onClose}
            />
          </div>
        )}

        {/* Invalid Dialog */}
        {showInvalid.success && (
          <div className="fixed inset-0 z-50">
            <InvalidDialogue
              message={showInvalid.message}
              onClose={() => { showInvalid.onClose() }}
            />
          </div>
        )}

        {/* Confirm Dialog */}
        {showConfirm.success && (
          <div className="fixed inset-0 z-50">
            <ConfirmDialogue
              message={showConfirm.message}
              onConfirm={() => {
                showConfirm.onConfirm();
                setShowConfirm({ success: false, message: "", onConfirm: () => { } })
              }}
              onCancel={() => setShowConfirm({ message: "", success: false, onConfirm: null })}
            />
          </div>
        )}

        {/* Print-specific styling */}
        <style>
          {`@media print {
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
  
}
    `}
        </style>


        {/* Page Header */}
        <header className="">
          <div className="bg-white rounded-t-2xl shadow-xl overflow-hidden">
            <div className=" w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 p-8">

              <BackButton />

              <h1 className="text-2xl mt-2 font-bold transition-colors duration-300 text-white">Employee Payslip</h1>
              <div className="flex flex-col sm:flex-row mt-3  gap-4 text-emerald-100">
                <span className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{monthName}, {data.salary_details.salary_year}</span>
                </span>
                <span className="flex items-center space-x-2" >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-200"></div>
                  <span>Pay Period: Monthly</span>
                </span>
              </div>

              <div className="flex space-x-3">
                <div className="h-12 w-12 rounded-full bg-white/10" />
                <div className="h-12 w-12 rounded-full bg-white/5 translate-y-4" />
              </div>
            </div>
          </div>


        </header>

        {/* Payslip Container with Box Design */}
        <div className=" lg:max-w-[1150px] mx-auto md:pt-3 bg-white rounded-b-2xl shadow-xl border border-gray-200 md:px-3 ">



          {/* Content Wrapper with Inner Shadow */}
          <div className="">
            {/* Your existing payslip content */}


            {/* payaslip preview unavailable box  */}

            <div className="  bg-gray-50 flex items-center justify-center p-4 lg:hidden ">
              <div className="max-w-md w-full bg-white rounded-lg shadow-lg my-7 p-8 text-center">
                <div className="flex justify-center mb-6">
                  <FileText className="w-16 h-16 text-blue-600" />
                </div>

                <h1 className="text-2xl font-semibold text-gray-800 mb-3">
                  Preview Not Available
                </h1>

                <p className="text-gray-600 mb-2">
                  The payslip preview is Unavailable in this view.
                </p>
                <p className="text-gray-600 mb-6">
                  Please download the PDF to view your payslip.
                </p>

                <button
                  onClick={handleDownloadPDF}
                  className="px-6 py-3 rounded-xl text-white font-medium
                  bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600
                  hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                  transform transition-all duration-200 hover:scale-[1.02]
                  shadow-lg shadow-emerald-600/20
                  flex mx-auto items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto  lg:scale-100 origin-top sm:origin-center ">


              <div ref={pdfRef} id="pdf-content" className="bg-white  mx-auto w-[1000px] px-2 print:w-[1000px] print:shadow-none print:border-none relative pt-serif-regular hidden lg:block print:block  pb-3  ">
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
                <div className="mb-3">
                  <h3 className="text-2xl font-bold  mb-4 pb-2 border-b">
                    Earnings and Deductions
                  </h3>
                  <div className="grid grid-cols-2 gap-6 text-xl">
                    {/* Earnings Column */}
                    <div>
                      <table className="w-full border-collapse border-t-2 border-r-2 border-black">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left border-b-2 border-l-2 border-black font-bold" colSpan={2}>
                              Earnings
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y font-semibold">
                          <tr className=" font-bold">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black font-bold">Basic</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black font-bold">{data.salary_details.basic_salary}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">Spc./Pers. Pay</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.special_pay}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">Dearness Pay</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.dearness_allowance}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">D.A.</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.DA}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">A.D.A</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.ADA}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">IR</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.interim_relief}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">HRA</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.HRA}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">CCA</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.CCA}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">Conv Allow</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.conveyance}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">Medical</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.medical}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">Wash. Allow</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.washing_allowance}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">BDP/LWP</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.BDP}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">Arrears</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.arrears}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Deductions Column */}
                    <div>
                      <table className="w-full border-collapse border-t-2 border-r-2 border-black">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left border-b-2 border-l-2 border-black font-bold" colSpan={2}>
                              Deductions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y font-semibold">
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">leave deduction amount</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.leave_deduction_amount}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">CPF/GPF</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.deduction_CPF}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">GIS</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.GIS}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">House Rent</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.house_rent}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">Water Charges</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.water_charges}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">Electricity Deduction</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.electricity_charges}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">Vehicle Deduction</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.vehicle_deduction}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">HB Loan</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.HB_loan}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">GPF Loan</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.GPF_loan}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">Festival Loan</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.festival_loan}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">Grain Advance</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.grain_charges}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">Bank Adv./Asso. Ded.</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.bank_advance}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">Advance</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.advance}</td>
                          </tr>
                          <tr className="">
                            <td className="px-4 py-2 border-b-2 border-l-2 border-black">RGPV Adv./Oth Ded</td>
                            <td className="px-4 py-2 text-right border-b-2 border-l-2 border-black">{data.salary_details.RGPV_advance}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Summary Section */}
                <div className=" border-t  summary-section">
                  <table className="w-full text-xl">
                    <tbody>
                      <tr className="">
                        <td className="px-4 py-1 font-bold">Total Earnings</td>
                        <td className="px-4 py-1 text-right font-bold">{data.salary_details.total_earning}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-1 font-bold">Total Deductions</td>
                        <td className="px-4 py-1 text-right font-bold">-{data.salary_details.total_deduction}</td>
                      </tr>
                      <tr className="">
                        <td className="px-4 pt-4 font-bold text-2xl">Net Payable</td>
                        <td className="px-4 pt-4 pb-1 text-right font-bold text-2xl">{data.salary_details.net_payable}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Footer Section */}
                <div className=" mt-3 pt-12 border-t flex justify-between items-end footer-section">
                  <p className="text-sm text-gray-600">
                    In case of any discrepancy, please inform us immediately.
                  </p>
                  <div className="text-right">
                    <p className="text-lg font-bold">Account Section</p>
                    <p className="text-sm text-gray-500 mt-1">Generated on {data.salary_details.payslip_issue_date}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons in a Styled Responsive Container */}
            <div className="mt-6 p-4 sm:p-6 rounded-xl  w-full max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8">
                {/* Go Back Button */}
                <button
                  onClick={handleGoBack}
                  className="w-full sm:w-auto px-5 py-3 rounded-lg text-white font-medium
      bg-gradient-to-r from-slate-600 to-slate-700
      hover:from-slate-700 hover:to-slate-800
      focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
      transition-all duration-200 hover:scale-[1.02]
      shadow-md shadow-slate-600/30
      flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Go Back</span>
                </button>

                {/* Send to Email Button */}
                <button
                  onClick={handleSendEmail}
                  className="w-full sm:w-auto px-5 py-3 rounded-lg text-white font-medium
      bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600
      hover:from-sky-700 hover:via-blue-700 hover:to-indigo-700
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      transition-all duration-200 hover:scale-[1.02]
      shadow-md shadow-blue-600/30
      flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Send to Email</span>
                </button>

                {/* Download PDF Button */}
                <button
                  onClick={handleDownloadPDF}
                  className="w-full sm:w-auto px-5 py-3 rounded-lg text-white font-medium
      bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600
      hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700
      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
      transition-all duration-200 hover:scale-[1.02]
      shadow-md shadow-emerald-600/30
      flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div >
    </div >
  );
}
