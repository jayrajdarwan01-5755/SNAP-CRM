"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function AddEmployeePage() {
  const router = useRouter();
  const { themeSettings } = useTheme();

  const [employee, setEmployee] = useState({
    employeeCode: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    joiningDate: "",
    department: "",
    designation: "",
    salary: "",
    status: "Active",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !employee.employeeCode ||
      !employee.firstName ||
      !employee.lastName ||
      !employee.email ||
      !employee.phone ||
      !employee.department ||
      !employee.designation
    ) {
      alert("Please fill all required fields");
      return;
    }

    const response = await fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeCode: employee.employeeCode,
        FirstName: employee.firstName,
        LastName: employee.lastName,
        Email: employee.email,
        Phone: employee.phone,
        Gender: employee.gender,
        DOB: employee.dob,
        JoiningDate: employee.joiningDate,
        Department: employee.department,
        Designation: employee.designation,
        Salary: Number(employee.salary),
        Status: employee.status,
      }),
    });

    if (response.ok) {
      alert("Employee Added Successfully");
      router.push("/hr/employees");
    } else {
      alert("Failed to add employee");
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-theme">
          Add Employee
        </h1>

        <p className="text-muted mt-2">
          Create new employee record
        </p>

      </div>

      {/* Form */}

      <div className="card-theme rounded-xl shadow p-6">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Employee Information */}

            {/* Employee Information */}

<div
  className="rounded-xl border p-6"
  style={{
    background: "rgba(128,128,128,0.08)",
    borderColor: themeSettings.primaryColor,
  }}
>

  <h2 className="text-2xl font-bold text-theme mb-6">
    Employee Information
  </h2>

  <div className="space-y-4">

    {/* Employee Code */}

    <div>

      <label className="block text-sm font-semibold text-theme mb-2">
        Employee Code
      </label>

      <input
        type="text"
        name="employeeCode"
        value={employee.employeeCode}
        onChange={handleChange}
        placeholder="EMP001"
        className="input-theme"
      />

    </div>

    {/* First Name */}

    <div>

      <label className="block text-sm font-semibold text-theme mb-2">
        First Name
      </label>

      <input
        type="text"
        name="firstName"
        value={employee.firstName}
        onChange={handleChange}
        placeholder="Enter First Name"
        className="input-theme"
      />

    </div>

    {/* Last Name */}

    <div>

      <label className="block text-sm font-semibold text-theme mb-2">
        Last Name
      </label>

      <input
        type="text"
        name="lastName"
        value={employee.lastName}
        onChange={handleChange}
        placeholder="Enter Last Name"
        className="input-theme"
      />

    </div>

    {/* Email */}

    <div>

      <label className="block text-sm font-semibold text-theme mb-2">
        Email
      </label>

      <input
        type="email"
        name="email"
        value={employee.email}
        onChange={handleChange}
        placeholder="Enter Email"
        className="input-theme"
      />

    </div>

    {/* Phone */}

    <div>

      <label className="block text-sm font-semibold text-theme mb-2">
        Phone
      </label>

      <input
        type="text"
        name="phone"
        value={employee.phone}
        onChange={handleChange}
        placeholder="9876543210"
        className="input-theme"
      />

    </div>

    {/* Gender */}

    <div>

      <label className="block text-sm font-semibold text-theme mb-2">
        Gender
      </label>

      <select
        name="gender"
        value={employee.gender}
        onChange={handleChange}
        className="input-theme"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

    </div>

    {/* Date Of Birth */}

    <div>

      <label className="block text-sm font-semibold text-theme mb-2">
        Date of Birth
      </label>

      <input
        type="date"
        name="dob"
        value={employee.dob}
        onChange={handleChange}
        className="input-theme"
      />

    </div>

  </div>

</div>

{/* Job Information */}

{/* Job Information */}

<div
  className="rounded-xl border p-6"
  style={{
    background: "rgba(128,128,128,0.08)",
    borderColor: themeSettings.primaryColor,
  }}
>

  <h2 className="text-2xl font-bold text-theme mb-6">
    Job Information
  </h2>

  <div className="space-y-4">

    {/* Joining Date */}

    <div>

      <label className="block text-sm font-semibold text-theme mb-2">
        Joining Date
      </label>

      <input
        type="date"
        name="joiningDate"
        value={employee.joiningDate}
        onChange={handleChange}
        className="input-theme"
      />

    </div>

    {/* Department */}

    <div>

      <label className="block text-sm font-semibold text-theme mb-2">
        Department
      </label>

      <select
        name="department"
        value={employee.department}
        onChange={handleChange}
        className="input-theme"
      >
        <option value="">Select Department</option>
        <option value="HR">HR</option>
        <option value="Sales">Sales</option>
        <option value="IT">IT</option>
      </select>

    </div>

    {/* Designation */}

    <div>

      <label className="block text-sm font-semibold text-theme mb-2">
        Designation
      </label>

      <input
        type="text"
        name="designation"
        value={employee.designation}
        onChange={handleChange}
        placeholder="Enter Designation"
        className="input-theme"
      />

    </div>

    {/* Salary */}

    <div>

      <label className="block text-sm font-semibold text-theme mb-2">
        Salary
      </label>

      <input
        type="number"
        name="salary"
        value={employee.salary}
        onChange={handleChange}
        placeholder="50000"
        className="input-theme"
      />

    </div>

    {/* Status */}

    <div>

      <label className="block text-sm font-semibold text-theme mb-2">
        Status
      </label>

      <select
        name="status"
        value={employee.status}
        onChange={handleChange}
        className="input-theme"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

    </div>

  </div>

</div>

</div>

          {/* Buttons */}

          <div className="flex gap-3 pt-4">

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Save Employee
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}