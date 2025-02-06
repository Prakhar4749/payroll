import React, { useState, useEffect, useRef } from "react";
import { create_salary_archive, get_payslip } from "../../controller/Payslip";
import { view_emp_by_id } from "../../controller/empController";
import { useLocation, useNavigate } from "react-router-dom";
import { User, DollarSign, MinusCircle, Save } from 'lucide-react';
import Navbar from "../layout/Navbar"
import { BackButton } from "../common/backButton";
import { ConfirmDialogue } from "../common/ConfirmDialogue";
import { SuccessfullyDone } from "../common/SuccessfullyDone";
import { InvalidDialogue } from "../common/InvalidDialogue";
import { NoticeDialogue } from "../common/NoticeDialogue";
// import imageCompression from "browser-image-compression"

const Payslip_Form = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const today = new Date().toISOString().split("T")[0];

    const dateInputRef = useRef(null);
    const salary_details = location.state || {};
    const [data, setData] = useState({ salary_details: salary_details, emp_earning_details: {}, emp_deduction_details: {} }); // State to store employee data


    const [showConfirm, setShowConfirm] = useState({ success: false, message: "", onConfirm: () => { } });
    const [showInvalid, setshowInvalid] = useState({ success: false, message: "", onClose: () => { } });
    const [showSuccess, setshowSuccess] = useState({ success: false, message: "", onClose: () => { } });
    const [showNotice, setshowNotice] = useState({ success: false, message: "", onClose: () => { } });


    const get_form_data = async () => {
        try {
            const response = await view_emp_by_id(data.salary_details.e_id);

            // Check if response.result is not null or undefined
            if (response && response.result) {


                setData((prevData) => ({
                    ...prevData, // Keep previous state (salary_details)
                    emp_earning_details: response.result.emp_earning_details || {}, // Fallback to empty object if null
                    emp_deduction_details: response.result.emp_deduction_details || {}, // Fallback to empty object if null
                }));

                if (Number(data.salary_details.salary_month) === 2) {

                    // console.log("increament", data)


                    let new_basic_salary = parseInt(Number(response.result.emp_earning_details.basic_salary) + (Number(response.result.emp_earning_details.basic_salary) * 0.12))

                    setData((prev) => ({
                        ...prev,
                        emp_earning_details: {
                            ...prev.emp_earning_details, // Keep other deduction details unchanged
                            basic_salary: new_basic_salary,
                        },
                    }));
                    setshowNotice({
                        message: "The system has updated the employee's salary details based on the annual increment rate. Please take a moment to review it before generating the payslip!",
                        success: true,
                        onClose: () => {
                            setshowNotice(showInvalid)
                        }
                    });

                }
            }



            else {
                console.log(response);
            }
        } catch (error) {
            console.error("Error fetching form data:", error);
        }
    };

    useEffect(() => {
        get_form_data();



    }, []); // This will only run once on mount




    // leave deduction amount Formula 
    useEffect(() => {
        let salary_per_day = parseInt(
            (
                + Number(data.emp_earning_details.basic_salary)
                + Number(data.emp_earning_details.DA)
                - Number(data.emp_deduction_details.deduction_CPF)
            ) / 30
        )
        setData((prev) => ({
            ...prev,
            emp_deduction_details: {
                ...prev.emp_deduction_details, // Keep other deduction details unchanged
                leave_deduction_amount: salary_per_day * Number(data.emp_deduction_details.leave_days),
            },
        }));

    }, [data.emp_earning_details.basic_salary, data.emp_deduction_details.deduction_CPF, data.emp_earning_details.DA, data.emp_deduction_details.leave_days]); // This will only run once on mount









    const onConfirm = async () => {
        // console.log("sent data", data)
        try {

            const response = await create_salary_archive(data);

            setshowSuccess({
                message: response.message,
                success: response.success,
                onClose: async () => {
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
            setshowInvalid({
                message: response.message,
                success: !response.success, onClose: () => { setshowInvalid(showInvalid) }
            });
        } catch (err) {
            setshowInvalid({
                message: "Something went wrong! Please try again after some time.", success: true, onClose: () => {
                    setshowInvalid(showInvalid)
                    navigate("/payslip")
                }
            })
        }
    }



    const handleInputChange = (section, field, value) => {
        setData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [field]: value,
            },
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();


        setShowConfirm({
            message: `Are you sure you want to create this payslip ?`,
            success: true,
            onConfirm: onConfirm, // Pass the function reference
        });

    }




    // Render a loading spinner or message until data is ready

    if (!data) {
        setshowInvalid({
            message: "Something went Wrong! Please try again after some time.", success: true, onClose: () => {
                setshowInvalid(showInvalid)
                navigate("/payslip")
            }
        })


    }
    return (

        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            {showSuccess.success && (
                <div className="fixed inset-0 z-50">
                    <SuccessfullyDone
                        message={showSuccess.message}
                        onClose={showSuccess.onClose}
                    />
                </div>
            )}
            {showNotice.success && (
                <div className="fixed inset-0 z-50">
                    <NoticeDialogue
                        message={showNotice.message}
                        onClose={showNotice.onClose}
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
                            showConfirm.onConfirm();
                            setShowConfirm({ success: false, message: "", onConfirm: () => { } })
                        }}
                        onCancel={() => setShowConfirm({ message: "", success: false, onConfirm: null }
                        )} // Close without confirming
                    />
                </div>
            )}
            <div className="min-h-screen bg-slate-50/50 py-8 px-4">
                <div className="max-w-6xl mx-auto mt-12">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
                        {/* Form Header */}
                        <div className="relative px-8 py-10 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 overflow-hidden">
                            {/* Decorative circles */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                            <div className="relative">
                                <BackButton />
                                <h1 className="text-3xl mt-3 font-bold text-white">
                                    Create Employee Payslip
                                </h1>
                                <p className="mt-2 text-white/90 text-sm">
                                    Please review all details carefully before generating the payslip
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8" encType="multipart/form-data">
                            <div className="space-y-10">
                                {/* Salary Details Section */}
                                <section className="space-y-6">
                                    <div className="flex items-center space-x-3 pb-2 border-b border-slate-100">
                                        <div className="p-2 bg-emerald-50 rounded-lg">
                                            <User className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <h2 className="text-lg font-semibold text-slate-800">Salary Details</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* ID Field */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">Employee ID</label>
                                            <input
                                                type="text"
                                                value={data.salary_details.e_id || ""}
                                                onChange={(e) => handleInputChange("salary_details", "e_id", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 
                    cursor-not-allowed text-slate-500"
                                                disabled
                                            />
                                        </div>

                                        {/* Name Field */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">Employee Name</label>
                                            <input
                                                type="text"
                                                value={
                                                    data.emp_earning_details.e_name || "" }
                                                onChange={(e) => handleInputChange("emp_earning_details", "e_name", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 
                    cursor-not-allowed text-slate-500"
                                                disabled
                                                maxLength={30}
                                                style={{ textTransform: "capitalize" }}
                                            />
                                        </div>

                                        {/* Salary Month Field */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">Salary Month</label>
                                            <select
                                                value={data.salary_details.salary_month || ""}
                                                onChange={(e) => handleInputChange("salary_details", "salary_month", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 
                    cursor-not-allowed text-slate-500"
                                                disabled
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

                                        {/* Salary Year Field */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">Salary Year</label>
                                            <select
                                                value={data.salary_details.salary_year || ""}
                                                onChange={(e) => handleInputChange("salary_details", "salary_year", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 
                    cursor-not-allowed text-slate-500"
                                                disabled
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
                                </section>

                                {/* Employee Earning Details Section */}
                                <section className="space-y-6">
                                    {/* Section Header */}
                                    <div className="flex items-center space-x-3 pb-2 border-b border-slate-100">
                                        <div className="p-2 bg-emerald-50 rounded-lg">
                                            <DollarSign className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <h2 className="text-lg font-semibold text-slate-800">Employee Earnings</h2>
                                    </div>

                                    {/* Input Fields for Employee Earnings */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* Basic Salary */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">Basic Salary</label>
                                            <input
                                                type="number"
                                                value={data.emp_earning_details.basic_salary || 0}
                                                onChange={(e) => handleInputChange("emp_earning_details", "basic_salary", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-slate-700"
                                            />
                                        </div>

                                        {/* Special Pay */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">Special Pay</label>
                                            <input
                                                type="number"
                                                value={data.emp_earning_details.special_pay || 0}
                                                onChange={(e) => handleInputChange("emp_earning_details", "special_pay", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-slate-700"
                                            />
                                        </div>

                                        {/* Dearness Allowance */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">Dearness Allowance</label>
                                            <input
                                                type="number"
                                                value={data.emp_earning_details.dearness_allowance || 0}
                                                onChange={(e) => handleInputChange("emp_earning_details", "dearness_allowance", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-slate-700"
                                            />
                                        </div>

                                        {/* DA */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">DA</label>
                                            <input
                                                type="number"
                                                value={data.emp_earning_details.DA || 0}
                                                onChange={(e) => handleInputChange("emp_earning_details", "DA", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-slate-700"
                                            />
                                        </div>

                                        {/* ADA */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">ADA</label>
                                            <input
                                                type="number"
                                                value={data.emp_earning_details.ADA || 0}
                                                onChange={(e) => handleInputChange("emp_earning_details", "ADA", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-slate-700"
                                            />
                                        </div>

                                        {/* Interim Relief */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">Interim Relief</label>
                                            <input
                                                type="number"
                                                value={data.emp_earning_details.interim_relief || 0}
                                                onChange={(e) => handleInputChange("emp_earning_details", "interim_relief", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-slate-700"
                                            />
                                        </div>

                                        {/* HRA Field */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">HRA</label>
                                            <input
                                                type="number"
                                                value={data.emp_earning_details.HRA || 0}
                                                onChange={(e) => handleInputChange("emp_earning_details", "HRA", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-slate-700"
                                            />
                                        </div>

                                        {/* CCA Field */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">CCA</label>
                                            <input
                                                type="number"
                                                value={data.emp_earning_details.CCA || 0}
                                                onChange={(e) => handleInputChange("emp_earning_details", "CCA", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-slate-700"
                                            />
                                        </div>

                                        {/* Conveyance Field */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">Conveyance</label>
                                            <input
                                                type="number"
                                                value={data.emp_earning_details.conveyance || 0}
                                                onChange={(e) => handleInputChange("emp_earning_details", "conveyance", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-slate-700"
                                            />
                                        </div>

                                        {/* Medical Allowance Field */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">Medical Allowance</label>
                                            <input
                                                type="number"
                                                value={data.emp_earning_details.medical || 0}
                                                onChange={(e) => handleInputChange("emp_earning_details", "medical", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-slate-700"
                                            />
                                        </div>

                                        {/* Washing Allowance Field */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">Washing Allowance</label>
                                            <input
                                                type="number"
                                                value={data.emp_earning_details.washing_allowance || 0}
                                                onChange={(e) => handleInputChange("emp_earning_details", "washing_allowance", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-slate-700"
                                            />
                                        </div>

                                        {/* BDP Field */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">BDP</label>
                                            <input
                                                type="number"
                                                value={data.emp_earning_details.BDP || 0}
                                                onChange={(e) => handleInputChange("emp_earning_details", "BDP", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-slate-700"
                                            />
                                        </div>

                                        {/* Arrears Field */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">Arrears</label>
                                            <input
                                                type="number"
                                                value={data.emp_earning_details.arrears || 0}
                                                onChange={(e) => handleInputChange("emp_earning_details", "arrears", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-slate-700"
                                            />
                                        </div>
                                    </div>
                                </section>
                                {/* Deductions Section */}
                                <section className="space-y-6">
                                    <div className="flex items-center space-x-3 pb-2 border-b border-slate-100">
                                        <div className="p-2 bg-emerald-50 rounded-lg">
                                            <MinusCircle className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <h2 className="text-lg font-semibold text-slate-800">Deductions Details</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* Your deductions fields go here */}

                                        {/* Leave Days */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">LEAVE DAYS</label>
                                            <input type="number" value={data.emp_deduction_details.leave_days || 0} onChange={(e) => handleInputChange("emp_deduction_details", "leave_days", e.target.value)} className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700" />
                                        </div>

                                        {/* Leave Deduction Amount */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">LEAVE DEDUCTION AMOUNT</label>
                                            <input
                                                type="number"
                                                value={data.emp_deduction_details.leave_deduction_amount || 0}
                                                onChange={(e) => handleInputChange("emp_deduction_details", "leave_deduction_amount", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700"
                                                disabled
                                            />
                                        </div>

                                        {/* Deduction CPF */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">DEDUCTION CPF</label>
                                            <input
                                                type="number"
                                                value={data.emp_deduction_details.deduction_CPF || 0}
                                                onChange={(e) => handleInputChange("emp_deduction_details", "deduction_CPF", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700"
                                            />
                                        </div>

                                        {/* GIS */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">GIS</label>
                                            <input
                                                type="number"
                                                value={data.emp_deduction_details.GIS || 0}
                                                onChange={(e) => handleInputChange("emp_deduction_details", "GIS", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700"
                                            />
                                        </div>

                                        {/* House Rent */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">HOUSE RENT</label>
                                            <input
                                                type="number"
                                                value={data.emp_deduction_details.house_rent || 0}
                                                onChange={(e) => handleInputChange("emp_deduction_details", "house_rent", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700"
                                            />
                                        </div>

                                        {/* Water Charges */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">WATER CHARGES</label>
                                            <input
                                                type="number"
                                                value={data.emp_deduction_details.water_charges || 0}
                                                onChange={(e) => handleInputChange("emp_deduction_details", "water_charges", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700"
                                            />
                                        </div>

                                        {/* Electricity Charges */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">ELECTRICITY CHARGES</label>
                                            <input
                                                type="number"
                                                value={data.emp_deduction_details.electricity_charges || 0}
                                                onChange={(e) => handleInputChange("emp_deduction_details", "electricity_charges", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700"
                                            />
                                        </div>

                                        {/* Vehicle Deduction */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">VEHICLE DEDUCTION</label>
                                            <input
                                                type="number"
                                                value={data.emp_deduction_details.vehicle_deduction || 0}
                                                onChange={(e) => handleInputChange("emp_deduction_details", "vehicle_deduction", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700"
                                            />
                                        </div>

                                        {/* HB Loan */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">HB LOAN</label>
                                            <input
                                                type="number"
                                                value={data.emp_deduction_details.HB_loan || 0}
                                                onChange={(e) => handleInputChange("emp_deduction_details", "HB_loan", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700"
                                            />
                                        </div>

                                        {/* GPF Loan */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">GPF LOAN</label>
                                            <input
                                                type="number"
                                                value={data.emp_deduction_details.GPF_loan || 0}
                                                onChange={(e) => handleInputChange("emp_deduction_details", "GPF_loan", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700"
                                            />
                                        </div>

                                        {/* Festival Loan */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">FESTIVAL LOAN</label>
                                            <input
                                                type="number"
                                                value={data.emp_deduction_details.festival_loan || 0}
                                                onChange={(e) => handleInputChange("emp_deduction_details", "festival_loan", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700"
                                            />
                                        </div>

                                        {/* Grain Charges */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">GRAIN CHARGES</label>
                                            <input
                                                type="number"
                                                value={data.emp_deduction_details.grain_charges || 0}
                                                onChange={(e) => handleInputChange("emp_deduction_details", "grain_charges", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700"
                                            />
                                        </div>

                                        {/* Bank Advance */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">BANK ADVANCE</label>
                                            <input
                                                type="number"
                                                value={data.emp_deduction_details.bank_advance || 0}
                                                onChange={(e) => handleInputChange("emp_deduction_details", "bank_advance", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700"
                                            />
                                        </div>

                                        {/* Advance */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">ADVANCE</label>
                                            <input
                                                type="number"
                                                value={data.emp_deduction_details.advance || 0}
                                                onChange={(e) => handleInputChange("emp_deduction_details", "advance", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700"
                                            />
                                        </div>

                                        {/* RGPV Advance */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">RGPV ADVANCE</label>
                                            <input
                                                type="number"
                                                value={data.emp_deduction_details.RGPV_advance || 0}
                                                onChange={(e) => handleInputChange("emp_deduction_details", "RGPV_advance", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700"
                                            />
                                        </div>

                                        {/* Income Tax */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">INCOME TAX</label>
                                            <input
                                                type="number"
                                                value={data.emp_deduction_details.income_tax || 0}
                                                onChange={(e) => handleInputChange("emp_deduction_details", "income_tax", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700"
                                            />
                                        </div>

                                        {/* Professional Tax */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700">PROFESSIONAL TAX</label>
                                            <input
                                                type="number"
                                                value={data.emp_deduction_details.professional_tax || 0}
                                                onChange={(e) => handleInputChange("emp_deduction_details", "professional_tax", e.target.value)}
                                                className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-slate-700"
                                            />
                                        </div>









                                    </div>
                                </section>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-10 flex justify-center">
                                <button
                                    type="submit"
                                    className="px-8 py-3 rounded-xl text-white font-medium
              bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600
              hover:from-emerald-700 hover:via-teal-700 hover:to-sky-700
              focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
              transform transition-all duration-200 hover:scale-[1.02]
              shadow-lg shadow-emerald-600/20
              flex items-center space-x-3"
                                >
                                    <Save className="h-5 w-5" />
                                    <span>Generate Payslip</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Payslip_Form;
