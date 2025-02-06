import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';

import UserAside from '../components/page_specific/User_aside';
import UserField from '../components/page_specific/User_table_field';
// import { UserCircle, Settings, ShieldCheck, Users } from "lucide-react";
import { SuccessfullyDone } from "../components/common/SuccessfullyDone";
import { InvalidDialogue } from "../components/common/InvalidDialogue";
import { ConfirmDialogue } from "../components/common/ConfirmDialogue";

export default function User() {
  const [add_new_user, set_add] = useState(false);
  const [change_uId_password, set_change_uId_password] = useState(false);
  const [change_uId, set_change_uId] = useState(false);

  

  const user_name = sessionStorage.getItem('user_name');

  const [showConfirm, setShowConfirm] = useState({ success: false, message: "", onConfirm: () => { } });
  const [showInvalid, setshowInvalid] = useState({ success: false, message: "", onClose: () => { } });
  const [showSuccess, setshowSuccess] = useState({ success: false, message: "", onClose: () => { } });

  const [for_add_u, set_add_u] = useState({
    user_name: "",
    user_password: "",
    confirm_password: "",
  });

  const [for_change_password, set_change_password] = useState({
    user_name: user_name,
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [for_change_user_name, set_change_user_name] = useState({
    current_user_name: user_name,
    new_user_name: "",
    user_password: "",
  });

  // console.log("this is x -> ");
  // console.log("this is user name -> " + user_name);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar - Fixed at top */}
      <Navbar />

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



      {/* Main content - Pushed below navbar */}
      <div className="flex-1 pt-16"> {/* Add padding-top equal to navbar height */}
        <div className="flex flex-col lg:flex-row h-full">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 bg-white shadow-lg lg:min-h-[calc(100vh-4rem)]">
            <div className="sticky top-16 overflow-auto max-h-[calc(100vh-4rem)]">
              <UserAside
                set_add={set_add}
                set_change_uId={set_change_uId}
                set_change_uId_password={set_change_uId_password}
                current_user_name={user_name}
                set_add_u={set_add_u}
                set_change_password={set_change_password}
                set_change_user_name={set_change_user_name}
                setShowConfirm={setShowConfirm}
                setshowInvalid={setshowInvalid}
                setshowSuccess={setshowSuccess}
              />
            </div>
          </div>

          {/* Main Content */}
          <main className="w-full lg:w-3/4 p-6 bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <UserField
                add_new_user={add_new_user}
                change_uId={change_uId}
                change_uId_password={change_uId_password}
                current_user_name={user_name}
                set_add={set_add}
                set_change_uId={set_change_uId}
                set_change_uId_password={set_change_uId_password}
                for_add_u={for_add_u}
                for_change_password={for_change_password}
                for_change_user_name={for_change_user_name}
                set_add_u={set_add_u}
                set_change_password={set_change_password}
                set_change_user_name={set_change_user_name}
                setShowConfirm={setShowConfirm}
                setshowInvalid={setshowInvalid}
                setshowSuccess={setshowSuccess}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
