"use client";

import Link from "next/link";
import { useState } from "react";

export default function RolesPage() {

  const [roles] = useState([

    {
      RoleId: 1,
      RoleName: "Administrator",
      Description: "Full system access",
      Status: "Active",
    },

    {
      RoleId: 2,
      RoleName: "Manager",
      Description: "Manage department operations",
      Status: "Active",
    },

    {
      RoleId: 3,
      RoleName: "Employee",
      Description: "Limited system access",
      Status: "Inactive",
    },

  ]);


  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex justify-between items-center">


        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Roles
          </h1>

          <p className="text-gray-600 mt-2">
            Manage user roles and permissions
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

          href="/settings/roles/add"

          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-2
          rounded-lg
          "

        >

          + Add Role

        </Link>

        </div>

      </div>





      {/* Roles Table */}


      <div className="bg-white border rounded-xl shadow overflow-hidden">


        <table className="w-full">


          <thead className="bg-gray-100">


            <tr>


              <th className="px-4 py-3 text-left text-gray-900">
                Role Name
              </th>


              <th className="px-4 py-3 text-left text-gray-900">
                Description
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


            {roles.map((role) => (


              <tr

                key={role.RoleId}

                className="border-t hover:bg-gray-50"

              >


                <td className="px-4 py-4 text-gray-900 font-medium">

                  {role.RoleName}

                </td>


                <td className="px-4 py-4 text-gray-700">

                  {role.Description}

                </td>


                <td className="px-4 py-4">


                  <span

                    className={

                      role.Status === "Active"

                      ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"

                      : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"

                    }

                  >

                    {role.Status}

                  </span>


                </td>


                <td className="px-4 py-4">

                  <div className="flex justify-center gap-2">                    <Link

                      href={`/settings/roles/${role.RoleId}`}

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

                      href={`/settings/roles/edit/${role.RoleId}`}

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
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      px-3
                      py-1
                      rounded
                      text-sm
                      "

                    >

                      Delete

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