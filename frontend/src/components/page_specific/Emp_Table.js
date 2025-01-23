import React, { useState } from "react";

const Emp_Table = ({ data, onRowSelect }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleRowClick = (id) => {
    const newSelectedId = selectedId === id ? null : id;
    setSelectedId(newSelectedId);
    onRowSelect(newSelectedId);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    data.sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-md p-6">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border px-4 py-2 text-left cursor-pointer">Select</th>
            <th
              className="border px-4 py-2 text-left cursor-pointer"
              onClick={() => handleSort("e_id")}
            >
              E_ID {getSortIndicator("e_id")}
            </th>
            <th
              className="border px-4 py-2 text-left cursor-pointer"
              onClick={() => handleSort("e_name")}
            >
              E_Name {getSortIndicator("e_name")}
            </th>
            <th
              className="border px-4 py-2 text-left cursor-pointer"
              onClick={() => handleSort("e_mobile_number")}
            >
              E_Mob {getSortIndicator("e_mobile_number")}
            </th>
            <th
              className="border px-4 py-2 text-left cursor-pointer"
              onClick={() => handleSort("e_email")}
            >
              E_Email {getSortIndicator("e_email")}
            </th>
            <th
              className="border px-4 py-2 text-left cursor-pointer"
              onClick={() => handleSort("e_designation")}
            >
              E_Designation {getSortIndicator("e_designation")}
            </th>
            <th
              className="border px-4 py-2 text-left cursor-pointer"
              onClick={() => handleSort("e_address")}
            >
              E_Address {getSortIndicator("e_address")}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.e_id}
              className={`cursor-pointer transition duration-300 ${
                selectedId === row.e_id
                  ? "bg-green-100"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleRowClick(row.e_id)}
            >
              <td className="border px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedId === row.e_id}
                  readOnly
                />
              </td>
              <td className="border px-4 py-2 text-gray-600">{row.e_id}</td>
              <td className="border px-4 py-2 text-gray-600">{row.e_name}</td>
              <td className="border px-4 py-2 text-gray-600">
                {row.e_mobile_number}
              </td>
              <td className="border px-4 py-2 text-gray-600">{row.e_email}</td>
              <td className="border px-4 py-2 text-gray-600">
                {row.e_designation}
              </td>
              <td className="border px-4 py-2 text-gray-600">{row.e_address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Emp_Table;
