import { NextResponse } from "next/server";
import { Employee } from "@/types/employee";

let employees: Employee[] = [
  {
    EmployeeId: 1,
    EmployeeCode: "EMP001",
    FirstName: "John",
    LastName: "Smith",
    Email: "john@gmail.com",
    Phone: "9876543210",
    Gender: "Male",
    DOB: "10-05-1995",
    JoiningDate: "15-01-2026",
    Department: "HR",
    Designation: "HR Manager",
    Salary: 50000,
    Status: "Active",
  },
  {
    EmployeeId: 2,
    EmployeeCode: "EMP002",
    FirstName: "Alice",
    LastName: "Brown",
    Email: "alice@gmail.com",
    Phone: "9876543211",
    Gender: "Female",
    DOB: "20-08-1998",
    JoiningDate: "01-02-2026",
    Department: "Sales",
    Designation: "Sales Executive",
    Salary: 35000,
    Status: "Active",
  },
];

// GET ALL EMPLOYEES
export async function GET() {
  return NextResponse.json(employees);
}

// ADD EMPLOYEE
export async function POST(request: Request) {
  const body: Employee = await request.json();

  const newEmployee = {
    ...body,
    EmployeeId: Date.now(),
  };

  employees.push(newEmployee);

  return NextResponse.json(newEmployee);
}

// UPDATE EMPLOYEE
export async function PUT(request: Request) {
  const body: Employee = await request.json();

  employees = employees.map((employee) =>
    employee.EmployeeId === body.EmployeeId
      ? body
      : employee
  );

  return NextResponse.json({
    message: "Employee updated successfully",
  });
}

// DELETE EMPLOYEE
export async function DELETE(request: Request) {
  const body = await request.json();

  employees = employees.filter(
    (employee) =>
      employee.EmployeeId !== body.EmployeeId
  );

  return NextResponse.json({
    message: "Employee deleted successfully",
  });
}