import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FilterX,
  Filter,
  PlusCircle,
  Edit,
  Trash2
} from "lucide-react";
import { removeFromDept } from "../../controller/department.controller";
import { ConfirmDialogue } from "../common/ConfirmDialogue";
import { SuccessfullyDone } from "../common/SuccessfullyDone";
import { InvalidDialogue } from "../common/InvalidDialogue";

const DEPT_aside = ({
  deptData,
  deptDatacopy,
  setdeptDatacopy,
  d_id,
  setdeptData,
  setd_id1,
  setshowloading

}) => {
  const [showDeleteSuccess, setshowDeleteSuccess] = useState({
    message: "",
    success: false,
  });
  const [showInvalid, setShowInvalid] = useState({
    message: "",
    success: false,
  });
  const [dId, setdID] = useState("");
  const [dName, setdName] = useState("");
  const [dNamec, setdNamec] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState({
    message: "",
    success: false,
    onConfirm: () => {},
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (d_id) {
      const selectedDept = deptDatacopy.find((dept) => dept.d_id === d_id);
      setdName(selectedDept ? selectedDept.d_name : "");
    } else {
      setdName("");
    }
  }, [d_id, deptDatacopy]);

  const onDeleteConfirm = async (selected_d_id) => {
    try {
      setshowloading(true)
      const resultt = await removeFromDept(selected_d_id);
      // console.log(resultt);
      setshowloading(false)
      if (resultt.success) {
        
        setshowDeleteSuccess({ message: resultt.message, success: true });
      } else {
        setShowInvalid({ message: resultt.message, success: true });
        setd_id1("");
      }
    } catch (error) {
      console.error("Error removing department:", error.message);
    }
  };

  const removeDept = () => {
    if (!d_id) {
      console.error("No department ID selected.");
      return;
    }

    setShowDeleteConfirm({
      message: `Are you sure you want to remove department ID: ${d_id}?`,
      onConfirm: onDeleteConfirm,
      success:true
    });
  };

  const addDept = () => {
    navigate("/department/add_form");
  };

  const updateDept = () => {
    if (!d_id) return;
    navigate("/department/update_form", { state: { d_id, d_name: dName } });
  };

  function applyFilter() {
    
    const filteredData = deptData.filter((dept) => {
      const matchesId = dId ? dept.d_id.toString().includes(dId) : true;
      const matchesName = dNamec
        ? dept.d_name.toLowerCase().includes(dNamec.toLowerCase())
        : true;
      return matchesId && matchesName;
    });
    setdeptDatacopy(filteredData);

    const filteredMatch = filteredData.some(
      (dept) => dept.d_id === d_id
    );
    // console.log(filteredMatch)

    // console.log(filteredData)
    // console.log(dId)
    // console.log("->"+d_id)

    if (!filteredMatch) setd_id1("");
  }

  function clearFilter() {
    setdID("");
    setdNamec("");
    setdeptDatacopy(deptData);
  }

  return (
    <aside className="w-full bg-white border rounded-lg overflow-hidden">
      {showDeleteSuccess.success && (
        <div className="fixed inset-0 z-50">
          <SuccessfullyDone
            message={showDeleteSuccess.message}
            onClose={() => {
              setshowDeleteSuccess({ message: "", success: false });
              setdeptData(
                deptDatacopy.filter((dept) => dept.d_id !== d_id)
              );
              setdeptDatacopy(
                deptDatacopy.filter((dept) => dept.d_id !== d_id)
              );
            }}
          />
        </div>
      )}

      {showInvalid.success && (
        <div className="fixed inset-0 z-50">
          <InvalidDialogue
            message={showInvalid.message}
            onClose={() => {
              setShowInvalid({ message: "", success: false });
            }}
          />
        </div>
      )}

      {showDeleteConfirm.success && (
        <div className="fixed inset-0 z-50">
          <ConfirmDialogue
            message={showDeleteConfirm.message}
            onConfirm={() => {
              showDeleteConfirm.onConfirm(d_id);
              setShowDeleteConfirm({ message: "", onConfirm: () => {}, success: false });
            }}
            onCancel={() =>
                setShowDeleteConfirm({ message: "", onConfirm: () => {}, success: false })
            }
          />
        </div>
      )}
      <div className="p-6 flex flex-col gap-4">
        <button
          className="w-full px-4 py-2.5 text-white font-medium rounded-xl
          bg-emerald-600 hover:bg-emerald-700
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
          transform transition-all duration-200 hover:scale-[1.02]
          shadow-lg shadow-emerald-600/20
          flex items-center justify-center gap-2 text-sm"
          onClick={addDept}
        >
          <PlusCircle className="w-4 h-4" />
          Add Department
        </button>

        <button
          className={`w-full px-4 py-2.5 font-medium rounded-xl
            transition-all duration-200 flex items-center justify-center gap-2 text-sm
            ${d_id
                      ? "bg-teal-600 text-white hover:bg-teal-700 \
                 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 \
                 transform hover:scale-[1.02] shadow-lg shadow-teal-600/20"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
          disabled={!d_id}
          onClick={updateDept}
        >
          <Edit className="w-4 h-4" />
          Update Department
        </button>

        <button
          className={`w-full px-4 py-2.5 font-medium rounded-xl
            transition-all duration-200 flex items-center justify-center gap-2 text-sm
            ${d_id
                      ? "bg-rose-600 text-white hover:bg-rose-700 \
                 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 \
                 transform hover:scale-[1.02] shadow-lg shadow-rose-600/20"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
          disabled={!d_id}
          onClick={removeDept}
        >
          <Trash2 className="w-4 h-4" />
          Remove Department
        </button>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">
              Filter Options
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="deptId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department ID
              </label>
              <input
                type="text"
                id="deptId"
                value={dId}
                onChange={(e) => setdID(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                placeholder="Search by ID..."
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="deptName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department Name
              </label>
              <input
                type="text"
                id="deptName"
                value={dNamec}
                onChange={(e) => setdNamec(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                placeholder="Search by name..."
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6 w-full">
            <button
              onClick={clearFilter}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2 px-4 rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              <FilterX className="w-4 h-4" />
              Clear
            </button>
            <button
              onClick={applyFilter}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Apply
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DEPT_aside;
