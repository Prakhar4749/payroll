import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import DEPTAside from "../components/page_specific/DEPT_aside";
import DeptTable from "../components/page_specific/Dept_Table";
import { fetchAllDeptData } from "../controller/department.controller.js";
import ComanLoading from "../components/common/ComanLoading";


export default function Department() {
  const [deptData, setdeptData] = useState([]);
  const [deptDatacopy, setdeptDatacopy] = useState([]);
  const [d_id, setd_id] = useState("");
  const [showloading,setshowloading] = useState(false)

  

  useEffect(() => {
    async function getDeptData() {
      try {
    setshowloading(true)

        const rawdata = await fetchAllDeptData();
        // console.log("raw data "+rawdata)
        const data = rawdata.result
        setshowloading(false)
        setdeptData(data);
        setdeptDatacopy(data);


      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    }

    getDeptData();
  }, []);

  // const [selectedId, setSelectedId] = useState(null);

  function onRowSelect(dId) {
    setd_id(dId);
  }



  return (
    <div>
      <Navbar />

      <ComanLoading toshow={showloading} />

      <div className="flex flex-col lg:flex-row w-full pt-16">
        <div className="w-full lg:w-1/4 bg-white  shadow-lg lg:min-h-[calc(100vh-4rem)] ">
          <DEPTAside
            deptData={deptData}
            deptDatacopy={deptDatacopy}
            d_id={d_id}
            setdeptDatacopy={setdeptDatacopy}
            setdeptData={setdeptData}
            setd_id1={setd_id}
          />
        </div>

        <main className="w-full lg:w-3/4 p-6 bg-gray-50">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <DeptTable data={deptDatacopy} onRowSelect={onRowSelect} selectedId={d_id} setSelectedId={setd_id} />
          </div>
        </main>
      </div>
    </div>
  );
}
