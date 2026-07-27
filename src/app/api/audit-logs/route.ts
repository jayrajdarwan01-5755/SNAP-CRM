import { NextResponse } from "next/server";

let auditLogs = [
  {
    id: 1,
    user: "Admin",
    action: "Created User",
    module: "Users",
    date: "22-Jul-2026 10:30 AM",
    status: "Success",
  },
  {
    id: 2,
    user: "Manager",
    action: "Updated Product",
    module: "Inventory",
    date: "22-Jul-2026 11:15 AM",
    status: "Success",
  },
  {
    id: 3,
    user: "Admin",
    action: "Deleted Customer",
    module: "Sales",
    date: "22-Jul-2026 12:20 PM",
    status: "Failed",
  },
];

// GET Audit Logs
export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        data: auditLogs,
      },
      {
        status: 200,
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch audit logs",
      },
      {
        status: 500,
      }
    );
  }
}