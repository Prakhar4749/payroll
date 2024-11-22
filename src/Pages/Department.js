import React from "react";
import Navbar from "./component/Navbar";
import Dept_Table from "./component/Dept_Table";
function Department() {
  const dept = [
    { id: 1, name: "IT"},
    { id: 2, name: "cse"},
    { id: 3, name: "ex"},
    { id: 4, name: "ec"},
    { id: 5, name: "me"},

  ]

  return (
    <div>
      <Navbar/>

      <div className="flex w-full ">
        {" "}
        {/* this div is the main contaner*/}
        <aside className="w-1/3  bg-blue-300 flex  flex-col  mx-auto ">
          
        </aside>



        <main className="w-2/3 ">
        <Dept_Table className="flex" data = {dept}/>
          
          
        </main>
      </div>
    </div>
  )
}
export default Department;