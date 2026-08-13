"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import { Report } from "@/types/report";
import { Employee } from "@/types/employee";
import { Leave } from "@/types/leave";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "jspdf-autotable";

export default function ReportsPage() {
  const { user } = useAuth();

  const [reports, setReports] = useState<Report[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaves, setLeaves] = useState<Leave[]>([]);

  const [selectedReport, setSelectedReport] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [generated, setGenerated] = useState(false);
  const [search, setSearch] = useState("");

  const [reportData, setReportData] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      loadReports();
    }
  }, [user]);

  // ======================================
  // LOAD REPORTS
  // ======================================

  const loadReports = async () => {
    try {
      const response = await fetch("/api/reports");

      const data: Report[] = await response.json();

      console.log("All Reports:", data);

      let filteredReports: Report[] = [];

      switch (user?.role) {
        case "Admin":
          filteredReports = data;
          break;

        case "HR":
          filteredReports = data.filter((r) =>
            [
              "Employee Report",
              "Leave Report",
              "Payroll Report",
            ].includes(r.ReportName)
          );
          break;

        case "Manager":
          filteredReports = data.filter((r) =>
            [
              "Lead Report",
              "Customer Report",
              "Opportunity Report",
              "Product Report",
              "Category Report",
              "Supplier Report",
              "Sales Report",
            ].includes(r.ReportName)
          );
          break;

        case "Employee":
          filteredReports = data.filter((r) =>
            [
              "Leave Report",
              "Payroll Report",
            ].includes(r.ReportName)
          );
          break;

        default:
          filteredReports = [];
      }

      console.log("Filtered Reports:", filteredReports);

      setReports(filteredReports);
    } catch (error) {
      console.log(error);
    }
  };

  // ======================================
  // LOAD EMPLOYEES
  // ======================================

  const loadEmployees = async () => {
    try {
      const response = await fetch("/api/employees");

      const data: Employee[] = await response.json();

      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ======================================
  // LOAD LEAVES
  // ======================================

  const loadLeaves = async () => {
    try {
      const response = await fetch(
        "/api/reports?type=leave"
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setLeaves(data);
      } else {
        setLeaves([]);
      }
    } catch (error) {
      console.log(error);

      setLeaves([]);
    }
  };

  // ======================================
  // GENERATE REPORT
  // ======================================

  const handleGenerate = async () => {
    if (!selectedReport) {
      alert("Please select report");
      return;
    }

    if (!fromDate || !toDate) {
      alert("Please select From Date and To Date");
      return;
    }

    let type = "";

    switch (selectedReport) {
      case "Employee Report":
        type = "employee";
        break;

      case "Leave Report":
        type = "leave";
        break;

      case "Payroll Report":
        type = "payroll";
        break;

      case "Customer Report":
        type = "customer";
        break;

      case "Lead Report":
        type = "lead";
        break;

      case "Supplier Report":
        type = "supplier";
        break;

      case "Category Report":
        type = "category";
        break;

      case "Sales Report":
        type = "sales";
        break;

      case "Opportunity Report":
        type = "opportunity";
        break;

      case "Product Report":
        type = "product";
        break;

      default:
        type = "";
    }

    let url =
      `/api/reports?type=${type}` +
      `&fromDate=${fromDate}` +
      `&toDate=${toDate}`;

    // Employee sirf apna data dekhega

    if (user?.role === "Employee") {
      url += `&employeeId=${(user as any).employeeid}`;
    }

    console.log("Request URL:", url);

    const response = await fetch(url);

    const data = await response.json();

    console.log("API Response:", data);

    if (!Array.isArray(data)) {
      console.error("API Error:", data);

      alert(
        data.message ||
        "Failed to generate report"
      );

      setReportData([]);

      return;
    }

    setReportData(data);

    setGenerated(true);
  };

  // ======================================
  // FILTER DATA
  // ======================================

  const filteredData = reportData.filter((row) =>
    JSON.stringify(row)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ======================================
  // EXPORT EXCEL
  // ======================================

  const handleExportExcel = () => {
    if (reportData.length === 0) {
      alert("No data available");
      return;
    }

    const worksheet =
      XLSX.utils.json_to_sheet(filteredData);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Report"
    );

    const excelBuffer = XLSX.write(
      workbook,
      {
        bookType: "xlsx",
        type: "array",
      }
    );

    const file = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      }
    );

    const fileName =
      `${selectedReport.replace(/\s+/g, "_")}` +
      `_${fromDate}_to_${toDate}.xlsx`;

    saveAs(file, fileName);
  };

  // ======================================
  // EXPORT PDF
  // ======================================

  const handleExportPDF = () => {
    if (reportData.length === 0) {
      alert("No data available");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      selectedReport,
      14,
      15
    );

    doc.setFontSize(11);

    doc.text(
      `From : ${fromDate}`,
      14,
      24
    );

    doc.text(
      `To : ${toDate}`,
      14,
      31
    );

    const headers = [
      Object.keys(reportData[0]),
    ];

    const rows = filteredData.map(
      (item) =>
        Object.values(item).map(
          (value) =>
            value === null ||
            value === undefined
              ? ""
              : String(value)
        )
    );

    autoTable(doc, {
      head: headers,
      body: rows,
      startY: 40,
      styles: {
        fontSize: 8,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
      },
    });

    doc.save(
      `${selectedReport.replace(/\s+/g, "_")}` +
      `_${fromDate}_to_${toDate}.pdf`
    );
  };

  // ======================================
  // PRINT REPORT
  // ======================================

  const handlePrint = () => {
    const printContents =
      document.getElementById(
        "print-area"
      )?.innerHTML;

    if (!printContents) {
      alert("Nothing to print");
      return;
    }

    const printWindow =
      window.open("", "_blank");

    if (!printWindow) {
      alert("Unable to open print window");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>${selectedReport}</title>

          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 30px;
              color: #000;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: left;
              font-size: 13px;
            }

            th {
              background: #f3f3f3;
            }
          </style>

        </head>

        <body>
          ${printContents}
        </body>

      </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    printWindow.print();

    printWindow.close();
  };

  const generatedOn =
    new Date().toLocaleString("en-IN");

  return (
    <div className="w-full min-w-0 space-y-5 sm:space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-theme">
          Reports
        </h1>

        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted">
          Generate and export business reports
        </p>
      </div>

      {/* Logged In User */}

      <div
        className="
          card-theme
          border
          border-theme
          rounded-xl
          shadow-sm
          p-4
        "
      >
        <div className="space-y-1">
          <p className="text-sm text-muted">
            Logged in as :
            <span className="font-semibold ml-2 text-theme">
              {user?.fullname}
            </span>
          </p>

          <p className="text-sm text-theme font-semibold">
            Role : {user?.role}
          </p>
        </div>
      </div>

      {/* Report Selection */}

      <div
        className="
          card-theme
          border
          border-theme
          rounded-xl
          shadow-sm
          p-4
          sm:p-6
        "
      >
        <label className="block text-sm font-semibold text-theme mb-2">
          Report Name
        </label>

        <select
          value={selectedReport}
          onChange={(e) => {
            setSelectedReport(
              e.target.value
            );

            setGenerated(false);
            setReportData([]);
          }}
          className="
            input-theme
            w-full
            min-w-0
          "
        >
          <option
            key="select-report"
            value=""
          >
            Select Report
          </option>

          {reports.map(
            (report, index) => (
              <option
                key={`${report.ReportId}-${index}`}
                value={report.ReportName}
              >
                {report.ReportName}
              </option>
            )
          )}
        </select>
      </div>

      {/* Date & Search */}

      {selectedReport && (
        <div
          className="
            card-theme
            border
            border-theme
            rounded-xl
            shadow-sm
            p-4
            sm:p-6
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

            {/* From Date */}

            <div>
              <label className="block text-sm font-semibold text-theme mb-2">
                Date From
              </label>

              <input
                type="date"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(
                    e.target.value
                  );

                  setGenerated(false);
                  setReportData([]);
                }}
                className="
                  input-theme
                  w-full
                  min-w-0
                  appearance-auto
                "
              />
            </div>

            {/* To Date */}

            <div>
              <label className="block text-sm font-semibold text-theme mb-2">
                Date To
              </label>

              <input
                type="date"
                value={toDate}
                onChange={(e) => {
                  setToDate(
                    e.target.value
                  );

                  setGenerated(false);
                  setReportData([]);
                }}
                className="
                  input-theme
                  w-full
                  min-w-0
                  appearance-auto
                "
              />
            </div>

          </div>

          {/* Search */}

          <div className="mt-5 sm:mt-6">
            <label className="block text-sm font-semibold text-theme mb-2">
              Search
            </label>

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                input-theme
                w-full
                min-w-0
              "
            />
          </div>

          {/* Buttons */}

          <div className="mt-5 sm:mt-6 flex flex-wrap gap-3">

            <button
              type="button"
              onClick={handleGenerate}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-2.5
                rounded-lg
                transition
                w-full
                sm:w-auto
              "
            >
              Generate Report
            </button>

            {generated && (
              <>
                <button
                  type="button"
                  onClick={
                    handleExportExcel
                  }
                  className="
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    px-5
                    py-2.5
                    rounded-lg
                    transition
                    w-full
                    sm:w-auto
                  "
                >
                  Export Excel
                </button>

                <button
                  type="button"
                  onClick={
                    handleExportPDF
                  }
                  className="
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    px-5
                    py-2.5
                    rounded-lg
                    transition
                    w-full
                    sm:w-auto
                  "
                >
                  Export PDF
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="
                    button-secondary
                    px-5
                    py-2.5
                    rounded-lg
                    transition
                    w-full
                    sm:w-auto
                  "
                >
                  Print
                </button>
              </>
            )}

          </div>
        </div>
      )}

      {/* Generated Report */}

      {generated &&
        selectedReport && (
          <div
            id="print-area"
            className="
              card-theme
              border
              border-theme
              rounded-xl
              shadow-sm
              overflow-hidden
              print:shadow-none
              print:border-0
            "
          >

            {/* Report Header */}

            <div className="p-4 sm:p-6 border-b border-theme">

              <div className="text-center mb-6">

                <h1 className="text-2xl sm:text-3xl font-bold text-theme">
                  SNAP CRM
                </h1>

                <h2 className="text-lg sm:text-xl font-semibold mt-2 text-theme">
                  {selectedReport}
                </h2>

                <p className="text-sm sm:text-base text-muted">
                  {fromDate} To {toDate}
                </p>

                <p className="text-sm text-muted mt-2">
                  Generated By :{" "}
                  {user?.fullname}
                </p>

                <p className="text-sm text-muted">
                  Role : {user?.role}
                </p>

              </div>

            </div>

            {/* Report Table */}

            <div className="w-full overflow-x-auto">

              <table
                className="
                  w-full
                  min-w-[900px]
                  border-collapse
                  text-theme
                  print:text-sm
                "
              >
                <thead className="table-header-theme">

                  <tr className="text-theme">

                    {selectedReport ===
                      "Employee Report" && (
                      <>
                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Employee Code
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Name
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Department
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Salary
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Status
                        </th>
                      </>
                    )}

                    {selectedReport ===
                      "Leave Report" && (
                      <>
                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Employee
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Leave Type
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          From Date
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          To Date
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Status
                        </th>
                      </>
                    )}

                    {selectedReport ===
                      "Payroll Report" && (
                      <>
                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Employee
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Employee ID
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Month
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Allowance
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Deduction
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Net Salary
                        </th>
                      </>
                    )}

                    {selectedReport ===
                      "Customer Report" && (
                      <>
                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Customer Code
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Customer Name
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Phone
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Email
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          City
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Status
                        </th>
                      </>
                    )}

                    {selectedReport ===
                      "Lead Report" && (
                      <>
                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Lead Name
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Company
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Phone
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Email
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Lead Source
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Status
                        </th>
                      </>
                    )}

                    {selectedReport ===
                      "Supplier Report" && (
                      <>
                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Supplier Name
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Email
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Phone
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Address
                        </th>
                      </>
                    )}

                    {selectedReport ===
                      "Category Report" && (
                      <>
                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Category Name
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Description
                        </th>

                      </>
                    )}

                    {selectedReport ===
                      "Opportunity Report" && (
                      <>
                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Customer
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Opportunity Name
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Amount
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Stage
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Probability
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Close Date
                        </th>
                      </>
                    )}

                    {selectedReport ===
                      "Product Report" && (
                      <>
                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Product Code
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Product Name
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Category
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Price
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Quantity
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Status
                        </th>

                        <th className="border border-theme px-4 py-3 text-left whitespace-nowrap">
                          Created Date
                        </th>
                      </>
                    )}

                  </tr>

                </thead>

                <tbody>

                  {filteredData.map(
                    (row, index) => (
                      <tr
                        key={index}
                        className="
                          border-t
                          border-theme
                          text-theme
                          table-row-theme
                        "
                      >

                        {selectedReport ===
                          "Employee Report" && (
                          <>
                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.EmployeeCode}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.FirstName}{" "}
                              {row.LastName}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Department}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              ₹
                              {row.Salary?.toLocaleString(
                                "en-IN"
                              )}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Status}
                            </td>
                          </>
                        )}

                        {selectedReport ===
                          "Leave Report" && (
                          <>
                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.EmployeeName}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.LeaveType}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.FromDate}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.ToDate}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Status}
                            </td>
                          </>
                        )}

                        {selectedReport ===
                          "Payroll Report" && (
                          <>
                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.EmployeeName}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.EmployeeId}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Month}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              ₹
                              {row.Allowance?.toLocaleString(
                                "en-IN"
                              )}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              ₹
                              {row.Deduction?.toLocaleString(
                                "en-IN"
                              )}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              ₹
                              {row.NetSalary?.toLocaleString(
                                "en-IN"
                              )}
                            </td>
                          </>
                        )}

                        {selectedReport ===
                          "Customer Report" && (
                          <>
                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.CustomerCode}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.CustomerName}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Phone}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Email}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.City}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Status}
                            </td>
                          </>
                        )}

                        {selectedReport ===
                          "Lead Report" && (
                          <>
                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.LeadName}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Company}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Phone}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Email}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.LeadSource}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Status}
                            </td>
                          </>
                        )}

                        {selectedReport ===
                          "Supplier Report" && (
                          <>
                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.SupplierName}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Email}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Phone}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme">
                              {row.Address}
                            </td>
                          </>
                        )}

                        {selectedReport ===
                          "Category Report" && (
                          <>
                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.CategoryName}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme">
                              {row.Description}
                            </td>
                          </>
                        )}

                        {selectedReport ===
                          "Opportunity Report" && (
                          <>
                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Customer}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.OpportunityName}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              ₹
                              {row.Amount?.toLocaleString(
                                "en-IN"
                              )}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Stage}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Probability}%
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.CloseDate}
                            </td>
                          </>
                        )}

                        {selectedReport ===
                          "Product Report" && (
                          <>
                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.ProductCode}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.ProductName}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Category}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              ₹
                              {row.Price?.toLocaleString(
                                "en-IN"
                              )}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Quantity}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.Status}
                            </td>

                            <td className="border border-theme px-4 py-3 text-theme whitespace-nowrap">
                              {row.CreatedDate}
                            </td>
                          </>
                        )}

                      </tr>
                    )
                  )}

                </tbody>
              </table>

            </div>

            {/* Footer */}

            <div
              className="
                border-t
                border-theme
                px-4
                sm:px-6
                py-4
                flex
                flex-col
                sm:flex-row
                justify-between
                items-center
                gap-2
                text-sm
                text-muted
                print:text-xs
              "
            >
              <span>
                Generated On : {generatedOn}
              </span>

              <span>
                SNAP CRM Report
              </span>
            </div>

          </div>
        )}

    </div>
  );
}