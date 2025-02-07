import React, { useState } from "react";
import { User,Shield,Bell,Settings,UserCog,LockKeyhole,UserPlus,Eraser,Save } from "lucide-react";
import {
  fadd_new_user,
  update_password,
  update_userName,
} from "../../controller/user.controlle";




export default ({setshowloading, add_new_user, change_uId, change_uId_password, current_user_name, set_add, set_change_uId, set_change_uId_password, for_add_u, set_add_u, for_change_password, set_change_password, for_change_user_name,set_change_user_name,setShowConfirm,setshowInvalid,setshowSuccess, }) => {



  

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
      setshowInvalid({ message: "Passwords do not match!", success: true, onClose: () => { setshowInvalid({ success: false, message: "", onClose: () => { } }) } });
      return;
    }
    setShowConfirm({
      message: "are you really want add new user", success: true, onConfirm: async () => {
        try {
    setshowloading(true)

          const result = await fadd_new_user(for_add_u.user_name, for_add_u.user_password);
    setshowloading(false)



          setshowSuccess({
            message: result.message, success: result.success, onClose: () => {
              setshowSuccess({ success: false, message: "", onClose: () => { } });
              set_change_uId_password(false)
              set_add(false)
              set_change_uId(false)

            }
          });

          setshowInvalid({ message: result.message || "Something went wrong", success: !result.success, onClose: () => { setshowInvalid({ success: false, message: "", onClose: () => { } }) } });



        } catch (error) {
          console.error("Error adding user:", error);
          setshowInvalid({ message: "An error occurred while adding the user", success: true });
        }

      }
    })
  };

  const update_password_submit = async (e) => {
    e.preventDefault();

    if (for_change_password.new_password !== for_change_password.confirm_password) {
      setshowInvalid({
        message: "Passwords do not match!",
        success: true,
        onClose: () => setshowInvalid({ success: false, message: "", onClose: () => { } })
      });
      return;
    }

    // console.log("Updating password:", for_change_password);

    setShowConfirm({
      message: "are you really want to update user password", success: true, onConfirm: async () => {

        try {
    setshowloading(true)

          const result = await update_password(
            for_change_password.user_name,
            for_change_password.current_password,
            for_change_password.new_password
          );
          setshowloading(false)

          if (result && result.success) {
            setshowSuccess({
              message: result?.message || "Password updated successfully!",
              success: true,
              onClose: () => {
                setshowSuccess({ success: false, message: "", onClose: () => { } })
                set_change_uId_password(false)
                set_add(false)
                set_change_uId(false)
              }
            });
          } else {
            setshowInvalid({
              message: result?.message || "your current password is wrong ",
              success: true,
              onClose: () => setshowInvalid({ success: false, message: "", onClose: () => { } })
            });
          }
        } catch (error) {
          console.error("Error updating password:", error);

          setshowInvalid({
            message: error?.response?.data?.message || "An error occurred while updating the password",
            success: true,
            onClose: () => setshowInvalid({ success: false, message: "", onClose: () => { } })
          });
        }

      }
    })


  };


  const update_username_submit = async (e) => {
    e.preventDefault();

    if (!for_change_user_name.new_user_name) {
      setshowInvalid({
        message: "New username is required!",
        success: true,
        onClose: () => setshowInvalid({ success: false, message: "", onClose: () => { } })
      });
      return;
    }

    // console.log("Updating username:", for_change_user_name);

    setShowConfirm({
      message: "are you really want to update UserName", success: true, onConfirm: async () => {

        try {
    setshowloading(true)

          const result = await update_userName(
            for_change_user_name.current_user_name,
            for_change_user_name.new_user_name,
            for_change_user_name.user_password
          );
    setshowloading(false)


          if (result?.success) {
            setshowSuccess({
              message: result.message || "Username updated successfully!",
              success: true,
              onClose: () => setshowSuccess({ success: false, message: "", onClose: () => { } })
            });
            sessionStorage.setItem("user_name", result.for_change_user_name.new_user_name);
          } else {
            setshowInvalid({
              message: result?.message || "Something went wrong",
              success: true,
              onClose: () => setshowInvalid({ success: false, message: "", onClose: () => { } })
            });
          }
        } catch (error) {
          console.error("Error updating username:", error);

          setshowInvalid({
            message: error?.response?.data?.message || "An error occurred while updating the username",
            success: true,
            onClose: () => {
              setshowInvalid({ success: false, message: "", onClose: () => { } })

              set_change_uId_password(false)
              set_add(false)
              set_change_uId(false)

            }
          });
        }

      }
    })


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
    <div className="">
      

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          {!add_new_user && !change_uId && !change_uId_password && (
            <section className="space-y-6">
              {/* Hero Section */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-6 py-8 sm:px-8">
                  <div className="flex items-center justify-center">
                    <div className="bg-white/10 p-3 rounded-full">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h1 className="mt-4 text-center text-2xl sm:text-3xl font-bold text-white">
                    Welcome back, {current_user_name}!
                  </h1>
                  <p className="mt-2 text-center text-blue-100">
                    Manage your account settings and preferences
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="px-6 py-8 sm:px-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-500/10 p-3 rounded-lg">
                        <Shield className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-900">Profile Security</h3>
                        <p className="mt-1 text-sm text-blue-700">Your account is protected</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-violet-50 to-violet-100 p-6 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="bg-violet-500/10 p-3 rounded-lg">
                        <Settings className="w-6 h-6 text-violet-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-violet-900">Preferences</h3>
                        <p className="mt-1 text-sm text-violet-700">Settings up to date</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-500/10 p-3 rounded-lg">
                        <Bell className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-emerald-900">Notifications</h3>
                        <p className="mt-1 text-sm text-emerald-700">All systems operational</p>
                      </div>
                    </div>
                  </div>

                  
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <button
                onClick={() => { set_change_uId_password(false);
                  set_add(false);
                  set_change_uId(true);}}
                  
                  className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500/10 p-3 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                      <UserCog className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">Update Username</h3>
                      <p className="text-sm text-gray-600">Change your display name</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {set_change_uId_password(true);
                    set_add(false);
                    set_change_uId(false);}}
                  className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-violet-500/10 p-3 rounded-lg group-hover:bg-violet-500/20 transition-colors">
                      <LockKeyhole className="w-6 h-6 text-violet-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">Change Password</h3>
                      <p className="text-sm text-gray-600">Update your security</p>
                    </div>
                  </div>
                </button>

                <button
                 onClick={() => {set_change_uId_password(false);
                  set_add(true);
                  set_change_uId(false);}}
                  className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-500/10 p-3 rounded-lg group-hover:bg-emerald-500/20 transition-colors" >
                      <UserPlus  className="w-6 h-6 text-emerald-600"  />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">Add New User</h3>
                      <p className="text-sm text-gray-600">Create new account</p>
                    </div>
                  </div>
                </button>
              </div>
            </section>
          )}

          {/* Add New User Form */}
          {add_new_user && (
            <form onSubmit={add_submit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 px-6 py-8">
              
                <div className="flex justify-center">
                  <div className="bg-white/10 p-3 rounded-full">
                    <UserPlus className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-center text-white">Add New User</h2>
                <p className="mt-2 text-center text-violet-100">Create a new user account</p>
              </div>

              <div className="px-6 py-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      name="user_name"
                      value={for_add_u.user_name}
                      onChange={(e) => handleChange(e, set_add_u)}
                      required
                      className="mt-1 block w-full focus:outline-none px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword.user_password ? "text" : "password"}
                        name="user_password"
                        value={for_add_u.user_password}
                        onChange={(e) => handleChange(e, set_add_u)}
                        required
                         className="mt-1 block w-full focus:outline-none px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("user_password")}
                         className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-emerald-600 hover:text-emerald-700"
                      >
                        {showPassword.user_password ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showPassword.confirm_password ? "text" : "password"}
                        name="confirm_password"
                        value={for_add_u.confirm_password}
                        onChange={(e) => handleChange(e, set_add_u)}
                        required
                        className=" focus:outline-none mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("confirm_password")}
                       className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-emerald-600 hover:text-emerald-700"
                      >
                        {showPassword.confirm_password ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      clearForm(set_add_u, {
                        user_name: "",
                        user_password: "",
                        confirm_password: "",
                      });
                      set_add(false);
                    }}
                    
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eraser className="w-5 h-5" /> Cancel
                  </button>
                  <button
                    type="submit"
                     className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 focus:ring-2 focus:ring-emerald-500 transition-colors flex items-center justify-center gap-2"
                    
                  >
                    <Save className="w-5 h-5" /> Create User
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Change Username Form */}
          {change_uId && (
            <form onSubmit={update_username_submit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-sky-500  to-sky-600 px-6 py-8">
                <div className="flex justify-center">
                  <div className="bg-white/10 p-3 rounded-full">
                    <UserCog className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-center text-white">Change Username</h2>
                <p className="mt-2 text-center text-blue-100">Update your display name</p>
              </div>

              <div className="px-6 py-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Username</label>
                    <input
                      type="text"
                      name="current_user_name"
                      value={for_change_user_name.current_user_name}
                      onChange={(e) => handleChange(e, set_change_user_name)}
                      required
                      disabled
                      className="mt-1 block w-full focus:outline-none px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
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
                      className="mt-1 block w-full focus:outline-none px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <div className="relative">
                    <input
                      type={showPassword.user_password ? "text" : "password"}
                      name="user_password"
                      value={for_change_user_name.user_password}
                      onChange={(e) => handleChange(e, set_change_user_name)}
                      required
                      className="mt-1 block w-full focus:outline-none px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <button
                        type="button"
                        onClick={() => togglePasswordVisibility("user_password")}
                         className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-emerald-600 hover:text-emerald-700"
                      >
                        {showPassword.user_password ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      clearForm(set_change_user_name, { current_user_name: current_user_name, new_user_name: "", user_password: "" });
                      set_change_uId(false);
                    }}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eraser className="w-5 h-5" /> Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-sky-600 text-white hover:bg-sky-700 \
         focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 \
         transform hover:scale-[1.02] shadow-lg shadow-sky-600/20 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" /> Update Username
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Change Password Form */}
          {change_uId_password && (
            <form onSubmit={update_password_submit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700 px-6 py-8">
                <div className="flex justify-center">
                  <div className="bg-white/10 p-3 rounded-full">
                    <LockKeyhole className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-center text-white">Change Password</h2>
                <p className="mt-2 text-center text-emerald-100">Update your account security</p>
              </div>

              <div className="px-6 py-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      name="user_name"
                      value={for_change_password.user_name}
                      onChange={(e) => handleChange(e, set_change_password)}
                      required
                      disabled
                      className="mt-1 block w-full focus:outline-none px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword.current_password ? "text" : "password"}
                        name="current_password"
                        value={for_change_password.current_password}
                        onChange={(e) => handleChange(e, set_change_password)}
                        required
                        className=" focus:outline-none mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("current_password")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-violet-600 hover:text-violet-700"
                       
                      >
                        {showPassword.current_password ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword.new_password ? "text" : "password"}
                        name="new_password"
                        value={for_change_password.new_password}
                        onChange={(e) => handleChange(e, set_change_password)}
                        required
                         className="mt-1 block w-full focus:outline-none px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                        
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("new_password")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-violet-600 hover:text-violet-700"
                        
                      >
                        {showPassword.new_password ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword.confirm_password ? "text" : "password"}
                        name="confirm_password"
                        value={for_change_password.confirm_password}
                        onChange={(e) => handleChange(e, set_change_password)}
                        required
                        className=" focus:outline-none mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("confirm_password")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-violet-600 hover:text-violet-700"
                      >
                        {showPassword.confirm_password ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      clearForm(set_change_password, { user_name: current_user_name, current_password: "", new_password: "", confirm_password: "" });
                      set_change_uId_password(false);
                    }}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eraser className="w-5 h-5" /> Cancel
                  </button>
                  <button
                    type="submit"
                   className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-lg hover:from-violet-600 hover:to-violet-700 focus:ring-2 focus:ring-violet-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" /> Update Password
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

};
