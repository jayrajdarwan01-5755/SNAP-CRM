"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

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

    const response = await fetch(`/api/payrolls?id=${payrollId}`);

    if (!response.ok) {
      alert("Failed to load payroll.");
      router.push("/hr/payroll");
      return;
    }

    const result = await response.json();

    // API array ya object dono handle karega
    const data: Payroll = Array.isArray(result) ? result[0] : result;

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
    console.error(error);
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
}),      });

      if (!response.ok) {
        alert("Failed to update payroll.");
        return;
      }

      alert("Payroll updated successfully.");
      router.push("/hr/payroll");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-lg font-medium text-gray-600">
          Loading payroll...
        </p>
      </div>
    );
  }
return (
  <div className="mx-auto max-w-4xl p-6 text-black">

    <div className="mb-8 flex w-full items-center">
      <h1 className="text-3xl font-bold text-gray-800">
        Edit Payroll
      </h1>

      <button
        onClick={() => router.back()}
        className="ml-auto rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
      >
        ← Back
      </button>
    </div>
    
      <form
        onSubmit={handleUpdatePayroll}
        className="rounded-xl bg-white p-6 shadow-md"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800">
              Employee ID
            </label>

            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Employee Name
            </label>

            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
                    <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Month
            </label>

            <input
  type="date"
  value={month}
  onChange={(e) => setMonth(e.target.value)}
  className="w-full rounded-lg border border-gray-300 p-3 text-black focus:border-blue-500 focus:outline-none"
  required
/>          </div>

          <div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Basic Salary
  </label>

  <input
    type="number"
    value={basicSalary}
    onChange={(e) =>
      setBasicSalary(e.target.value === "" ? 0 : Number(e.target.value))
    }
    className="w-full rounded-lg border border-gray-300 p-3 text-black focus:border-blue-500 focus:outline-none"
    min={0}
    required
  />
</div>

<div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Allowance
  </label>

  <input
    type="number"
    value={allowance}
    onChange={(e) =>
      setAllowance(e.target.value === "" ? 0 : Number(e.target.value))
    }
    className="w-full rounded-lg border border-gray-300 p-3 text-black focus:border-blue-500 focus:outline-none"
    min={0}
    required
  />
</div>

<div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Deduction
  </label>

  <input
    type="number"
    value={deduction}
    onChange={(e) =>
      setDeduction(e.target.value === "" ? 0 : Number(e.target.value))
    }
    className="w-full rounded-lg border border-gray-300 p-3 text-black focus:border-blue-500 focus:outline-none"
    min={0}
    required
  />
</div>

<div className="md:col-span-2">
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Net Salary
  </label>

  <input
    type="number"
    value={netSalary}
    readOnly
    className="w-full rounded-lg border border-gray-200 bg-gray-100 p-3 font-semibold text-black"
  />
</div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">

                      <button
            type="button"
            onClick={() => router.push("/hr/payroll")}
            className="rounded-lg bg-gray-500 px-6 py-3 text-white transition hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {saving ? "Updating..." : "Update Payroll"}
          </button>
        </div>
      </form>
    </div>
  );
}