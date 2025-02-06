import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff , Building2} from 'lucide-react';
import { loginUser } from '../controller/authController';
import {ConfirmDialogue} from "../components/common/ConfirmDialogue";
import {InvalidDialogue} from "../components/common/InvalidDialogue";
import { SuccessfullyDone } from "../components/common/SuccessfullyDone";

export default function Login() {
  const [user_name, setUserName] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [showConfirm, setShowConfirm] = useState({success: false, message: "", onConfirm: ()=>{}});
  const [showInvalid, setShowInvalid] = useState({success: false, message: "", onClose: ()=>{}});
  const [showSuccess, setShowSuccess] = useState({success: false, message: "", onClose: ()=>{ }});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user_name,",", user_password)
    const response = await loginUser(user_name, user_password);
    // console.log(response)

    if (response.success) {
    //   setShowSuccess({success: true, message: response.message, onClose: ()=>{
    //     setShowSuccess( {success: false, message:"", onClose: ()=>{} }); // Close dialog smoothly
    //     navigate('/payslip');
    //   }})
    //   setTimeout(() => {
    //   setShowSuccess( {success: false, message:"", onClose:()=>{} });
    //   navigate('/payslip'); // Redirect after closing
    // }, 1000);
    sessionStorage.setItem('user_name', user_name );
    navigate('/payslip');
    
    } else {
      setShowInvalid({success: true, message: response.message, onClose: ()=>{
            setShowInvalid( {success: false, message:"", onClose: ()=>{} }); 
          }})
      
    }
  };

  useEffect(() => {
    // Redirect if already logged in
    let login = sessionStorage.getItem('login');
    if (login) {
      navigate('/payslip');

    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl flex flex-col lg:flex-row overflow-hidden bg-white rounded-[2rem] shadow-xl">

      {showSuccess.success && (
                <div className="fixed inset-0 z-50">
                  <SuccessfullyDone
                    message={showSuccess.message}
                    onClose={showSuccess.onClose}
                  />
                </div>
              )}
              {showInvalid.success && (
                <div className="fixed inset-0 z-50">
                  <InvalidDialogue
                    message={showInvalid.message}
                    onClose={showInvalid.onClose}
                  />
                </div>
              )}
              {showConfirm.success && (
                <div className="fixed inset-0 z-50">
                  <ConfirmDialogue
                    message={showConfirm.message}
                    onConfirm={() => {
                      showConfirm.onConfirm(); // Call the confirm callback
                      setShowConfirm({ message: "", success: false, onConfirm: null }); // Close the dialog
                    }}
                    onCancel={() => setShowConfirm({ message: "", success: false, onConfirm: null }
                    )} // Close without confirming
                  />
                </div>
              )}


      {/* Left Side - Branding */}
      <div className="lg:w-5/12 p-8 lg:p-12 bg-gradient-to-b from-emerald-50 to-white flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-md p-4 mx-auto mb-6 transform hover:rotate-12 transition-all duration-300">
            <Building2 className="w-full h-full text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">College Payslip</h1>
          <p className="text-slate-600 max-w-sm">
            Access and manage your payslips securely through our digital portal
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-7/12 p-8 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              Welcome Back
            </h2>
            <p className="mt-2 text-slate-600">
              Please sign in to continue
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-rose-50 border border-rose-100 p-4 rounded-xl">
              <p className="text-sm text-rose-600">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="user">
                  Username
                </label>
                <input
                  type="text"
                  id="user"
                  value={user_name}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="block w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400
                  focus:outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 transition-all duration-200
                  hover:border-emerald-200"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={user_password}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                    className="block w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400
                    focus:outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 transition-all duration-200
                    hover:border-emerald-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none
                    transition-colors duration-200 p-1"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-5 py-3.5 text-white font-medium text-sm
              bg-emerald-500 hover:bg-emerald-600
              rounded-xl
              focus:outline-none focus:ring-4 focus:ring-emerald-100
              transform transition-all duration-200 hover:scale-[1.02]
              shadow-sm"
            >
              Sign In
            </button>

            {/* Help Link */}
            <div className="text-center">
              <p className="text-sm text-slate-600">
                Need help? <button type="button" className="text-emerald-500 hover:text-emerald-600 font-medium">Contact administrator</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}