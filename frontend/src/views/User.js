import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { useParams } from 'react-router-dom';
import UserAside from '../components/page_specific/User_aside';
import UserField from '../components/page_specific/User_table_field';
import { UserCircle, Settings, ShieldCheck, Users } from "lucide-react";

export default function User() {
  const [add_new_user, set_add] = useState(false);
  const [change_uId_password, set_change_uId_password] = useState(false);
  const [change_uId, set_change_uId] = useState(false);

  const user_name = sessionStorage.getItem('user_name');

  console.log("this is x -> ");
  console.log("this is user name -> " + user_name);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar - Fixed at top */}
      <Navbar />

      

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
                        />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
