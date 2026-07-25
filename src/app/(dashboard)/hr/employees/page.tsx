"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Employee } from "@/types/employee";

export default function EmployeesPage() {

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

    }
    catch (error) {

      console.log(error);

    }
    finally {

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

  };

  const filteredEmployees = employees.filter((employee) => {

    const searchMatch =

      employee.FirstName
        .toLowerCase()
        .includes(searchText.toLowerCase())

      ||

      employee.LastName
        .toLowerCase()
        .includes(searchText.toLowerCase())

      ||

      employee.EmployeeCode
        .toLowerCase()
        .includes(searchText.toLowerCase())

      ||

      employee.Email
        .toLowerCase()
        .includes(searchText.toLowerCase());

    const departmentMatch =

      selectedDepartment === ""

      ||

      employee.Department === selectedDepartment;

    const statusMatch =

      selectedStatus === ""

      ||

      employee.Status === selectedStatus;

    return searchMatch && departmentMatch && statusMatch;

  });

  const lastEmployeeIndex =
    currentPage * employeesPerPage;

  const firstEmployeeIndex =
    lastEmployeeIndex - employeesPerPage;

  const currentEmployees =
    filteredEmployees.slice(
      firstEmployeeIndex,
      lastEmployeeIndex
    );

  return (
    <div className="space-y-6">

  {/* Header */}

  <div className="flex justify-between items-center">

    <div>

      <h1 className="text-3xl font-bold text-gray-900">
        Employees
      </h1>

      <p className="text-gray-600 mt-2">
        Manage all employee records
      </p>

    </div>

    <Link
      href="/hr/employees/add"
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
    >
      + Add Employee
    </Link>

  </div>

  {/* Search Section */}

  <div className="bg-white border rounded-xl shadow p-6">

    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

      <input

        value={searchText}

        onChange={(e) =>
          setSearchText(e.target.value)
        }

        placeholder="Search Employee"

        className="
        border
        border-gray-300
        bg-white
        text-gray-900
        rounded-lg
        px-4
        py-2
        "

      />

      <select

        value={selectedDepartment}

        onChange={(e) =>
          setSelectedDepartment(e.target.value)
        }

        className="
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

      <select

        value={selectedStatus}

        onChange={(e) =>
          setSelectedStatus(e.target.value)
        }

        className="
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
          All Status
        </option>

        <option value="Active">
          Active
        </option>

        <option value="Inactive">
          Inactive
        </option>

      </select>

      <button
        className="
        bg-green-600
        hover:bg-green-700
        text-white
        rounded-lg
        "
      >
        Search
      </button>

      <button

        onClick={handleClearFilter}

        className="
        bg-gray-600
        hover:bg-gray-700
        text-white
        rounded-lg
        "

      >
        Clear
      </button>

    </div>

  </div>

  {/* Employee Table */}

  <div className="bg-white border rounded-xl shadow overflow-hidden">

    <table className="w-full">

      <thead className="bg-gray-100">

        <tr className="text-gray-900">

          <th className="p-4 text-left">
            Employee ID
          </th>

          <th className="p-4 text-left">
            Employee Code
          </th>

          <th className="p-4 text-left">
            Name
          </th>

          <th className="p-4 text-left">
            Email
          </th>

          <th className="p-4 text-left">
            Department
          </th>

          <th className="p-4 text-left">
            Designation
          </th>

          <th className="p-4 text-left">
            Salary
          </th>

          <th className="p-4 text-left">
            Status
          </th>

          <th className="p-4 text-center">
            Action
          </th>

        </tr>

      </thead>
        <tbody>

{

loading ? (

<tr>

<td
colSpan={9}
className="text-center py-10 text-gray-600"
>

Loading employees...

</td>

</tr>

)

:

filteredEmployees.length === 0 ? (

<tr>

<td
colSpan={9}
className="text-center py-10 text-gray-600"
>

No employees found

</td>

</tr>

)

:

currentEmployees.map((employee) => (

<tr
key={employee.EmployeeId}
className="border-t hover:bg-gray-50"
>

<td className="p-4 text-gray-800">
{employee.EmployeeId}
</td>

<td className="p-4 text-gray-800">
{employee.EmployeeCode}
</td>

<td className="p-4 font-medium text-gray-900">
{employee.FirstName} {employee.LastName}
</td>

<td className="p-4 text-gray-700">
{employee.Email}
</td>

<td className="p-4 text-gray-700">
{employee.Department}
</td>

<td className="p-4 text-gray-700">
{employee.Designation}
</td>

<td className="p-4 text-gray-700">
₹{employee.Salary.toLocaleString()}
</td>

<td className="p-4">

<span
className={
employee.Status === "Active"
? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
: "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
}
>
{employee.Status}
</span>

</td>

<td className="p-4">

<div className="flex justify-center gap-2">

<Link
href={`/hr/employees/${employee.EmployeeId}`}
className="bg-green-600 text-white px-3 py-1 rounded text-sm"
>
View
</Link>

<Link
href={`/hr/employees/edit/${employee.EmployeeId}`}
className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
>
Edit
</Link>

<button
onClick={() => handleDelete(employee.EmployeeId)}
className="bg-red-600 text-white px-3 py-1 rounded text-sm"
>
Delete
</button>

</div>

</td>

</tr>

))

}

</tbody>

</table>

<div className="flex justify-between items-center p-4 border-t">

<p className="text-sm text-gray-600">

Showing {filteredEmployees.length === 0 ? 0 : firstEmployeeIndex + 1}
-
{Math.min(lastEmployeeIndex, filteredEmployees.length)}
of {filteredEmployees.length} employees

</p>

<div className="flex gap-2">

<button

disabled={currentPage === 1}

onClick={() =>
setCurrentPage(currentPage - 1)
}

className="px-4 py-2 border rounded disabled:opacity-50"

>

Previous

</button>

<button

disabled={
lastEmployeeIndex >= filteredEmployees.length
}

onClick={() =>
setCurrentPage(currentPage + 1)
}

className="px-4 py-2 border rounded disabled:opacity-50"

>

Next

</button>

</div>

</div>

</div>

</div>

);

}