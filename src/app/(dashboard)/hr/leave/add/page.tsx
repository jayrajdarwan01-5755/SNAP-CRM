"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Employee } from "@/types/employee";

export default function AddLeavePage() {
  const router = useRouter();

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await fetch("/api/employees");

        const data: Employee[] = await response.json();

        setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadEmployees();
  }, []);

  const handleEmployeeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id = e.target.value;

    setEmployeeId(id);

    const employee = employees.find(
      (emp) => emp.EmployeeId === Number(id)
    );

    if (employee) {
      setEmployeeName(
        `${employee.FirstName} ${employee.LastName}`
      );
    } else {
      setEmployeeName("");
    }
  };

  const handleSave = async () => {
    const response = await fetch("/api/leaves", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        EmployeeId: Number(employeeId),
        EmployeeName: employeeName,
        LeaveType: leaveType,
        FromDate: fromDate,
        ToDate: toDate,
        Reason: reason,
        Status: status,
      }),
    });

    if (response.ok) {
      alert("Leave Applied Successfully");

      router.push("/hr/leave");
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 min-w-0">

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-theme">
            Apply Leave
          </h1>

          <p className="text-muted mt-1 sm:mt-2 text-sm sm:text-base">
            Create employee leave request
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="
            bg-gray-600
            hover:bg-gray-700
            text-white
            px-5
            py-2.5
            rounded-lg
            w-full
            sm:w-auto
          "
        >
          Back
        </button>

      </div>

      {/* Form Card */}

      <div className="card-theme border-theme rounded-xl shadow-sm p-4 sm:p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

          {/* Employee */}

          <div>
            <label className="block text-sm font-semibold text-theme mb-2">
              Employee
            </label>

            <select
              value={employeeId}
              onChange={handleEmployeeChange}
              className="input-theme w-full min-w-0"
            >
              <option value="">
                Select Employee
              </option>

              {employees.map((employee) => (
                <option
                  key={employee.EmployeeId}
                  value={employee.EmployeeId}
                >
                  {employee.EmployeeCode} -{" "}
                  {employee.FirstName} {employee.LastName}
                </option>
              ))}
            </select>
          </div>

          {/* Employee Name */}

          <div>
            <label className="block text-sm font-semibold text-theme mb-2">
              Employee Name
            </label>

            <input
              type="text"
              value={employeeName}
              readOnly
              className="input-theme w-full min-w-0"
            />
          </div>

          {/* Leave Type */}

          <div>
            <label className="block text-sm font-semibold text-theme mb-2">
              Leave Type
            </label>

            <select
              value={leaveType}
              onChange={(e) =>
                setLeaveType(e.target.value)
              }
              className="input-theme w-full min-w-0"
            >
              <option value="">
                Select Leave Type
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

              <option value="Earned Leave">
                Earned Leave
              </option>
            </select>
          </div>

          {/* Status */}

          <div>
            <label className="block text-sm font-semibold text-theme mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="input-theme w-full min-w-0"
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
            <label className="block text-sm font-semibold text-theme mb-2">
              From Date
            </label>

            <input
              type="date"
              value={fromDate}
              onChange={(e) =>
                setFromDate(e.target.value)
              }
              className="input-theme w-full min-w-0"
            />
          </div>

          {/* To Date */}

          <div>
            <label className="block text-sm font-semibold text-theme mb-2">
              To Date
            </label>

            <input
              type="date"
              value={toDate}
              onChange={(e) =>
                setToDate(e.target.value)
              }
              className="input-theme w-full min-w-0"
            />
          </div>

          {/* Reason */}

          <div className="md:col-span-2">

            <label className="block text-sm font-semibold text-theme mb-2">
              Reason
            </label>

            <textarea
              rows={4}
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              placeholder="Enter reason"
              className="input-theme w-full min-w-0 resize-y"
            />

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

          <button
            type="button"
            onClick={() => router.back()}
            className="
              bg-gray-600
              hover:bg-gray-700
              text-white
              px-6
              py-2.5
              rounded-lg
              w-full
              sm:w-auto
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-2.5
              rounded-lg
              w-full
              sm:w-auto
            "
          >
            Save Leave
          </button>

        </div>

      </div>

    </div>
  );
}
