"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Leave } from "@/types/leave";
import { useTheme } from "@/context/ThemeContext";

export default function LeaveViewPage() {

  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const { themeSettings } = useTheme();

  const [leave, setLeave] = useState<Leave | null>(null);


  const handleDelete = async () => {

    const confirmDelete = confirm(
      "Are you sure you want to delete this leave?"
    );

    if (!confirmDelete) return;

    const response = await fetch("/api/leaves", {

      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        LeaveId: leave?.LeaveId,
      }),

    });

    if (response.ok) {

      alert("Leave Deleted Successfully");

      router.push("/hr/leave");

    }

  };


  useEffect(() => {

    const loadLeave = async () => {

      try {

        const response = await fetch("/api/leaves");

        const data: Leave[] = await response.json();

        const foundLeave = data.find(
          (item) => item.LeaveId === id
        );

        setLeave(foundLeave || null);

      } catch (error) {

        console.log(error);

      }

    };

    loadLeave();

  }, [id]);


  if (!leave) {

    return (
      <div className="text-center py-10 text-muted">
        Loading Leave...
      </div>
    );

  }


  return (

    <div className="space-y-5 sm:space-y-6 min-w-0">

      {/* Header */}

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
            Leave Details
          </h1>

          <p className="
            text-muted
            mt-1
            sm:mt-2
            text-sm
            sm:text-base
          ">
            View leave request information
          </p>

        </div>


        {/* Action Buttons */}

        <div className="
          grid
          grid-cols-1
          sm:flex
          gap-2
          sm:gap-3
          w-full
          sm:w-auto
        ">

          <button
            onClick={() => router.back()}
            className="
              bg-gray-600
              hover:bg-gray-700
              text-white
              px-5
              py-2
              rounded-lg
              w-full
              sm:w-auto
            "
          >
            Back
          </button>


          <Link
            href={`/hr/leave/edit/${leave.LeaveId}`}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-2
              rounded-lg
              text-center
              w-full
              sm:w-auto
            "
          >
            Edit
          </Link>


          <button
            onClick={handleDelete}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              px-5
              py-2
              rounded-lg
              w-full
              sm:w-auto
            "
          >
            Delete
          </button>

        </div>

      </div>


      {/* Leave Information */}

      <div className="
        card-theme
        rounded-xl
        shadow
        p-4
        sm:p-6
      ">

        <h2 className="
          text-lg
          sm:text-xl
          font-semibold
          text-theme
          mb-5
          sm:mb-6
        ">
          Leave Information
        </h2>


        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
          sm:gap-6
        ">


          {/* Leave ID */}

          <div>
            <p className="text-sm text-muted">
              Leave ID
            </p>

            <p className="
              font-semibold
              text-theme
              mt-1
              break-words
            ">
              {leave.LeaveId}
            </p>
          </div>


          {/* Employee ID */}

          <div>
            <p className="text-sm text-muted">
              Employee ID
            </p>

            <p className="
              font-semibold
              text-theme
              mt-1
              break-words
            ">
              {leave.EmployeeId}
            </p>
          </div>


          {/* Employee Name */}

          <div>
            <p className="text-sm text-muted">
              Employee Name
            </p>

            <p className="
              font-semibold
              text-theme
              mt-1
              break-words
            ">
              {leave.EmployeeName}
            </p>
          </div>


          {/* Leave Type */}

          <div>
            <p className="text-sm text-muted">
              Leave Type
            </p>

            <p className="
              font-semibold
              text-theme
              mt-1
              break-words
            ">
              {leave.LeaveType}
            </p>
          </div>


          {/* From Date */}

          <div>
            <p className="text-sm text-muted">
              From Date
            </p>

            <p className="
              font-semibold
              text-theme
              mt-1
            ">
              {leave.FromDate}
            </p>
          </div>


          {/* To Date */}

          <div>
            <p className="text-sm text-muted">
              To Date
            </p>

            <p className="
              font-semibold
              text-theme
              mt-1
            ">
              {leave.ToDate}
            </p>
          </div>


          {/* Reason */}

          <div className="md:col-span-2">

            <p className="text-sm text-muted">
              Reason
            </p>

            <p className="
              font-semibold
              text-theme
              mt-1
              break-words
              whitespace-pre-wrap
            ">
              {leave.Reason}
            </p>

          </div>


          {/* Status */}

          <div>

            <p className="text-sm text-muted mb-2">
              Status
            </p>

            <span
              className={
                leave.Status === "Approved"
                  ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm inline-block"
                  : leave.Status === "Rejected"
                    ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm inline-block"
                    : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm inline-block"
              }
            >
              {leave.Status}
            </span>

          </div>

        </div>

      </div>

    </div>

  );

}
