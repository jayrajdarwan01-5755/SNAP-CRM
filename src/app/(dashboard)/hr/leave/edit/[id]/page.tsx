"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Leave } from "@/types/leave";
import { useTheme } from "@/context/ThemeContext";

export default function EditLeavePage() {

  const router = useRouter();
  const params = useParams();
  const leaveId = Number(params.id);

  const { themeSettings } = useTheme();

  const [employeeId, setEmployeeId] = useState(0);
  const [employeeName, setEmployeeName] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {

    const loadLeave = async () => {

      try {

        const response = await fetch("/api/leaves");

        const data: Leave[] = await response.json();

        const leave = data.find(
          (item) => item.LeaveId === leaveId
        );

        if (leave) {

          setEmployeeId(leave.EmployeeId);
          setEmployeeName(leave.EmployeeName);
          setLeaveType(leave.LeaveType);
          setFromDate(leave.FromDate);
          setToDate(leave.ToDate);
          setReason(leave.Reason);
          setStatus(leave.Status);

        }

      } catch (error) {

        console.log(error);

      }

    };

    loadLeave();

  }, [leaveId]);


  const handleUpdate = async () => {

    try {

      const response = await fetch("/api/leaves", {

        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          LeaveId: leaveId,
          EmployeeId: employeeId,
          EmployeeName: employeeName,
          LeaveType: leaveType,
          FromDate: fromDate,
          ToDate: toDate,
          Reason: reason,
          Status: status,

        }),

      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {

        alert("Leave Updated Successfully");

        router.push("/hr/leave");

      } else {

        alert(
          data.message ||
          "Failed to update leave"
        );

      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

  };


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
            Edit Leave
          </h1>

          <p className="
            text-muted
            mt-1
            sm:mt-2
            text-sm
            sm:text-base
          ">
            Update leave information
          </p>

        </div>

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

      </div>


      {/* Form */}

      <div className="
        card-theme
        rounded-xl
        shadow
        p-4
        sm:p-6
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
          sm:gap-6
        ">


          {/* Employee ID */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Employee ID
            </label>

            <input
              type="number"
              value={employeeId}
              onChange={(e) =>
                setEmployeeId(
                  Number(e.target.value)
                )
              }
              className="
                input-theme
                w-full
                min-w-0
              "
            />

          </div>


          {/* Employee Name */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Employee Name
            </label>

            <input
              type="text"
              value={employeeName}
              onChange={(e) =>
                setEmployeeName(e.target.value)
              }
              className="
                input-theme
                w-full
                min-w-0
              "
            />

          </div>


          {/* Leave Type */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Leave Type
            </label>

            <select
              value={leaveType}
              onChange={(e) =>
                setLeaveType(e.target.value)
              }
              className="
                input-theme
                w-full
                min-w-0
              "
            >

              <option value="Casual Leave">
                Casual Leave
              </option>

              <option value="Sick Leave">
                Sick Leave
              </option>

              <option value="Earned Leave">
                Earned Leave
              </option>

              <option value="Maternity Leave">
                Maternity Leave
              </option>

            </select>

          </div>


          {/* Status */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="
                input-theme
                w-full
                min-w-0
              "
            >

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

          </div>


          {/* From Date */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              From Date
            </label>

            <input
              type="date"
              value={fromDate}
              onChange={(e) =>
                setFromDate(e.target.value)
              }
              className="
                input-theme
                w-full
                min-w-0
              "
            />

          </div>


          {/* To Date */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              To Date
            </label>

            <input
              type="date"
              value={toDate}
              onChange={(e) =>
                setToDate(e.target.value)
              }
              className="
                input-theme
                w-full
                min-w-0
              "
            />

          </div>


          {/* Reason */}

          <div className="md:col-span-2">

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Reason
            </label>

            <textarea
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              rows={4}
              className="
                input-theme
                w-full
                min-w-0
                resize-y
              "
            />

          </div>

        </div>


        {/* Update Button */}

        <div className="
          mt-6
          sm:mt-8
          flex
          justify-stretch
          sm:justify-end
        ">

          <button
            onClick={handleUpdate}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-2
              rounded-lg
              w-full
              sm:w-auto
            "
          >
            Update Leave
          </button>

        </div>

      </div>

    </div>

  );

}
