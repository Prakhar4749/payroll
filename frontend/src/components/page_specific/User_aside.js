import React from "react";
import { useNavigate } from "react-router-dom";
import { delete_user } from '../../controller/user.controlle';
// import { InvalidDialogue } from "../common/InvalidDialogue";
// import { SuccessfullyDone } from "../common/SuccessfullyDone";
// import { ConfirmDialogue } from "../common/ConfirmDialogue";
import { UserCog, UserPlus, LockKeyhole, LogOut, UserMinus } from "lucide-react";

const UserActions = ({ set_add, set_change_uId, set_change_uId_password, current_user_name, set_add_u, set_change_password,set_change_user_name ,setShowConfirm,setshowInvalid,setshowSuccess}) => {
    
    const navigate = useNavigate();

    const handleUpdateUsername = () => {
        set_change_uId_password(false);
        set_add(false);
        set_change_uId(true);
        set_add_u({
          user_name: "",
          user_password: "",
          confirm_password: "",
        });
        set_change_password({
          user_name: current_user_name,
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
    };

    const handleChangePassword = () => {
        set_change_uId_password(true);
        set_add(false);
        set_change_uId(false);
        set_change_user_name({
          current_user_name: current_user_name,
          new_user_name: "",
          user_password: "",
        });
        set_add_u({
          user_name: "",
          user_password: "",
          confirm_password: "",
        });
    };

    const handleAddNewUser = () => {
        set_change_uId_password(false);
        set_add(true);
        set_change_uId(false);
        set_change_user_name({
          current_user_name: current_user_name,
          new_user_name: "",
          user_password: "",
        });
        set_change_password({
          user_name: current_user_name,
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
    };

    const handleDeleteUser = async () => {
        setShowConfirm({
            message: `Are you sure you want to delete your account, ${current_user_name}?`,
            success: true,
            onConfirm: async () => {
                await delete_user(current_user_name);
                sessionStorage.clear();
                navigate('/');
            }
        });
    };

    const handleLogout = () => {
        setShowConfirm({
            message: `Are you sure you want to log out, ${current_user_name}?`,
            success: true,
            onConfirm: async () => {
                sessionStorage.clear();
                navigate('/');
            }
        });
    };

    return (

        <>
        
        
        <aside className="w-full max-w-md mx-auto shadow-2xl rounded-2xl overflow-hidden p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">


        {/* Profile Management Section */}
        <div className="space-y-3 sm:space-y-4 mb-2">
          <button
            onClick={handleUpdateUsername}
            className="w-full px-4 py-4 font-medium rounded-xl
                transition-all duration-200 flex items-center justify-center gap-2 text-sm
               bg-sky-600 text-white hover:bg-sky-700 \
         focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 \
         transform hover:scale-[1.02] shadow-lg shadow-sky-600/20"
          >
            <UserCog className="w-4 h-4 sm:w-5 sm:h-5" /> Update Username
          </button>
  
          <button
            onClick={handleChangePassword}
            className="w-full px-4 py-4 font-medium rounded-xl
                transition-all duration-200 flex items-center justify-center gap-2 text-sm
                bg-violet-600 text-white hover:bg-violet-700
                focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
                transform hover:scale-[1.02] shadow-lg shadow-violet-600/20"
            
          >
            <LockKeyhole className="w-4 h-4 sm:w-5 sm:h-5" /> Change Password
          </button>
        </div>
  
        {/* User Management Section */}
        <div className="space-y-3 sm:space-y-4 mb-2">
          <button
            onClick={handleAddNewUser}
            className="w-full px-4 py-4 font-medium rounded-xl
                transition-all duration-200 flex items-center justify-center gap-2 text-sm
                bg-emerald-600 text-white hover:bg-emerald-700
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                transform hover:scale-[1.02] shadow-lg shadow-emerald-600/20"
          >
            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" /> Add New User
          </button>
        </div>
  
        {/* Danger Zone Section */}
        <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-neutral-200/10 space-y-3 sm:space-y-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-4 font-medium rounded-xl
                transition-all duration-200 flex items-center justify-center gap-2 text-sm
                bg-amber-600 text-white hover:bg-amber-700
                focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
                transform hover:scale-[1.02] shadow-lg shadow-amber-600/20"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" /> Logout
          </button>
  
          <button
            onClick={handleDeleteUser}
            className="w-full px-4 py-4 font-medium rounded-xl
                transition-all duration-200 flex items-center justify-center gap-2 text-sm
                bg-red-600 text-white hover:bg-red-700
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                transform hover:scale-[1.02] shadow-lg shadow-red-600/20"
          >
            <UserMinus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" /> Delete Your Account
          </button>
        </div>
      </aside>
      </>
    );
};

export default UserActions;
