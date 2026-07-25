"use client";

import { useState } from "react";

export default function ReportsPage() {

  const [reports] = useState([

    {
      id: 1,
      name: "Employee Report",
    },

    {
      id: 2,
      name: "Sales Report",
    },

    {
      id: 3,
      name: "Inventory Report",
    },

    {
      id: 4,
      name: "Payroll Report",
    },

    {
      id: 5,
      name: "Customer Report",
    },

    {
      id: 6,
      name: "Lead Report",
    },

  ]);

  return (

    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          Reports
        </h1>

        <p className="text-gray-600 mt-2">
          Generate and export business reports
        </p>

      </div>

      {/* Report Filters */}

      <div className="bg-white border rounded-xl shadow p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Date From
            </label>

            <input
              type="date"
              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Date To
            </label>

            <input
              type="date"
              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

        </div>

        <div className="flex flex-wrap gap-3 mt-6">

          <button
            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-2
            rounded-lg
            "
          >
            Generate
          </button>

          <button
            className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-5
            py-2
            rounded-lg
            "
          >
            Export Excel
          </button>

          <button
            className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-5
            py-2
            rounded-lg
            "
          >
            Export PDF
          </button>

          <button
            className="
            bg-gray-700
            hover:bg-gray-800
            text-white
            px-5
            py-2
            rounded-lg
            "
          >
            Print
          </button>

        </div>

      </div>

      {/* Reports Table */}

      <div className="bg-white border rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-3 text-left text-gray-900">
                Report Name
              </th>

            </tr>

          </thead>

          <tbody>

            {reports.map((report) => (

              <tr
                key={report.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-4 py-4 text-gray-900 font-medium">

                  {report.name}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}