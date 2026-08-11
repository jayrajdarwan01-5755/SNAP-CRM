"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Payroll } from "@/types/payroll";

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const payrollsPerPage = 5;

  useEffect(() => {
    loadPayrolls();
  }, []);

  const loadPayrolls = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/payrolls");

      const data: Payroll[] = await response.json();

      console.log("Payroll List:", data);

      setPayrolls(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (PayrollId: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this payroll?"
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch("/api/payrolls", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        PayrollId,
      }),
    });

    if (response.ok) {
      setPayrolls((prev) =>
        prev.filter(
          (payroll) => payroll.PayrollId !== PayrollId
        )
      );
    }
  };

  const handleClear = () => {
    setSearchText("");
    setSelectedMonth("");
    setCurrentPage(1);
  };

  const filteredPayrolls = payrolls.filter((payroll) => {
    const searchMatch = payroll.EmployeeName
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const monthMatch =
      selectedMonth === "" ||
      payroll.Month === selectedMonth;

    return searchMatch && monthMatch;
  });

  const lastIndex =
    currentPage * payrollsPerPage;

  const firstIndex =
    lastIndex - payrollsPerPage;

  const currentPayrolls =
    filteredPayrolls.slice(
      firstIndex,
      lastIndex
    );

  const totalPages = Math.ceil(
    filteredPayrolls.length /
      payrollsPerPage
  );

  return (
    <div className="w-full space-y-6">

      {/* Header */}

      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
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
            Payroll Management
          </h1>

          <p className="text-muted mt-2 text-sm sm:text-base">
            Manage employee payroll records
          </p>

        </div>

        <Link
          href="/hr/payroll/add"
          className="
            w-full
            sm:w-auto
            text-center
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-2.5
            rounded-lg
            transition
          "
        >
          + Generate Payroll
        </Link>

      </div>


      {/* Search Section */}

      <div
        className="
          card-theme
          border
          border-theme
          rounded-xl
          shadow
          p-4
          sm:p-6
        "
      >

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
          "
        >

          {/* Search Employee */}

          <div className="sm:col-span-2 lg:col-span-1">

            <label
              className="
                block
                text-sm
                font-medium
                text-theme
                mb-2
              "
            >
              Search
            </label>

            <input
              type="text"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search Employee"
              className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2.5
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>


          {/* Month */}

          <div>

            <label
              className="
                block
                text-sm
                font-medium
                text-theme
                mb-2
              "
            >
              Month
            </label>

            <select
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                setCurrentPage(1);
              }}
              className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2.5
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >

              <option value="">
                All Months
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


          {/* Search Button */}

          <div className="flex items-end">

            <button
              type="button"
              className="
                w-full
                bg-green-600
                hover:bg-green-700
                text-white
                rounded-lg
                py-2.5
                transition
              "
            >
              Search
            </button>

          </div>


          {/* Clear Button */}

          <div className="flex items-end">

            <button
              type="button"
              onClick={handleClear}
              className="
                w-full
                bg-gray-600
                hover:bg-gray-700
                text-white
                rounded-lg
                py-2.5
                transition
              "
            >
              Clear
            </button>

          </div>

        </div>

      </div>


      {/* Payroll Table */}

      <div
        className="
          card-theme
          border
          border-theme
          rounded-xl
          shadow
          overflow-hidden
        "
      >

        {/* Desktop / Tablet Table */}

        <div className="hidden md:block overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead
              className="
                bg-theme
                border-b
                border-theme
              "
            >

              <tr className="text-theme">

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Employee
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Month
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Basic
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Allowance
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Deduction
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Net Salary
                </th>

                <th className="px-4 py-3 text-center whitespace-nowrap">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={7}
                    className="
                      text-center
                      py-10
                      text-muted
                    "
                  >
                    Loading payrolls...
                  </td>

                </tr>

              ) : currentPayrolls.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="
                      text-center
                      py-10
                      text-muted
                    "
                  >
                    No Payroll Found
                  </td>

                </tr>

              ) : (

                currentPayrolls.map((payroll) => (

                  <tr
                    key={payroll.PayrollId}
                    className="
                      border-t
                      border-theme
                      table-row-theme
                      transition-colors
                    "
                  >

                    <td
                      className="
                        px-4
                        py-4
                        font-medium
                        text-theme
                      "
                    >
                      {payroll.EmployeeName}
                    </td>

                    <td
                      className="
                        px-4
                        py-4
                        text-muted
                        whitespace-nowrap
                      "
                    >
                      {payroll.Month}
                    </td>

                    <td
                      className="
                        px-4
                        py-4
                        text-muted
                        whitespace-nowrap
                      "
                    >
                      ₹
                      {payroll.Basic.toLocaleString("en-IN")}
                    </td>

                    <td
                      className="
                        px-4
                        py-4
                        text-muted
                        whitespace-nowrap
                      "
                    >
                      ₹
                      {payroll.Allowance.toLocaleString("en-IN")}
                    </td>

                    <td
                      className="
                        px-4
                        py-4
                        text-red-600
                        whitespace-nowrap
                      "
                    >
                      ₹
                      {payroll.Deduction.toLocaleString("en-IN")}
                    </td>

                    <td
                      className="
                        px-4
                        py-4
                        font-semibold
                        text-theme
                        whitespace-nowrap
                      "
                    >
                      ₹
                      {payroll.NetSalary.toLocaleString("en-IN")}
                    </td>

                    <td className="px-4 py-4">

                      <div
                        className="
                          flex
                          justify-center
                          gap-2
                          flex-wrap
                        "
                      >

                        <Link
                          href={`/hr/payroll/${payroll.PayrollId}`}
                          className="
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            px-3
                            py-1.5
                            rounded
                            text-sm
                          "
                        >
                          View
                        </Link>

                        <Link
                          href={`/hr/payroll/edit/${payroll.PayrollId}`}
                          className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-3
                            py-1.5
                            rounded
                            text-sm
                          "
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              payroll.PayrollId
                            )
                          }
                          className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-3
                            py-1.5
                            rounded
                            text-sm
                          "
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>


        {/* Mobile Cards */}

        <div className="md:hidden">

          {loading ? (

            <div className="py-10 text-center text-muted">
              Loading payrolls...
            </div>

          ) : currentPayrolls.length === 0 ? (

            <div className="py-10 text-center text-muted">
              No Payroll Found
            </div>

          ) : (

            <div className="divide-y divide-theme">

              {currentPayrolls.map((payroll) => (

                <div
                  key={payroll.PayrollId}
                  className="
                    p-4
                    sm:p-5
                    space-y-4
                    table-row-theme
                  "
                >

                  {/* Employee */}

                  <div>

                    <p className="text-xs text-muted mb-1">
                      Employee
                    </p>

                    <p className="font-semibold text-theme break-words">
                      {payroll.EmployeeName}
                    </p>

                  </div>


                  {/* Month */}

                  <div>

                    <p className="text-xs text-muted mb-1">
                      Month
                    </p>

                    <p className="text-theme">
                      {payroll.Month}
                    </p>

                  </div>


                  {/* Basic + Allowance */}

                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-4
                    "
                  >

                    <div>

                      <p className="text-xs text-muted mb-1">
                        Basic
                      </p>

                      <p className="font-semibold text-theme">
                        ₹
                        {payroll.Basic.toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>


                    <div>

                      <p className="text-xs text-muted mb-1">
                        Allowance
                      </p>

                      <p className="font-semibold text-theme">
                        ₹
                        {payroll.Allowance.toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>

                  </div>


                  {/* Deduction + Net Salary */}

                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-4
                    "
                  >

                    <div>

                      <p className="text-xs text-muted mb-1">
                        Deduction
                      </p>

                      <p className="font-semibold text-red-600">
                        ₹
                        {payroll.Deduction.toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>


                    <div>

                      <p className="text-xs text-muted mb-1">
                        Net Salary
                      </p>

                      <p className="font-semibold text-theme">
                        ₹
                        {payroll.NetSalary.toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>

                  </div>


                  {/* Actions */}

                  <div
                    className="
                      grid
                      grid-cols-3
                      gap-2
                      pt-2
                    "
                  >

                    <Link
                      href={`/hr/payroll/${payroll.PayrollId}`}
                      className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        text-center
                        px-2
                        py-2
                        rounded
                        text-sm
                      "
                    >
                      View
                    </Link>

                    <Link
                      href={`/hr/payroll/edit/${payroll.PayrollId}`}
                      className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        text-center
                        px-2
                        py-2
                        rounded
                        text-sm
                      "
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          payroll.PayrollId
                        )
                      }
                      className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-2
                        py-2
                        rounded
                        text-sm
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>


      {/* Pagination */}

      <div
        className="
          card-theme
          border
          border-theme
          rounded-xl
          shadow
          p-4
        "
      >

        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          {/* Showing */}

          <p
            className="
              text-sm
              text-muted
              text-center
              sm:text-left
            "
          >
            Showing{" "}

            {filteredPayrolls.length === 0
              ? 0
              : firstIndex + 1}

            {" "}to{" "}

            {Math.min(
              lastIndex,
              filteredPayrolls.length
            )}

            {" "}of{" "}

            {filteredPayrolls.length}

            {" "}payrolls
          </p>


          {/* Pagination Controls */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-2
            "
          >

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    Math.max(prev - 1, 1)
                )
              }
              className="
                border
                border-theme
                text-theme
                px-3
                sm:px-4
                py-2
                rounded-lg
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              Previous
            </button>


            <span
              className="
                px-2
                sm:px-3
                py-2
                text-sm
                text-theme
                whitespace-nowrap
              "
            >
              Page {currentPage}

              {totalPages > 0 &&
                ` of ${totalPages}`}
            </span>


            <button
              type="button"
              disabled={
                currentPage >= totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setCurrentPage(
                  (prev) => prev + 1
                )
              }
              className="
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-gray-400
                text-white
                px-3
                sm:px-4
                py-2
                rounded-lg
                disabled:cursor-not-allowed
              "
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}