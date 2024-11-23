import React, { useState } from 'react';


const DEPT_aside = ({deptData, setdeptData}) => {
    const [dId,setdID]=useState("");
  const [dName,setdName]=useState("");
 

  function adddept(){

  
  }
  function updatedept(){
  
  
  }
  function removedept(){
  
  
  }
  function viewdept(){
  
  
  }
  function apply( ){
    
    let a = deptData.filter(dept => dept.id.slice(0,dId.length) === dId  && dept.name.slice(0,dName.length) === dName);
    console.log(deptData)
    console.log(dId)
    console.log(a)


    setdeptData(a);

  
  
  
  
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
              Add Department
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full w-9/12 text-xl my-3  truncate">
              Update Department
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full w-9/12 text-xl my-3">
              Remove Department
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full w-9/12 text-xl my-3">
              View Department
            </button>
          </div>
          <div className="flex   flex-col">
            <h1 className="text-3xl underline mt-4 mx-5 ">filter</h1>

            <div className="flex flex-col items-center justify-end">
              <span className="  my-1 mt-5 mx-2">
                <label className="text-2xl "  >D_ID: </label>
                <input type="text" vlaue={dId} onChange={(e)=> setdID(e.target.value)} />
              </span>
              <span className=" my-1  mx-2">
                <label className=" text-2xl ">D_Name: </label>
                <input type="text"  vlaue={dName} onChange={(e)=> setdName(e.target.value)} />
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
                <button className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-5/12 text-xl ml-1 text-center "  onClick={apply}>
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
