"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Employee } from "@/types/employee";
import { useAuth } from "@/context/AuthContext";

export default function EmployeesPage() {
  const { user } = useAuth();

  const role = user?.role ?? "";

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const employeesPerPage = 5;

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/employees");

      const data: Employee[] = await response.json();

      setEmployees(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (EmployeeId: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch("/api/employees", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        EmployeeId,
      }),
    });

    if (response.ok) {
      setEmployees((prev) =>
        prev.filter(
          (employee) =>
            employee.EmployeeId !== EmployeeId
        )
      );
    }
  };

  const handleClearFilter = () => {
    setSearchText("");
    setSelectedDepartment("");
    setSelectedStatus("");
    setCurrentPage(1);
  };

  const filteredEmployees = employees.filter(
    (employee) => {
      const searchMatch =
        employee.FirstName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        employee.LastName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        employee.EmployeeCode
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        employee.Email
          .toLowerCase()
          .includes(searchText.toLowerCase());

      const departmentMatch =
        selectedDepartment === "" ||
        employee.Department === selectedDepartment;

      const statusMatch =
        selectedStatus === "" ||
        employee.Status === selectedStatus;

      return (
        searchMatch &&
        departmentMatch &&
        statusMatch
      );
    }
  );

  const lastEmployeeIndex =
    currentPage * employeesPerPage;

  const firstEmployeeIndex =
    lastEmployeeIndex - employeesPerPage;

  const currentEmployees =
    filteredEmployees.slice(
      firstEmployeeIndex,
      lastEmployeeIndex
    );

  const totalPages = Math.ceil(
    filteredEmployees.length /
      employeesPerPage
  );

  return (
    <div className="w-full space-y-5 sm:space-y-6 min-w-0">

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        "
      >

        <div className="min-w-0">

          <h1
            className="
              text-2xl
              sm:text-3xl
              font-bold
              text-theme
            "
          >
            Employees
          </h1>

          <p
            className="
              text-muted
              mt-1
              sm:mt-2
              text-sm
              sm:text-base
            "
          >
            Manage all employee records
          </p>

        </div>

        {(role === "Admin" || role === "HR") && (

          <Link
            href="/hr/employees/add"
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-4
              py-2.5
              rounded-lg
              transition
              text-center
              w-full
              sm:w-auto
              whitespace-nowrap
            "
          >
            + Add Employee
          </Link>

        )}

      </div>


      {/* ===================================================== */}
      {/* SEARCH & FILTERS */}
      {/* ===================================================== */}

      {(role === "Admin" || role === "HR") && (

        <div
          className="
            card-theme
            border
            border-theme
            rounded-xl
            shadow-sm
            p-4
            sm:p-5
          "
        >

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-5
              gap-3
            "
          >

            {/* Search */}

            <input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search Employee"
              className="
                input-theme
                w-full
                min-w-0
              "
            />


            {/* Department */}

            <select
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(
                  e.target.value
                );
                setCurrentPage(1);
              }}
              className="
                input-theme
                w-full
                min-w-0
              "
            >

              <option value="">
                All Departments
              </option>

              <option value="HR">
                HR
              </option>

              <option value="Sales">
                Sales
              </option>

              <option value="IT">
                IT
              </option>

            </select>


            {/* Status */}

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(
                  e.target.value
                );
                setCurrentPage(1);
              }}
              className="
                input-theme
                w-full
                min-w-0
              "
            >

              <option value="">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

            </select>


            {/* Search */}

            <button
              type="button"
              className="
                bg-green-600
                hover:bg-green-700
                text-white
                rounded-lg
                px-4
                py-2
                transition
                w-full
              "
            >
              Search
            </button>


            {/* Clear */}

            <button
              type="button"
              onClick={handleClearFilter}
              className="
                button-secondary
                w-full
              "
            >
              Clear
            </button>

          </div>

        </div>

      )}


      {/* ===================================================== */}
      {/* EMPLOYEE TABLE - DESKTOP */}
      {/* ===================================================== */}

      <div
        className="
          card-theme
          border
          border-theme
          rounded-xl
          shadow-sm
          overflow-hidden
          w-full
        "
      >

        {/* Desktop Table */}

        <div className="hidden md:block w-full">

          <table className="w-full">

            <thead className="table-header-theme">

              <tr className="text-theme">

                <th
                  className="
                    px-3
                    py-3
                    text-left
                    whitespace-nowrap
                  "
                >
                  Employee ID
                </th>

                <th
                  className="
                    px-3
                    py-3
                    text-left
                    whitespace-nowrap
                  "
                >
                  Employee Code
                </th>

                <th
                  className="
                    px-3
                    py-3
                    text-left
                    whitespace-nowrap
                  "
                >
                  Name
                </th>

                <th
                  className="
                    px-3
                    py-3
                    text-left
                  "
                >
                  Email
                </th>

                <th
                  className="
                    px-3
                    py-3
                    text-left
                    whitespace-nowrap
                  "
                >
                  Department
                </th>

                <th
                  className="
                    px-3
                    py-3
                    text-left
                    whitespace-nowrap
                  "
                >
                  Designation
                </th>

                <th
                  className="
                    px-3
                    py-3
                    text-left
                    whitespace-nowrap
                  "
                >
                  Salary
                </th>

                <th
                  className="
                    px-3
                    py-3
                    text-left
                    whitespace-nowrap
                  "
                >
                  Status
                </th>

                <th
                  className="
                    px-3
                    py-3
                    text-center
                    whitespace-nowrap
                  "
                >
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={9}
                    className="
                      p-8
                      text-center
                      text-muted
                    "
                  >
                    Loading employees...
                  </td>

                </tr>

              ) : filteredEmployees.length === 0 ? (

                <tr>

                  <td
                    colSpan={9}
                    className="
                      p-8
                      text-center
                      text-muted
                    "
                  >
                    No employees found
                  </td>

                </tr>

              ) : (

                currentEmployees.map(
                  (employee) => (

                    <tr
                      key={employee.EmployeeId}
                      className="
                        border-t
                        border-theme
                        text-theme
                        table-row-theme
                      "
                    >

                      {/* Employee ID */}

                      <td
                        className="
                          px-3
                          py-4
                          whitespace-nowrap
                        "
                      >
                        {employee.EmployeeId}
                      </td>


                      {/* Employee Code */}

                      <td
                        className="
                          px-3
                          py-4
                          whitespace-nowrap
                        "
                      >
                        {employee.EmployeeCode}
                      </td>


                      {/* Name */}

                      <td
                        className="
                          px-3
                          py-4
                          font-medium
                          whitespace-nowrap
                        "
                      >
                        {employee.FirstName}{" "}
                        {employee.LastName}
                      </td>


                      {/* Email */}

                      <td
                        className="
                          px-3
                          py-4
                          max-w-[220px]
                        "
                      >
                        <span
                          className="
                            block
                            truncate
                          "
                          title={employee.Email}
                        >
                          {employee.Email}
                        </span>
                      </td>


                      {/* Department */}

                      <td
                        className="
                          px-3
                          py-4
                          whitespace-nowrap
                        "
                      >
                        {employee.Department}
                      </td>


                      {/* Designation */}

                      <td
                        className="
                          px-3
                          py-4
                          max-w-[160px]
                        "
                      >
                        <span
                          className="
                            block
                            truncate
                          "
                          title={
                            employee.Designation
                          }
                        >
                          {employee.Designation}
                        </span>
                      </td>


                      {/* Salary */}

                      <td
                        className="
                          px-3
                          py-4
                          whitespace-nowrap
                        "
                      >
                        ₹
                        {employee.Salary}
                      </td>


                      {/* Status */}

                      <td
                        className="
                          px-3
                          py-4
                        "
                      >

                        <span
                          className={
                            employee.Status ===
                            "Active"
                              ? `
                                inline-flex
                                bg-green-100
                                text-green-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                whitespace-nowrap
                              `
                              : `
                                inline-flex
                                bg-red-100
                                text-red-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                whitespace-nowrap
                              `
                          }
                        >
                          {employee.Status}
                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td
                        className="
                          px-3
                          py-4
                          whitespace-nowrap
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            whitespace-nowrap
                          "
                        >

                          {/* View */}

                          <Link
                            href={`/hr/employees/${employee.EmployeeId}`}
                            className="
                              bg-green-600
                              hover:bg-green-700
                              text-white
                              px-3
                              py-1.5
                              rounded
                              text-sm
                              whitespace-nowrap
                            "
                          >
                            View
                          </Link>


                          {/* Edit */}

                          {(role === "Admin" ||
                            role === "HR") && (

                            <Link
                              href={`/hr/employees/edit/${employee.EmployeeId}`}
                              className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-3
                                py-1.5
                                rounded
                                text-sm
                                whitespace-nowrap
                              "
                            >
                              Edit
                            </Link>

                          )}


                          {/* Delete */}

                          {(role === "Admin" ||
                            role === "HR") && (

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  employee.EmployeeId
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
                                whitespace-nowrap
                              "
                            >
                              Delete
                            </button>

                          )}

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>


        {/* ===================================================== */}
        {/* MOBILE EMPLOYEE CARDS */}
        {/* ===================================================== */}

        <div className="md:hidden">

          {loading ? (

            <div
              className="
                py-10
                text-center
                text-muted
              "
            >
              Loading employees...
            </div>

          ) : filteredEmployees.length === 0 ? (

            <div
              className="
                py-10
                text-center
                text-muted
              "
            >
              No employees found
            </div>

          ) : (

            <div className="divide-y divide-theme">

              {currentEmployees.map(
                (employee) => (

                  <div
                    key={employee.EmployeeId}
                    className="
                      p-4
                      sm:p-5
                      space-y-4
                      table-row-theme
                    "
                  >

                    {/* Employee Name */}

                    <div>

                      <p
                        className="
                          text-xs
                          text-muted
                          mb-1
                        "
                      >
                        Employee Name
                      </p>

                      <p
                        className="
                          font-semibold
                          text-theme
                          break-words
                        "
                      >
                        {employee.FirstName}{" "}
                        {employee.LastName}
                      </p>

                    </div>


                    {/* ID + Code */}

                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-4
                      "
                    >

                      <div>

                        <p
                          className="
                            text-xs
                            text-muted
                            mb-1
                          "
                        >
                          Employee ID
                        </p>

                        <p className="text-theme">
                          {employee.EmployeeId}
                        </p>

                      </div>


                      <div>

                        <p
                          className="
                            text-xs
                            text-muted
                            mb-1
                          "
                        >
                          Employee Code
                        </p>

                        <p
                          className="
                            text-theme
                            break-words
                          "
                        >
                          {employee.EmployeeCode}
                        </p>

                      </div>

                    </div>


                    {/* Email */}

                    <div>

                      <p
                        className="
                          text-xs
                          text-muted
                          mb-1
                        "
                      >
                        Email
                      </p>

                      <p
                        className="
                          text-theme
                          break-words
                        "
                      >
                        {employee.Email}
                      </p>

                    </div>


                    {/* Department + Designation */}

                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-4
                      "
                    >

                      <div>

                        <p
                          className="
                            text-xs
                            text-muted
                            mb-1
                          "
                        >
                          Department
                        </p>

                        <p
                          className="
                            text-theme
                            break-words
                          "
                        >
                          {employee.Department}
                        </p>

                      </div>


                      <div>

                        <p
                          className="
                            text-xs
                            text-muted
                            mb-1
                          "
                        >
                          Designation
                        </p>

                        <p
                          className="
                            text-theme
                            break-words
                          "
                        >
                          {employee.Designation}
                        </p>

                      </div>

                    </div>


                    {/* Salary + Status */}

                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-4
                      "
                    >

                      <div>

                        <p
                          className="
                            text-xs
                            text-muted
                            mb-1
                          "
                        >
                          Salary
                        </p>

                        <p className="text-theme">
                          ₹{employee.Salary}
                        </p>

                      </div>


                      <div>

                        <p
                          className="
                            text-xs
                            text-muted
                            mb-1
                          "
                        >
                          Status
                        </p>

                        <span
                          className={
                            employee.Status ===
                            "Active"
                              ? `
                                inline-flex
                                bg-green-100
                                text-green-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                whitespace-nowrap
                              `
                              : `
                                inline-flex
                                bg-red-100
                                text-red-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                whitespace-nowrap
                              `
                          }
                        >
                          {employee.Status}
                        </span>

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

                      {/* View */}

                      <Link
                        href={`/hr/employees/${employee.EmployeeId}`}
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


                      {/* Edit */}

                      {(role === "Admin" ||
                        role === "HR") && (

                        <Link
                          href={`/hr/employees/edit/${employee.EmployeeId}`}
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

                      )}


                      {/* Delete */}

                      {(role === "Admin" ||
                        role === "HR") && (

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              employee.EmployeeId
                            )
                          }
                          className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            text-center
                            px-2
                            py-2
                            rounded
                            text-sm
                          "
                        >
                          Delete
                        </button>

                      )}

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>


      {/* ===================================================== */}
      {/* PAGINATION */}
      {/* ===================================================== */}

      <div
        className="
          card-theme
          border
          border-theme
          rounded-xl
          p-4
        "
      >

        <div
          className="
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
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

            {filteredEmployees.length === 0
              ? 0
              : firstEmployeeIndex + 1}

            {" - "}

            {Math.min(
              lastEmployeeIndex,
              filteredEmployees.length
            )}

            {" of "}

            {filteredEmployees.length}

            {" employees"}
          </p>


          {/* Pagination */}

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
                  Math.max(
                    currentPage - 1,
                    1
                  )
                )
              }
              className="
                input-theme
                disabled:opacity-50
                disabled:cursor-not-allowed
                px-3
                py-2
                whitespace-nowrap
              "
            >
              Previous
            </button>


            <span
              className="
                text-theme
                px-2
                whitespace-nowrap
                text-sm
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
                  currentPage + 1
                )
              }
              className="
                input-theme
                disabled:opacity-50
                disabled:cursor-not-allowed
                px-3
                py-2
                whitespace-nowrap
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