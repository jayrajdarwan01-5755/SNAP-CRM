"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Role } from "@/types/role";

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const rolesPerPage = 5;

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/roles");

      const data: Role[] = await response.json();

      setRoles(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (RoleId: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this role?"
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch("/api/roles", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        RoleId,
      }),
    });

    if (response.ok) {
      setRoles((prev) =>
        prev.filter((role) => role.RoleId !== RoleId)
      );
    }
  };

  const handleClearFilter = () => {
    setSearchText("");
    setCurrentPage(1);
  };

  const filteredRoles = roles.filter((role) => {
    return (
      role.RoleName
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||

      role.Description
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||

      role.Status
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredRoles.length / rolesPerPage
    )
  );

  const lastRoleIndex =
    currentPage * rolesPerPage;

  const firstRoleIndex =
    lastRoleIndex - rolesPerPage;

  const currentRoles =
    filteredRoles.slice(
      firstRoleIndex,
      lastRoleIndex
    );

  const showingFrom =
    filteredRoles.length === 0
      ? 0
      : firstRoleIndex + 1;

  const showingTo = Math.min(
    lastRoleIndex,
    filteredRoles.length
  );

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

        <div>

          <h1 className="text-3xl font-bold text-theme">
            Roles
          </h1>

          <p className="text-muted mt-2">
            Manage user roles and permissions
          </p>

        </div>

        <div className="flex flex-col sm:flex-row gap-3">

          <Link
            href="/settings"
            className="
            bg-gray-600
            hover:bg-gray-700
            text-white
            px-5
            py-2
            rounded-lg
            text-center
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
            text-center
            "
          >
            + Add Role
          </Link>

        </div>

      </div>


      {/* ================= SEARCH & FILTER ================= */}

      <div
        className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        p-6
        "
      >

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4
          "
        >

          {/* Search */}

          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search Role"
            className="
            w-full
            border
            border-theme
            bg-theme
            text-theme
            placeholder:text-muted
            rounded-lg
            px-4
            py-2
            "
          />


          {/* Search Button */}

          <button
            type="button"
            className="
            bg-green-600
            hover:bg-green-700
            text-white
            rounded-lg
            px-4
            py-2
            "
          >
            Search
          </button>


          {/* Clear Button */}

          <button
            type="button"
            onClick={handleClearFilter}
            className="
            bg-gray-600
            hover:bg-gray-700
            text-white
            rounded-lg
            px-4
            py-2
            "
          >
            Clear
          </button>

        </div>

      </div>


      {/* ================= DATA CARD ================= */}

      <div
        className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        overflow-hidden
        "
      >

        {/* ================= DESKTOP / TABLET ================= */}

        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-theme">

              <tr className="text-theme">

                <th className="px-4 py-4 text-left">
                  Role Name
                </th>

                <th className="px-4 py-4 text-left">
                  Description
                </th>

                <th className="px-4 py-4 text-left">
                  Status
                </th>

                <th className="px-4 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={4}
                    className="
                    text-center
                    py-10
                    text-muted
                    "
                  >
                    Loading roles...
                  </td>

                </tr>

              ) : filteredRoles.length === 0 ? (

                <tr>

                  <td
                    colSpan={4}
                    className="
                    text-center
                    py-10
                    text-muted
                    "
                  >
                    No roles found
                  </td>

                </tr>

              ) : (

                currentRoles.map((role) => (

                  <tr
                    key={role.RoleId}
                    className="
                    border-t
                    border-theme
                    hover:bg-theme
                    table-row-theme
                    "
                  >

                    <td className="px-4 py-4 font-medium text-theme">
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
                          type="button"
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

              )}

            </tbody>

          </table>

        </div>


        {/* ================= MOBILE ================= */}

        <div className="md:hidden">

          {loading ? (

            <div className="text-center py-10 text-muted">
              Loading roles...
            </div>

          ) : filteredRoles.length === 0 ? (

            <div className="text-center py-10 text-muted">
              No roles found
            </div>

          ) : (

            <div className="divide-y divide-gray-200 dark:divide-gray-700">

              {currentRoles.map((role) => (

                <div
                  key={role.RoleId}
                  className="
                  p-5
                  table-row-theme
                  "
                >

                  {/* Role Header */}

                  <div className="flex justify-between items-start gap-3 mb-4">

                    <div>

                      <h3 className="font-semibold text-lg text-theme">
                        {role.RoleName}
                      </h3>

                      <p className="text-sm text-muted mt-1">
                        Role
                      </p>

                    </div>

                    <span
                      className={
                        role.Status === "Active"
                          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
                          : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs"
                      }
                    >
                      {role.Status}
                    </span>

                  </div>


                  {/* Role Information */}

                  <div className="space-y-3">

                    <div className="flex justify-between gap-4">

                      <span className="text-sm text-muted">
                        Description
                      </span>

                      <span className="text-sm font-medium text-theme text-right">
                        {role.Description}
                      </span>

                    </div>

                  </div>


                  {/* Mobile Actions */}

                  <div className="flex gap-2 mt-5">

                    <Link
                      href={`/settings/roles/${role.RoleId}`}
                      className="
                      flex-1
                      text-center
                      bg-green-600
                      hover:bg-green-700
                      text-white
                      px-3
                      py-2
                      rounded-lg
                      text-sm
                      "
                    >
                      View
                    </Link>

                    <Link
                      href={`/settings/roles/edit/${role.RoleId}`}
                      className="
                      flex-1
                      text-center
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-3
                      py-2
                      rounded-lg
                      text-sm
                      "
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(role.RoleId)
                      }
                      className="
                      flex-1
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      px-3
                      py-2
                      rounded-lg
                      text-sm
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>


      {/* ================= PAGINATION CARD ================= */}

      <div
        className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        p-4
        "
      >

        <div
          className="
          flex
          flex-col
          sm:flex-row
          justify-between
          items-center
          gap-4
          "
        >

          {/* Showing */}

          <p className="text-sm text-muted">

            Showing{" "}

            <span className="font-semibold text-theme">
              {showingFrom}
            </span>{" "}

            to{" "}

            <span className="font-semibold text-theme">
              {showingTo}
            </span>{" "}

            of{" "}

            <span className="font-semibold text-theme">
              {filteredRoles.length}
            </span>{" "}

            roles

          </p>


          {/* Pagination */}

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
              className="
              px-3
              py-2
              rounded-lg
              bg-theme
              border
              border-theme
              text-theme
              disabled:opacity-50
              disabled:cursor-not-allowed
              "
            >
              Previous
            </button>


            <span className="px-3 py-2 text-sm text-theme whitespace-nowrap">

              Page {currentPage} of {totalPages}

            </span>


            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
              className="
              px-3
              py-2
              rounded-lg
              bg-theme
              border
              border-theme
              text-theme
              disabled:opacity-50
              disabled:cursor-not-allowed
              "
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}