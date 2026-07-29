import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";



// GET ALL CATEGORIES

export async function GET() {

  try {

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("categoryid", { ascending: true });



    if (error) {

      return NextResponse.json(
        {
          message: "Failed to fetch categories",
          error: error.message,
        },
        {
          status: 500,
        }
      );

    }



    const categories = data.map((category) => ({

      CategoryId: category.categoryid,

      CategoryName: category.categoryname,

      Description: category.description,

    }));



    return NextResponse.json(categories);



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






// ADD CATEGORY

export async function POST(request: NextRequest) {

  try {


    const body = await request.json();



    const { data, error } = await supabase
      .from("categories")
      .insert([

        {

          categoryname: body.CategoryName,

          description: body.Description,

        }

      ])
      .select();




    if (error) {


      return NextResponse.json(

        {
          message: "Failed to add category",
          error: error.message,
        },

        {
          status: 500,
        }

      );


    }




    const category = data[0];



    return NextResponse.json(

      {

        CategoryId: category.categoryid,

        CategoryName: category.categoryname,

        Description: category.description,

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

// UPDATE CATEGORY

export async function PUT(request: NextRequest) {

  try {

    const body = await request.json();



    const { data, error } = await supabase
      .from("categories")
      .update({

        categoryname: body.CategoryName,

        description: body.Description,

      })
      .eq("categoryid", body.CategoryId)
      .select();



    if (error) {


      return NextResponse.json(

        {
          message: "Failed to update category",
          error: error.message,
        },

        {
          status: 500,
        }

      );

    }



    const category = data[0];



    return NextResponse.json({

      message: "Category Updated Successfully",

      data: {

        CategoryId: category.categoryid,

        CategoryName: category.categoryname,

        Description: category.description,

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

// DELETE CATEGORY

export async function DELETE(request: NextRequest) {

  try {

    const body = await request.json();



    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("categoryid", body.CategoryId);



    if (error) {


      return NextResponse.json(

        {
          message: "Failed to delete category",
          error: error.message,
        },

        {
          status: 500,
        }

      );

    }



    return NextResponse.json({

      message: "Category Deleted Successfully",

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