import React, { useState } from 'react'

const Payslip_Form = () => {

    const [formData, setFormData] = useState({
        e_id: "1000",
        e_name: "flkudjsociklv;gj",
        e_dept: "fgfghd",
        e_desgn: "sfdhgdfgsh",
        e_CPF: "sdfhhh",
        e_attndc: "dfsghdfgh",
        e_bank_name: "",
        e_acc_no: "",
        e_pan_no: "",

        // earning 
        e_basic: "",
        e_spc: "",
        e_dearness: "",
        e_DA: "",
        e_ADA: "",
        e_IR: "",
        e_HRA: "",
        e_CCA: "",
        e_conv: "",
        e_medical: "",
        e_wash: "",
        e_BDP: "",
        e_arrears: "",


        // deduction
        e_d_CPF: "",
        e_GIS: "",
        e_house_rent: "",
        e_water: "",
        e_elect: "",
        e_veh: "",
        e_HB_loan: "",
        e_GPF_loan: "",
        e_festv_loan: "",
        e_grain: "",
        e_bank_adv: "",
        e_advance: "",
        e_RGPV_adv: "",
        e_incom_tax: "",
        e_proff_tax: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const { basicSalary, deductions } = formData;
        const totalSalary = basicSalary - deductions;

        // Update state with total salary
        setFormData((prev) => ({
            ...prev,
            totalSalary,
        }));

        alert("Payslip created successfully!");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create Payslip
                </h2>
                <form onSubmit={handleSubmit} className=" flex flex-col">
                    <div className='gap-4 '>

                        {/* Personal details  */}

                        <section className='gap-4 flex flex-col align-items-center m-3 '>
                            <h1 className=''>Personal detail</h1>
                            <div className='grid grid-cols-3 w-9/12 gap-8 self-center'>
                                {/* id  */}
                                <div>
                                    <label
                                        htmlFor="e_id"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Employee id
                                    </label>
                                    <input
                                        type="text"
                                        id="e_id"
                                        name="e_id"
                                        value={formData.e_id}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter employee's id"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* name  */}
                                <div>
                                    <label
                                        htmlFor="e_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Employee Name
                                    </label>
                                    <input
                                        type="text"
                                        id="e_name"
                                        name="e_name"
                                        value={formData.e_name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter employee's name"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* department */}
                                <div>
                                    <label
                                        htmlFor="e_dept"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        id="e_dept"
                                        name="e_dept"
                                        value={formData.e_dept}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter department"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Designation*/}
                                <div>
                                    <label
                                        htmlFor="e_desgn"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Designation
                                    </label>
                                    <input
                                        type="text"
                                        id="e_desgn"
                                        name="e_desgn"
                                        value={formData.e_desgn}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter designation"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* cpf  */}
                                <div>
                                    <label
                                        htmlFor="e_desgn"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        CPF/GPF
                                    </label>
                                    <input
                                        type="text"
                                        id="e_CPF"
                                        name="e_CPF"
                                        value={formData.e_CPF}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter value"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* e_attendence */}
                                <div>
                                    <label
                                        htmlFor="e_attndc"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Attendence
                                    </label>
                                    <input
                                        type="number"
                                        id="e_attndc"
                                        name="e_attndc"
                                        value={formData.e_attndc}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter value"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* Bank Name */}
                                <div>
                                    <label
                                        htmlFor="e_bank_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Bank Name
                                    </label>
                                    <input
                                        type="text"
                                        id="e_bank_name"
                                        name="e_bank_name"
                                        value={formData.e_bank_name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter value"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* acc no  */}
                                <div>
                                    <label
                                        htmlFor="e_acc_no"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Account number
                                    </label>
                                    <input
                                        type="number"
                                        id="e_acc_no"
                                        name="e_acc_no"
                                        value={formData.e_acc_no}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter value"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* pan no  */}
                                <div>
                                    <label
                                        htmlFor="e_pan_no"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        IT PAN NO.
                                    </label>
                                    <input
                                        type="text"
                                        id="e_pan_no"
                                        name="e_pan_no"
                                        value={formData.e_pan_no}
                                        onChange={handleChange}
                                        required
                                        placeholder="enter value"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Earnings  */}


                        <section className="gap-4 flex flex-col align-items-center m-3">
                            <h1 className="">Earnings</h1>
                            <div className="grid grid-cols-3 w-9/12 gap-8 self-center">
                                {/* Basic Salary */}
                                <div>
                                    <label
                                        htmlFor="e_basic"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Basic Salary
                                    </label>
                                    <input
                                        type="text"
                                        id="e_basic"
                                        name="e_basic"
                                        value={formData.e_basic}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter Basic Salary"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* Special Pay */}
                                <div>
                                    <label
                                        htmlFor="e_spc"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Special Pay
                                    </label>
                                    <input
                                        type="text"
                                        id="e_spc"
                                        name="e_spc"
                                        value={formData.e_spc}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter Special Pay"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* Dearness */}
                                <div>
                                    <label
                                        htmlFor="e_dearness"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Dearness Allowance
                                    </label>
                                    <input
                                        type="text"
                                        id="e_dearness"
                                        name="e_dearness"
                                        value={formData.e_dearness}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter Dearness Allowance"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* DA */}
                                <div>
                                    <label
                                        htmlFor="e_DA"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        DA
                                    </label>
                                    <input
                                        type="text"
                                        id="e_DA"
                                        name="e_DA"
                                        value={formData.e_DA}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter DA"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* ADA */}
                                <div>
                                    <label
                                        htmlFor="e_ADA"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        ADA
                                    </label>
                                    <input
                                        type="text"
                                        id="e_ADA"
                                        name="e_ADA"
                                        value={formData.e_ADA}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter ADA"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* IR */}
                                <div>
                                    <label
                                        htmlFor="e_IR"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Interim Relief (IR)
                                    </label>
                                    <input
                                        type="text"
                                        id="e_IR"
                                        name="e_IR"
                                        value={formData.e_IR}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter IR"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* HRA */}
                                <div>
                                    <label
                                        htmlFor="e_HRA"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        HRA
                                    </label>
                                    <input
                                        type="text"
                                        id="e_HRA"
                                        name="e_HRA"
                                        value={formData.e_HRA}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter HRA"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* CCA */}
                                <div>
                                    <label
                                        htmlFor="e_CCA"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        CCA
                                    </label>
                                    <input
                                        type="text"
                                        id="e_CCA"
                                        name="e_CCA"
                                        value={formData.e_CCA}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter CCA"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* Conveyance */}
                                <div>
                                    <label
                                        htmlFor="e_conv"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Conveyance
                                    </label>
                                    <input
                                        type="text"
                                        id="e_conv"
                                        name="e_conv"
                                        value={formData.e_conv}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter Conveyance"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* Medical */}
                                <div>
                                    <label
                                        htmlFor="e_medical"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Medical
                                    </label>
                                    <input
                                        type="text"
                                        id="e_medical"
                                        name="e_medical"
                                        value={formData.e_medical}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter Medical Allowance"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* Washing Allowance */}
                                <div>
                                    <label
                                        htmlFor="e_wash"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Washing Allowance
                                    </label>
                                    <input
                                        type="text"
                                        id="e_wash"
                                        name="e_wash"
                                        value={formData.e_wash}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter Washing Allowance"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* BDP */}
                                <div>
                                    <label
                                        htmlFor="e_BDP"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        BDP
                                    </label>
                                    <input
                                        type="text"
                                        id="e_BDP"
                                        name="e_BDP"
                                        value={formData.e_BDP}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter BDP"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* Arrears */}
                                <div>
                                    <label
                                        htmlFor="e_arrears"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Arrears
                                    </label>
                                    <input
                                        type="text"
                                        id="e_arrears"
                                        name="e_arrears"
                                        value={formData.e_arrears}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter Arrears"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </section>
                         
                         {/* deduction */}

                        <section className="gap-4 flex flex-col align-items-center m-3">
                            <h1 className="">Deductions</h1>
                            <div className="grid grid-cols-3 w-9/12 gap-8 self-center">
                                {/* e_d_CPF */}
                                <div>
                                    <label
                                        htmlFor="e_d_CPF"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Deduction CPF
                                    </label>
                                    <input
                                        type="number"
                                        id="e_d_CPF"
                                        name="e_d_CPF"
                                        value={formData.e_d_CPF}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter value"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* e_GIS */}
                                <div>
                                    <label
                                        htmlFor="e_GIS"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        GIS
                                    </label>
                                    <input
                                        type="number"
                                        id="e_GIS"
                                        name="e_GIS"
                                        value={formData.e_GIS}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter value"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* e_house_rent */}
                                <div>
                                    <label
                                        htmlFor="e_house_rent"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        House Rent
                                    </label>
                                    <input
                                        type="number"
                                        id="e_house_rent"
                                        name="e_house_rent"
                                        value={formData.e_house_rent}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter value"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* e_water */}
                                <div>
                                    <label
                                        htmlFor="e_water"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Water Charges
                                    </label>
                                    <input
                                        type="number"
                                        id="e_water"
                                        name="e_water"
                                        value={formData.e_water}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter value"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* e_elect */}
                                <div>
                                    <label
                                        htmlFor="e_elect"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Electricity Charges
                                    </label>
                                    <input
                                        type="number"
                                        id="e_elect"
                                        name="e_elect"
                                        value={formData.e_elect}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter value"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* e_veh */}
                                <div>
                                    <label
                                        htmlFor="e_veh"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Vehicle Deduction
                                    </label>
                                    <input
                                        type="number"
                                        id="e_veh"
                                        name="e_veh"
                                        value={formData.e_veh}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter value"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* e_HB_loan */}
                                <div>
                                    <label
                                        htmlFor="e_HB_loan"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        HB Loan
                                    </label>
                                    <input
                                        type="number"
                                        id="e_HB_loan"
                                        name="e_HB_loan"
                                        value={formData.e_HB_loan}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter value"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* e_GPF_loan */}
                                <div>
                                    <label
                                        htmlFor="e_GPF_loan"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        GPF Loan
                                    </label>
                                    <input
                                        type="number"
                                        id="e_GPF_loan"
                                        name="e_GPF_loan"
                                        value={formData.e_GPF_loan}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter value"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* e_festv_loan */}
                                <div>
                                    <label
                                        htmlFor="e_festv_loan"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Festival Loan
                                    </label>
                                    <input
                                        type="number"
                                        id="e_festv_loan"
                                        name="e_festv_loan"
                                        value={formData.e_festv_loan}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter value"
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Additional Fields */}
                                {[
                                    { label: "Grain Charges", id: "e_grain" },
                                    { label: "Bank Advance", id: "e_bank_adv" },
                                    { label: "Advance", id: "e_advance" },
                                    { label: "RGPV Advance", id: "e_RGPV_adv" },
                                    { label: "Income Tax", id: "e_incom_tax" },
                                    { label: "Professional Tax", id: "e_proff_tax" },
                                ].map((field) => (
                                    <div key={field.id}>
                                        <label
                                            htmlFor={field.id}
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            {field.label}
                                        </label>
                                        <input
                                            type="number"
                                            id={field.id}
                                            name={field.id}
                                            value={formData[field.id]}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter value"
                                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>


                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-3/5 px-4 py-2 m-10 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 self-center"
                    >
                        Generate Payslip
                    </button>
                </form>

                {/* Display Result */}
                {formData.totalSalary && (
                    <div className="mt-6 p-4 bg-green-100 rounded-md">
                        <h3 className="text-lg font-semibold text-green-700">Payslip:</h3>
                        <p className="text-gray-700">
                            <strong>Name:</strong> {formData.name}
                        </p>
                        <p className="text-gray-700">
                            <strong>Designation:</strong> {formData.designation}
                        </p>
                        <p className="text-gray-700">
                            <strong>Total Salary:</strong> ₹{formData.totalSalary}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Payslip_Form
