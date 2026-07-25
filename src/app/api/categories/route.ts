import { NextRequest, NextResponse } from "next/server";


let categories = [

  {
    CategoryId: 1,
    CategoryName: "Electronics",
    Description: "Electronic devices and accessories",
  },

  {
    CategoryId: 2,
    CategoryName: "Furniture",
    Description: "Office furniture and seating",
  },

  {
    CategoryId: 3,
    CategoryName: "Office Supplies",
    Description: "Stationery and office essentials",
  },

];





// GET

export async function GET() {


  return NextResponse.json(categories);


}







// POST

export async function POST(request: NextRequest) {


  const body = await request.json();



  const newCategory = {


    CategoryId:

      categories.length > 0

        ?

        Math.max(
          ...categories.map(
            (c) => c.CategoryId
          )
        ) + 1

        :

        1,



    ...body,


  };





  categories.push(newCategory);





  return NextResponse.json(

    newCategory,

    {
      status:201
    }

  );


}








// PUT

export async function PUT(request: NextRequest) {


  const body = await request.json();




  const index = categories.findIndex(

    (category) =>

    category.CategoryId === body.CategoryId

  );





  if(index === -1){


    return NextResponse.json(

      {
        message:"Category not found"
      },

      {
        status:404
      }

    );


  }







  categories[index] = {


    CategoryId: body.CategoryId,


    CategoryName: body.CategoryName,


    Description: body.Description,


  };






  return NextResponse.json({

    message:"Category Updated Successfully",

    data: categories[index]


  });



}









// DELETE

export async function DELETE(request: NextRequest) {


  const body = await request.json();




  const categoryExists = categories.some(

    (category)=>

    category.CategoryId === body.CategoryId

  );




  if(!categoryExists){


    return NextResponse.json(

      {
        message:"Category not found"
      },

      {
        status:404
      }

    );


  }






  categories = categories.filter(

    (category)=>

    category.CategoryId !== body.CategoryId

  );






  return NextResponse.json({

    message:"Category Deleted Successfully"

  });



}