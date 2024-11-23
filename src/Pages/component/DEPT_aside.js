import React, { useState } from 'react';


const DEPT_aside = () => {
    const [eId,setEID]=useState("");
  const [eName,setEName]=useState("");
  const [eMob,setEMob]=useState("");

  function addEmp(){

  
  }
  function updateEmp(){
  
  
  }
  function removeEmp(){
  
  
  }
  function viewEmp(){
  
  
  }
  function apply( ){
  
  
  
  
  }
  function clearFilter(){
  
  
  }
  return (
    <>
    <aside className="w-1/3  bg-blue-300 flex  flex-col  mx-auto ">
          {" "}
          {/* this aside is for sidebar */}
          <div className="flex flex-col items-center justify-center">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full w-9/12 text-xl my-3 mt-4  sm:w-2/3  truncate">
              Add Employee
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full w-9/12 text-xl my-3  truncate">
              Update Employee
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full w-9/12 text-xl my-3">
              Remove Employee
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full w-9/12 text-xl my-3">
              View Employee
            </button>
          </div>
          <div className="flex   flex-col">
            <h1 className="text-3xl underline mt-4 mx-5 ">filter</h1>

            <div className="flex flex-col items-center justify-center">
              <span className="  my-1 mt-5 mx-2">
                <label className="text-2xl " vlaue={eId} onClick={(e)=> setEID(e.target.vlaue)} >E_ID: </label>
                <input type="text" />
              </span>
              <span className=" my-1  mx-2">
                <label className=" text-2xl ">E_Name: </label>
                <input type="text"  vlaue={eName} onClick={(e)=> setEName(e.target.vlaue)} />
              </span>
              <span className=" my-1 mx-2">
                <label className=" text-2xl ">E_Mob: </label>
                <input type="text" vlaue={eMob} onClick={(e)=> setEMob(e.target.vlaue)} />
              </span>
              {/* <span className="  my-1 mx-2">
                <label className=" text-2xl ">E_ID: </label>
                <input type="text" />
              </span> */}
            </div>

            <div className="flex-row my-5">
              <div className="flex items-center justify-center">
                <button className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-5/12 text-xl">
                  Clear filter
                </button>
                <button className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-5/12 text-xl ml-1 text-center ">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </aside>
    </>
  )
}

export default DEPT_aside 
