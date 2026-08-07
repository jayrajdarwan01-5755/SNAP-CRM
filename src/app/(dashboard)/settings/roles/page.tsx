"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Role } from "@/types/role";

export default function RolesPage() {

  const [roles, setRoles] = useState<Role[]>([]);

  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {

    loadRoles();

  }, []);

  const loadRoles = async () => {

    try {

      setLoading(true);

      const response = await fetch("/api/roles");

      const data: Role[] = await response.json();

      setRoles(data);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  const handleDelete = async (
    RoleId: number
  ) => {

    const confirmDelete = confirm(
      "Are you sure you want to delete this role?"
    );

    if (!confirmDelete) {

      return;

    }

    const response = await fetch(
      "/api/roles",
      {

        method: "DELETE",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          RoleId,

        }),

      }
    );

    if (response.ok) {

      setRoles((prev) =>

        prev.filter(

          (role) => role.RoleId !== RoleId

        )

      );

    }

  };

  const handleClearFilter = () => {

    setSearchText("");

  };

  const filteredRoles = roles.filter((role) =>

    role.RoleName
      .toLowerCase()
      .includes(searchText.toLowerCase())

    ||

    role.Description
      .toLowerCase()
      .includes(searchText.toLowerCase())

    ||

    role.Status
      .toLowerCase()
      .includes(searchText.toLowerCase())

  );

  return (

    <div className="space-y-6 bg-theme text-theme min-h-screen">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-theme">

            Roles

          </h1>

          <p className="text-muted mt-2">

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

      {/* Search */}

      <div className="card-theme border-theme rounded-xl shadow p-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Role"
            className="
            w-full
            border
            border-theme
            bg-theme
            text-theme
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

          <button
            onClick={handleClearFilter}
            className="
            bg-gray-600
            hover:bg-gray-700
            text-white
            rounded-lg
            "
          >
            Clear
          </button>

        </div>

      </div>

      {/* Roles Table */}

      <div className="card-theme border-theme rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-theme border-b border-theme">

            <tr>

              <th className="px-4 py-3 text-left text-theme">
                Role Name
              </th>

              <th className="px-4 py-3 text-left text-theme">
                Description
              </th>

              <th className="px-4 py-3 text-left text-theme">
                Status
              </th>

              <th className="px-4 py-3 text-center text-theme">
                Action
              </th>

            </tr>

          </thead>

          <tbody>
            
            {

              loading ? (

                <tr>

                  <td
                    colSpan={4}
                    className="text-center py-10 text-muted"
                  >

                    Loading roles...

                  </td>

                </tr>

              ) :

              filteredRoles.length === 0 ? (

                <tr>

                  <td
                    colSpan={4}
                    className="text-center py-10 text-muted"
                  >

                    No roles found

                  </td>

                </tr>

              ) :

              filteredRoles.map((role) => (

                <tr
                  key={role.RoleId}
                  className="border-t border-theme hover:bg-black/5 dark:hover:bg-white/5"
                >

                  <td className="px-4 py-4 text-theme font-medium">

                    {role.RoleName}

                  </td>

                  <td className="px-4 py-4 text-muted">

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

                    <div className="flex justify-center gap-2">

                      <Link
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
                        onClick={() =>
                          handleDelete(role.RoleId)
                        }
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

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}