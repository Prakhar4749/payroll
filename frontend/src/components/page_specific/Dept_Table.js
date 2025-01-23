import React from 'react';

const Dept_Table = ({ data, setd_id, d_id, setd_name }) => {
  const rows = Array.isArray(data) ? data : [];

  return (
    <table className="table-auto border-collapse border border-gray-300 w-full" role="table">
      <thead className="bg-black text-white">
        <tr role="row">
          <th className="border px-4 py-2 text-left" role="columnheader">D_Id</th>
          <th className="border px-4 py-2 text-left" role="columnheader">D_Name</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.d_id}
            role="row"
            className={`border px-4 py-2 text-gray-600 cursor-pointer transition-all duration-200 ${
              row.d_id === d_id ? 'bg-blue-400 text-white' : 'even:bg-blue-100 hover:bg-blue-200'
            }`}
            onClick={() => {
              setd_id(row.d_id);
              setd_name(row.d_name);
            }}
          >
            <td className="border px-4 py-2 max-w-0 truncate" role="cell">{row.d_id}</td>
            <td className="border px-4 py-2 max-w-0 truncate" role="cell">{row.d_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Dept_Table;
