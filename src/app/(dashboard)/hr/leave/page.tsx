"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Leave } from "@/types/leave";
import { useAuth } from "@/context/AuthContext";

export default function LeavePage() {
  const { user } = useAuth();

  const role = user?.role ?? "";
  const employeeId = user?.employeeid ?? null;

  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchEmployee, setSearchEmployee] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [filterLeaveType, setFilterLeaveType] =
    useState("All Leave Type");

  const [currentPage, setCurrentPage] = useState(1);

  const leavesPerPage = 5;

  /* =========================
     CLEAR FILTER
  ========================= */

  const handleClear = () => {
    setSearchEmployee("");
    setFilterStatus("All Status");
    setFilterLeaveType("All Leave Type");
    setCurrentPage(1);
  };

  /* =========================
     LOAD LEAVES
  ========================= */

  useEffect(() => {
    if (user) {
      loadLeaves();
    }
  }, [user]);

  const loadLeaves = async () => {
    try {
      setLoading(true);

      let url = "/api/leaves";

      if (role === "Employee") {
        if (!employeeId) {
          setLeaves([]);
          return;
        }

        url = `/api/leaves?employeeid=${employeeId}`;
      }

      console.log("Leave Role:", role);
      console.log("Leave Employee ID:", employeeId);
      console.log("Leave API:", url);

      const response = await fetch(url);

      const data: Leave[] = await response.json();

      console.log("Leaves From API:", data);

      setLeaves(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     FILTER
  ========================= */

  const filteredLeaves = leaves.filter((leave) => {
    const employeeMatch = leave.EmployeeName
      ?.toLowerCase()
      .includes(searchEmployee.toLowerCase());

    const statusMatch =
      filterStatus === "All Status" ||
      leave.Status === filterStatus;

    const leaveTypeMatch =
      filterLeaveType === "All Leave Type" ||
      leave.LeaveType === filterLeaveType;

    return (
      employeeMatch &&
      statusMatch &&
      leaveTypeMatch
    );
  });

  /* =========================
     PAGINATION
  ========================= */

  const totalPages = Math.ceil(
    filteredLeaves.length / leavesPerPage
  );

  const lastIndex = currentPage * leavesPerPage;

  const firstIndex = lastIndex - leavesPerPage;

  const currentLeaves = filteredLeaves.slice(
    firstIndex,
    lastIndex
  );

  /* =========================
     UPDATE STATUS
  ========================= */

  const updateLeaveStatus = async (
    id: number,
    status: string
  ) => {
    const selectedLeave = leaves.find(
      (leave) => leave.LeaveId === id
    );

    if (!selectedLeave) return;

    await fetch("/api/leaves", {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ...selectedLeave,
        Status: status,
      }),
    });

    loadLeaves();
  };

  /* =========================
     STATUS STYLE
  ========================= */

  const getStatusClass = (status: string) => {
    if (status === "Approved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="space-y-5 sm:space-y-6 min-w-0">

      {/* =========================
          HEADER
      ========================= */}

      <div className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">

        <div>

          <h1 className="
            text-2xl
            sm:text-3xl
            font-bold
            text-theme
          ">
            Leave Management
          </h1>

          <p className="
            text-muted
            mt-1
            sm:mt-2
            text-sm
            sm:text-base
          ">
            Manage employee leave requests
          </p>

        </div>

        <Link
          href="/hr/leave/add"
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-2.5
            rounded-lg
            text-center
            w-full
            sm:w-auto
            whitespace-nowrap
          "
        >
          + Apply Leave
        </Link>

      </div>

      {/* =========================
          SEARCH & FILTER CARD
      ========================= */}

      <div className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow-sm
        p-4
        sm:p-6
      ">

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-5
          gap-3
          sm:gap-4
        ">

          {/* Search Employee */}

          <input
            type="text"
            placeholder="Search Employee"
            value={searchEmployee}
            onChange={(e) => {
              setSearchEmployee(e.target.value);
              setCurrentPage(1);
            }}
            className="
              input-theme
              w-full
              min-w-0
            "
          />

          {/* Leave Type */}

          <select
            value={filterLeaveType}
            onChange={(e) => {
              setFilterLeaveType(e.target.value);
              setCurrentPage(1);
            }}
            className="
              input-theme
              w-full
              min-w-0
            "
          >

            <option value="All Leave Type">
              All Leave Type
            </option>

            <option value="Casual Leave">
              Casual Leave
            </option>

            <option value="Sick Leave">
              Sick Leave
            </option>

            <option value="Paid Leave">
              Paid Leave
            </option>

          </select>

          {/* Status */}

          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="
              input-theme
              w-full
              min-w-0
            "
          >

            <option value="All Status">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>

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
              w-full
            "
          >
            Search
          </button>

          {/* Clear Button */}

          <button
            type="button"
            onClick={handleClear}
            className="
              button-secondary
              w-full
            "
          >
            Clear
          </button>

        </div>

      </div>

      {/* =========================
          DATA CARD
      ========================= */}

      <div className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow-sm
        overflow-hidden
      ">

        {/* =========================
            DESKTOP / TABLET TABLE
        ========================= */}

        <div className="hidden md:block w-full overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead className="table-header-theme">

              <tr className="text-theme">

                <th className="p-4 text-left whitespace-nowrap">
                  ID
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Employee
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Leave Type
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  From Date
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  To Date
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Reason
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Status
                </th>

                <th className="p-4 text-center whitespace-nowrap">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={8}
                    className="
                      text-center
                      py-10
                      text-muted
                    "
                  >
                    Loading Leaves...
                  </td>

                </tr>

              ) : currentLeaves.length === 0 ? (

                <tr>

                  <td
                    colSpan={8}
                    className="
                      text-center
                      py-10
                      text-muted
                    "
                  >
                    No Leave Found
                  </td>

                </tr>

              ) : (

                currentLeaves.map((leave) => (

                  <tr
                    key={leave.LeaveId}
                    className="
                      border-t
                      border-theme
                      text-theme
                      hover:bg-black/5
                      dark:hover:bg-white/10
                      table-row-theme
                    "
                  >

                    <td className="p-4 whitespace-nowrap">
                      {leave.LeaveId}
                    </td>

                    <td className="p-4 whitespace-nowrap font-medium">
                      {leave.EmployeeName}
                    </td>

                    <td className="p-4 whitespace-nowrap text-muted">
                      {leave.LeaveType}
                    </td>

                    <td className="p-4 whitespace-nowrap text-muted">
                      {leave.FromDate}
                    </td>

                    <td className="p-4 whitespace-nowrap text-muted">
                      {leave.ToDate}
                    </td>

                    <td className="
                      p-4
                      text-muted
                      max-w-[250px]
                      truncate
                    ">
                      {leave.Reason}
                    </td>

                    <td className="p-4 whitespace-nowrap">

                      <span
                        className={`
                          ${getStatusClass(leave.Status)}
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-medium
                        `}
                      >
                        {leave.Status}
                      </span>

                    </td>

                    <td className="p-4">

                      <div className="
                        flex
                        justify-center
                        gap-2
                        flex-wrap
                      ">

                        <Link
                          href={`/hr/leave/${leave.LeaveId}`}
                          className="
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            px-3
                            py-1.5
                            rounded
                            text-sm
                            whitespace-nowrap
                          "
                        >
                          View
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            updateLeaveStatus(
                              leave.LeaveId,
                              "Approved"
                            )
                          }
                          className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-3
                            py-1.5
                            rounded
                            text-sm
                            whitespace-nowrap
                          "
                        >
                          Approve
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateLeaveStatus(
                              leave.LeaveId,
                              "Rejected"
                            )
                          }
                          className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-3
                            py-1.5
                            rounded
                            text-sm
                            whitespace-nowrap
                          "
                        >
                          Reject
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* =========================
            MOBILE CARD LAYOUT
        ========================= */}

        <div className="block md:hidden">

          {loading ? (

            <div className="
              text-center
              py-10
              text-muted
            ">
              Loading Leaves...
            </div>

          ) : currentLeaves.length === 0 ? (

            <div className="
              text-center
              py-10
              text-muted
            ">
              No Leave Found
            </div>

          ) : (

            <div className="divide-y divide-theme">

              {currentLeaves.map((leave) => (

                <div
                  key={leave.LeaveId}
                  className="
                    p-4
                    space-y-3
                    table-row-theme
                  "
                >

                  {/* Employee */}

                  <div className="flex justify-between gap-3">

                    <span className="
                      font-semibold
                      text-theme
                    ">
                      Employee
                    </span>

                    <span className="
                      text-theme
                      text-right
                    ">
                      {leave.EmployeeName}
                    </span>

                  </div>

                  {/* Leave ID */}

                  <div className="flex justify-between gap-3">

                    <span className="
                      text-muted
                    ">
                      ID
                    </span>

                    <span className="text-theme">
                      {leave.LeaveId}
                    </span>

                  </div>

                  {/* Leave Type */}

                  <div className="flex justify-between gap-3">

                    <span className="text-muted">
                      Leave Type
                    </span>

                    <span className="
                      text-theme
                      text-right
                    ">
                      {leave.LeaveType}
                    </span>

                  </div>

                  {/* From Date */}

                  <div className="flex justify-between gap-3">

                    <span className="text-muted">
                      From Date
                    </span>

                    <span className="
                      text-theme
                      text-right
                    ">
                      {leave.FromDate}
                    </span>

                  </div>

                  {/* To Date */}

                  <div className="flex justify-between gap-3">

                    <span className="text-muted">
                      To Date
                    </span>

                    <span className="
                      text-theme
                      text-right
                    ">
                      {leave.ToDate}
                    </span>

                  </div>

                  {/* Reason */}

                  <div>

                    <p className="text-muted mb-1">
                      Reason
                    </p>

                    <p className="text-theme break-words">
                      {leave.Reason}
                    </p>

                  </div>

                  {/* Status */}

                  <div className="flex justify-between items-center">

                    <span className="text-muted">
                      Status
                    </span>

                    <span
                      className={`
                        ${getStatusClass(leave.Status)}
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                      `}
                    >
                      {leave.Status}
                    </span>

                  </div>

                  {/* Actions */}

                  <div className="
                    flex
                    gap-2
                    pt-2
                  ">

                    <Link
                      href={`/hr/leave/${leave.LeaveId}`}
                      className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-3
                        py-1.5
                        rounded
                        text-sm
                        flex-1
                        text-center
                      "
                    >
                      View
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        updateLeaveStatus(
                          leave.LeaveId,
                          "Approved"
                        )
                      }
                      className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-3
                        py-1.5
                        rounded
                        text-sm
                        flex-1
                      "
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateLeaveStatus(
                          leave.LeaveId,
                          "Rejected"
                        )
                      }
                      className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-3
                        py-1.5
                        rounded
                        text-sm
                        flex-1
                      "
                    >
                      Reject
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

      {/* =========================
          PAGINATION CARD
      ========================= */}

      <div className="
        card-theme
        border
        border-theme
        rounded-xl
        p-4
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">

        {/* Showing */}

        <div className="text-muted text-sm text-center sm:text-left">

          Showing{" "}
          {filteredLeaves.length === 0
            ? 0
            : firstIndex + 1}{" "}
          to{" "}
          {Math.min(
            lastIndex,
            filteredLeaves.length
          )}{" "}
          of {filteredLeaves.length}

        </div>

        {/* Pagination Buttons */}

        <div className="
          flex
          justify-center
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
              sm:px-4
              py-2
              rounded-lg
              bg-theme
              border
              border-theme
              text-theme
              disabled:opacity-50
              whitespace-nowrap
            "
          >
            Previous
          </button>

          <span className="
            px-3
            sm:px-4
            py-2
            text-theme
            whitespace-nowrap
          ">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            type="button"
            disabled={
              currentPage >= totalPages ||
              totalPages === 0
            }
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
            className="
              px-3
              sm:px-4
              py-2
              rounded-lg
              bg-theme
              border
              border-theme
              text-theme
              disabled:opacity-50
              whitespace-nowrap
            "
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}