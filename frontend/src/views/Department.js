import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import DEPT_aside from "../components/page_specific/DEPT_aside";
import Dept_Table from "../components/page_specific/Dept_Table";
import { fetchAllDeptData } from "../controller/department.controller.js";

export default function Department() {
  const [deptData, setdeptData] = useState([]);
  const [deptDatacopy, setdeptDatacopy] = useState([]);
  const [d_id, setd_id] = useState("");

  useEffect(() => {
    async function getDeptData() {
      try {
        const rawdata = await fetchAllDeptData();
        // console.log("raw data "+rawdata)
        const data = rawdata.result
        setdeptData(data);
        setdeptDatacopy(data);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    }

    getDeptData();
  }, []);

  function onRowSelect(dId) {
    setd_id(dId);
  }

  return (
    <div>
      <Navbar />

      <div className="flex flex-col lg:flex-row w-full pt-16">
        <div className="w-full lg:w-1/4 bg-white shadow-lg min-h-[calc(100vh-4rem)]">
          <DEPT_aside
            deptData={deptData}
            deptDatacopy={deptDatacopy}
            d_id={d_id}
            setdeptDatacopy={setdeptDatacopy}
            setdeptData={setdeptData}
            setd_id={setd_id}
          />
        </div>

        <main className="w-full lg:w-3/4 p-6 bg-gray-50">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Dept_Table data={deptDatacopy} onRowSelect={onRowSelect} />
          </div>
        </main>
      </div>
    </div>
  );
}
