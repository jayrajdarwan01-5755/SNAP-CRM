"use client";

import { useState } from "react";
import Link from "next/link";

export default function AuditLogsPage() {

  const [logs] = useState([

    {
      id: 1,
      user: "Admin",
      action: "Created User",
      module: "Users",
      date: "22-Jul-2026 10:30 AM",
      status: "Success",
    },

    {
      id: 2,
      user: "Manager",
      action: "Updated Product",
      module: "Inventory",
      date: "22-Jul-2026 11:15 AM",
      status: "Success",
    },

    {
      id: 3,
      user: "Admin",
      action: "Deleted Customer",
      module: "Sales",
      date: "22-Jul-2026 12:20 PM",
      status: "Failed",
    },

  ]);


  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex justify-between items-center">


        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Audit Logs
          </h1>

        <p className="text-gray-800 font-medium">
            View system activity logs
          </p>

        </div>


        <Link

          href="/settings"

          className="
          bg-gray-600
          hover:bg-gray-700
          text-white
          px-5
          py-2
          rounded-lg
          "

        >

          ← Back

        </Link>


      </div>




      {/* Search */}

      <div className="bg-white border rounded-xl shadow p-6">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


          <input

            type="text"

            placeholder="Search Logs"

           className="
            w-full
            border
            border-gray-300
            bg-white
            text-gray-900
            placeholder:text-gray-500
            rounded-lg
            px-4
            py-2

            "

          />


          <select

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

          >

            <option>
              All Modules
            </option>

            <option>
              Users
            </option>

            <option>
              Inventory
            </option>

            <option>
              Sales
            </option>

            <option>
              HR
            </option>

          </select>


        </div>


      </div>




      {/* Audit Logs Table */}

      <div className="bg-white border rounded-xl shadow overflow-hidden">


        <table className="w-full">


          <thead className="bg-gray-100">


            <tr>

             <th className="px-4 py-3 text-left text-gray-900 font-semibold">
                User
              </th>

            <th className="px-4 py-3 text-left text-gray-900 font-semibold">
                Action
              </th>

             <th className="px-4 py-3 text-left text-gray-900 font-semibold">
                Module
              </th>

             <th className="px-4 py-3 text-left text-gray-900 font-semibold">
                Date & Time
              </th>

              <th className="px-4 py-3 text-left text-gray-900 font-semibold">
                Status
              </th>

            </tr>

          </thead>


          <tbody>

            {logs.map((log) => (

              <tr

                key={log.id}

                className="border-t hover:bg-gray-50"

              >

                <td className="px-4 py-4 text-gray-900 font-medium">
                  {log.user}
                </td>

               <td className="px-4 py-4 text-gray-900">
                  {log.action}
                </td>

                <td className="px-4 py-4 text-gray-900">
                  {log.module}
                </td>

               <td className="px-4 py-4 text-gray-900">
                  {log.date}
                </td>

                <td className="px-4 py-4">  
                     <span

                    className={
                      log.status === "Success"
                        ? "bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full text-sm"
                        : "bg-red-100 text-red-800 font-semibold px-3 py-1 rounded-full text-sm"
                    }

                  >

                    {log.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}
                