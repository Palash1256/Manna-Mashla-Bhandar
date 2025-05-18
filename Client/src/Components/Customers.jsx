import React, { useState, useEffect } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Customers() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(backendUrl + "/customers-data")
      .then((res) => res.json())
      .then((json) => {
        // Sort by Name, then Address (both ascending, case-insensitive)
        const sorted = [...json].sort((a, b) => {
          const nameA = (a.Name || "").toLowerCase();
          const nameB = (b.Name || "").toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          const addrA = (a.Address || "").toLowerCase();
          const addrB = (b.Address || "").toLowerCase();
          if (addrA < addrB) return -1;
          if (addrA > addrB) return 1;
          return 0;
        });
        setData(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  // Get columns dynamically from first object
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  // Generic search: check if any value in the row includes the search string
  const filteredData = data.filter((item) =>
    columns.some(
      (col) =>
        String(item[col] ?? "")
          .toLowerCase()
          .includes(search.toLowerCase())
    )
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-2 py-8 bg-gradient-to-br from-yellow-50 to-orange-100">
      <div className="w-full max-w-5xl bg-white/80 rounded-2xl shadow-lg p-6 md:p-10 border border-orange-100">
        <h2 className="text-3xl md:text-4xl font-extrabold text-orange-700 mb-6 text-center drop-shadow animate-fade-in-up">
          Customer List
        </h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <input
            className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm transition"
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="text-sm text-gray-500 mt-1 md:mt-0 text-center">
            Showing{" "}
            <span className="font-semibold">{filteredData.length}</span> of{" "}
            <span className="font-semibold">{data.length}</span> customers
          </span>
        </div>
        <div className="overflow-x-auto rounded-lg border border-orange-100 bg-gradient-to-br from-yellow-50 to-orange-50">
          <table className="min-w-full text-sm md:text-base">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 border-b text-left bg-orange-100 text-orange-700 font-semibold capitalize"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition ${
                      idx % 2 === 0
                        ? "bg-white/80"
                        : "bg-orange-50/80"
                    } hover:bg-orange-200/60`}
                  >
                    {columns.map((col) => (
                      <td key={col} className="px-4 py-2 border-b">
                        {typeof row[col] === "object" && row[col] !== null
                          ? JSON.stringify(row[col])
                          : String(row[col] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-4 border-b text-center text-gray-500" colSpan={columns.length || 1}>
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <style>
        {`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in-up {
            animation: fade-in-up 1.2s cubic-bezier(.4,0,.2,1);
          }
        `}
      </style>
    </div>
  );
}

export default Customers;
