import { NextResponse } from "next/server";
import { Customer } from "@/types/customer";


let customers: Customer[] = [
  {
    CustomerId: 1,
    CustomerCode: "CUST001",
    CustomerName: "Rahul Sharma",
    Phone: "9876543210",
    Email: "rahul@gmail.com",
    Address: "Andheri East",
    City: "Mumbai",
    State: "Maharashtra",
    Country: "India",
    Status: "Active",
  },
  {
    CustomerId: 2,
    CustomerCode: "CUST002",
    CustomerName: "ABC Technologies",
    Phone: "9123456780",
    Email: "abc@test.com",
    Address: "Baner",
    City: "Pune",
    State: "Maharashtra",
    Country: "India",
    Status: "Active",
  },
];


// GET ALL CUSTOMERS
export async function GET() {

  return NextResponse.json(customers);

}


// ADD CUSTOMER
export async function POST(request: Request) {

  const body: Customer = await request.json();


  const newCustomer = {
    ...body,
    CustomerId: Date.now(),
  };


  customers.push(newCustomer);


  return NextResponse.json(newCustomer);

}


// UPDATE CUSTOMER
export async function PUT(request: Request) {

  const body: Customer = await request.json();


  customers = customers.map((customer) =>
    customer.CustomerId === body.CustomerId
      ? body
      : customer
  );


  return NextResponse.json({
    message: "Customer updated successfully"
  });

}


// DELETE CUSTOMER
export async function DELETE(request: Request) {

  const body = await request.json();


  customers = customers.filter(
    (customer) =>
      customer.CustomerId !== body.CustomerId
  );


  return NextResponse.json({
    message: "Customer deleted successfully"
  });

}