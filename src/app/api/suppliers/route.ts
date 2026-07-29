import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";



// GET ALL SUPPLIERS

export async function GET() {

  try {

    const { data, error } = await supabase
      .from("suppliers")
      .select("*")
      .order("supplierid", { ascending: true });



    if (error) {

      return NextResponse.json(
        {
          message: "Failed to fetch suppliers",
          error: error.message,
        },
        {
          status: 500,
        }
      );

    }



    const suppliers = data.map((supplier) => ({

      SupplierId: supplier.supplierid,

      SupplierName: supplier.suppliername,

      Email: supplier.email,

      Phone: supplier.phone,

      Address: supplier.address,

    }));



    return NextResponse.json(suppliers);



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






// ADD SUPPLIER

export async function POST(request: NextRequest) {

  try {


    const body = await request.json();



    const { data, error } = await supabase
      .from("suppliers")
      .insert([

        {

          suppliername: body.SupplierName,

          email: body.Email,

          phone: body.Phone,

          address: body.Address,

        }

      ])
      .select();




    if (error) {


      return NextResponse.json(

        {
          message: "Failed to add supplier",
          error: error.message,
        },

        {
          status: 500,
        }

      );


    }




    const supplier = data[0];



    return NextResponse.json(

      {

        SupplierId: supplier.supplierid,

        SupplierName: supplier.suppliername,

        Email: supplier.email,

        Phone: supplier.phone,

        Address: supplier.address,

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

// UPDATE SUPPLIER

export async function PUT(request: NextRequest) {

  try {

    const body = await request.json();



    const { data, error } = await supabase
      .from("suppliers")
      .update({

        suppliername: body.SupplierName,

        email: body.Email,

        phone: body.Phone,

        address: body.Address,

      })
      .eq("supplierid", body.SupplierId)
      .select();



    if (error) {

      return NextResponse.json(

        {
          message: "Failed to update supplier",
          error: error.message,
        },

        {
          status: 500,
        }

      );

    }



    const supplier = data[0];



    return NextResponse.json({

      message: "Supplier Updated Successfully",

      data: {

        SupplierId: supplier.supplierid,

        SupplierName: supplier.suppliername,

        Email: supplier.email,

        Phone: supplier.phone,

        Address: supplier.address,

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
// DELETE SUPPLIER

export async function DELETE(request: NextRequest) {

  try {

    const body = await request.json();



    const { error } = await supabase
      .from("suppliers")
      .delete()
      .eq("supplierid", body.SupplierId);



    if (error) {


      return NextResponse.json(

        {
          message: "Failed to delete supplier",
          error: error.message,
        },

        {
          status: 500,
        }

      );

    }



    return NextResponse.json({

      message: "Supplier Deleted Successfully",

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