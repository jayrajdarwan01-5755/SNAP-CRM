import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// ========================
// ACTIVITY LOGGER
// ========================

async function addActivity(title: string, type: string) {
  await supabaseServer.from("activities").insert([
    {
      title,
      type,
      created_at: new Date().toISOString(),
    },
  ]);
}

// ========================
// GET PAYROLLS
// ========================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // ========================
    // GET SINGLE PAYROLL
    // ========================

    if (id) {
      const { data, error } = await supabaseServer
        .from("payrolls")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        return NextResponse.json(
          {
            message: error.message,
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json({
        PayrollId: data.id,
        EmployeeId: data.employeeid,
        EmployeeName: data.employeename,
        Month: data.month,
        Basic: Number(data.basic),
        Allowance: Number(data.allowance),
        Deduction: Number(data.deduction),
        NetSalary: Number(data.netsalary),
      });
    }

    // ========================
    // GET ALL PAYROLLS
    // ========================

    const { data, error } = await supabaseServer
      .from("payrolls")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }

    const payrolls = data.map((payroll) => ({
      PayrollId: payroll.id,
      EmployeeId: payroll.employeeid,
      EmployeeName: payroll.employeename,
      Month: payroll.month,
      Basic: Number(payroll.basic),
      Allowance: Number(payroll.allowance),
      Deduction: Number(payroll.deduction),
      NetSalary: Number(payroll.netsalary),
    }));

    return NextResponse.json(payrolls);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch payrolls",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

// ========================
// ADD PAYROLL
// ========================

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabaseServer
      .from("payrolls")
      .insert([
        {
          employeeid: body.EmployeeId,
          employeename: body.EmployeeName,
          month: body.Month,
          basic: body.Basic,
          allowance: body.Allowance,
          deduction: body.Deduction,
          netsalary: body.NetSalary,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }

    // Activity
    await addActivity(
      `Payroll generated for ${data.employeename}`,
      "Payroll"
    );

    return NextResponse.json({
      message: "Payroll added successfully",
      payroll: {
        PayrollId: data.id,
        EmployeeId: data.employeeid,
        EmployeeName: data.employeename,
        Month: data.month,
        Basic: Number(data.basic),
        Allowance: Number(data.allowance),
        Deduction: Number(data.deduction),
        NetSalary: Number(data.netsalary),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to add payroll",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
// ========================
// UPDATE PAYROLL
// ========================

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabaseServer
      .from("payrolls")
      .update({
        employeeid: body.EmployeeId,
        employeename: body.EmployeeName,
        month: body.Month,
        basic: body.Basic,
        allowance: body.Allowance,
        deduction: body.Deduction,
        netsalary: body.NetSalary,
      })
      .eq("id", body.PayrollId)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }

    // ========================
    // ACTIVITY LOG
    // ========================

    await addActivity(
      `Payroll updated for ${data.employeename}`,
      "Payroll"
    );

    return NextResponse.json({
      message: "Payroll updated successfully",
      payroll: {
        PayrollId: data.id,
        EmployeeId: data.employeeid,
        EmployeeName: data.employeename,
        Month: data.month,
        Basic: Number(data.basic),
        Allowance: Number(data.allowance),
        Deduction: Number(data.deduction),
        NetSalary: Number(data.netsalary),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update payroll",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

// ========================
// DELETE PAYROLL
// ========================

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    // Get payroll before delete
    const { data: oldPayroll } = await supabaseServer
      .from("payrolls")
      .select("employeename")
      .eq("id", body.PayrollId)
      .maybeSingle();

    const { error } = await supabaseServer
      .from("payrolls")
      .delete()
      .eq("id", body.PayrollId);

    if (error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }

    // ========================
    // ACTIVITY LOG
    // ========================

    await addActivity(
      `Payroll deleted for ${oldPayroll?.employeename ?? "Employee"}`,
      "Payroll"
    );

    return NextResponse.json({
      message: "Payroll deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete payroll",
        error,
      },
      {
        status: 500,
      }
    );
  }
}