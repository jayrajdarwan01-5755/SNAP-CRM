"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Employee } from "@/types/employee";
import { useTheme } from "@/context/ThemeContext";

export default function EmployeeViewPage() {
  const { themeSettings } = useTheme();

  const params = useParams();

  const employeeId = Number(params.id);

  const [employee, setEmployee] = useState<Employee | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/employees");

      const data: Employee[] = await response.json();

      const selectedEmployee = data.find(
        (emp) => emp.EmployeeId === employeeId
      );

      setEmployee(selectedEmployee ?? null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 sm:p-10 text-center text-theme">
        Loading employee...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-6 sm:p-10 text-center text-theme">
        Employee not found
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6 min-w-0">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-theme">
            Employee Details
          </h1>

          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted">
            View employee information
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">

          <Link
            href={`/hr/employees/edit/${employee.EmployeeId}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-center transition w-full sm:w-auto"
          >
            Edit
          </Link>

          <Link
            href="/hr/employees"
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg text-center transition w-full sm:w-auto"
          >
            Back
          </Link>

        </div>

      </div>

      {/* Personal Details */}
      <div className="card-theme rounded-xl shadow p-4 sm:p-6">

        <h2 className="text-xl sm:text-2xl font-bold text-theme mb-5 sm:mb-6">
          Personal Details
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 rounded-xl border p-4 sm:p-6"
          style={{
            background: "rgba(128,128,128,0.08)",
          }}
        >

          <div>
            <p className="text-muted text-sm">Employee ID</p>
            <p className="font-semibold text-theme break-words">
              {employee.EmployeeId}
            </p>
          </div>

          <div>
            <p className="text-muted text-sm">Employee Code</p>
            <p className="font-semibold text-theme break-words">
              {employee.EmployeeCode}
            </p>
          </div>

          <div>
            <p className="text-muted text-sm">First Name</p>
            <p className="font-semibold text-theme break-words">
              {employee.FirstName}
            </p>
          </div>

          <div>
            <p className="text-muted text-sm">Last Name</p>
            <p className="font-semibold text-theme break-words">
              {employee.LastName}
            </p>
          </div>

          <div>
            <p className="text-muted text-sm">Email</p>
            <p className="font-semibold text-theme break-all">
              {employee.Email}
            </p>
          </div>

          <div>
            <p className="text-muted text-sm">Phone</p>
            <p className="font-semibold text-theme break-words">
              {employee.Phone}
            </p>
          </div>

          <div>
            <p className="text-muted text-sm">Gender</p>
            <p className="font-semibold text-theme break-words">
              {employee.Gender}
            </p>
          </div>

          <div>
            <p className="text-muted text-sm">Date of Birth</p>
            <p className="font-semibold text-theme break-words">
              {employee.DOB}
            </p>
          </div>

        </div>

      </div>

      {/* Job Details */}
      <div className="card-theme rounded-xl shadow p-4 sm:p-6">

        <h2 className="text-xl sm:text-2xl font-bold text-theme mb-5 sm:mb-6">
          Job Details
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 rounded-xl border p-4 sm:p-6"
          style={{
            background: "rgba(128,128,128,0.08)",
          }}
        >

          <div>
            <p className="text-muted text-sm">Joining Date</p>

            <p className="font-semibold text-theme break-words">
              {employee.JoiningDate}
            </p>
          </div>

          <div>
            <p className="text-muted text-sm">Department</p>

            <p className="font-semibold text-theme break-words">
              {employee.Department}
            </p>
          </div>

          <div>
            <p className="text-muted text-sm">Designation</p>

            <p className="font-semibold text-theme break-words">
              {employee.Designation}
            </p>
          </div>

          <div>
            <p className="text-muted text-sm">Salary</p>

            <p className="font-semibold text-theme break-words">
              ₹{employee.Salary.toLocaleString("en-IN")}
            </p>
          </div>

          <div>
            <p className="text-muted text-sm mb-2">Status</p>

            <span
              className={
                employee.Status === "Active"
                  ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                  : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
              }
            >
              {employee.Status}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
