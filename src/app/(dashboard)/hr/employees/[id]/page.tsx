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
      <div className="p-8 text-center text-theme">
        Loading employee...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-8 text-center text-red-600">
        Employee not found
      </div>
    );
  }

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-theme">
            Employee Details
          </h1>

          <p className="mt-2 text-muted">
            View employee information
          </p>

        </div>

        <div className="flex gap-3">

          <Link
            href={`/hr/employees/edit/${employee.EmployeeId}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Edit
          </Link>

          <Link
            href="/hr/employees"
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
          >
            Back
          </Link>

        </div>

      </div>
            {/* Personal Details */}

      <div className="card-theme rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold text-theme mb-6">
          Personal Details
        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl border p-6"
          style={{
            background: "rgba(128,128,128,0.08)",
          }}
        >

          <div>
            <p className="text-muted">
              Employee ID
            </p>

            <p className="font-semibold text-theme">
              {employee.EmployeeId}
            </p>
          </div>

          <div>
            <p className="text-muted">
              Employee Code
            </p>

            <p className="font-semibold text-theme">
              {employee.EmployeeCode}
            </p>
          </div>

          <div>
            <p className="text-muted">
              First Name
            </p>

            <p className="font-semibold text-theme">
              {employee.FirstName}
            </p>
          </div>

          <div>
            <p className="text-muted">
              Last Name
            </p>

            <p className="font-semibold text-theme">
              {employee.LastName}
            </p>
          </div>

          <div>
            <p className="text-muted">
              Email
            </p>

            <p className="font-semibold text-theme">
              {employee.Email}
            </p>
          </div>

          <div>
            <p className="text-muted">
              Phone
            </p>

            <p className="font-semibold text-theme">
              {employee.Phone}
            </p>
          </div>

          <div>
            <p className="text-muted">
              Gender
            </p>

            <p className="font-semibold text-theme">
              {employee.Gender}
            </p>
          </div>

          <div>
            <p className="text-muted">
              Date of Birth
            </p>

            <p className="font-semibold text-theme">
              {employee.DOB}
            </p>
          </div>

        </div>

      </div>
            {/* Job Details */}

      <div className="card-theme rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold text-theme mb-6">
          Job Details
        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl border p-6"
          style={{
            background: "rgba(128,128,128,0.08)",
          }}
        >

          <div>

            <p className="text-muted">
              Joining Date
            </p>

            <p className="font-semibold text-theme">
              {employee.JoiningDate}
            </p>

          </div>

          <div>

            <p className="text-muted">
              Department
            </p>

            <p className="font-semibold text-theme">
              {employee.Department}
            </p>

          </div>

          <div>

            <p className="text-muted">
              Designation
            </p>

            <p className="font-semibold text-theme">
              {employee.Designation}
            </p>

          </div>

          <div>

            <p className="text-muted">
              Salary
            </p>

            <p className="font-semibold text-theme">
              ₹{employee.Salary.toLocaleString("en-IN")}
            </p>

          </div>

          <div>

            <p className="text-muted mb-2">
              Status
            </p>

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