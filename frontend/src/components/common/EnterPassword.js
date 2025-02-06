import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { delete_user } from "../../controller/user.controlle";
import {SuccessfullyDone} from "./SuccessfullyDone";
import {InvalidDialogue} from "./InvalidDialogue";

function EnterPassword({ onCancel, current_user, show,setShow }) {
  const [password, setPassword] = useState("");
  const [showInvalid, setshowInvalid] = useState({ success: false, message: "", onClose: () => {} });
  const [showSuccess, setshowSuccess] = useState({ success: false, message: "", onClose: () => {} });
  

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleDelete = async () => {
    // console.log("Deleting with password:", password); // Debugging

    try {
      const response = await delete_user(password, current_user);
      setShow(false); // ✅ Correctly close the modal

      if (response.success) {
        setshowSuccess({
          success: true,
          message: response.message || "User deleted successfully!",
          onClose: () => {
            setshowSuccess({ success: false, message: "", onClose: () => {} });
            sessionStorage.clear();
            navigate("/");
          },
        });
      } else {
        setshowInvalid({
          success: true,
          message: response.message +" ,So you will get logOut and rety " || "Failed to delete user!",
          onClose: () => {
            setshowInvalid({ success: false, message: "", onClose: () => {} });;
            sessionStorage.clear();
            navigate("/");
          },
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setshowInvalid({
        success: true,
        message: "An unexpected error occurred. Please try again.",
        onClose: () => {
          setshowInvalid({ success: false, message: "", onClose: () => {} });
        },
      });
    }
  };

  return (
    <>
      {showSuccess.success && (
        <div className="fixed inset-0 z-50">
          <SuccessfullyDone message={showSuccess.message} onClose={showSuccess.onClose} />
        </div>
      )}
      {showInvalid.success && (
        <div className="fixed inset-0 z-50">
          <InvalidDialogue message={showInvalid.message} onClose={showInvalid.onClose} />
        </div>
      )}

      {show&&<div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl shadow-2xl text-center w-full max-w-md mx-4 transform transition-all scale-in-center">
          <div className="relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
                <Lock className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>
            </div>

            <div className="px-6 pt-16 pb-6">
              <h2 className="text-2xl font-bold text-slate-800 mt-4">Delete Account</h2>
              <p className="text-slate-600 mt-2">To confirm your account deletion, please enter your current password.</p>
              <div className="mt-4">
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className="w-full px-6 py-3 text-slate-800 font-medium rounded-xl border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 mt-2"
                />
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-4">
              <button
                onClick={handleDelete}
                className="flex-1 px-6 py-3 text-white font-medium rounded-xl
                  bg-gradient-to-r from-red-600 via-red-700 to-red-800
                  hover:from-red-700 hover:via-red-800 hover:to-red-900
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                  transform transition-all duration-200 hover:scale-[1.02]
                  shadow-lg shadow-red-600/20"
              >
                Delete Account
              </button>
              <button
                onClick={onCancel}
                className="flex-1 px-6 py-3 text-slate-700 font-medium rounded-xl
                  bg-slate-100 hover:bg-slate-200
                  focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
                  transform transition-all duration-200 hover:scale-[1.02]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}

export default EnterPassword;
