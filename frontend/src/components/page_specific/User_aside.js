import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { delete_user } from '../../controller/user.controlle';
import { ConfirmDialogue } from "../common/ConfirmDialogue";
import { UserCog, UserPlus, LockKeyhole, LogOut, UserMinus } from "lucide-react";

const UserActions = ({ set_add, set_change_uId, set_change_uId_password, current_user_name }) => {
    const [showConfirm, setShowConfirm] = useState({ success: false, message: "", onConfirm: () => {} });
    const navigate = useNavigate();

    const handleUpdateUsername = () => {
        set_change_uId_password(false);
        set_add(false);
        set_change_uId(true);
    };

    const handleChangePassword = () => {
        set_change_uId_password(true);
        set_add(false);
        set_change_uId(false);
    };

    const handleAddNewUser = () => {
        set_change_uId_password(false);
        set_add(true);
        set_change_uId(false);
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
        <aside className="w-full bg-white shadow-lg rounded-lg overflow-hidden p-6 flex flex-col gap-4">
            {showConfirm.success && (
                <div className="fixed inset-0 z-50">
                    <ConfirmDialogue
                        message={showConfirm.message}
                        onConfirm={() => {
                            showConfirm.onConfirm();
                            setShowConfirm({ success: false, message: "", onConfirm: () => {} });
                        }}
                        onCancel={() => setShowConfirm({ message: "", success: false, onConfirm: null })}
                    />
                </div>
            )}

            {/* Buttons */}
            <button
                onClick={handleUpdateUsername}
                className="w-full px-6 py-3 text-white font-medium rounded-xl bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.05] shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3 text-base"
            >
                <UserCog className="w-5 h-5" /> Update Username
            </button>

            <button
                onClick={handleChangePassword}
                className="w-full px-6 py-3 text-white font-medium rounded-xl bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.05] shadow-lg shadow-green-600/30 flex items-center justify-center gap-3 text-base"
            >
                <LockKeyhole className="w-5 h-5" /> Change Password
            </button>

            <button
                onClick={handleAddNewUser}
                className="w-full px-6 py-3 text-white font-medium rounded-xl bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.05] shadow-lg shadow-yellow-600/30 flex items-center justify-center gap-3 text-base"
            >
                <UserPlus className="w-5 h-5" /> Add New User
            </button>

            <button
                onClick={handleLogout}
                className="w-full px-6 py-3 text-white font-medium rounded-xl bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.05] shadow-lg shadow-red-600/30 flex items-center justify-center gap-3 text-base"
            >
                <LogOut className="w-5 h-5" /> Logout
            </button>

            <button
                onClick={handleDeleteUser}
                className="w-full px-6 py-3 text-white font-medium rounded-xl bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.05] shadow-lg shadow-red-700/30 flex items-center justify-center gap-3 text-base"
            >
                <UserMinus className="w-5 h-5" /> Delete Your Account
            </button>
        </aside>
    );
};

export default UserActions;
