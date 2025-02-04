import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";


const UserActions = ({ set_add, set_change_uId, set_change_uId_password }) => {

    const navigate =useNavigate()
  // Placeholder event handlers
  const handleUpdateUsername = () => {
    set_change_uId_password(false)
    set_add(false)
    set_change_uId(true)
    console.log("Update Username clicked");
  };

  const handleChangePassword = () => {
    set_change_uId_password(true)
    set_add(false)
    set_change_uId(false)
    console.log("Change Password clicked");
  };

  const handleAddNewUser = () => {
    set_change_uId_password(false)
    set_add(true)
    set_change_uId(false)
    console.log("Add New User clicked");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Logic for logging out, like clearing session or local storage, etc.
    sessionStorage.clear(); // Example: clear session storage

    navigate('/')
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <button onClick={handleUpdateUsername} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Update Username
        </button>
        <button onClick={handleChangePassword} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Change Password
        </button>
        <button  onClick={handleAddNewUser} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
          Add New User
        </button>
        <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </>
  );
};

export default UserActions;
