"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Payroll } from "@/types/payroll";

export default function PayrollDetailsPage() {

  const router = useRouter();

  const params = useParams();

  const [payroll, setPayroll] =
    useState<Payroll | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadPayroll();

  }, []);

  const loadPayroll = async () => {

    try {

      const response = await fetch(
        "/api/payrolls"
      );

      const data: Payroll[] =
        await response.json();

      const selectedPayroll =
        data.find(

          (item) =>

            item.PayrollId ===
            Number(params.id)

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

      <div className="text-center py-10 text-gray-600">

        Loading Payroll...

      </div>

    );

  }

  if (!payroll) {

    return (

      <div className="text-center py-10 text-red-600">

        Payroll Not Found

      </div>

    );

  }

  return (
    

    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Payroll Details
          </h1>

          <p className="text-gray-600 mt-2">
            View employee payroll information
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

      <div className="bg-white rounded-xl shadow border p-6">

        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Payroll Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
            <p className="text-sm text-gray-500">
              Payroll ID
            </p>

            <p className="font-semibold text-gray-900">
              {payroll.PayrollId}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Employee ID
            </p>

            <p className="font-semibold text-gray-900">
              {payroll.EmployeeId}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Employee Name
            </p>

            <p className="font-semibold text-gray-900">
              {payroll.EmployeeName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Month
            </p>

            <p className="font-semibold text-gray-900">
              {payroll.Month}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Basic Salary
            </p>

            <p className="font-semibold text-gray-900">
              ₹{payroll.Basic.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Allowance
            </p>

            <p className="font-semibold text-gray-900">
              ₹{payroll.Allowance.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Deduction
            </p>

            <p className="font-semibold text-red-600">
              ₹{payroll.Deduction.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Net Salary
            </p>

            <p className="text-2xl font-bold text-green-600">
              ₹{payroll.NetSalary.toLocaleString()}
            </p>
          </div>

        </div>

      </div>
            {/* Generate Payslip */}

      <div className="bg-white rounded-xl shadow border p-6">

        <div className="flex justify-center">

          <button
            onClick={() =>
              alert("Payslip generated successfully!")
            }
            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-8
            py-3
            rounded-lg
            font-semibold
            "
          >
            Generate Payslip
          </button>

        </div>

      </div>

    </div>

  );

}