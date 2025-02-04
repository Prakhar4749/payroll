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


export default ({ add_new_user, change_uId, change_uId_password ,current_user_name }) => {

      const [showConfirm, setShowConfirm] = useState({ success: false, message: "", onConfirm: () => { } });
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

        
            setshowSuccess({ message: result.message, success: result.success, onClose: ()=>{ setshowSuccess({ success: false, message: "", onClose: () => { } })} });
       
            setshowInvalid({ message: result.message || "Something went wrong", success: !result.success, onClose: ()=>{ setshowInvalid({ success: false, message: "", onClose: () => { } })}  });
       
    } catch (error) {
        console.error("Error adding user:", error);
        setshowInvalid({ message: "An error occurred while adding the user", success: true });
    }

    }})
};

  const update_password_submit = async () => {
    if (for_change_password.new_password !== for_change_password.confirm_password) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Updating password:", for_change_password);
    await update_password(for_change_password.user_name, for_change_password.current_password, for_change_password.new_password);
  };

  const update_username_submit = async () => {
    if (!for_change_user_name.new_user_name) {
      alert("New username is required!");
      return;
    }
    console.log("Updating username:", for_change_user_name);
    await update_userName(for_change_user_name.current_user_name, for_change_user_name.new_user_name, for_change_user_name.user_password);
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
                              onConfirm={()=>{showConfirm.onConfirm();
                                  setShowConfirm({ success: false, message: "", onConfirm: () => { } })
                              }}
                              onCancel={() => setShowConfirm({ message: "", success: false, onConfirm: null }
                              )} // Close without confirming
                          />
                      </div>
                  )}






      {add_new_user && (
        <form onSubmit={add_submit} className="px-6 py-8 space-y-8">
          <h2 className="text-xl font-semibold">Add New User</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="user_name"
              value={for_add_u.user_name}
              onChange={(e) => handleChange(e, set_add_u)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
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
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
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
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm_password")}
              className="text-sm text-blue-500 mt-2"
            >
              {showPassword.confirm_password ? "Hide" : "Show"} Password
            </button>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => clearForm(set_add_u, { user_name: "", user_password: "", confirm_password: "" })}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              <Eraser className="h-5 w-5" /> Clear
            </button>
            <button type="submit" className="px-8 py-3 bg-blue-500 text-white rounded-lg">
              <Save className="h-6 w-6" /> Submit
            </button>
          </div>
        </form>
      )}

      {change_uId && (
        <form onSubmit={update_username_submit} className="px-6 py-8 space-y-8">
          <h2 className="text-xl font-semibold">Change Username</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Username</label>
            <input
              type="text"
              name="current_user_name"
              value={for_change_user_name.current_user_name}
              onChange={(e) => handleChange(e, set_change_user_name)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
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
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="user_password"
              value={for_change_user_name.user_password}
              onChange={(e) => handleChange(e, set_change_user_name)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => clearForm(set_change_user_name, { current_user_name: "", new_user_name: "", user_password: "" })}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              <Eraser className="h-5 w-5" /> Clear
            </button>
            <button type="submit" className="px-8 py-3 bg-blue-500 text-white rounded-lg">
              <Save className="h-6 w-6" /> Submit
            </button>
          </div>
        </form>
      )}

      {change_uId_password && (
        <form onSubmit={update_password_submit} className="px-6 py-8 space-y-8">
          <h2 className="text-xl font-semibold">Change Password</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="user_name"
              value={for_change_password.user_name}
              onChange={(e) => handleChange(e, set_change_password)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
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
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
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
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
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
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm_password")}
              className="text-sm text-blue-500 mt-2"
            >
              {showPassword.confirm_password ? "Hide" : "Show"} Password
            </button>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => clearForm(set_change_password, { user_name: "", current_password: "", new_password: "", confirm_password: "" })}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              <Eraser className="h-5 w-5" /> Clear
            </button>
            <button type="submit" className="px-8 py-3 bg-blue-500 text-white rounded-lg">
              <Save className="h-6 w-6" /> Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
};
