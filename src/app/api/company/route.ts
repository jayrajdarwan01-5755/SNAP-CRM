import { NextResponse } from "next/server";
import { Company } from "@/types/company";

let company: Company = {
  CompanyName: "SNAP CRM",
  Email: "admin@snapcrm.com",
  Phone: "+91 9876543210",
  Website: "www.snapcrm.com",
  Address: "Pune, Maharashtra",
  City: "Pune",
  State: "Maharashtra",
  Country: "India",
  Logo: "",
};

// GET COMPANY
export async function GET() {

  return NextResponse.json(company);

}

// UPDATE COMPANY
export async function PUT(request: Request) {

  const body: Company = await request.json();

  company = {
    ...company,
    ...body,
  };

  return NextResponse.json({
    message: "Company information updated successfully",
    company,
  });

}