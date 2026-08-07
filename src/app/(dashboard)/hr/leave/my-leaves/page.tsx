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

    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-theme">
            My Leaves
          </h1>

          <p className="text-muted mt-2">
            View your leave requests
          </p>

        </div>

        <Link
          href="/hr/leave/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Apply Leave
        </Link>

      </div>


      {/* Employee Information */}

      <div
        className="rounded-xl shadow border p-6"
        style={{
          backgroundColor: themeSettings.backgroundColor,
          borderColor: themeSettings.primaryColor,
        }}
      >

        <h2 className="text-xl font-bold text-theme mb-2">
          Employee
        </h2>

        <p className="text-muted">
          {user?.fullname}
        </p>

      </div>


      {/* Leave Table */}

      <div className="card-theme rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="table-header-theme">

            <tr className="text-theme">

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Leave Type
              </th>

              <th className="p-4 text-left">
                From Date
              </th>

              <th className="p-4 text-left">
                To Date
              </th>

              <th className="p-4 text-left">
                Reason
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
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
                  className="border-t hover:bg-black/5 dark:hover:bg-white/10"
                >

                  <td className="p-4 text-theme">
                    {leave.LeaveId}
                  </td>

                  <td className="p-4 text-theme">
                    {leave.LeaveType}
                  </td>

                  <td className="p-4 text-muted">
                    {leave.FromDate}
                  </td>

                  <td className="p-4 text-muted">
                    {leave.ToDate}
                  </td>

                  <td className="p-4 text-muted">
                    {leave.Reason}
                  </td>

                  <td className="p-4">

                    <span
                      className={
                        leave.Status === "Approved"
                          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                          : leave.Status === "Rejected"
                          ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                          : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                      }
                    >
                      {leave.Status}
                    </span>

                  </td>

                  <td className="p-4 text-center">

                    <Link
                      href={`/hr/leave/${leave.LeaveId}`}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
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

  );

}