"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const router = useRouter();
  const { themeSettings } = useTheme();

  const [loading, setLoading] = useState(true);

  const [employee, setEmployee] = useState({
    employeeId: 0,
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

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    try {
      const response = await fetch(`/api/employees?id=${id}`);

      const data = await response.json();

      setEmployee({
        employeeId: data.EmployeeId,
        employeeCode: data.EmployeeCode,
        firstName: data.FirstName,
        lastName: data.LastName,
        email: data.Email,
        phone: data.Phone,
        gender: data.Gender,
        dob: data.DOB,
        joiningDate: data.JoiningDate,
        department: data.Department,
        designation: data.Designation,
        salary: data.Salary.toString(),
        status: data.Status,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/employees", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeId: employee.employeeId,
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
      alert("Employee Updated Successfully");
      router.push("/hr/employees");
    } else {
      alert("Failed to update employee");
    }
  };

  if (loading) {
    return (
      <div className="p-6 sm:p-10 text-center text-theme">
        Loading Employee...
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6 min-w-0">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-theme">
            Edit Employee
          </h1>

          <p className="text-muted mt-1 sm:mt-2 text-sm sm:text-base">
            Update employee information
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg w-full sm:w-auto transition"
        >
          Back
        </button>

      </div>

      {/* Form */}
      <div className="card-theme rounded-xl shadow p-4 sm:p-6">

        <form
          onSubmit={handleUpdate}
          className="space-y-6 sm:space-y-8"
        >

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">

            {/* Employee Information */}
            <div
              className="rounded-xl border p-4 sm:p-6"
              style={{
                background: "rgba(128,128,128,0.08)",
              }}
            >

              <h2 className="text-xl sm:text-2xl font-bold text-theme mb-5 sm:mb-6">
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
                    className="input-theme w-full"
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
                    className="input-theme w-full"
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
                    className="input-theme w-full"
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
                    className="input-theme w-full"
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
                    className="input-theme w-full"
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
                    className="input-theme w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-semibold text-theme mb-2">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="dob"
                    value={employee.dob}
                    onChange={handleChange}
                    className="input-theme w-full"
                  />
                </div>

              </div>

            </div>

            {/* Job Information */}
            <div
              className="rounded-xl border p-4 sm:p-6"
              style={{
                background: "rgba(128,128,128,0.08)",
              }}
            >

              <h2 className="text-xl sm:text-2xl font-bold text-theme mb-5 sm:mb-6">
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
                    className="input-theme w-full"
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
                    className="input-theme w-full"
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
                    className="input-theme w-full"
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
                    className="input-theme w-full"
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
                    className="input-theme w-full"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

              </div>

            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg w-full sm:w-auto transition"
            >
              Update Employee
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg w-full sm:w-auto transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
