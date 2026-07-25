import { NextResponse } from "next/server";
import { Payroll } from "@/types/payroll";


let payrolls: Payroll[] = [

  {
    PayrollId: 1,
    EmployeeId: 101,
    EmployeeName: "John Smith",
    Month: "July",
    Basic: 40000,
    Allowance: 5000,
    Deduction: 2000,
    NetSalary: 43000,
  },


  {
    PayrollId: 2,
    EmployeeId: 102,
    EmployeeName: "Alice Brown",
    Month: "July",
    Basic: 50000,
    Allowance: 6000,
    Deduction: 3000,
    NetSalary: 53000,
  },


  {
    PayrollId: 3,
    EmployeeId: 103,
    EmployeeName: "Robert Wilson",
    Month: "July",
    Basic: 35000,
    Allowance: 4000,
    Deduction: 1500,
    NetSalary: 37500,
  }

];





// GET ALL PAYROLL

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (id) {
    const payroll = payrolls.find(
      (p) => p.PayrollId === Number(id)
    );

    if (!payroll) {
      return NextResponse.json(
        { message: "Payroll not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(payroll);
  }

  return NextResponse.json(payrolls);
}





// ADD PAYROLL

export async function POST(
  request:Request
){

  const body:Payroll = await request.json();


  const newPayroll:Payroll = {

    ...body,

    PayrollId: Date.now(),

  };


  payrolls.push(newPayroll);


  return NextResponse.json(newPayroll);

}







// UPDATE PAYROLL

export async function PUT(
  request:Request
){

  const body:Payroll = await request.json();


  payrolls = payrolls.map((payroll)=>

    payroll.PayrollId === body.PayrollId

    ?

    body

    :

    payroll

  );


  return NextResponse.json({

    message:"Payroll updated successfully"

  });


}







// DELETE PAYROLL

export async function DELETE(
  request:Request
){

  const body = await request.json();


  payrolls = payrolls.filter(

    (payroll)=>

    payroll.PayrollId !== body.PayrollId

  );



  return NextResponse.json({

    message:"Payroll deleted successfully"

  });


}