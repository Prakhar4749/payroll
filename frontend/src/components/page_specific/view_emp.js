
// import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { User, Building, DollarSign, LaptopMinimalCheck, MinusCircle } from 'lucide-react';
import { BackButton } from "../common/backButton";
import default_profile from "../../assets/images/default_profile.png";


const ViewEmployee = () => {
    const location = useLocation();
    const Navigate = useNavigate();
    // console.log(location.state.data)
    const data = location.state.data;
    const scrolled = false
    // const [scrolled, setScrolled] = useState(false);

    const getImageFromBuffer = (buffer) => {
        // Convert buffer to Base64
        // const base64String = Buffer.from(buffer).toString('base64');
        // Create a data URL

        return buffer ;
    };

    // Usage:
    const buffer = data.e_photo; // The buffer you received
    const imageSrc = getImageFromBuffer(buffer);
    // console.log(imageSrc); // Logs the Base64 string

    const handleSubmit = async (e) => {
        e.preventDefault();
        Navigate(-1)

    };

    return (

        <div className="min-h-screen flex flex-col bg-gray-50 ">
            <Navbar />
            <div className="w-full lg:max-w-[1215px] mx-auto mt-20 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Form Header */}
                    <div className="px-6 py-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600"
                    >
                        <BackButton />
                        <h1 className={`text-2xl mt-2 font-bold transition-colors duration-300 ${scrolled ? 'text-emerald-600' : 'text-white'
                            }`}>
                            view Employee Details
                        </h1>
                        <p className={`mt-2 transition-colors duration-300 ${scrolled ? 'text-gray-600' : 'text-white/90'
                            }`}>
                            Have a look of all the details of your employee
                        </p>
                    </div>

                    <form className="px-6 py-8 space-y-8" onSubmit={handleSubmit}>
                        {/* Employee Details Section */}

                        {/* Employee Photo Section */}
                        <div className="w-full flex flex-col items-center mb-8">
                            <div className="relative group mb-4">
                                {/* Main Photo Container */}
                                <div className="relative">
                                    {/* Photo */}
                                    <div className="relative">
                                        <img
                                            src={imageSrc || default_profile}
                                            alt={`Photo of ${data.emp_details.e_name || 'Employee'}`}
                                            className="h-36 w-36 object-contain p-1 rounded-full bg-white border-4 border-slate-100 shadow-md transition-all duration-300 group-hover:scale-105"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
                                    </div>
                                </div>
                            </div>

                            {/* Label - Now outside the image container */}
                            <div className="bg-slate-50 px-6 py-2 rounded-lg border border-slate-200">
                                <p className="text-sm font-medium text-slate-600">
                                    Profile Photo
                                </p>
                            </div>
                        </div>
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
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"

                                    />
                                </div>

                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={data.emp_details.e_name}
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                        disabled
                                    />
                                </div>

                                {/* Mobile Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                    <input
                                        type="tel"
                                        value={data.emp_details.e_mobile_number}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                        required
                                    />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                                    <select
                                        value={data.emp_details.e_gender}
                                        disabled
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
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"

                                    />
                                </div>


                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        value={data.emp_details.e_address}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"

                                    />
                                </div>

                                {/* Department ID */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Department ID</label>
                                    <input
                                        type="text"
                                        value={data.emp_details.d_id}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"

                                    />
                                </div>

                                {/* Department name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Department name</label>
                                    <input
                                        type="text"
                                        value={data.dept_details.d_name}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"

                                    />
                                </div>

                                {/* Designation */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Designation</label>
                                    <input
                                        type="text"
                                        value={data.emp_details.e_designation}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"

                                    />
                                </div>

                                {/* Group */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Group</label>
                                    <input
                                        type="text"
                                        value={data.emp_details.e_group}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                        required
                                    />
                                </div>

                                {/* date of joining */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date of joining</label>
                                    <input
                                        type="date"
                                        value={data.emp_details.e_date_of_joining}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"

                                    />
                                </div>


                                {/* Date of Birth */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={data.emp_details.e_DOB}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"

                                    />
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
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"

                                    />
                                </div>

                                {/* Bank Account Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Bank Account Number</label>
                                    <input
                                        type="tel"
                                        value={data.emp_bank_details.e_bank_acc_number || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"

                                    />
                                </div>

                                {/* PAN Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">PAN Number</label>
                                    <input
                                        type="text"
                                        value={data.emp_bank_details.e_pan_number}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"

                                    />
                                </div>

                                {/* Bank IFSC Code */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Bank IFSC Code</label>
                                    <input
                                        type="text"
                                        value={data.emp_bank_details.e_bank_IFSC}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"

                                    />
                                </div>

                                {/* CPF/GPF Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">CPF/GPF Number</label>
                                    <input
                                        type="tel"
                                        value={data.emp_bank_details.e_cpf_or_gpf_number || ""}
                                        disabled
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
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Special Pay */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Special Pay</label>
                                    <input
                                        type="tel"
                                        value={data.emp_earning_details.special_pay || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Dearness Allowance */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Dearness Allowance</label>
                                    <input
                                        type="tel"
                                        value={data.emp_earning_details.dearness_allowance || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* DA */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">DA</label>
                                    <input
                                        type="tel"
                                        value={data.emp_earning_details.DA || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* ADA */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ADA</label>
                                    <input
                                        type="tel"
                                        value={data.emp_earning_details.ADA || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Interim Relief */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Interim Relief</label>
                                    <input
                                        type="tel"
                                        value={data.emp_earning_details.interim_relief || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* HRA */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">HRA</label>
                                    <input
                                        type="tel"
                                        value={data.emp_earning_details.HRA || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* CCA */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">CCA</label>
                                    <input
                                        type="tel"
                                        value={data.emp_earning_details.CCA || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Conveyance */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Conveyance</label>
                                    <input
                                        type="tel"
                                        value={data.emp_earning_details.conveyance || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Medical */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Medical</label>
                                    <input
                                        type="tel"
                                        value={data.emp_earning_details.medical || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Washing Allowance */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Washing Allowance</label>
                                    <input
                                        type="tel"
                                        value={data.emp_earning_details.washing_allowance || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* BDP */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">BDP</label>
                                    <input
                                        type="tel"
                                        value={data.emp_earning_details.BDP || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Arrears */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Arrears</label>
                                    <input
                                        type="tel"
                                        value={data.emp_earning_details.arrears || ""}
                                        disabled
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
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* GIS */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">GIS</label>
                                    <input
                                        type="tel"
                                        value={data.emp_deduction_details.GIS || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* House Rent */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">House Rent</label>
                                    <input
                                        type="tel"
                                        value={data.emp_deduction_details.house_rent || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Water Charges */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Water Charges</label>
                                    <input
                                        type="tel"
                                        value={data.emp_deduction_details.water_charges || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Electricity Charges */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Electricity Charges</label>
                                    <input
                                        type="tel"
                                        value={data.emp_deduction_details.electricity_charges || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Vehicle Deduction */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Vehicle Deduction</label>
                                    <input
                                        type="tel"
                                        value={data.emp_deduction_details.vehicle_deduction || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* HB Loan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">HB Loan</label>
                                    <input
                                        type="tel"
                                        value={data.emp_deduction_details.HB_loan || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* GPF Loan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">GPF Loan</label>
                                    <input
                                        type="tel"
                                        value={data.emp_deduction_details.GPF_loan || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Festival Loan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Festival Loan</label>
                                    <input
                                        type="tel"
                                        value={data.emp_deduction_details.festival_loan || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Grain Charges */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Grain Charges</label>
                                    <input
                                        type="tel"
                                        value={data.emp_deduction_details.grain_charges || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Bank Advance */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Bank Advance</label>
                                    <input
                                        type="tel"
                                        value={data.emp_deduction_details.bank_advance || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Advance */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Advance</label>
                                    <input
                                        type="tel"
                                        value={data.emp_deduction_details.advance || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* RGPV Advance */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">RGPV Advance</label>
                                    <input
                                        type="tel"
                                        value={data.emp_deduction_details.RGPV_advance || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Income Tax */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Income Tax</label>
                                    <input
                                        type="tel"
                                        value={data.emp_deduction_details.income_tax || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Professional Tax */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Professional Tax</label>
                                    <input
                                        type="tel"
                                        value={data.emp_deduction_details.professional_tax || ""}
                                        disabled
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* ... */}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 mt-6 py-6 items-center justify-around">

                            {/* done Button */}
                            <button
                                type="submit"
                                className=" w-full  lg:max-w-2xl px-8 py-3 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 flex items-center justify-center gap-3"
                            >
                                <LaptopMinimalCheck className="h-6 w-6" />
                                DONE
                            </button>
                        </div>

                    </form>
                </div>
            </div >
        </div >
    );
};

export {
    ViewEmployee
}
