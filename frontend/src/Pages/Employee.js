import React from "react";
import Navbar from "../components/layout/Navbar";
import { useState } from "react";
import EMP_aside from "../components/page_specific/EMP_aside";
import Emp_Table from "../components/page_specific/Emp_Table";

export default function Employee() {

  const emp= [
    { id: '1', name: 'jkhkdjfsgh', mob: 28 , email: "ghjfjghfjhgf", state: "tytguytujytuy", title: "fghhrtjty"},
    { id: '11', name: 'a', mob: 34,  email: "ghjfjghfjtgrewwfiudjghdkiu", state: "tytguytujytuy", title: "fghhrtjty" },
    { id: '2', name: 'a', mob: 45,  email: "ghjfjghfjhgf", state: "tytguytujytuy", title: "fghhrtjty" },
    { id: '3', name: 'agsdfs', mob: 34,  email: "ghjfjghfjtgreikgufdghgf", state: "tytguytujytuy", title: "fghhrtjty" },
    { id: '4', name: 'agsfs', mob: 45,  email: "ghjfjghfjhgf", state: "tytguytujytuy", title: "fghhrtjty" },
    { id: '112', name: 'agsdfs', mob: 34,  email: "ghjfjghfjtgrewgufdghgf", state: "tytguytujytuy", title: "fghhrtjty" },
    { id: '102', name: 'a', mob: 45,  email: "ghjfjghfjhgf", state: "tytguytujytuy", title: "fghhrtjty" },
    { id: '8', name: 'agsdfs', mob: 34,  email: "ghjfdkiugdksiughdghgf", state: "tytguytujytuy", title: "fghhrtjty" },
    { id: '9', name: 'agsfs', mob: 45,  email: "ghjfjghfjhgf", state: "tytguytujytuy", title: "fghhrtjty" },
  ];

  const [empData,setEMPData] = useState(emp)
  return (
    <>
      <Navbar />

      <div className="flex w-full ">
        
        <EMP_aside empData={emp} setEMPData={setEMPData} />
        



        <main className="w-2/3 ">
        <Emp_Table className="flex w-2/3 " data = {empData}/>
          
          
        </main>
      </div>
    </>
  );
}
