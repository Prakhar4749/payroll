import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { checkDepartment, addToDepartment } from "../../controller/department.controller";
import { SuccessfullyDone } from "../common/SuccessfullyDone";
import { BackButton } from "../common/backButton";
import { InvalidDialogue } from "../common/InvalidDialogue";
import { ConfirmDialogue } from "../common/ConfirmDialogue";
import { Eraser, Save } from 'lucide-react';

const DeptAddForm = () => {
  const navigate = useNavigate();
  const [dId, setDId] = useState("");
  const [dName, setDName] = useState("");

  const [showSuccess, setShowSuccess] = useState({ message: "", success: false });
  const [showInvalid, setShowInvalid] = useState({ message: "", success: false });
  const [showConfirm, setShowConfirm] = useState({ message: "", success: false, onConfirm: () => {} });

  const clearForm = () => {
    setDId("");
    setDName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dId[0] !== "D" || !/^\d{3}$/.test(dId.slice(-3))) {
      setShowInvalid({ message: "Invalid Department ID format.", success: true });
      return;
    }

    const result = await checkDepartment(dId, dName);

    if (result.d_id || result.d_name) {
      setShowInvalid({ message: "Department already exists.", success: true });
    } else {
      setShowConfirm({
        message: "Are you sure you want to add the new Department?",
        success: true,
        onConfirm: async () => {
          setShowConfirm({
            message: "Are you sure you want to add the new Department?",
            success: false})
          await addToDepartment({ d_id: dId, d_name: dName });
          setShowSuccess({ message: "Department added successfully!", success: true });
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-20">
        {showSuccess.success && (
          <SuccessfullyDone message={showSuccess.message} onClose={() => navigate("/department")} />
        )}
        {showInvalid.success && (
          <InvalidDialogue message={showInvalid.message} onClose={() => setShowInvalid({ message: "", success: false })} />
        )}
        {showConfirm.success && (
          <ConfirmDialogue
            message={showConfirm.message}
            onConfirm={showConfirm.onConfirm}
            onCancel={() => setShowConfirm({ message: "", success: false, onConfirm: () => {} })}
          />
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600">
            <BackButton />
            <h1 className="text-2xl mt-2 font-bold text-white">Add Department</h1>
            <p className="mt-2 text-white/90">Fill in the required department information below</p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Department ID</label>
                <input
                  type="text"
                  maxLength="4"
                  value={dId}
                  onChange={(e) => setDId(e.target.value.toUpperCase())}
                  className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Department Name</label>
                <input
                  type="text"
                  value={dName}
                  onChange={(e) => setDName(e.target.value)}
                  className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-6 items-center justify-around">
              <button type="button" onClick={clearForm} className="w-full md:w-auto px-7 py-3 bg-gray-100 rounded-lg shadow-lg text-gray-600 flex items-center gap-3">
                <Eraser className="h-6 w-6" /> Clear
              </button>
              <button type="submit" className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-white rounded-lg shadow-lg flex items-center gap-3">
                <Save className="h-6 w-6" /> Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeptAddForm;
