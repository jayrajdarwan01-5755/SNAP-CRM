import { NextRequest, NextResponse } from "next/server";

let products = [
  {
    ProductId: 1,
    ProductCode: "PRD001",
    ProductName: "Dell Laptop",
    Category: "Electronics",
    Price: 65000,
    Quantity: 15,
    Status: "Active",
  },
  {
    ProductId: 2,
    ProductCode: "PRD002",
    ProductName: "Office Chair",
    Category: "Furniture",
    Price: 8500,
    Quantity: 30,
    Status: "Active",
  },
  {
    ProductId: 3,
    ProductCode: "PRD003",
    ProductName: "HP Printer",
    Category: "Office Supplies",
    Price: 12000,
    Quantity: 8,
    Status: "Inactive",
  },
];

// GET
export async function GET() {
  return NextResponse.json(products);
}

// POST
export async function POST(request: NextRequest) {
  const body = await request.json();

  const newProduct = {
    ProductId:
      products.length > 0
        ? Math.max(...products.map((p) => p.ProductId)) + 1
        : 1,
    ...body,
  };

  products.push(newProduct);

  return NextResponse.json(newProduct, { status: 201 });
}

// PUT
export async function PUT(request: NextRequest) {
  const body = await request.json();

  const index = products.findIndex(
    (p) => p.ProductId === body.ProductId
  );

  if (index === -1) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  products[index] = body;

  return NextResponse.json({
    message: "Product Updated Successfully",
  });
}

// DELETE
export async function DELETE(request: NextRequest) {
  const body = await request.json();

  products = products.filter(
    (p) => p.ProductId !== body.ProductId
  );

  return NextResponse.json({
    message: "Product Deleted Successfully",
  });
}