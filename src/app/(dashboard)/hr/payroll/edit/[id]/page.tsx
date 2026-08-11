"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

type Payroll = {
  PayrollId: number;
  EmployeeId: number;
  EmployeeName: string;
  Month: string;
  Basic: number;
  Allowance: number;
  Deduction: number;
  NetSalary: number;
};

export default function EditPayrollPage() {
  const router = useRouter();
  const params = useParams();
  const { themeSettings } = useTheme();

  const payrollId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [month, setMonth] = useState("");

  const [basicSalary, setBasicSalary] = useState<number>(0);
  const [allowance, setAllowance] = useState<number>(0);
  const [deduction, setDeduction] = useState<number>(0);
  const [netSalary, setNetSalary] = useState<number>(0);

  useEffect(() => {
    loadPayroll();
  }, []);

  useEffect(() => {
    const basic = isNaN(basicSalary) ? 0 : basicSalary;
    const allow = isNaN(allowance) ? 0 : allowance;
    const deduct = isNaN(deduction) ? 0 : deduction;

    setNetSalary(basic + allow - deduct);
  }, [basicSalary, allowance, deduction]);

  const loadPayroll = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/payrolls?id=${payrollId}`
      );

      if (!response.ok) {
        alert("Failed to load payroll.");
        router.push("/hr/payroll");
        return;
      }

      const result = await response.json();

      const data: Payroll = Array.isArray(result)
        ? result[0]
        : result;

      if (!data) {
        alert("Payroll not found.");
        router.push("/hr/payroll");
        return;
      }

      setEmployeeId(String(data.EmployeeId ?? ""));
      setEmployeeName(data.EmployeeName ?? "");
      setMonth(data.Month ?? "");

      setBasicSalary(Number(data.Basic ?? 0));
      setAllowance(Number(data.Allowance ?? 0));
      setDeduction(Number(data.Deduction ?? 0));
      setNetSalary(Number(data.NetSalary ?? 0));
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
      router.push("/hr/payroll");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePayroll = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await fetch("/api/payrolls", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PayrollId: Number(payrollId),
          EmployeeId: Number(employeeId),
          EmployeeName: employeeName,
          Month: month,
          Basic: Number(basicSalary),
          Allowance: Number(allowance),
          Deduction: Number(deduction),
          NetSalary: Number(netSalary),
        }),
      });

      if (!response.ok) {
        alert("Failed to update payroll.");
        return;
      }

      alert("Payroll updated successfully.");
      router.push("/hr/payroll");
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 px-4">
        <p className="text-lg font-medium text-muted text-center">
          Loading payroll...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6 w-full max-w-full overflow-hidden">

      {/* Header */}

      <div
        className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:justify-between
        sm:items-center
        "
      >
        <div className="min-w-0">
          <h1
            className="
            text-2xl
            sm:text-3xl
            font-bold
            text-theme
            break-words
            "
          >
            Edit Payroll
          </h1>

          <p className="text-muted mt-2 text-sm sm:text-base">
            Update employee payroll information
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
          py-2.5
          rounded-lg
          transition
          "
        >
          Back
        </button>
      </div>

      {/* Form */}

      <form
        onSubmit={handleUpdatePayroll}
        className="
        card-theme
        rounded-xl
        shadow
        p-4
        sm:p-6
        w-full
        "
      >
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
          sm:gap-6
          "
        >

          {/* Employee ID */}

          <div className="w-full min-w-0">
            <label className="block text-sm font-medium text-theme mb-2">
              Employee ID
            </label>

            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="
              w-full
              min-w-0
              border
              border-gray-300
              dark:border-gray-600
              rounded-lg
              px-4
              py-2.5
              text-theme
              bg-theme
              outline-none
              focus:ring-2
              focus:ring-blue-500
              "
              required
            />
          </div>

          {/* Employee Name */}

          <div className="w-full min-w-0">
            <label className="block text-sm font-medium text-theme mb-2">
              Employee Name
            </label>

            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="
              w-full
              min-w-0
              border
              border-gray-300
              dark:border-gray-600
              rounded-lg
              px-4
              py-2.5
              text-theme
              bg-theme
              outline-none
              focus:ring-2
              focus:ring-blue-500
              "
              required
            />
          </div>

          {/* Month */}

          <div className="w-full min-w-0">
            <label className="block text-sm font-medium text-theme mb-2">
              Month
            </label>

            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="
              w-full
              min-w-0
              border
              border-gray-300
              dark:border-gray-600
              rounded-lg
              px-4
              py-2.5
              text-theme
              bg-theme
              outline-none
              focus:ring-2
              focus:ring-blue-500
              "
              required
            >
              <option value="">Select Month</option>

              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          {/* Basic Salary */}

          <div className="w-full min-w-0">
            <label className="block text-sm font-medium text-theme mb-2">
              Basic Salary
            </label>

            <input
              type="number"
              value={basicSalary}
              onChange={(e) =>
                setBasicSalary(
                  e.target.value === ""
                    ? 0
                    : Number(e.target.value)
                )
              }
              className="
              w-full
              min-w-0
              border
              border-gray-300
              dark:border-gray-600
              rounded-lg
              px-4
              py-2.5
              text-theme
              bg-theme
              outline-none
              focus:ring-2
              focus:ring-blue-500
              "
              min={0}
              required
            />
          </div>

          {/* Allowance */}

          <div className="w-full min-w-0">
            <label className="block text-sm font-medium text-theme mb-2">
              Allowance
            </label>

            <input
              type="number"
              value={allowance}
              onChange={(e) =>
                setAllowance(
                  e.target.value === ""
                    ? 0
                    : Number(e.target.value)
                )
              }
              className="
              w-full
              min-w-0
              border
              border-gray-300
              dark:border-gray-600
              rounded-lg
              px-4
              py-2.5
              text-theme
              bg-theme
              outline-none
              focus:ring-2
              focus:ring-blue-500
              "
              min={0}
              required
            />
          </div>

          {/* Deduction */}

          <div className="w-full min-w-0">
            <label className="block text-sm font-medium text-theme mb-2">
              Deduction
            </label>

            <input
              type="number"
              value={deduction}
              onChange={(e) =>
                setDeduction(
                  e.target.value === ""
                    ? 0
                    : Number(e.target.value)
                )
              }
              className="
              w-full
              min-w-0
              border
              border-gray-300
              dark:border-gray-600
              rounded-lg
              px-4
              py-2.5
              text-theme
              bg-theme
              outline-none
              focus:ring-2
              focus:ring-blue-500
              "
              min={0}
              required
            />
          </div>

          {/* Net Salary */}

          <div className="md:col-span-2 w-full min-w-0">
            <label className="block text-sm font-medium text-theme mb-2">
              Net Salary
            </label>

            <input
              type="number"
              value={netSalary}
              readOnly
              className="
              w-full
              min-w-0
              input-theme
              font-semibold
              "
            />
          </div>
        </div>

        {/* Buttons */}

        <div
          className="
          mt-6
          sm:mt-8
          flex
          flex-col-reverse
          sm:flex-row
          gap-3
          sm:justify-end
          "
        >
          <button
            type="button"
            onClick={() => router.push("/hr/payroll")}
            className="
            w-full
            sm:w-auto
            bg-gray-600
            hover:bg-gray-700
            text-white
            px-6
            py-2.5
            sm:py-3
            rounded-lg
            transition
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="
            w-full
            sm:w-auto
            bg-blue-600
            hover:bg-blue-700
            disabled:bg-blue-400
            text-white
            px-6
            py-2.5
            sm:py-3
            rounded-lg
            transition
            "
          >
            {saving ? "Updating..." : "Update Payroll"}
          </button>
        </div>
      </form>
    </div>
  );
}