import React from "react";
import Navbar from "./component/Navbar";
import { useState } from "react";
import EMP_aside from "./component/EMP_aside";



export default function Employee() {

  


  return (
    <>
      <Navbar />

      <div className="flex w-full ">
        {" "}
        {/* this div is the main contaner*/}

        <EMP_aside/>
        
        <main className="w-2/3 h-screen bg-red-600 ">
          {" "}
          {/* this main is for contaning table */}
        </main>
      </div>
    </>
  );
}
