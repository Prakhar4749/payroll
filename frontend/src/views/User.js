import React, { useState , useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import { useParams } from 'react-router-dom';
import UserAside from '../components/page_specific/User_aside';
import UserField from '../components/page_specific/User_table_field';

export default function User() {

  const [add_new_user,set_add] =useState(false)
  const [change_uId_password, set_change_uId_password] = useState(false);
  const [change_uId,set_change_uId] = useState(false)






  const { x } = useParams();
  const user_name = sessionStorage.getItem('user_name');


  console.log("this is x -> " + x);
  console.log("this is user name -> " + user_name);
  // add_new_user, change_uId, change_uId_password
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      
      {/* Main container */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">User: {user_name || x}</h1>
        
      
        {/* Flexbox layout for sidebar and main content */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar - UserAside component */}
          <div className="w-full lg:w-1/4 bg-white shadow-lg rounded-lg min-h-[calc(100vh-4rem)] p-4">
            <UserAside set_add={set_add} set_change_uId={set_change_uId} set_change_uId_password ={set_change_uId_password}   />
          </div>

          {/* Main content area - UserField component */}
          <main className="w-full lg:w-3/4 p-6 bg-white rounded-lg shadow-lg">

            {
              !add_new_user&&!change_uId_password&&!change_uId&&(
                <div>
               
                  welcome to user section  
              
                </div>
              )
            }

            <UserField add_new_user={add_new_user} change_uId={change_uId} change_uId_password={change_uId_password}  />
          </main>

        </div>
      </div>
    </div>
  );
}
