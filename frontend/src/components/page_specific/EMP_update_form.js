import React, { useState, useEffect, useRef } from "react";
import { update_emp_details, check_for_update_emp } from "../../controller/empController";
import { useLocation, useNavigate } from "react-router-dom";
import { emp_data_model } from "../../models/EmpModel";
import { User, Building, DollarSign, MinusCircle, Save, UserRoundPen, Eraser } from 'lucide-react';
import Navbar from "../layout/Navbar"
import { BackButton } from "../common/backButton";
import { ConfirmDialogue } from "../common/ConfirmDialogue";
import { SuccessfullyDone } from "../common/SuccessfullyDone";
import { InvalidDialogue } from "../common/InvalidDialogue";
import imageCompression from "browser-image-compression"

const UpdateForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const today = new Date().toISOString().split("T")[0];
  // console.log("today", today) // Get today's date in YYYY-MM-DD format
  const dateInputRef = useRef(null);

  const [data, setData] = useState(location.state.data); // State to store employee data
  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }
 
  // Set data from location.state only once when the component mounts
  useEffect(() => {
    if (location.state?.data) {
      setData(location.state.data);
    }

  }, [location.state]);

  

  const [showUpdateSuccess, setshowUpdateSuccess] = useState({
    message: "", success: false
  });
  const [showUpdateInvalid, setshowUpdateInvalid] = useState({
    message: "", success: false, onClose: () => { setshowUpdateInvalid(showUpdateInvalid) }
  });
  const [showUpdateConfirm, setShowUpdateConfirm] = useState({
    message: "",
    success: false,
    onConfirm: () => { }
  });
  const [file_to_sand, setFile_to_sand] = useState(null);

  const [fileName, setFileName] = useState("Choose a file")

  const onUpdateConfirm = async () => {
    // console.log("sent data", data)
    try {

      const response = await update_emp_details(data);
      console.log("form", response.message)

      setshowUpdateSuccess({
        message: response.message,
        success: response.success
      });
      setshowUpdateInvalid({
        message: response.message,
        success: !response.success, onClose: () => { setshowUpdateInvalid(showUpdateInvalid) }
      });
    } catch (err) {
      setshowUpdateInvalid({
        message: "Something went wrong! Please try again after some time.", success: true, onClose: () => {
          setshowUpdateInvalid(showUpdateInvalid)
          navigate("/employee")
        }
      })
    }


  }


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

  const handleFileUpload = async (section, file) => {
    // console.log(file)

    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const options = {
        maxSizeMB: 0.03, // Maximum file size in MB
        maxWidthOrHeight: 500, // Max width or height
        useWebWorker: true,
      };

      try {
        const compressedImage = await imageCompression(file, options);
        setFile_to_sand(compressedImage);
        setFileName(file.name)
        // console.log("Compressed file:", compressedImage);
        setData((prevData) => ({
          ...prevData,
          e_photo: compressedImage,
        }))

      } catch (error) {
        console.error("Error compressing the image:", error);
      }
    } else {
      alert("Invalid file format. Please upload a JPG or PNG file.");
    }
  };
  // clear handler
  const handleClear = async (e) => {
    e.preventDefault();
    setData(emp_data_model)
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    setData((prevData) => ({
      ...prevData,
      emp_bank_details: {
        ...prevData.emp_bank_details,
        e_name: prevData.emp_details.e_name,
        ...prevData.emp_bank_details,
        e_id: prevData.emp_details.e_id,
      },
      emp_earning_details: {
        ...prevData.emp_earning_details,
        e_name: prevData.emp_details.e_name,
        ...prevData.emp_earning_details,
        e_id: prevData.emp_details.e_id,
      },
      emp_deduction_details: {
        ...prevData.emp_deduction_details,
        e_name: prevData.emp_details.e_name,
        ...prevData.emp_deduction_details,
        e_id: prevData.emp_details.e_id,
      },
    }));

    try {
      const response = await check_for_update_emp(data);
      const check_data = response.result;

      if (check_data.e_mobile_number && check_data.e_bank_acc_number && check_data.e_pan_number && check_data.d_id) {
        setShowUpdateConfirm({
          message: `Are you sure you want to update the Employee details ?`,
          success: true,
          onConfirm: onUpdateConfirm, // Pass the function reference
        });

      }
      else {

        if (data.emp_details.e_mobile_number.length === 10) {
          setshowUpdateInvalid({
            message: "Enter valid new mobile number of 10 digits!", success: true
            , onClose: () => {
              setshowUpdateInvalid(showUpdateInvalid)
            }
          })
        }
        else if (!check_data.e_mobile_number) {
          setshowUpdateInvalid({
            message: "Enter valid new mobile number!, Employee's new mobile number already exist.", success: true
            , onClose: () => {
              setshowUpdateInvalid(showUpdateInvalid)
            }
          })
        }

        else if (!check_data.d_id) {
          setshowUpdateInvalid({
            message: "Enter valid new Department ID!,  new Department ID does not exist.", success: true
            , onClose: () => {
              setshowUpdateInvalid(showUpdateInvalid)
            }
          })
        }
        else if (!check_data.e_bank_acc_number) {
          setshowUpdateInvalid({
            message: "Enter valid new bank account number!, Employee's new account number already exist.", success: true
            , onClose: () => {
              setshowUpdateInvalid(showUpdateInvalid)
            }
          })
        }
        else if (!check_data.e_pan_number) {
          setshowUpdateInvalid({
            message: "Enter valid new PAN number!, employee's new PAN number already exist.", success: true
            , onClose: () => {
              setshowUpdateInvalid(showUpdateInvalid)
            }
          })
        }
      }


    } catch (err) {
      setshowUpdateInvalid({
        message: "Something went wrong! Please try again after some time.", success: true, onClose: () => {
          setshowUpdateInvalid(showUpdateInvalid)
          navigate("/employee")
        }
      })
    }
  };

  // Render a loading spinner or message until data is ready

  if (!data) {
    setshowUpdateInvalid({
      message: "Something went Wrong! Please try again after some time.", success: true, onClose: () => {
        setshowUpdateInvalid(showUpdateInvalid)
        navigate("/employee")
      }
    })


  }
  return (

    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-20">


        {showUpdateSuccess.success && (
          <div className="fixed inset-0 z-50">
            <SuccessfullyDone
              message={showUpdateSuccess.message}
              onClose={() => {
                setshowUpdateSuccess({ message: "", success: false })
                navigate("/employee");
              }}
            />
          </div>
        )}
        {showUpdateInvalid.success && (
          <div className="fixed inset-0 z-50">
            <InvalidDialogue
              message={showUpdateInvalid.message}
              onClose={() => { showUpdateInvalid.onClose() }}
            />
          </div>
        )}
        {showUpdateConfirm.success && (
          <div className="fixed inset-0 z-50">
            <ConfirmDialogue
              message={showUpdateConfirm.message}
              onConfirm={() => {
                showUpdateConfirm.onConfirm(); // Call the confirm callback
                setShowUpdateConfirm({ message: "", success: false, onConfirm: null }); // Close the dialog
              }}
              onCancel={() => setShowUpdateConfirm({ message: "", success: false, onConfirm: null }
              )} // Close without confirming
            />
          </div>
        )}




        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="px-6 py-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600"
          >
            <BackButton />
            <h1 className={`text-2xl mt-2 font-bold transition-colors duration-300 text-white`}>
              Update Employee Details
            </h1>
            <p className={`mt-2 transition-colors duration-300 text-white/90`}>
              Please change the information you like to update
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-8" encType="multipart/form-data">
            {/* Employee Details Section */}
            <div className="space-y-6">
              <div className="flex items-center">
                <User className="h-5 w-5 text-emerald-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Employee Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* id */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">ID</label>
                  <input
                    type="text"
                    value={data.emp_details.e_id}
                    onChange={(e) => handleInputChange("emp_details", "e_id", e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 cursor-not-allowed"
                    disabled
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={ titleCase(data.emp_details.e_name).replace(/\s+/g, ' ').trim() || ""}
                    onChange={(e) => handleInputChange("emp_details", "e_name", titleCase(e.target.value).replace(/\s+/g, ' ').trim())}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    required
                    maxLength={30}
                    
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <input
                    type="tel"
                    value={data.emp_details.e_mobile_number}
                    onChange={(e) => {// Allow only numerical input
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
                      if (/^\d*$/.test(value)) {
                        handleInputChange("emp_details", "e_mobile_number", value);
                      }
                    }}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    required
                    pattern="\d*"
                    maxLength={10}
                    minLength={10}
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
                  <select
                    value={data.emp_details.e_group}
                    onChange={(e) => handleInputChange("emp_details", "e_group", e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select a group</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                  </select>
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
                    value={data.emp_details.e_DOB || ""}
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
                      onChange={(e) => handleFileUpload("e_photo", e.target.files[0])}
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
                    type="number"
                    value={data.emp_bank_details.e_bank_acc_number || ""}
                    onChange={(e) => {// Allow only numerical input
                      const value = e.target.value.slice(0, 20); // Truncate to max 10 digits
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
                    minLength={10}
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
                    type="number"
                    value={data.emp_bank_details.e_cpf_or_gpf_number || ""}
                    onChange={(e) => {// Allow only numerical input
                      const value = e.target.value.slice(0, 20); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_earning_details.basic_salary || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_earning_details.special_pay || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_earning_details.dearness_allowance || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_earning_details.DA || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_earning_details.ADA || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_earning_details.interim_relief || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_earning_details.HRA || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_earning_details.CCA || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_earning_details.conveyance || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_earning_details.medical || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_earning_details.washing_allowance || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_earning_details.BDP || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_earning_details.arrears || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_deduction_details.deduction_CPF || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_deduction_details.GIS || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_deduction_details.house_rent || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_deduction_details.water_charges || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_deduction_details.electricity_charges || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_deduction_details.vehicle_deduction || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_deduction_details.HB_loan || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_deduction_details.GPF_loan || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_deduction_details.festival_loan || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_deduction_details.grain_charges || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_deduction_details.bank_advance || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_deduction_details.advance || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_deduction_details.RGPV_advance || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_deduction_details.income_tax || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                    type="number"
                    value={data.emp_deduction_details.professional_tax || 0}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10); // Truncate to max 10 digits
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
                onClick={handleClear}
                type="button"
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

export default UpdateForm;
