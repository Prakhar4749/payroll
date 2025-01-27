import React, { useState, useEffect, useRef } from "react";
import { add_emp_details, check_for_add_emp } from "../../controller/empController";
import { emp_data_model } from "../../models/EmpModel";
import { User, Building, DollarSign, BanknoteIcon as BanknotesIcon, MinusCircle, Save, UserRoundPen, Eraser } from 'lucide-react';
import Navbar from "../layout/Navbar"
import { BackButton } from "../common/backButton";
import { ConfirmDialogue } from "../common/ConfirmDialogue";
import { SuccessfullyDone } from "../common/SuccessfullyDone";
import { InvalidDialogue } from "../common/InvalidDialogue";
import { useNavigate } from "react-router-dom";


const AddForm = () => {
  const navigate = useNavigate()
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const dateInputRef = useRef(null);


  const [data, setData] = useState(emp_data_model); // State to store employee data
  const [showAddSuccess, setshowAddSuccess] = useState({
    message: "", success: false
  });
  const [showAddInvalid, setshowAddInvalid] = useState({
    message: "", success: false
  });
  const [showAddConfirm, setShowAddConfirm] = useState({
    message: "",
    success: false,
    onConfirm: () => { }
  });

  const onAddConfirm = async () => {
    try {

      const result = await add_emp_details(data);
      console.log(result)

      setshowAddSuccess({
        message: `${result.message}`,
        success: true
      });
    } catch (err) {
      alert(err);
    }


  }

  const [file_to_sand, setFile_to_sand] = useState(null);

  const[fileName,setFileName] = useState("Choose a file")






  // Handle input change for nested objects
  const handleInputChange = (section, field, value) => {
    setData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };


  const handleFileUpload = (section, field, file) => {
    setFile_to_sand(file)
    setFileName(file.name)
    console.log(file_to_sand)
    if (file && (file.type === "image/jpeg" || file.type === "png")) {
      if (file.size <= 4 * 1024 ) { // Check if file size is less than or equal to 5MB
        const updatedData = { ...data };
        updatedData[section][field] = file; // Save the file in the state
        setFile_to_sand(updatedData);
        setData(updatedData)

      } else {
        alert("File size exceeds 5MB. Please upload a smaller file.");
      }
    } else {
      alert("Invalid file format. Please upload a JPG or PNG file.");
    }
  };
  // clear handler
  const handleClear = async (e) => {
    e.preventDefault();
    setData(emp_data_model)
    setFile_to_sand(null);
    setFileName("Choose a file")
  };


  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    setData((prevData) => ({
      ...prevData,
      e_photo: file_to_sand,
      emp_bank_details: {
        ...prevData.emp_bank_details,
        e_name: prevData.emp_details.e_name,
      },
      emp_earning_details: {
        ...prevData.emp_earning_details,
        e_name: prevData.emp_details.e_name,
      },
      emp_deduction_details: {
        ...prevData.emp_deduction_details,
        e_name: prevData.emp_details.e_name,
      },
    }));
    console.log(data.emp_details.e_photo);
    console.log(data)
    try {

      const check_data = await check_for_add_emp(data);

      if (check_data.e_mobile_number && check_data.e_bank_acc_number && check_data.e_pan_number && check_data.d_id) {
        setShowAddConfirm({
          message: `Are you sure you want to add the new Employee details ?`,
          success: true,
          onConfirm: onAddConfirm, // Pass the function reference
        });

      }
      else {

        if (!check_data.e_mobile_number) {
          setshowAddInvalid({
            message: "Enter valid mobile number!, Employee's mobile number already exist.", success: true
          })
        }

        else if (!check_data.d_id) {
          setshowAddInvalid({
            message: "Enter valid Department ID!,  Department ID does not exist.", success: true
          })
        }
        else if (!check_data.e_bank_acc_number) {
          setshowAddInvalid({
            message: "Enter valid bank account number!, Employee's account number already exist.", success: true
          })
        }
        else if (!check_data.e_pan_number) {
          setshowAddInvalid({
            message: "Enter valid PAN number!, employee's PAN number already exist.", success: true
          })
        }
      }
    } catch (err) {
      setshowAddInvalid({
        message: "Something went Wrong! Try again after some time.", success: true
      })
      navigate("/employee")
    }

  };

  // Render a loading spinner or message until data is ready

  return (

    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-20">
        {showAddSuccess.success && (
          <div className="fixed inset-0 z-50">
            <SuccessfullyDone
              message={showAddSuccess.message}
              onClose={() => {
                setshowAddSuccess({ message: "", success: false })
                navigate("/employee");
              }}
            />
          </div>
        )}
        {showAddInvalid.success && (
          <div className="fixed inset-0 z-50">
            <InvalidDialogue
              message={showAddInvalid.message}
              onClose={() => setshowAddInvalid({ message: "", success: false })}
            />
          </div>
        )}
        {showAddConfirm.success && (
          <div className="fixed inset-0 z-50">
            <ConfirmDialogue
              message={showAddConfirm.message}
              onConfirm={() => {
                showAddConfirm.onConfirm(); // Call the confirm callback
                setShowAddConfirm({ message: "", success: false, onConfirm: null }); // Close the dialog
              }}
              onCancel={() => setShowAddConfirm({ message: "", success: false, onConfirm: null })} // Close without confirming
            />
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="px-6 py-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600"
          >
            <BackButton />
            <h1 className="text-2xl mt-2 font-bold transition-colors duration-300 text-white"
            >
              Add Employee Details
            </h1>
            <p className="mt-2 transition-colors duration-300 text-white/90">
              Please fill in all the required information below
            </p>
          </div>

          <form method="POST"
            action="emp/add_emp"
            onSubmit={handleSubmit}
            encType="multipart/form-data" 
            className="px-6 py-8 space-y-8">
            {/* Employee Details Section */}
            <div className="space-y-6">
              <div className="flex items-center">
                <User className="h-5 w-5 text-emerald-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Employee Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={data.emp_details.e_name}
                    onChange={(e) => handleInputChange("emp_details", "e_name", e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    required
                    maxLength={30}
                    style={{ textTransform: "capitalize" }}
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <input
                    type="tel"
                    value={data.emp_details.e_mobile_number}
                    onChange={(e) => {// Allow only numerical input
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_details", "e_mobile_number", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    required
                    pattern="\d*"
                    maxLength={10}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    value={data.emp_details.e_gender}
                    onChange={(e) => handleInputChange("emp_details", "e_gender", e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={data.emp_details.e_email}
                    onChange={(e) => handleInputChange("emp_details", "e_email", e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    maxLength={60}

                  />
                </div>


                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    value={data.emp_details.e_address}
                    onChange={(e) => handleInputChange("emp_details", "e_address", e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    required
                    maxLength={100}
                  />
                </div>

                {/* Department ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department ID</label>
                  <input
                    type="text"
                    value={data.emp_details.d_id}
                    onChange={(e) => handleInputChange("emp_details", "d_id", e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"

                    maxLength={4}
                    style={{ textTransform: "capitalize" }}
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Designation</label>
                  <input
                    type="text"
                    value={data.emp_details.e_designation}
                    onChange={(e) => handleInputChange("emp_details", "e_designation", e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    maxLength={50}
                  />
                </div>

                {/* Group */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Group</label>
                  <input
                    type="text"
                    value={data.emp_details.e_group}
                    onChange={(e) => handleInputChange("emp_details", "e_group", e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    maxLength={1}
                    style={{ textTransform: "capitalize" }}
                  />
                </div>

                {/* date of joining */}
                <div >
                  <label className="block text-sm font-medium text-gray-700">Date of Joining</label>
                  <input
                    onClick={() => dateInputRef.current.focus()} // Focus the date input when clicking the container
                    ref={dateInputRef} // Attach the ref to the input element
                    type="date"
                    value={data.emp_details.e_date_of_joining}
                    onChange={(e) => handleInputChange("emp_details", "e_date_of_joining", e.target.value)}
                    max={today} // Restrict dates greater than today
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500r cursor-pointer" // Remove border outline on focus
                    required
                  />
                </div>


                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    onClick={() => dateInputRef.current.focus()} // Focus the date input when clicking the container
                    ref={dateInputRef} // Attach the ref to the input element
                    type="date"
                    value={data.emp_details.e_DOB}
                    onChange={(e) => handleInputChange("emp_details", "e_DOB", e.target.value)}
                    max={today} // Restrict dates greater than today
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
                  <div className="relative flex items-center border border-gray-300 rounded-lg focus:outline-none shadow-sm bg-white focus-within:ring-emerald-500 focus-within:border-emerald-500">
                    <div className="flex items-center px-3 border-r border-gray-300 rounded-l-lg">
                      <UserRoundPen className="h-5 w-5 text-gray-800" />
                    </div>
                    <label
                      htmlFor="file-upload"
                      className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white cursor-pointer hover:text-emerald-600 focus:outline-none"
                    >
                     {fileName}
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      name="e_photo"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handleFileUpload("emp_details", "e_photo", e.target.files[0])}
                      className="absolute inset-0 opacity-0 w-full cursor-pointer"

                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Only JPG and PDF formats are allowed. Max file size: 5MB.
                  </p>
                </div>
              </div>
            </div>


            {/* Bank Details Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <Building className="h-5 w-5 text-emerald-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Bank Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Bank fields following the same pattern */}

                {/* Bank Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                  <input
                    type="text"
                    value={data.emp_bank_details.e_bank_name}
                    onChange={(e) => handleInputChange("emp_bank_details", "e_bank_name", e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    required
                    maxLength={50}
                  />
                </div>

                {/* Bank Account Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bank Account Number</label>
                  <input
                    type="tel"
                    value={data.emp_bank_details.e_bank_acc_number || ""}
                    onChange={(e) => {// Allow only numerical input
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_bank_details", "e_bank_acc_number", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    required
                    maxLength={20}
                  />
                </div>

                {/* PAN Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">PAN Number</label>
                  <input
                    type="text"
                    value={data.emp_bank_details.e_pan_number}
                    onChange={(e) => handleInputChange("emp_bank_details", "e_pan_number", e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    required
                    maxLength={10}
                  />
                </div>

                {/* Bank IFSC Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bank IFSC Code</label>
                  <input
                    type="text"
                    value={data.emp_bank_details.e_bank_IFSC}
                    onChange={(e) => handleInputChange("emp_bank_details", "e_bank_IFSC", e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    required
                    maxLength={11}
                  />
                </div>

                {/* CPF/GPF Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">CPF/GPF Number</label>
                  <input
                    type="tel"
                    value={data.emp_bank_details.e_cpf_or_gpf_number || ""}
                    onChange={(e) => {// Allow only numerical input
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_bank_details", "e_cpf_or_gpf_number", value);
                      }
                    }}

                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>


                {/* ... */}
              </div>
            </div>

            {/* Earning Details Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-emerald-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Earning Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Earning fields following the same pattern */}


                {/* Basic Salary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Basic Salary</label>
                  <input
                    type="tel"
                    value={data.emp_earning_details.basic_salary || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_earning_details", "basic_salary", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Special Pay */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Special Pay</label>
                  <input
                    type="tel"
                    value={data.emp_earning_details.special_pay || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_earning_details", "special_pay", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Dearness Allowance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dearness Allowance</label>
                  <input
                    type="tel"
                    value={data.emp_earning_details.dearness_allowance || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_earning_details", "dearness_allowance", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* DA */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">DA</label>
                  <input
                    type="tel"
                    value={data.emp_earning_details.DA || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_earning_details", "DA", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* ADA */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">ADA</label>
                  <input
                    type="tel"
                    value={data.emp_earning_details.ADA || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_earning_details", "ADA", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Interim Relief */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Interim Relief</label>
                  <input
                    type="tel"
                    value={data.emp_earning_details.interim_relief || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_earning_details", "interim_relief", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* HRA */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">HRA</label>
                  <input
                    type="tel"
                    value={data.emp_earning_details.HRA || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_earning_details", "HRA", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* CCA */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">CCA</label>
                  <input
                    type="tel"
                    value={data.emp_earning_details.CCA || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_earning_details", "CCA", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Conveyance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Conveyance</label>
                  <input
                    type="tel"
                    value={data.emp_earning_details.conveyance || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_earning_details", "conveyance", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Medical */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Medical</label>
                  <input
                    type="tel"
                    value={data.emp_earning_details.medical || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_earning_details", "medical", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Washing Allowance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Washing Allowance</label>
                  <input
                    type="tel"
                    value={data.emp_earning_details.washing_allowance || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_earning_details", "washing_allowance", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* BDP */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">BDP</label>
                  <input
                    type="tel"
                    value={data.emp_earning_details.BDP || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_earning_details", "BDP", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Arrears */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Arrears</label>
                  <input
                    type="tel"
                    value={data.emp_earning_details.arrears || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_earning_details", "arrears", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* ... */}
              </div>
            </div>

            {/* Deduction Details Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <MinusCircle className="h-5 w-5 text-emerald-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Deduction Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Deduction fields following the same pattern */}


                {/* Deduction CPF */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Deduction CPF</label>
                  <input
                    type="tel"
                    value={data.emp_deduction_details.deduction_CPF || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_deduction_details", "deduction_CPF", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* GIS */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">GIS</label>
                  <input
                    type="tel"
                    value={data.emp_deduction_details.GIS || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_deduction_details", "GIS", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* House Rent */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">House Rent</label>
                  <input
                    type="tel"
                    value={data.emp_deduction_details.house_rent || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_deduction_details", "house_rent", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Water Charges */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Water Charges</label>
                  <input
                    type="tel"
                    value={data.emp_deduction_details.water_charges || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_deduction_details", "water_charges", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Electricity Charges */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Electricity Charges</label>
                  <input
                    type="tel"
                    value={data.emp_deduction_details.electricity_charges || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_deduction_details", "electricity_charges", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Vehicle Deduction */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vehicle Deduction</label>
                  <input
                    type="tel"
                    value={data.emp_deduction_details.vehicle_deduction || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_deduction_details", "vehicle_deduction", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* HB Loan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">HB Loan</label>
                  <input
                    type="tel"
                    value={data.emp_deduction_details.HB_loan || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_deduction_details", "HB_loan", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* GPF Loan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">GPF Loan</label>
                  <input
                    type="tel"
                    value={data.emp_deduction_details.GPF_loan || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_deduction_details", "GPF_loan", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Festival Loan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Festival Loan</label>
                  <input
                    type="tel"
                    value={data.emp_deduction_details.festival_loan || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_deduction_details", "festival_loan", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Grain Charges */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Grain Charges</label>
                  <input
                    type="tel"
                    value={data.emp_deduction_details.grain_charges || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_deduction_details", "grain_charges", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Bank Advance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bank Advance</label>
                  <input
                    type="tel"
                    value={data.emp_deduction_details.bank_advance || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_deduction_details", "bank_advance", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Advance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Advance</label>
                  <input
                    type="tel"
                    value={data.emp_deduction_details.advance || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_deduction_details", "advance", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* RGPV Advance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">RGPV Advance</label>
                  <input
                    type="tel"
                    value={data.emp_deduction_details.RGPV_advance || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_deduction_details", "RGPV_advance", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Income Tax */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Income Tax</label>
                  <input
                    type="tel"
                    value={data.emp_deduction_details.income_tax || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_deduction_details", "income_tax", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Professional Tax */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Professional Tax</label>
                  <input
                    type="tel"
                    value={data.emp_deduction_details.professional_tax || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_deduction_details", "professional_tax", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* ... */}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-6 items-center justify-around">
              {/* Clear Button */}
              <button
                type="button"
                onClick={handleClear}
                className="w-full md:w-auto px-7 py-3 border border-transparent rounded-lg shadow-lg text-base font-semibold bg-gray-100 hover:bg-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-200 flex items-center justify-center gap-3"
              >
                <Eraser className="h-6 w-6" />
                Clear Details
              </button>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 flex items-center justify-center gap-3"
              >
                <Save className="h-6 w-6" />
                Save Details
              </button>
            </div>


          </form>
        </div>
      </div >
    </div >
  );
}


export default AddForm;
