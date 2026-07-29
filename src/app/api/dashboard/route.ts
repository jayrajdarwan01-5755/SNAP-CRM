import { NextResponse } from "next/server";


// Dashboard Dummy Data
let dashboardData = {
  employees: 120,
  leads: 350,
  products: 800,
  customers: 95,

  activities: [
    {
      id: 1,
      title: "New employee added",
      module: "HR",
      date: "27-Jul-2026 10:30 AM",
    },
    {
      id: 2,
      title: "New lead created",
      module: "Sales",
      date: "27-Jul-2026 11:15 AM",
    },
    {
      id: 3,
      title: "Product updated",
      module: "Inventory",
      date: "27-Jul-2026 12:20 PM",
    },
    {
      id: 4,
      title: "Customer registered",
      module: "Sales",
      date: "27-Jul-2026 01:10 PM",
    },
  ],
};



// GET Dashboard Data

export async function GET() {

  try {

    return NextResponse.json(
      {
        success: true,
        data: dashboardData,
      },
      {
        status: 200,
      }
    );


  } catch(error) {


    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard data",
      },
      {
        status: 500,
      }
    );


  }

}