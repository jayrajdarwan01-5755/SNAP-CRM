"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Employee } from "@/types/employee";

export default function EmployeeViewPage() {

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

    }
    catch (error) {

      console.log(error);

    }
    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="p-8 text-center text-gray-600">

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

          <h1 className="text-3xl font-bold text-gray-900">
            Employee Details
          </h1>

          <p className="mt-2 text-gray-600">
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

      <div className="bg-white border rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Personal Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>

            <p className="text-gray-500">
              Employee ID
            </p>

            <p className="font-semibold text-gray-900">
              {employee.EmployeeId}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Employee Code
            </p>

            <p className="font-semibold text-gray-900">
              {employee.EmployeeCode}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              First Name
            </p>

            <p className="font-semibold text-gray-900">
              {employee.FirstName}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Last Name
            </p>

            <p className="font-semibold text-gray-900">
              {employee.LastName}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Email
            </p>

            <p className="font-semibold text-gray-900">
              {employee.Email}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Phone
            </p>

            <p className="font-semibold text-gray-900">
              {employee.Phone}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Gender
            </p>

            <p className="font-semibold text-gray-900">
              {employee.Gender}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Date of Birth
            </p>

            <p className="font-semibold text-gray-900">
              {employee.DOB}
            </p>

          </div>

        </div>

      </div>
            {/* Job Details */}

      <div className="bg-white border rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Job Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>

            <p className="text-gray-500">
              Joining Date
            </p>

            <p className="font-semibold text-gray-900">
              {employee.JoiningDate}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Department
            </p>

            <p className="font-semibold text-gray-900">
              {employee.Department}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Designation
            </p>

            <p className="font-semibold text-gray-900">
              {employee.Designation}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Salary
            </p>

            <p className="font-semibold text-gray-900">
              ₹{employee.Salary.toLocaleString("en-IN")}
            </p>

          </div>

          <div>

            <p className="text-gray-500 mb-2">
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