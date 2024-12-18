import React, { useState } from "react";
import Navbar from "./component/Navbar";
import Dept_Table from "./component/Dept_Table";
import DEPT_aside from "./component/DEPT_aside";
function Department() {
  const dept = [
    { id: "1", name: "IT"},
    { id: "2", name: "cse"},
    { id: "3", name: "ex"},
    { id: "4", name: "ec"},
    { id: "5", name: "me"},

  ]
  const [deptData,setdeptData] = useState(dept)

  return (
    <div>
      <Navbar/>

      <div className="flex w-full ">
       
        <DEPT_aside deptData={dept} setdeptData={setdeptData} />



        <main className="w-2/3 ">
        <Dept_Table className="flex" data = {deptData}/>
          
          
        </main>
      </div>
    </div>
  )
}
export default Department;