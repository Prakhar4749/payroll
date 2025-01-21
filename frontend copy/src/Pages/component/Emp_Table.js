import React from 'react'

const Emp_Table = ({ data }) => {
    return (
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead className="bg-blue-300">
          <tr>
            <th className="border px-4 py-2 text-left text-gray-700" >E_Id</th>
            <th className="border px-4 py-2 text-left text-gray-700" >E_Name</th>
            <th className="border px-4 py-2 text-left text-gray-700" >E_mob</th>
            <th className="border px-4 py-2 text-left text-gray-700">E_Email</th>
            <th className="border px-4 py-2 text-left text-gray-700">E_State</th>
            <th className="border px-4 py-2 text-left text-gray-700">E_Title</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="even:bg-blue-100">
              <td className="border px-4 py-2 text-gray-600 max-w-0 truncate">{row.id}</td>
              <td className="border px-4 py-2 text-gray-600 max-w-0 truncate">{row.name}</td>
              <td className="border px-4 py-2 text-gray-600 max-w-0 truncate">{row.mob}</td>
              <td className="border px-4 py-2 text-gray-600 max-w-0 truncate">{row.email}</td>
              <td className="border px-4 py-2 text-gray-600 max-w-0 truncate">{row.state}</td>
              <td className="border px-4 py-2 text-gray-600 max-w-0 truncate">{row.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

export default Emp_Table
