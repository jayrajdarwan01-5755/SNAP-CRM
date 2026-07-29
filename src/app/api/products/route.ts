import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";



// GET ALL PRODUCTS

export async function GET() {

  try {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("productid", { ascending: true });



    if (error) {

      return NextResponse.json(
        {
          message: "Failed to fetch products",
          error: error.message,
        },
        {
          status: 500,
        }
      );

    }



    const products = data.map((product) => ({

      ProductId: product.productid,

      ProductCode: product.productcode,

      ProductName: product.productname,

      Category: product.category,

      Price: product.price,

      Quantity: product.quantity,

      Status: product.status,

    }));



    return NextResponse.json(products);



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






// ADD PRODUCT

export async function POST(request: NextRequest) {

  try {


    const body = await request.json();



    const { data, error } = await supabase
      .from("products")
      .insert([

        {

          productcode: body.ProductCode,

          productname: body.ProductName,

          category: body.Category,

          price: body.Price,

          quantity: body.Quantity,

          status: body.Status,

        }

      ])
      .select();




    if (error) {


      return NextResponse.json(

        {
          message: "Failed to add product",
          error: error.message,
        },

        {
          status: 500,
        }

      );

    }




    const product = data[0];



    return NextResponse.json(

      {

        ProductId: product.productid,

        ProductCode: product.productcode,

        ProductName: product.productname,

        Category: product.category,

        Price: product.price,

        Quantity: product.quantity,

        Status: product.status,

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

// UPDATE PRODUCT

export async function PUT(request: NextRequest) {

  try {

    const body = await request.json();



    const { data, error } = await supabase
      .from("products")
      .update({

        productcode: body.ProductCode,

        productname: body.ProductName,

        category: body.Category,

        price: body.Price,

        quantity: body.Quantity,

        status: body.Status,

      })
      .eq("productid", body.ProductId)
      .select();



    if (error) {

      return NextResponse.json(

        {
          message: "Failed to update product",
          error: error.message,
        },

        {
          status: 500,
        }

      );

    }



    const product = data[0];



    return NextResponse.json({

      message: "Product Updated Successfully",

      data: {

        ProductId: product.productid,

        ProductCode: product.productcode,

        ProductName: product.productname,

        Category: product.category,

        Price: product.price,

        Quantity: product.quantity,

        Status: product.status,

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

// DELETE PRODUCT

export async function DELETE(request: NextRequest) {

  try {

    const body = await request.json();



    const { error } = await supabase
      .from("products")
      .delete()
      .eq("productid", body.ProductId);



    if (error) {


      return NextResponse.json(

        {
          message: "Failed to delete product",
          error: error.message,
        },

        {
          status: 500,
        }

      );

    }



    return NextResponse.json({

      message: "Product Deleted Successfully",

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