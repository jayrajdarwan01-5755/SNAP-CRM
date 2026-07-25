"use client";

import Link from "next/link";
import { useState } from "react";

export default function UsersPage() {

  const [users] = useState([

    {
      UserId: 1,
      Username: "admin",
      Role: "Administrator",
      Status: "Active",
    },

    {
      UserId: 2,
      Username: "john.doe",
      Role: "Manager",
      Status: "Active",
    },

    {
      UserId: 3,
      Username: "jane.smith",
      Role: "HR",
      Status: "Inactive",
    },

  ]);

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            User Management
          </h1>

          <p className="text-gray-600 mt-2">
            Manage system users
          </p>

        </div>


 <div className="flex gap-3">

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

        <Link
          href="/settings/users/add"
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-2
          rounded-lg
          "
        >
          + Add User
        </Link>
        </div>
      </div>

      {/* Search */}

      <div className="bg-white border rounded-xl shadow p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Search Username"
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

          <button
            className="
            bg-green-600
            hover:bg-green-700
            text-white
            rounded-lg
            "
          >
            Search
          </button>

        </div>

      </div>

      {/* Users Table */}

      <div className="bg-white border rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-3 text-left text-gray-900">
                Username
              </th>

              <th className="px-4 py-3 text-left text-gray-900">
                Role
              </th>

              <th className="px-4 py-3 text-left text-gray-900">
                Status
              </th>

              <th className="px-4 py-3 text-center text-gray-900">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.UserId}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-4 py-4 text-gray-900">
                  {user.Username}
                </td>

                <td className="px-4 py-4 text-gray-700">
                  {user.Role}
                </td>

                <td className="px-4 py-4">

                  <span
                    className={
                      user.Status === "Active"
                        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                        : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                    }
                  >
                    {user.Status}
                  </span>

                </td>

                <td className="px-4 py-4">

                  <div className="flex justify-center gap-2">
                    
                                     <Link
                      href={`/settings/users/${user.UserId}`}
                      className="
                      bg-green-600
                      hover:bg-green-700
                      text-white
                      px-3
                      py-1
                      rounded
                      text-sm
                      "
                    >
                      View
                    </Link>

                    <Link
                      href={`/settings/users/edit/${user.UserId}`}
                      className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-3
                      py-1
                      rounded
                      text-sm
                      "
                    >
                      Edit
                    </Link>

                    <button
                      className="
                      bg-orange-600
                      hover:bg-orange-700
                      text-white
                      px-3
                      py-1
                      rounded
                      text-sm
                      "
                    >
                      Reset Password
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}
                  

                  