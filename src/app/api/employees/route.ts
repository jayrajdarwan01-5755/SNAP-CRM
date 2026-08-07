import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// ========================
// GET EMPLOYEES
// ========================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Get Single Employee
    if (id) {
      const { data, error } = await supabaseServer
        .from("employees")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        return NextResponse.json(
          { message: error.message },
          { status: 404 }
        );
      }

      return NextResponse.json({
        EmployeeId: data.id,
        EmployeeCode: data.employee_code,
        FirstName: data.first_name,
        LastName: data.last_name,
        Email: data.email,
        Phone: data.phone,
        Gender: data.gender,
        DOB: data.dob,
        JoiningDate: data.joining_date,
        Department: data.department,
        Designation: data.designation,
        Salary: data.salary,
        Status: data.status,
      });
    }

    // Get All Employees
    const { data, error } = await supabaseServer
      .from("employees")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    const employees = data.map((emp) => ({
      EmployeeId: emp.id,
      EmployeeCode: emp.employee_code,
      FirstName: emp.first_name,
      LastName: emp.last_name,
      Email: emp.email,
      Phone: emp.phone,
      Gender: emp.gender,
      DOB: emp.dob,
      JoiningDate: emp.joining_date,
      Department: emp.department,
      Designation: emp.designation,
      Salary: emp.salary,
      Status: emp.status,
    }));

    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch employees",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

// ========================
// ADD EMPLOYEE
// ========================

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabaseServer
      .from("employees")
      .insert([
        {
          employee_code: body.EmployeeCode,
          first_name: body.FirstName,
          last_name: body.LastName,
          email: body.Email,
          phone: body.Phone,
          gender: body.Gender,
          dob: body.DOB,
          joining_date: body.JoiningDate,
          department: body.Department,
          designation: body.Designation,
          salary: body.Salary,
          status: body.Status,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    // Activity
    await supabaseServer.from("activities").insert([
      {
        title: "Employee Added",
        description: `${data.first_name} ${data.last_name} added as ${data.designation}`,
        type: "HR",
      },
    ]);

    return NextResponse.json({
      message: "Employee added successfully",
      employee: {
        EmployeeId: data.id,
        EmployeeCode: data.employee_code,
        FirstName: data.first_name,
        LastName: data.last_name,
        Email: data.email,
        Phone: data.phone,
        Gender: data.gender,
        DOB: data.dob,
        JoiningDate: data.joining_date,
        Department: data.department,
        Designation: data.designation,
        Salary: data.salary,
        Status: data.status,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to add employee",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

// ========================
// UPDATE EMPLOYEE
// ========================

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabaseServer
      .from("employees")
      .update({
        employee_code: body.EmployeeCode,
        first_name: body.FirstName,
        last_name: body.LastName,
        email: body.Email,
        phone: body.Phone,
        gender: body.Gender,
        dob: body.DOB,
        joining_date: body.JoiningDate,
        department: body.Department,
        designation: body.Designation,
        salary: body.Salary,
        status: body.Status,
      })
      .eq("id", body.EmployeeId)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    // Activity
    await supabaseServer.from("activities").insert([
      {
        title: "Employee Updated",
        description: `${data.first_name} ${data.last_name} employee updated`,
        type: "HR",
      },
    ]);

    return NextResponse.json({
      message: "Employee updated successfully",
      employee: {
        EmployeeId: data.id,
        EmployeeCode: data.employee_code,
        FirstName: data.first_name,
        LastName: data.last_name,
        Email: data.email,
        Phone: data.phone,
        Gender: data.gender,
        DOB: data.dob,
        JoiningDate: data.joining_date,
        Department: data.department,
        Designation: data.designation,
        Salary: data.salary,
        Status: data.status,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update employee",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

// ========================
// DELETE EMPLOYEE
// ========================

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    // Employee details before delete
    const { data: employee } = await supabaseServer
      .from("employees")
      .select("first_name,last_name")
      .eq("id", body.EmployeeId)
      .single();

    const { error } = await supabaseServer
      .from("employees")
      .delete()
      .eq("id", body.EmployeeId);

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    // Activity
    await supabaseServer.from("activities").insert([
      {
        title: "Employee Deleted",
        description: `${employee?.first_name} ${employee?.last_name} employee deleted`,
        type: "HR",
      },
    ]);

    return NextResponse.json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete employee",
        error,
      },
      {
        status: 500,
      }
    );
  }
}