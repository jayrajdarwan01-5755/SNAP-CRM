import { NextResponse } from "next/server";
import { Leave } from "@/types/leave";



let leaves: Leave[] = [


  {
    LeaveId: 1,

    EmployeeId: 101,

    EmployeeName: "John Smith",

    LeaveType: "Casual Leave",

    FromDate: "2026-07-10",

    ToDate: "2026-07-12",

    Reason: "Personal Work",

    Status: "Pending",

  },



  {
    LeaveId: 2,

    EmployeeId: 102,

    EmployeeName: "Alice Brown",

    LeaveType: "Sick Leave",

    FromDate: "2026-07-15",

    ToDate: "2026-07-16",

    Reason: "Health Issue",

    Status: "Pending",

  }


];






// GET ALL LEAVES

export async function GET(){


  return NextResponse.json(leaves);


}








// ADD LEAVE

export async function POST(

  request:Request

){


  const body:Leave = await request.json();



  const newLeave:Leave = {


    ...body,


    LeaveId:
leaves.length > 0
?
Math.max(
 ...leaves.map(
  (item)=>item.LeaveId
 )
)+1
:
1,

  };



  leaves.push(newLeave);



  return NextResponse.json(

    newLeave,

    {
      status:201
    }

  );


}








// UPDATE LEAVE

export async function PUT(

  request:Request

){


  const body:Leave = await request.json();




  leaves = leaves.map((leave)=>


    leave.LeaveId === body.LeaveId


    ?


    body


    :


    leave


  );




  return NextResponse.json({

    message:"Leave updated successfully"

  });



}









// DELETE LEAVE

export async function DELETE(

  request:Request

){


  const body = await request.json();




  leaves = leaves.filter(


    (leave)=>


    leave.LeaveId !== Number(body.LeaveId)


  );




  return NextResponse.json({


    message:"Leave deleted successfully"


  });



}