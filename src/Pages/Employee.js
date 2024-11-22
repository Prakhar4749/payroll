import React from "react";
import Navbar from "./component/Navbar";
import { useState } from "react";
import EMP_aside from "./component/EMP_aside";
import Emp_Table from "./component/Emp_Table";

export default function Employee() {
  const emp = [
    { id: 1, name: 'jkhkdjfsgh', mob: 28 , email: "ghjfjghfjhgf", state: "tytguytujytuy", title: "fghhrtjty"},
    { id: 2, name: 'agsdfs', mob: 34,  email: "ghjfjghfjtgrewwfiudjghdkiugdksiughdfskiufgdskiufdsgkdfisugdfksiugfdfsikgufdghgf", state: "tytguytujytuy", title: "fghhrtjty" },
    { id: 3, name: 'agsfs', mob: 45,  email: "ghjfjghfjhgf", state: "tytguytujytuy", title: "fghhrtjty" },
    { id: 2, name: 'agsdfs', mob: 34,  email: "ghjfjghfjtgrewwfiudjghdkiugdksiughdfskiufgdskiufdsgkdfisugdfksiugfdfsikgufdghgf", state: "tytguytujytuy", title: "fghhrtjty" },
    { id: 3, name: 'agsfs', mob: 45,  email: "ghjfjghfjhgf", state: "tytguytujytuy", title: "fghhrtjty" },
    { id: 2, name: 'agsdfs', mob: 34,  email: "ghjfjghfjtgrewwfiudjghdkiugdksiughdfskiufgdskiufdsgkdfisugdfksiugfdfsikgufdghgf", state: "tytguytujytuy", title: "fghhrtjty" },
    { id: 3, name: 'agsfs', mob: 45,  email: "ghjfjghfjhgf", state: "tytguytujytuy", title: "fghhrtjty" },
    { id: 2, name: 'agsdfs', mob: 34,  email: "ghjfjghfjtgrewwfiudjghdkiugdksiughdfskiufgdskiufdsgkdfisugdfksiugfdfsikgufdghgf", state: "tytguytujytuy", title: "fghhrtjty" },
    { id: 3, name: 'agsfs', mob: 45,  email: "ghjfjghfjhgf", state: "tytguytujytuy", title: "fghhrtjty" },
  ];
  return (
    <>
      <Navbar />

      <div className="flex w-full ">
        
        <EMP_aside/>
        



        <main className="w-2/3 ">
        <Emp_Table className="flex w-2/3 " data = {emp}/>
          
          
        </main>
      </div>
    </>
  );
}
