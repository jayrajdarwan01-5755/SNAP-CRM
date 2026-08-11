"use client";

import { useEffect, useState } from "react";
import { Leave } from "@/types/leave";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

export default function MyLeavesPage() {
  const { user } = useAuth();
  const { themeSettings } = useTheme();

  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.employeeid) {
      loadMyLeaves();
    }
  }, [user]);

  const loadMyLeaves = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/leaves?employeeId=${user?.employeeid}`
      );

      const data: Leave[] = await response.json();

      setLeaves(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 min-w-0">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-theme">
            My Leaves
          </h1>

          <p className="text-muted mt-1 sm:mt-2 text-sm sm:text-base">
            View your leave requests
          </p>
        </div>

        <Link
          href="/hr/leave/add"
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-4 sm:px-5
            py-2
            rounded-lg
            text-sm sm:text-base
            text-center
            w-full sm:w-auto
          "
        >
          + Apply Leave
        </Link>

      </div>

      {/* Employee Information */}
      <div
        className="
          rounded-xl
          shadow
          border
          p-4 sm:p-6
        "
        style={{
          backgroundColor: themeSettings.backgroundColor,
          borderColor: themeSettings.primaryColor,
        }}
      >

        <h2 className="text-lg sm:text-xl font-bold text-theme mb-2">
          Employee
        </h2>

        <p className="text-muted text-sm sm:text-base break-words">
          {user?.fullname}
        </p>

      </div>

      {/* Leave Table */}
      <div className="card-theme rounded-xl shadow overflow-hidden">

        {/* Responsive horizontal scroll */}
        <div className="w-full overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="table-header-theme">

              <tr className="text-theme">

                <th className="p-3 sm:p-4 text-left whitespace-nowrap">
                  ID
                </th>

                <th className="p-3 sm:p-4 text-left whitespace-nowrap">
                  Leave Type
                </th>

                <th className="p-3 sm:p-4 text-left whitespace-nowrap">
                  From Date
                </th>

                <th className="p-3 sm:p-4 text-left whitespace-nowrap">
                  To Date
                </th>

                <th className="p-3 sm:p-4 text-left whitespace-nowrap">
                  Reason
                </th>

                <th className="p-3 sm:p-4 text-left whitespace-nowrap">
                  Status
                </th>

                <th className="p-3 sm:p-4 text-center whitespace-nowrap">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={7}
                    className="text-center py-10 text-muted"
                  >
                    Loading Leaves...
                  </td>

                </tr>

              ) : leaves.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="text-center py-10 text-muted"
                  >
                    No Leave Found
                  </td>

                </tr>

              ) : (

                leaves.map((leave) => (

                  <tr
                    key={leave.LeaveId}
                    className="
                      border-t
                      border-theme
                      hover:bg-black/5
                      dark:hover:bg-white/10
                    "
                  >

                    <td className="p-3 sm:p-4 text-theme whitespace-nowrap">
                      {leave.LeaveId}
                    </td>

                    <td className="p-3 sm:p-4 text-theme whitespace-nowrap">
                      {leave.LeaveType}
                    </td>

                    <td className="p-3 sm:p-4 text-muted whitespace-nowrap">
                      {leave.FromDate}
                    </td>

                    <td className="p-3 sm:p-4 text-muted whitespace-nowrap">
                      {leave.ToDate}
                    </td>

                    <td className="p-3 sm:p-4 text-muted max-w-[250px]">
                      <div className="truncate">
                        {leave.Reason}
                      </div>
                    </td>

                    <td className="p-3 sm:p-4 whitespace-nowrap">

                      <span
                        className={
                          leave.Status === "Approved"
                            ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm"
                            : leave.Status === "Rejected"
                            ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs sm:text-sm"
                            : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs sm:text-sm"
                        }
                      >
                        {leave.Status}
                      </span>

                    </td>

                    <td className="p-3 sm:p-4 text-center whitespace-nowrap">

                      <Link
                        href={`/hr/leave/${leave.LeaveId}`}
                        className="
                          bg-green-600
                          hover:bg-green-700
                          text-white
                          px-3
                          py-1.5
                          rounded
                          text-xs sm:text-sm
                        "
                      >
                        View
                      </Link>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}