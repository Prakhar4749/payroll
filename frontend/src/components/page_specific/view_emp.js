import React from 'react';
import { useLocation } from 'react-router-dom';

const ViewEmployee = () => {
    const location = useLocation();
    console.log(location.state.data)
    const { emp_details, emp_bank_details, emp_deduction_details, emp_earning_details } = location.state.data;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Employee Photo and Name */}
            <div className="flex items-center space-x-4 mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                    {emp_details.e_photo ? (
                        <img
                            src={emp_details.e_photo}
                            alt={emp_details.e_name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                            No Photo
                        </div>
                    )}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-emerald-600">{emp_details.e_name}</h1>
                    <p className="text-gray-500">{emp_details.e_designation}</p>
                </div>
            </div>

            {/* Employee Details */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-emerald-600 mb-4">Employee Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div><p className="text-sm text-gray-500">Employee ID</p><p className="text-base text-gray-700">{emp_details.e_id ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Mobile Number</p><p className="text-base text-gray-700">{emp_details.e_mobile_number ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Gender</p><p className="text-base text-gray-700">{emp_details.e_gender ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Email</p><p className="text-base text-gray-700">{emp_details.e_email ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Address</p><p className="text-base text-gray-700">{emp_details.e_address ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Designation</p><p className="text-base text-gray-700">{emp_details.e_designation ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Group</p><p className="text-base text-gray-700">{emp_details.e_group ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Date of Joining</p><p className="text-base text-gray-700">{emp_details.e_date_of_joining ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Date of Birth</p><p className="text-base text-gray-700">{emp_details.e_DOB ?? 'N/A'}</p></div>
                </div>
            </div>

            {/* Bank Details */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-emerald-600 mb-4">Bank Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div><p className="text-sm text-gray-500">Bank Name</p><p className="text-base text-gray-700">{emp_bank_details.e_bank_name ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Account Number</p><p className="text-base text-gray-700">{emp_bank_details.e_bank_acc_number ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">PAN Number</p><p className="text-base text-gray-700">{emp_bank_details.e_pan_number ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">IFSC Code</p><p className="text-base text-gray-700">{emp_bank_details.e_bank_IFSC ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">CPF/GPF Number</p><p className="text-base text-gray-700">{emp_bank_details.e_cpf_or_gpf_number ?? 'N/A'}</p></div>
                </div>
            </div>

            {/*earning details */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-emerald-600 mb-4">Earning Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Basic Salary</p>
                        <p className="text-base text-gray-700">{emp_earning_details.basic_salary ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Special Pay</p>
                        <p className="text-base text-gray-700">{emp_earning_details.special_pay ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Dearness Allowance</p>
                        <p className="text-base text-gray-700">{emp_earning_details.dearness_allowance ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">DA</p>
                        <p className="text-base text-gray-700">{emp_earning_details.DA ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">ADA</p>
                        <p className="text-base text-gray-700">{emp_earning_details.ADA ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Interim Relief</p>
                        <p className="text-base text-gray-700">{emp_earning_details.interim_relief ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">HRA</p>
                        <p className="text-base text-gray-700">{emp_earning_details.HRA ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">CCA</p>
                        <p className="text-base text-gray-700">{emp_earning_details.CCA ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Conveyance</p>
                        <p className="text-base text-gray-700">{emp_earning_details.conveyance ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Medical</p>
                        <p className="text-base text-gray-700">{emp_earning_details.medical ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Washing Allowance</p>
                        <p className="text-base text-gray-700">{emp_earning_details.washing_allowance ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">BDP</p>
                        <p className="text-base text-gray-700">{emp_earning_details.BDP ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Arrears</p>
                        <p className="text-base text-gray-700">{emp_earning_details.arrears ?? 'N/A'}</p>
                    </div>
                </div>
            </div>




            {/* Deduction Details */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-emerald-600 mb-4">Deduction Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div><p className="text-sm text-gray-500">Leave Days</p><p className="text-base text-gray-700">{emp_deduction_details.leave_days ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Leave Deduction Amount</p><p className="text-base text-gray-700">{emp_deduction_details.leave_deduction_amount ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Deduction CPF</p><p className="text-base text-gray-700">{emp_deduction_details.deduction_CPF ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">GIS</p><p className="text-base text-gray-700">{emp_deduction_details.GIS ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">House Rent</p><p className="text-base text-gray-700">{emp_deduction_details.house_rent ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Water Charges</p><p className="text-base text-gray-700">{emp_deduction_details.water_charges ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Electricity Charges</p><p className="text-base text-gray-700">{emp_deduction_details.electricity_charges ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Vehicle Deduction</p><p className="text-base text-gray-700">{emp_deduction_details.vehicle_deduction ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">HB Loan</p><p className="text-base text-gray-700">{emp_deduction_details.HB_loan ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">GPF Loan</p><p className="text-base text-gray-700">{emp_deduction_details.GPF_loan ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Festival Loan</p><p className="text-base text-gray-700">{emp_deduction_details.festival_loan ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Grain Charges</p><p className="text-base text-gray-700">{emp_deduction_details.grain_charges ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Bank Advance</p><p className="text-base text-gray-700">{emp_deduction_details.bank_advance ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Advance</p><p className="text-base text-gray-700">{emp_deduction_details.advance ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">RGPV Advance</p><p className="text-base text-gray-700">{emp_deduction_details.RGPV_advance ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Income Tax</p><p className="text-base text-gray-700">{emp_deduction_details.income_tax ?? 'N/A'}</p></div>
                    <div><p className="text-sm text-gray-500">Professional Tax</p><p className="text-base text-gray-700">{emp_deduction_details.professional_tax ?? 'N/A'}</p></div>
                </div>
            </div>
        </div>
    );
}
export {
    ViewEmployee
}
