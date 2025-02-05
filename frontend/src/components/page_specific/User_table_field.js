import React, { useState } from "react";
import { Eraser, Save } from "lucide-react";
import {
  fadd_new_user,
  update_password,
  update_userName,
} from "../../controller/user.controlle";

import { SuccessfullyDone } from "../common/SuccessfullyDone";
import { InvalidDialogue } from "../common/InvalidDialogue";
import { ConfirmDialogue } from "../common/ConfirmDialogue";


export default ({ add_new_user, change_uId, change_uId_password ,current_user_name  ,set_add, set_change_uId, set_change_uId_password }) => {

      const [showConfirm, setShowConfirm] = useState({ success: false, message: "", onConfirm: () => { }});
      const [showInvalid, setshowInvalid] = useState({ success: false, message: "", onClose: () => { } });
      const [showSuccess, setshowSuccess] = useState({ success: false, message: "", onClose: () => { } });

  const [for_add_u, set_add_u] = useState({
    user_name: "",
    user_password: "",
    confirm_password: "",
  });

  const [for_change_password, set_change_password] = useState({
    user_name: current_user_name,
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [for_change_user_name, set_change_user_name] = useState({
    current_user_name: current_user_name,
    new_user_name: "",
    user_password: "",
  });

  const [showPassword, setShowPassword] = useState({
    user_password: false,
    confirm_password: false,
    current_password: false,
    new_password: false,
  });

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const add_submit = (e) => {
    e.preventDefault();
    if (for_add_u.user_password !== for_add_u.confirm_password) {
      console.log("Passwords do not match!")
        setshowInvalid({ message: "Passwords do not match!", success: true, onClose: ()=>{ setshowInvalid({ success: false, message: "", onClose: () => { } })}  });
        return;
    }
    setShowConfirm({message: "are you really want add new user", success: true, onConfirm: async ()=>{
      try {
        const result = await fadd_new_user(for_add_u.user_name, for_add_u.user_password);

        
            setshowSuccess({ message: result.message, success: result.success, onClose: ()=>{ setshowSuccess({ success: false, message: "", onClose: () => { } });
            set_change_uId_password(false)
            set_add(false)
            set_change_uId(false)
        
        } });
       
            setshowInvalid({ message: result.message || "Something went wrong", success: !result.success, onClose: ()=>{ setshowInvalid({ success: false, message: "", onClose: () => { } })}  });

            
       
    } catch (error) {
        console.error("Error adding user:", error);
        setshowInvalid({ message: "An error occurred while adding the user", success: true });
    }

    }})
};

const update_password_submit = async (e) => {
    e.preventDefault();
    
    if (for_change_password.new_password !== for_change_password.confirm_password) {
        setshowInvalid({ 
            message: "Passwords do not match!", 
            success: true, 
            onClose: () => setshowInvalid({ success: false, message: "", onClose: () => {} }) 
        });
        return;
    }

    console.log("Updating password:", for_change_password);

    setShowConfirm({message: "are you really want to update user password", success: true, onConfirm: async ()=>{

        try {
            const result = await update_password(
                for_change_password.user_name, 
                for_change_password.current_password, 
                for_change_password.new_password
            );
    
            if (result && result.success) {
                setshowSuccess({ 
                    message: result?.message || "Password updated successfully!", 
                    success: true, 
                    onClose: () => {setshowSuccess({ success: false, message: "", onClose: () => {} }) 
                    set_change_uId_password(false)
                    set_add(false)
                    set_change_uId(false)
                }
                });
            } else {
                setshowInvalid({ 
                    message: result?.message || "your current password is wrong ", 
                    success: true, 
                    onClose: () => setshowInvalid({ success: false, message: "", onClose: () => {} }) 
                });
            }
        } catch (error) {
            console.error("Error updating password:", error);
    
            setshowInvalid({ 
                message: error?.response?.data?.message || "An error occurred while updating the password", 
                success: true, 
                onClose: () => setshowInvalid({ success: false, message: "", onClose: () => {} }) 
            });
        }

    }})

    
};


const update_username_submit = async (e) => {
    e.preventDefault();

    if (!for_change_user_name.new_user_name) {
        setshowInvalid({ 
            message: "New username is required!", 
            success: true, 
            onClose: () => setshowInvalid({ success: false, message: "", onClose: () => {} }) 
        });
        return;
    }

    console.log("Updating username:", for_change_user_name);

    setShowConfirm({message: "are you really want to update UserName", success: true, onConfirm: async ()=>{

        try {
            const result = await update_userName(
                for_change_user_name.current_user_name, 
                for_change_user_name.new_user_name, 
                for_change_user_name.user_password
            );
    
            if (result?.success) {
                setshowSuccess({ 
                    message: result.message || "Username updated successfully!", 
                    success: true, 
                    onClose: () => setshowSuccess({ success: false, message: "", onClose: () => {} }) 
                });
                sessionStorage.setItem("user_name", result.for_change_user_name.new_user_name);
            } else {
                setshowInvalid({ 
                    message: result?.message || "Something went wrong", 
                    success: true, 
                    onClose: () => setshowInvalid({ success: false, message: "", onClose: () => {} }) 
                });
            }
        } catch (error) {
            console.error("Error updating username:", error);
    
            setshowInvalid({ 
                message: error?.response?.data?.message || "An error occurred while updating the username", 
                success: true, 
                onClose: () => {setshowInvalid({ success: false, message: "", onClose: () => {} }) 
            
                set_change_uId_password(false)
                set_add(false)
                set_change_uId(false)
            
            }
            });
        }

    }})

    
};

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const clearForm = (setState, initialState) => {
    setState(initialState);
    setShowPassword({
      user_password: false,
      confirm_password: false,
      current_password: false,
      new_password: false,
    });
  };



    // if(!add_new_user && !change_uId &&change_uId_password){
    //     set_add_u( { user_name: "", user_password: "", confirm_password: "" })
    //     set_change_user_name( { current_user_name: "", new_user_name: "", user_password: "" })
    //   }
    
    //   if(!change_uId && !change_uId_password && add_new_user){
    //     set_change_user_name( { current_user_name: "", new_user_name: "", user_password: "" })
    //     set_change_password( { user_name: "", current_password: "", new_password: "", confirm_password: "" })
    //   }
    
    //   if(!change_uId_password &&  !add_new_user && change_uId ){
    //     set_change_password( { user_name: "", current_password: "", new_password: "", confirm_password: "" })
    //     set_add_u( { user_name: "", user_password: "", confirm_password: "" })
    //   }




  



  

    return (
        <>
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
                onCancel={() => setShowConfirm({ message: "", success: false, onConfirm: null })}
              />
            </div>
          )}
      
          {add_new_user && (
            <form onSubmit={add_submit} className="max-w-lg mx-auto px-6 py-8 space-y-8 bg-white rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold text-center text-gray-700">Add New User</h2>
      
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="user_name"
                  value={for_add_u.user_name}
                  onChange={(e) => handleChange(e, set_add_u)}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
      
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type={showPassword.user_password ? "text" : "password"}
                  name="user_password"
                  value={for_add_u.user_password}
                  onChange={(e) => handleChange(e, set_add_u)}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("user_password")}
                  className="text-sm text-blue-500 mt-2"
                >
                  {showPassword.user_password ? "Hide" : "Show"} Password
                </button>
              </div>
      
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type={showPassword.confirm_password ? "text" : "password"}
                  name="confirm_password"
                  value={for_add_u.confirm_password}
                  onChange={(e) => handleChange(e, set_add_u)}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm_password")}
                  className="text-sm text-blue-500 mt-2"
                >
                  {showPassword.confirm_password ? "Hide" : "Show"} Password
                </button>
              </div>
      
              <div className="flex flex-col md:flex-row gap-4 mt-6 items-center justify-around">
                <button
                  type="button"
                  onClick={() => clearForm(set_add_u, { user_name: "", user_password: "", confirm_password: "" })}
                  className="w-full md:w-auto px-7 py-3 bg-gray-100 rounded-lg shadow-lg text-gray-600 flex items-center gap-3 hover:bg-gray-200 transition"
                >
                  <Eraser className="h-6 w-6" /> Clear
                </button>
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-white rounded-lg shadow-lg flex items-center gap-3 hover:bg-gradient-to-r hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600 transition"
                >
                  <Save className="h-6 w-6" /> Submit
                </button>
              </div>
            </form>
          )}
      
          {change_uId && (
            <form onSubmit={update_username_submit} className="max-w-lg mx-auto px-6 py-8 space-y-8 bg-white rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold text-center text-gray-700">Change Username</h2>
      
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Username</label>
                <input
                  type="text"
                  name="current_user_name"
                  value={for_change_user_name.current_user_name}
                  onChange={(e) => handleChange(e, set_change_user_name)}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  disabled
                />
              </div>
      
              <div>
                <label className="block text-sm font-medium text-gray-700">New Username</label>
                <input
                  type="text"
                  name="new_user_name"
                  value={for_change_user_name.new_user_name}
                  onChange={(e) => handleChange(e, set_change_user_name)}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
      
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  name="user_password"
                  value={for_change_user_name.user_password}
                  onChange={(e) => handleChange(e, set_change_user_name)}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
      
              <div className="flex flex-col md:flex-row gap-4 mt-6 items-center justify-around">
                <button
                  type="button"
                  onClick={() => clearForm(set_change_user_name, { current_user_name: current_user_name, new_user_name: "", user_password: "" })}
                  className="w-full md:w-auto px-7 py-3 bg-gray-100 rounded-lg shadow-lg text-gray-600 flex items-center gap-3 hover:bg-gray-200 transition"
                >
                  <Eraser className="h-6 w-6" /> Clear
                </button>
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-white rounded-lg shadow-lg flex items-center gap-3 hover:bg-gradient-to-r hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600 transition"
                >
                  <Save className="h-6 w-6" /> Submit
                </button>
              </div>
            </form>
          )}
      
          {change_uId_password && (
            <form onSubmit={update_password_submit} className="max-w-lg mx-auto px-6 py-8 space-y-8 bg-white rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold text-center text-gray-700">Change Password</h2>
      
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="user_name"
                  value={for_change_password.user_name}
                  onChange={(e) => handleChange(e, set_change_password)}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  disabled
                />
              </div>
      
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type={showPassword.current_password ? "text" : "password"}
                  name="current_password"
                  value={for_change_password.current_password}
                  onChange={(e) => handleChange(e, set_change_password)}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current_password")}
                  className="text-sm text-blue-500 mt-2"
                >
                  {showPassword.current_password ? "Hide" : "Show"} Password
                </button>
              </div>
      
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type={showPassword.new_password ? "text" : "password"}
                  name="new_password"
                  value={for_change_password.new_password}
                  onChange={(e) => handleChange(e, set_change_password)}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new_password")}
                  className="text-sm text-blue-500 mt-2"
                >
                  {showPassword.new_password ? "Hide" : "Show"} Password
                </button>
              </div>
      
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                  type={showPassword.confirm_password ? "text" : "password"}
                  name="confirm_password"
                  value={for_change_password.confirm_password}
                  onChange={(e) => handleChange(e, set_change_password)}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm_password")}
                  className="text-sm text-blue-500 mt-2"
                >
                  {showPassword.confirm_password ? "Hide" : "Show"} Password
                </button>
              </div>
      
              <div className="flex flex-col md:flex-row gap-4 mt-6 items-center justify-around">
                <button
                  type="button"
                  onClick={() => clearForm(set_change_password, { user_name: current_user_name , current_password: "", new_password: "", confirm_password: "" })}
                  className="w-full md:w-auto px-7 py-3 bg-gray-100 rounded-lg shadow-lg text-gray-600 flex items-center gap-3 hover:bg-gray-200 transition"
                >
                  <Eraser className="h-6 w-6" /> Clear
                </button>
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-white rounded-lg shadow-lg flex items-center gap-3 hover:bg-gradient-to-r hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600 transition"
                >
                  <Save className="h-6 w-6" /> Submit
                </button>
              </div>
            </form>
          )}
        </>
      );
      
};
