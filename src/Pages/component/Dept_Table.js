import React from 'react'

const Dept_Table = ({ data }) => {
    return (
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead className="bg-blue-300">
          <tr>
            <th className="border px-4 py-2 text-left text-gray-700" >D_Id</th>
            <th className="border px-4 py-2 text-left text-gray-700" >D_Name</th>
            
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="even:bg-blue-100">
              <td className="border px-4 py-2 text-gray-600 max-w-0 truncate">{row.id}</td>
              <td className="border px-4 py-2 text-gray-600 max-w-0 truncate">{row.name}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

export default Dept_Table
