import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Dept_Table from "../components/page_specific/Dept_Table";
import DEPT_aside from "../components/page_specific/DEPT_aside";
import axios from "axios";
import {fetchAllDeptData} from '../controller/department.controller.js'

function Department() {
  const [deptData, setdeptData] = useState([]);  // Initialize with an empty array

  // Fetch data using useEffect
  useEffect(() => {async function getDeptData() {
    try {
      const data = await fetchAllDeptData();  // Await the async function
      setdeptData(data);  // Update state with resolved data
      console.log("Fetched Data:", data);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  }

  getDeptData();
  }, []);  // Empty dependency array to run effect only once on mount

  return (
    <div>
      <Navbar />

      <div className="flex w-full">
        <DEPT_aside deptData={deptData} setdeptData={setdeptData} />

        <main className="w-2/3">
          <Dept_Table className="flex" data={deptData} />
        </main>
      </div>
    </div>
  );
}

export default Department;
