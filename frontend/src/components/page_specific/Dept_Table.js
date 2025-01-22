import React from 'react';

const Dept_Table = ({ data, setd_id, d_id }) => {
  const rows = Array.isArray(data) ? data : [];
  console.log('sefojfioe', rows);

  return (
    <table className="table-auto border-collapse border border-gray-300 w-full">
      <thead className="bg-black">
        <tr>
          <th className="border px-4 py-2 text-left text-white">D_Id</th>
          <th className="border px-4 py-2 text-left text-white">D_Name</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.d_id}
            className={`border px-4 py-2 text-gray-600 ${
              row.d_id === d_id ? 'bg-blue-400 text-white' : 'even:bg-blue-100'
            }`}
            onClick={() => setd_id(row.d_id)}  // Example: Set d_id on click
          >
            <td className="border px-4 py-2 max-w-0 truncate">{row.d_id}</td>
            <td className="border px-4 py-2 max-w-0 truncate">{row.d_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Dept_Table;
