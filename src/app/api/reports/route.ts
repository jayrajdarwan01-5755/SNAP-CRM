import { NextResponse } from "next/server";

export interface Report {
  ReportId: number;
  ReportName: string;
}

let reports: Report[] = [
  {
    ReportId: 1,
    ReportName: "Employee Report",
  },
  {
    ReportId: 2,
    ReportName: "Sales Report",
  },
  {
    ReportId: 3,
    ReportName: "Inventory Report",
  },
  {
    ReportId: 4,
    ReportName: "Payroll Report",
  },
  {
    ReportId: 5,
    ReportName: "Customer Report",
  },
  {
    ReportId: 6,
    ReportName: "Lead Report",
  },
];


// GET ALL REPORTS

export async function GET() {

  return NextResponse.json(reports);

}


// ADD REPORT

export async function POST(request: Request) {

  const body: Report = await request.json();

  const newReport = {
    ...body,
    ReportId: Date.now(),
  };

  reports.push(newReport);

  return NextResponse.json(newReport);

}


// UPDATE REPORT

export async function PUT(request: Request) {

  const body: Report = await request.json();

  reports = reports.map((report) =>
    report.ReportId === body.ReportId
      ? body
      : report
  );

  return NextResponse.json({
    message: "Report updated successfully",
  });

}


// DELETE REPORT

export async function DELETE(request: Request) {

  const body = await request.json();

  reports = reports.filter(
    (report) => report.ReportId !== body.ReportId
  );

  return NextResponse.json({
    message: "Report deleted successfully",
  });

}