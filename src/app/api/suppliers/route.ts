import { NextRequest, NextResponse } from "next/server";


let suppliers = [

  {
    SupplierId: 1,
    SupplierName: "ABC Traders",
    Email: "contact@abctraders.com",
    Phone: "9876543210",
    Address: "Mumbai, Maharashtra",
  },

  {
    SupplierId: 2,
    SupplierName: "Global Supplies",
    Email: "sales@globalsupplies.com",
    Phone: "9123456780",
    Address: "Pune, Maharashtra",
  },

  {
    SupplierId: 3,
    SupplierName: "Tech Distributors",
    Email: "info@techdistributors.com",
    Phone: "9988776655",
    Address: "Bengaluru, Karnataka",
  },

];




// GET

export async function GET() {

  return NextResponse.json(suppliers);

}





// POST

export async function POST(
  request: NextRequest
) {


  const body = await request.json();



  const newSupplier = {


    SupplierId:

      suppliers.length > 0

      ?

      Math.max(
        ...suppliers.map(
          (s)=>s.SupplierId
        )
      ) + 1

      :

      1,


    ...body,


  };



  suppliers.push(newSupplier);



  return NextResponse.json(
    newSupplier,
    {
      status:201
    }
  );


}






// PUT

export async function PUT(
  request: NextRequest
) {


  const body = await request.json();



  const index = suppliers.findIndex(

    (s)=>
      s.SupplierId === body.SupplierId

  );



  if(index === -1){

    return NextResponse.json(
      {
        message:"Supplier not found"
      },
      {
        status:404
      }
    );

  }



  suppliers[index] = body;



  return NextResponse.json({

    message:"Supplier Updated Successfully"

  });


}







// DELETE

export async function DELETE(
  request: NextRequest
) {


  const body = await request.json();



  suppliers = suppliers.filter(

    (s)=>
      s.SupplierId !== body.SupplierId

  );



  return NextResponse.json({

    message:"Supplier Deleted Successfully"

  });


}