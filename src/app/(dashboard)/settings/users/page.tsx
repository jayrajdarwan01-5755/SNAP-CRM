"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    loadUsers();
  }, []);

  // ======================================
  // LOAD USERS
  // ======================================

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/users");

      const data: User[] = await response.json();

      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // DELETE USER
  // ======================================

  const handleDelete = async (userid: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    const response = await fetch("/api/users", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userid,
      }),
    });

    if (response.ok) {
      setUsers((prev) =>
        prev.filter(
          (user) => user.userid !== userid
        )
      );
    }
  };

  // ======================================
  // CLEAR FILTER
  // ======================================

  const handleClearFilter = () => {
    setSearchText("");
    setCurrentPage(1);
  };

  // ======================================
  // FILTER USERS
  // ======================================

  const filteredUsers = users.filter((user) => {
    return (
      user.username
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||

      user.fullname
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||

      user.role
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||

      (user.status ? "active" : "inactive")
        .includes(searchText.toLowerCase())
    );
  });

  // ======================================
  // PAGINATION
  // ======================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredUsers.length / usersPerPage
    )
  );

  const lastUserIndex =
    currentPage * usersPerPage;

  const firstUserIndex =
    lastUserIndex - usersPerPage;

  const currentUsers =
    filteredUsers.slice(
      firstUserIndex,
      lastUserIndex
    );

  const showingFrom =
    filteredUsers.length === 0
      ? 0
      : firstUserIndex + 1;

  const showingTo = Math.min(
    lastUserIndex,
    filteredUsers.length
  );

  return (
    <div className="space-y-6">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="
        flex
        flex-col
        sm:flex-row
        sm:justify-between
        sm:items-center
        gap-4
      ">

        <div>

          <h1 className="
            text-2xl
            sm:text-3xl
            font-bold
            text-theme
          ">
            User Management
          </h1>

          <p className="text-muted mt-2">
            Manage system users
          </p>

        </div>

        <div className="
          flex
          flex-col
          sm:flex-row
          gap-3
          w-full
          sm:w-auto
        ">

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
            href="/settings/users/add"
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
            + Add User
          </Link>

        </div>

      </div>


      {/* ======================================
          SEARCH & FILTER
      ====================================== */}

      <div
        className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        p-4
        sm:p-6
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
            placeholder="Search Username, Role or Status"
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


      {/* ======================================
          USERS DATA CARD
      ====================================== */}

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

        {/* ======================================
            DESKTOP / TABLET
        ====================================== */}

        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-theme">

              <tr className="text-theme">

                <th className="px-4 py-4 text-left">
                  Username
                </th>

                <th className="px-4 py-4 text-left">
                  Full Name
                </th>

                <th className="px-4 py-4 text-left">
                  Role
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
                    colSpan={5}
                    className="
                    text-center
                    py-10
                    text-muted
                    "
                  >
                    Loading users...
                  </td>

                </tr>

              ) : filteredUsers.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="
                    text-center
                    py-10
                    text-muted
                    "
                  >
                    No users found
                  </td>

                </tr>

              ) : (

                currentUsers.map((user) => (

                  <tr
                    key={user.userid}
                    className="
                    border-t
                    border-theme
                    hover:bg-theme
                    table-row-theme
                    "
                  >

                    {/* Username */}

                    <td className="
                      px-4
                      py-4
                      text-theme
                      font-medium
                    ">
                      {user.username}
                    </td>


                    {/* Full Name */}

                    <td className="
                      px-4
                      py-4
                      text-muted
                    ">
                      {user.fullname}
                    </td>


                    {/* Role */}

                    <td className="
                      px-4
                      py-4
                      text-muted
                    ">
                      {user.role}
                    </td>


                    {/* Status */}

                    <td className="px-4 py-4">

                      <span
                        className={
                          user.status
                            ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                            : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                        }
                      >
                        {user.status
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </td>


                    {/* Actions */}

                    <td className="px-4 py-4">

                      <div className="
                        flex
                        justify-center
                        gap-2
                      ">

                        <Link
                          href={`/settings/users/${user.userid}`}
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
                          href={`/settings/users/edit/${user.userid}`}
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
                            handleDelete(user.userid)
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


        {/* ======================================
            MOBILE
        ====================================== */}

        <div className="md:hidden">

          {loading ? (

            <div className="
              text-center
              py-10
              text-muted
            ">
              Loading users...
            </div>

          ) : filteredUsers.length === 0 ? (

            <div className="
              text-center
              py-10
              text-muted
            ">
              No users found
            </div>

          ) : (

            <div className="
              divide-y
              divide-gray-200
              dark:divide-gray-700
            ">

              {currentUsers.map((user) => (

                <div
                  key={user.userid}
                  className="
                  p-5
                  table-row-theme
                  "
                >

                  {/* User Header */}

                  <div className="
                    flex
                    justify-between
                    items-start
                    gap-3
                    mb-4
                  ">

                    <div>

                      <h3 className="
                        font-semibold
                        text-lg
                        text-theme
                      ">
                        {user.username}
                      </h3>

                      <p className="
                        text-sm
                        text-muted
                        mt-1
                      ">
                        {user.fullname}
                      </p>

                    </div>


                    {/* Status */}

                    <span
                      className={
                        user.status
                          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
                          : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs"
                      }
                    >
                      {user.status
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </div>


                  {/* User Information */}

                  <div className="space-y-3">

                    <div className="
                      flex
                      justify-between
                      gap-4
                    ">

                      <span className="
                        text-sm
                        text-muted
                      ">
                        Username
                      </span>

                      <span className="
                        text-sm
                        font-medium
                        text-theme
                        text-right
                      ">
                        {user.username}
                      </span>

                    </div>


                    <div className="
                      flex
                      justify-between
                      gap-4
                    ">

                      <span className="
                        text-sm
                        text-muted
                      ">
                        Full Name
                      </span>

                      <span className="
                        text-sm
                        font-medium
                        text-theme
                        text-right
                      ">
                        {user.fullname}
                      </span>

                    </div>


                    <div className="
                      flex
                      justify-between
                      gap-4
                    ">

                      <span className="
                        text-sm
                        text-muted
                      ">
                        Role
                      </span>

                      <span className="
                        text-sm
                        font-medium
                        text-theme
                        text-right
                      ">
                        {user.role}
                      </span>

                    </div>

                  </div>


                  {/* Mobile Actions */}

                  <div className="
                    flex
                    gap-2
                    mt-5
                  ">

                    <Link
                      href={`/settings/users/${user.userid}`}
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
                      href={`/settings/users/edit/${user.userid}`}
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
                        handleDelete(user.userid)
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


      {/* ======================================
          PAGINATION
      ====================================== */}

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

            <span className="
              font-semibold
              text-theme
            ">
              {showingFrom}
            </span>{" "}

            to{" "}

            <span className="
              font-semibold
              text-theme
            ">
              {showingTo}
            </span>{" "}

            of{" "}

            <span className="
              font-semibold
              text-theme
            ">
              {filteredUsers.length}
            </span>{" "}

            users

          </p>


          {/* Pagination Buttons */}

          <div className="
            flex
            items-center
            gap-2
          ">

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


            <span className="
              px-3
              py-2
              text-sm
              text-theme
              whitespace-nowrap
            ">
              Page {currentPage} of {totalPages}
            </span>


            <button
              type="button"
              disabled={
                currentPage >= totalPages
              }
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