    import { NextResponse } from "next/server";
    import { supabaseServer } from "@/lib/supabaseServer";


    // ========================
    // GET REPORTS
    // ========================

    export async function GET(request: Request) {

    try {


        const { searchParams } = new URL(request.url);


        const id = searchParams.get("id");

        const type = searchParams.get("type");



    // ========================
    // EMPLOYEE REPORT
    // ========================

    if (type === "employee") {


    const { data, error } = await supabaseServer
        .from("employees")
        .select("*")
        .order("id", {
        ascending: true
        });



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



    const employeeReport = data.map((employee) => ({

        EmployeeId: employee.id,

        EmployeeCode: employee.employee_code,

        FirstName: employee.first_name,

        LastName: employee.last_name,

        Email: employee.email,

        Phone: employee.phone,

        Gender: employee.gender,

        DOB: employee.dob,

        JoiningDate: employee.joining_date,

        Department: employee.department,

        Designation: employee.designation,

        Salary: employee.salary,

        Status: employee.status,

    }));



    return NextResponse.json(employeeReport);


    }


        // ========================
        // LEAVE REPORT
        // ========================

        if(type === "leave"){


        const { data, error } = await supabaseServer
            .from("leaves")
            .select("*")
            .order("leaveid", {
            ascending:true
            });



        if(error){

            return NextResponse.json(
            {
                message:error.message
            },
            {
                status:500
            }
            );

        }



        const leaveReport = data.map((leave)=>({

            LeaveId: leave.leaveid,

            EmployeeId: leave.employeeid,

            EmployeeName: leave.employeename,

            LeaveType: leave.leavetype,

            FromDate: leave.fromdate,

            ToDate: leave.todate,

            Reason: leave.reason,

            Status: leave.status,

        }));



        return NextResponse.json(leaveReport);


        }


// ========================
// PAYROLL REPORT
// ========================

if (type === "payroll") {

  const { data, error } = await supabaseServer
    .from("payrolls")
    .select("*")
    .order("id", {
      ascending: true
    });


  if (error) {

    return NextResponse.json(
      {
        message: error.message
      },
      {
        status: 500
      }
    );

  }


  const payrollReport = data.map((payroll) => ({

    PayrollId: payroll.id,

    EmployeeId: payroll.employeeid,

    EmployeeName: payroll.employeename,

    Month: payroll.month,

    Basic: payroll.basic,

    Allowance: payroll.allowance,

    Deduction: payroll.deduction,

    NetSalary: payroll.netsalary,

  }));


  return NextResponse.json(payrollReport);

}


// ========================
// Customer  REPORT
// ========================

if (type === "customer") {


 const { data, error } = await supabaseServer
 .from("customers")
 .select("*");


 if(error){
   return NextResponse.json(
    {
      message:error.message
    },
    {
      status:500
    }
   );
 }


 const customerReport = data.map((customer)=>({

   CustomerId: customer.id,

   CustomerCode: customer.customer_code,

   CustomerName: customer.customer_name,

   Phone: customer.phone,

   Email: customer.email,

   City: customer.city,

   Status: customer.status,

 }));


 return NextResponse.json(customerReport);

}


// ========================
// LEAD REPORT
// ========================

if (type === "lead") {


  const { data, error } = await supabaseServer
    .from("leads")
    .select("*")
    .order("leadid", {
      ascending: true
    });



  if (error) {

    return NextResponse.json(
      {
        message: error.message
      },
      {
        status: 500
      }
    );

  }



  const leadReport = data.map((lead) => ({


    LeadId: lead.leadid,

    LeadName: lead.leadname,

    Company: lead.company,

    Phone: lead.phone,

    Email: lead.email,

    Address: lead.address,

    LeadSource: lead.leadsource,

    Status: lead.status,


  }));



  return NextResponse.json(leadReport);


}



// ========================
// SUPPLIER REPORT
// ========================

if (type === "supplier") {


  const { data, error } = await supabaseServer
    .from("suppliers")
    .select("*")
    .order("supplierid", {
      ascending: true
    });



  if (error) {

    return NextResponse.json(
      {
        message: error.message
      },
      {
        status: 500
      }
    );

  }



  const supplierReport = data.map((supplier) => ({


    SupplierId: supplier.supplierid,

    SupplierName: supplier.suppliername,

    Email: supplier.email,

    Phone: supplier.phone,

    Address: supplier.address,


  }));



  return NextResponse.json(supplierReport);


}

// ========================
// CATEGORY REPORT
// ========================

if (type === "category") {


  const { data, error } = await supabaseServer
    .from("categories")
    .select("*")
    .order("categoryid", {
      ascending: true
    });



  if (error) {

    return NextResponse.json(
      {
        message: error.message
      },
      {
        status: 500
      }
    );

  }


  

  const categoryReport = data.map((category) => ({


    CategoryId: category.categoryid,

    CategoryName: category.categoryname,

    Description: category.description,

    Status: category.status,


  }));



  return NextResponse.json(categoryReport);


}


// ========================
// PRODUCT REPORT
// ========================

if (type === "product") {


  const { data, error } = await supabaseServer
    .from("products")
    .select("*")
    .order("productid", {
      ascending: true
    });



  if (error) {

    return NextResponse.json(
      {
        message: error.message
      },
      {
        status: 500
      }
    );

  }



  const productReport = data.map((product) => ({


    ProductId: product.productid,

    ProductCode: product.productcode,

    ProductName: product.productname,

    Category: product.category,

    Price: product.price,

    Quantity: product.quantity,

    Status: product.status,

    CreatedDate: product.createdat,


  }));



  return NextResponse.json(productReport);

}


// ========================
// OPPORTUNITY REPORT
// ========================

if (type === "opportunity") {


  const { data, error } = await supabaseServer
    .from("opportunities")
    .select("*")
    .order("opportunityid", {
      ascending: true
    });



  if (error) {

    return NextResponse.json(
      {
        message: error.message
      },
      {
        status: 500
      }
    );

  }



  const opportunityReport = data.map((opportunity) => ({


    OpportunityId: opportunity.opportunityid,

    Customer: opportunity.customer,

    OpportunityName: opportunity.opportunityname,

    Amount: opportunity.amount,

    Stage: opportunity.stage,

    Probability: opportunity.probability,

    CloseDate: opportunity.closedate,

    CreateDate: opportunity.createdate,


  }));



  return NextResponse.json(opportunityReport);


}

        // ========================
        // GET ALL REPORTS
        // ========================


        const { data, error } = await supabaseServer
        .from("reports")
        .select("*")
        .order("id", {
            ascending:true
        });



        if(error){


        return NextResponse.json(
            {
            message:error.message,
            },
            {
            status:500,
            }
        );


        }




        const reports = data.map((report)=>({


        ReportId: report.id,


        ReportName: report.report_name,


        }));




        return NextResponse.json(reports);



    } catch(error){


        return NextResponse.json(
        {
            message:"Failed to fetch reports",
            error,
        },
        {
            status:500,
        }
        );


    }

    }
    // ========================
    // ADD REPORT
    // ========================

    export async function POST(request: Request) {

    try {


        const body = await request.json();



        const { data, error } = await supabaseServer
        .from("reports")
        .insert([
            {
            report_name: body.ReportName,
            },
        ])
        .select()
        .single();



        if(error){

        return NextResponse.json(
            {
            message:error.message,
            },
            {
            status:400,
            }
        );

        }




        return NextResponse.json({

        message:"Report added successfully",


        report:{

            ReportId:data.id,

            ReportName:data.report_name,

        },


        });



    } catch(error){


        return NextResponse.json(
        {
            message:"Failed to add report",
            error,
        },
        {
            status:500,
        }
        );


    }

    }


    // ========================
    // UPDATE REPORT
    // ========================

    export async function PUT(request: Request) {

    try {


        const body = await request.json();



        const { data, error } = await supabaseServer
        .from("reports")
        .update({

            report_name: body.ReportName,

        })
        .eq("id", body.ReportId)
        .select()
        .single();




        if(error){

        return NextResponse.json(
            {
            message:error.message,
            },
            {
            status:400,
            }
        );

        }




        return NextResponse.json({

        message:"Report updated successfully",


        report:{

            ReportId:data.id,

            ReportName:data.report_name,

        },


        });



    } catch(error){


        return NextResponse.json(
        {
            message:"Failed to update report",
            error,
        },
        {
            status:500,
        }
        );


    }

    }
    // ========================
    // DELETE REPORT
    // ========================

    export async function DELETE(request: Request) {

    try {


        const body = await request.json();



        const { error } = await supabaseServer
        .from("reports")
        .delete()
        .eq("id", body.ReportId);




        if(error){


        return NextResponse.json(
            {
            message:error.message,
            },
            {
            status:400,
            }
        );


        }




        return NextResponse.json({

        message:"Report deleted successfully",

        });




    } catch(error){


        return NextResponse.json(
        {
            message:"Failed to delete report",
            error,
        },
        {
            status:500,
        }
        );


    }

    }