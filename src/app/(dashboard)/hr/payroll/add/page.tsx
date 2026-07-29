"use client";

import { useEffect, useState } from "react";
import { Employee } from "@/types/employee";
import { useRouter } from "next/navigation";

export default function AddPayrollPage() {

  const router = useRouter();

  // Employee List
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Form States
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [month, setMonth] = useState("");
  const [basic, setBasic] = useState("");
  const [allowance, setAllowance] = useState("");
  const [deduction, setDeduction] = useState("");
  const [netSalary, setNetSalary] = useState("");

  // ===========================
  // Load Employees
  // ===========================

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

  // ===========================
  // Auto Calculate Net Salary
  // ===========================

  useEffect(() => {

    const basicSalary = Number(basic) || 0;

    const allowanceAmount = Number(allowance) || 0;

    const deductionAmount = Number(deduction) || 0;

    const total =
      basicSalary +
      allowanceAmount -
      deductionAmount;

    setNetSalary(
      total > 0
        ? total.toString()
        : ""
    );

  }, [basic, allowance, deduction]);

    // ===========================
  // Save Payroll
  // ===========================

  const handleSave = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      !employeeId ||
      !employeeName ||
      !month ||
      !basic ||
      !allowance ||
      !deduction ||
      !netSalary
    ) {

      alert("Please fill all fields.");

      return;

    }

    const response = await fetch("/api/payrolls", {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({

        EmployeeId: Number(employeeId),

        EmployeeName: employeeName,

        Month: month,

        Basic: Number(basic),

        Allowance: Number(allowance),

        Deduction: Number(deduction),

        NetSalary: Number(netSalary),

      }),

    });

    if (response.ok) {

      alert("Payroll generated successfully.");

      router.push("/hr/payroll");

    } else {

      alert("Failed to generate payroll.");

    }

  };

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Generate Payroll
          </h1>

          <p className="text-gray-600 mt-2">
            Generate employee monthly payroll
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
          "
        >
          Back
        </button>

      </div>

      <form
        onSubmit={handleSave}
        className="
        bg-white
        rounded-xl
        border
        shadow
        p-6
        "
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Employee */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee
            </label>

            <select

              value={employeeId}

              onChange={(e) => {

                const selectedId = e.target.value;

                setEmployeeId(selectedId);

                const emp = employees.find(

                  (item) =>
                    item.EmployeeId === Number(selectedId)

                );

                if (emp) {

                  setEmployeeName(
                    `${emp.FirstName} ${emp.LastName}`
                  );

                }

              }}

              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "
            >

              <option value="">
                Select Employee
              </option>

              {employees.map((emp) => (

                <option
                  key={emp.EmployeeId}
                  value={emp.EmployeeId}
                >
                  {emp.EmployeeId} - {emp.FirstName} {emp.LastName}
                </option>

              ))}

            </select>

          </div>

          {/* Employee Name */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee Name
            </label>

            <input
              type="text"
              value={employeeName}
              readOnly
              className="
              w-full
              border
              border-gray-300
              bg-gray-100
              text-gray-900
              rounded-lg
              px-4
              py-2
              "
            />

          </div>
                    {/* Month */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Month
            </label>

            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "
            >
              <option value="">Select Month</option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>

          </div>

          {/* Basic Salary */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Basic Salary
            </label>

            <input
              type="number"
              value={basic}
              onChange={(e) => setBasic(e.target.value)}
              placeholder="Enter Basic Salary"
              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          {/* Allowance */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allowance
            </label>

            <input
              type="number"
              value={allowance}
              onChange={(e) => setAllowance(e.target.value)}
              placeholder="Enter Allowance"
              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          {/* Deduction */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deduction
            </label>

            <input
              type="number"
              value={deduction}
              onChange={(e) => setDeduction(e.target.value)}
              placeholder="Enter Deduction"
              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          {/* Net Salary */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Net Salary
            </label>

            <input
              type="number"
              value={netSalary}
              readOnly
              className="
              w-full
              border
              border-gray-300
              bg-gray-100
              text-gray-900
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-8 flex gap-3">

          <button
            type="submit"
            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-lg
            "
          >
            Save Payroll
          </button>

          <button
            type="button"
            onClick={() => router.push("/hr/payroll")}
            className="
            bg-gray-600
            hover:bg-gray-700
            text-white
            px-6
            py-3
            rounded-lg
            "
          >
            Cancel
          </button>

        </div>

      </form>

    </div>

  );

}