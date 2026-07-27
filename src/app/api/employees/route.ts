import { NextResponse } from "next/server";
import { Employee } from "@/types/employee";

export let employees: Employee[] = [
  {
    EmployeeId: 1,
    EmployeeCode: "EMP001",
    FirstName: "John",
    LastName: "Smith",
    Email: "john@gmail.com",
    Phone: "9876543210",
    Gender: "Male",
    DOB: "1995-05-10",
    JoiningDate: "2026-01-15",
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
    DOB: "1998-08-20",
    JoiningDate: "2026-02-01",
    Department: "Sales",
    Designation: "Sales Executive",
    Salary: 35000,
    Status: "Active",
  },
];

// ========================
// GET ALL EMPLOYEES
// ========================

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (id) {
    const employee = employees.find(
      (emp) => emp.EmployeeId === Number(id)
    );

    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(employee);
  }

  return NextResponse.json(employees);
}

// ========================
// ADD EMPLOYEE
// ========================

export async function POST(request: Request) {
  const body: Employee = await request.json();

  const newEmployee: Employee = {
    ...body,
    EmployeeId: Date.now(),
  };

  employees.push(newEmployee);

  return NextResponse.json(newEmployee);
}

// ========================
// UPDATE EMPLOYEE
// ========================

export async function PUT(request: Request) {
  const body: Employee = await request.json();

  const index = employees.findIndex(
    (emp) => emp.EmployeeId === body.EmployeeId
  );

  if (index === -1) {
    return NextResponse.json(
      { message: "Employee not found" },
      { status: 404 }
    );
  }

  employees[index] = body;

  return NextResponse.json({
    message: "Employee updated successfully",
    employee: employees[index],
  });
}

// ========================
// DELETE EMPLOYEE
// ========================

export async function DELETE(request: Request) {
  const body = await request.json();

  employees = employees.filter(
    (emp) => emp.EmployeeId !== body.EmployeeId
  );

  return NextResponse.json({
    message: "Employee deleted successfully",
  });
}