"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Payroll } from "@/types/payroll";
import { useTheme } from "@/context/ThemeContext";

export default function PayrollDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { themeSettings } = useTheme();

  const [payroll, setPayroll] =
    useState<Payroll | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadPayroll();
  }, []);

  const loadPayroll = async () => {
    try {
      const response = await fetch("/api/payrolls");

      const data: Payroll[] =
        await response.json();

      const selectedPayroll = data.find(
        (item) =>
          item.PayrollId === Number(params.id)
      );

      if (selectedPayroll) {
        setPayroll(selectedPayroll);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 px-4">
        <p className="text-lg font-medium text-muted text-center">
          Loading Payroll...
        </p>
      </div>
    );
  }

  if (!payroll) {
    return (
      <div className="flex items-center justify-center py-10 px-4">
        <p className="text-lg font-medium text-muted text-center">
          Payroll Not Found
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
            Payroll Details
          </h1>

          <p className="text-muted mt-2 text-sm sm:text-base">
            View employee payroll information
          </p>
        </div>

        <button
          onClick={() => router.back()}
          className="
          button-secondary
          w-full
          sm:w-auto
          px-5
          py-2.5
          rounded-lg
          "
        >
          Back
        </button>
      </div>

      {/* Payroll Information Card */}

      <div
        className="
        card-theme
        rounded-xl
        shadow
        p-4
        sm:p-6
        w-full
        "
      >
        <h2
          className="
          text-lg
          sm:text-xl
          font-semibold
          text-theme
          mb-5
          sm:mb-6
          "
        >
          Payroll Information
        </h2>

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-5
          sm:gap-6
          "
        >

          {/* Payroll ID */}

          <div className="min-w-0">
            <p className="text-sm text-muted">
              Payroll ID
            </p>

            <p className="font-semibold text-theme mt-1 break-words">
              {payroll.PayrollId}
            </p>
          </div>

          {/* Employee ID */}

          <div className="min-w-0">
            <p className="text-sm text-muted">
              Employee ID
            </p>

            <p className="font-semibold text-theme mt-1 break-words">
              {payroll.EmployeeId}
            </p>
          </div>

          {/* Employee Name */}

          <div className="min-w-0">
            <p className="text-sm text-muted">
              Employee Name
            </p>

            <p className="font-semibold text-theme mt-1 break-words">
              {payroll.EmployeeName}
            </p>
          </div>

          {/* Month */}

          <div className="min-w-0">
            <p className="text-sm text-muted">
              Month
            </p>

            <p className="font-semibold text-theme mt-1 break-words">
              {payroll.Month}
            </p>
          </div>

          {/* Basic Salary */}

          <div className="min-w-0">
            <p className="text-sm text-muted">
              Basic Salary
            </p>

            <p className="font-semibold text-theme mt-1 break-words">
              ₹{payroll.Basic.toLocaleString()}
            </p>
          </div>

          {/* Allowance */}

          <div className="min-w-0">
            <p className="text-sm text-muted">
              Allowance
            </p>

            <p className="font-semibold text-theme mt-1 break-words">
              ₹{payroll.Allowance.toLocaleString()}
            </p>
          </div>

          {/* Deduction */}

          <div className="min-w-0">
            <p className="text-sm text-muted">
              Deduction
            </p>

            <p className="font-semibold text-theme mt-1 break-words">
              ₹{payroll.Deduction.toLocaleString()}
            </p>
          </div>

          {/* Net Salary */}

          <div className="min-w-0">
            <p className="text-sm text-muted">
              Net Salary
            </p>

            <p
              className="
              text-xl
              sm:text-2xl
              font-bold
              text-theme
              mt-1
              break-words
              "
            >
              ₹{payroll.NetSalary.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Generate Payslip */}

      <div
        className="
        flex
        justify-center
        w-full
        "
      >
        <button
          onClick={() =>
            alert("Payslip generated successfully!")
          }
          className="
          w-full
          sm:w-auto
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-8
          py-3
          rounded-lg
          font-semibold
          transition
          "
        >
          Generate Payslip
        </button>
      </div>

    </div>
  );
}