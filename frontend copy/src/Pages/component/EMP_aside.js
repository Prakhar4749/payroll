import React, { useState } from 'react';


const EMP_aside = ({ empData, setEMPData }) => {
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
  
    let a = empData.filter(employee => employee.id.slice(0,eId.length) === eId  && employee.name.slice(0,eName.length) === eName);
    console.log(empData)
    console.log(eId)
    console.log(a)


    setEMPData(a);

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
            <h1 className="text-3xl underline mt-4 mx-5 ">filter</h1>
          <div className="flex  mx-auto  flex-col">

            <div className="flex flex-col items-end justify-center">
              <span className="  my-1 mt-5 mx-2">
                <label className="text-2xl " >E_ID: </label>
                <input type="text" value={eId} onChange={(e)=> setEID(e.target.value)} />
              </span>
              <span className=" my-1  mx-2">
                <label className=" text-2xl ">E_Name: </label>
                <input type="text"  value={eName} onChange={(e)=> setEName(e.target.value)} />
              </span>
              <span className=" my-1 mx-2">
                <label className=" text-2xl ">E_Mob: </label>
                <input type="text" value={eMob} onChange={(e)=> setEMob(e.target.value)} />
              </span>
              {/* <span className="  my-1 mx-2">
                <label className=" text-2xl ">E_ID: </label>
                <input type="text" />
              </span> */}
            </div>

            <div className="flex-row my-5">
              <div className="flex items-center justify-evenly">
                <button className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full  text-xl">
                  Clear filter
                </button>
                <button className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full  text-xl  text-center " onClick={apply}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </aside>
    </>
  )
}

export default EMP_aside
