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
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      
      {/* Main container */}
      <div className="container mx-auto px-4 py-6 ">
        

        {/* Flexbox layout for sidebar and main content */}
        <div className="flex flex-col lg:flex-row gap-6 mt-4">

          {/* Sidebar - UserAside component */}
          <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-lg min-h-[calc(100vh-5rem)] p-6 mt-5">
            <UserAside
              set_add={set_add}
              set_change_uId={set_change_uId}
              set_change_uId_password={set_change_uId_password}
              current_user_name={user_name}
            />
          </div>

          {/* Main content area - UserField component */}
          <main className="w-full lg:w-2/3 p-6 bg-white rounded-lg shadow-lg space-y-6">
            {
              !add_new_user && !change_uId_password && !change_uId && (
                <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                  <UserCircle className="w-16 h-16 text-blue-500 mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-800">Welcome to the User Section</h2>
                  <p className="text-gray-600">Manage your account settings and preferences here.</p>
                  <div className="flex space-x-6 mt-6">
                    <div className="flex flex-col items-center">
                      <Settings className="w-12 h-12 text-green-500" />
                      <p className="text-gray-700 mt-2">Settings</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <ShieldCheck className="w-12 h-12 text-purple-500" />
                      <p className="text-gray-700 mt-2">Security</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Users className="w-12 h-12 text-orange-500" />
                      <p className="text-gray-700 mt-2">User Management</p>
                    </div>
                  </div>
                </div>
              )
            }

            {/* UserField component */}
            <div className='mt-5'>
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
