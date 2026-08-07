import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// ==============================
// GET LEAVES
// ==============================

export async function GET(request: NextRequest) {

  try {

    const { searchParams } = new URL(request.url);

    const employeeId = searchParams.get("employeeid");

    console.log("API Employee ID:", employeeId);

    let query = supabase
      .from("leaves")
      .select("*")
      .order("leaveid", { ascending: true });

    if (employeeId) {

      query = query.eq(
        "employeeid",
        Number(employeeId)
      );

    }

    const { data, error } = await query;

    if (error) {

      return NextResponse.json(
        {
          message: "Failed to fetch leaves",
          error: error.message,
        },
        {
          status: 500,
        }
      );

    }

    const leaves = data.map((leave) => ({

      LeaveId: leave.leaveid,
      EmployeeId: leave.employeeid,
      EmployeeName: leave.employeename,
      LeaveType: leave.leavetype,
      FromDate: leave.fromdate,
      ToDate: leave.todate,
      Reason: leave.reason,
      Status: leave.status,

    }));

    console.log("API Leaves:", leaves);

    return NextResponse.json(leaves);

  }
  catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );

  }

}

// ==============================
// ADD LEAVE
// ==============================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("leaves")
      .insert([
        {
          employeeid: body.EmployeeId,
          employeename: body.EmployeeName,
          leavetype: body.LeaveType,
          fromdate: body.FromDate,
          todate: body.ToDate,
          reason: body.Reason,
          status: body.Status,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json(
        {
          message: "Failed to add leave",
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    const leave = data[0];

    // ==========================
    // ADD ACTIVITY
    // ==========================
    await supabase.from("activities").insert([
      {
        title: "Leave Applied",
        description: `${leave.employeename} applied for ${leave.leavetype}`,
        type: "Leave",
      },
    ]);

    return NextResponse.json(
      {
        LeaveId: leave.leaveid,
        EmployeeId: leave.employeeid,
        EmployeeName: leave.employeename,
        LeaveType: leave.leavetype,
        FromDate: leave.fromdate,
        ToDate: leave.todate,
        Reason: leave.reason,
        Status: leave.status,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}

// ==============================
// UPDATE LEAVE
// ==============================

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("leaves")
      .update({
        employeeid: body.EmployeeId,
        employeename: body.EmployeeName,
        leavetype: body.LeaveType,
        fromdate: body.FromDate,
        todate: body.ToDate,
        reason: body.Reason,
        status: body.Status,
      })
      .eq("leaveid", body.LeaveId)
      .select();

    if (error) {
      return NextResponse.json(
        {
          message: "Failed to update leave",
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    const leave = data[0];

    // ==========================
    // ADD ACTIVITY
    // ==========================
    await supabase.from("activities").insert([
      {
        title: "Leave Updated",
        description: `${leave.employeename} leave updated`,
        type: "Leave",
      },
    ]);

    return NextResponse.json({
      message: "Leave Updated Successfully",
      data: {
        LeaveId: leave.leaveid,
        EmployeeId: leave.employeeid,
        EmployeeName: leave.employeename,
        LeaveType: leave.leavetype,
        FromDate: leave.fromdate,
        ToDate: leave.todate,
        Reason: leave.reason,
        Status: leave.status,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}

// ==============================
// DELETE LEAVE
// ==============================

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    // Leave details before delete
    const { data: leave } = await supabase
      .from("leaves")
      .select("employeename")
      .eq("leaveid", body.LeaveId)
      .single();

    const { error } = await supabase
      .from("leaves")
      .delete()
      .eq("leaveid", body.LeaveId);

    if (error) {
      return NextResponse.json(
        {
          message: "Failed to delete leave",
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    // ==========================
    // ADD ACTIVITY
    // ==========================
    await supabase.from("activities").insert([
      {
        title: "Leave Deleted",
        description: `${leave?.employeename} leave deleted`,
        type: "Leave",
      },
    ]);

    return NextResponse.json({
      message: "Leave Deleted Successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}