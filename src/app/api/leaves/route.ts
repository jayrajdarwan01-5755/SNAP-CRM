import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";



// GET ALL LEAVES

export async function GET() {

  try {

    const { data, error } = await supabase
      .from("leaves")
      .select("*")
      .order("leaveid", { ascending: true });



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



    return NextResponse.json(leaves);



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







// ADD LEAVE

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

        }

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

// UPDATE LEAVE

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

      }

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


// DELETE LEAVE

export async function DELETE(request: NextRequest) {

  try {

    const body = await request.json();



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