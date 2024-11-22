import React from "react";
import Navbar from "./component/Navbar";
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
        {" "}
        {/* this div is the main contaner*/}
        <aside className="w-1/3  bg-blue-300 flex  flex-col  mx-auto ">
          {" "}
          {/* this aside is for sidebar */}
          <div className="flex flex-col items-center justify-center">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full w-9/12 text-xl my-3 mt-4">
              Add Employee
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full w-9/12 text-xl my-3">
              Update Employee
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full w-9/12 text-xl my-3">
              Remove Employee
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full w-9/12 text-xl my-3">
              View Employee
            </button>
          </div>


          <div className="flex  flex-col">
            <h1 className="text-3xl underline mt-4 ">filter</h1>

            <span className="w-full  my-1 mt-5 mx-2">
              <label className="text-2xl  ">E_ID: </label>
              <input type="text" />
            </span>
            <span className="w-full  my-1  mx-2">
              <label className=" text-2xl ">E_ID: </label>
              <input type="text" />
            </span>
            <span className="w-full my-1 mx-2">
              <label className=" text-2xl ">E_ID: </label>
              <input type="text" />
            </span>
            <span className="w-full  my-1 mx-2">
              <label className=" text-2xl ">E_ID: </label>
              <input type="text" />
            </span>

            <div className="flex-row my-5">


            <button className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-5/12 text-xl">
              Clear filter
            </button>
            <button className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-5/12 text-xl">
              apply
            </button>

            </div>

          </div>
        </aside>



        <main className="w-2/3 ">
        <Emp_Table className="flex" data = {emp}/>
          
          
        </main>
      </div>
    </>
  );

}
