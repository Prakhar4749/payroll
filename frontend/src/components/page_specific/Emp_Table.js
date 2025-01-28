import React, { useState } from "react";
import { ArrowUpDown, Check, FileQuestion } from "lucide-react";

const Emp_Table = ({ data, onRowSelect, selectedId, setSelectedId }) => {

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  if (!Array.isArray(data)) {
    return (
      <div className="flex flex-col items-center justify-center h-48 bg-gradient-to-br from-slate-50 to-white rounded-xl shadow-xl border border-slate-100">
        <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 flex items-center justify-center shadow-lg shadow-emerald-600/20">
          <FileQuestion className="w-8 h-8 text-white" />
        </div>
        <p className="text-lg font-medium bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
          No data available
        </p>
        <p className="text-sm text-slate-500 mt-1">
          Data will appear here once available
        </p>
      </div>
    );
  }

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
    if (sortConfig.key !== key) return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    return (
      <ArrowUpDown 
        className={`w-4 h-4 ${sortConfig.direction === "asc" ? "rotate-0" : "rotate-180"} transition-transform duration-200`}
      />
    );
  };

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-lg">
      <div className="overflow-auto max-h-[85vh] lg:max-h-[80vh]">
        <table className="w-full border-collapse">
        <thead className=" sticky top-0 bg-emerald-600 text-white z-10 ">
        <tr>
              <th className="px-4 py-3 text-left font-medium text-sm">Select</th>
              {[
                { key: "e_id", label: "E_ID" },
                { key: "e_name", label: "E_Name" },
                { key: "e_mobile_number", label: "E_Mob" },
                { key: "e_email", label: "E_Email" },
                { key: "e_designation", label: "E_Designation" },
                { key: "e_address", label: "E_Address" }
              ].map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className="px-4 py-3 text-left font-medium text-sm cursor-pointer group"
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    <span className="transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                      {getSortIndicator(column.key)}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row) => (
              <tr
                key={row.e_id}
                onClick={() => handleRowClick(row.e_id)}
                className={`
                  cursor-pointer transition-colors duration-200
                  ${selectedId === row.e_id
                    ? "bg-emerald-50"
                    : "hover:bg-slate-50"
                  }
                `}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center">
                    <div
                      className={`
                        w-5 h-5 rounded border transition-colors duration-200
                        flex items-center justify-center
                        ${selectedId === row.e_id
                          ? "bg-emerald-600 border-emerald-600"
                          : "border-gray-300 hover:border-emerald-600"
                        }
                      `}
                    >
                      {selectedId === row.e_id && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </td>
                {[
                  "e_id",
                  "e_name",
                  "e_mobile_number",
                  "e_email",
                  "e_designation",
                  "e_address"
                ].map((key) => (
                  <td
                    key={key}
                    className="px-4 py-3 text-sm text-slate-600"
                  >
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Emp_Table;