"use client";

import { useEffect, useState } from "react";
import { Employee } from "@/types/employee";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function AddPayrollPage() {

  const router = useRouter();

  const { themeSettings } = useTheme();

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

  // Load Employees
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

  // Auto Calculate Net Salary
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

  // Save Payroll
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

    const response = await fetch(
      "/api/payrolls",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          EmployeeId: Number(employeeId),

          EmployeeName: employeeName,

          Month: month,

          Basic: Number(basic),

          Allowance: Number(allowance),

          Deduction: Number(deduction),

          NetSalary: Number(netSalary)

        })

      }
    );

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

      <div className="
        flex
        flex-col
        sm:flex-row
        justify-between
        items-start
        sm:items-center
        gap-4
      ">

        <div>

          <h1 className="text-2xl sm:text-3xl font-bold text-theme">

            Generate Payroll

          </h1>

          <p className="text-muted mt-2">

            Generate employee monthly payroll

          </p>

        </div>

        <button

          onClick={() => router.back()}

          className="
            w-full
            sm:w-auto
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

      {/* Form */}

      <form

        onSubmit={handleSave}

        className="
          card-theme
          rounded-xl
          border
          shadow
          p-4
          sm:p-6
        "

      >

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        ">

          {/* Employee */}

          <div>

            <label className="
              block
              text-sm
              font-medium
              text-theme
              mb-2
            ">

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

                } else {

                  setEmployeeName("");

                }

              }}

              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-2
                text-theme
                bg-theme
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

            <label className="
              block
              text-sm
              font-medium
              text-theme
              mb-2
            ">

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
                rounded-lg
                px-4
                py-2
                text-theme
                bg-theme
              "

            />

          </div>

          {/* Month */}

          <div>

            <label className="
              block
              text-sm
              font-medium
              text-theme
              mb-2
            ">

              Month

            </label>

            <select

              value={month}

              onChange={(e) =>
                setMonth(e.target.value)
              }

              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-2
                text-theme
                bg-theme
              "

            >

              <option value="">
                Select Month
              </option>

              <option value="January">
                January
              </option>

              <option value="February">
                February
              </option>

              <option value="March">
                March
              </option>

              <option value="April">
                April
              </option>

              <option value="May">
                May
              </option>

              <option value="June">
                June
              </option>

              <option value="July">
                July
              </option>

              <option value="August">
                August
              </option>

              <option value="September">
                September
              </option>

              <option value="October">
                October
              </option>

              <option value="November">
                November
              </option>

              <option value="December">
                December
              </option>

            </select>

          </div>

          {/* Basic Salary */}

          <div>

            <label className="
              block
              text-sm
              font-medium
              text-theme
              mb-2
            ">

              Basic Salary

            </label>

            <input

              type="number"

              value={basic}

              onChange={(e) =>
                setBasic(e.target.value)
              }

              placeholder="Enter Basic Salary"

              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-2
                text-theme
                bg-theme
              "

            />

          </div>

          {/* Allowance */}

          <div>

            <label className="
              block
              text-sm
              font-medium
              text-theme
              mb-2
            ">

              Allowance

            </label>

            <input

              type="number"

              value={allowance}

              onChange={(e) =>
                setAllowance(e.target.value)
              }

              placeholder="Enter Allowance"

              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-2
                text-theme
                bg-theme
              "

            />

          </div>

          {/* Deduction */}

          <div>

            <label className="
              block
              text-sm
              font-medium
              text-theme
              mb-2
            ">

              Deduction

            </label>

            <input

              type="number"

              value={deduction}

              onChange={(e) =>
                setDeduction(e.target.value)
              }

              placeholder="Enter Deduction"

              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-2
                text-theme
                bg-theme
              "

            />

          </div>

          {/* Net Salary */}

          <div>

            <label className="
              block
              text-sm
              font-medium
              text-theme
              mb-2
            ">

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
                rounded-lg
                px-4
                py-2
                text-theme
                bg-theme
              "

            />

          </div>

        </div>

        {/* Buttons */}

        <div className="
          mt-8
          flex
          flex-col
          sm:flex-row
          gap-3
        ">

          <button

            type="submit"

            className="
              w-full
              sm:w-auto
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

            onClick={() =>
              router.push("/hr/payroll")
            }

            className="
              w-full
              sm:w-auto
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
