"use client";

import { useEffect, useState } from "react";
import { Report } from "@/types/report";

export default function ReportsPage() {

  const [reports, setReports] = useState<Report[]>([]);

  const [selectedReport, setSelectedReport] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [generated, setGenerated] = useState(false);

  useEffect(() => {

    loadReports();

  }, []);

  const loadReports = async () => {

    try {

      const response = await fetch("/api/reports");

      const data: Report[] = await response.json();

      setReports(data);

    }
    catch (error) {

      console.log(error);

    }

  };


  const handleGenerate = async () => {

  if (!selectedReport) {

    alert("Please select report");

    return;

  }

  if (!fromDate || !toDate) {

    alert("Please select From Date and To Date");

    return;

  }

  setGenerated(true);

};

  return (

    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-900">

          Reports

        </h1>


        <p className="mt-2 text-gray-600">

          Generate and export business reports

        </p>

      </div>

      {/* Report Selection */}

      <div className="bg-white border rounded-xl shadow p-6">

        <div>

          <label className="block text-sm font-semibold text-gray-900 mb-2">

            Report Name

          </label>

          <select

            value={selectedReport}

            onChange={(e) =>
              setSelectedReport(e.target.value)
            }

            className="
            w-full
            border
            border-gray-300
            bg-white
            text-gray-900
            rounded-lg
            px-4
            py-2
            "

          >

            <option value="">

              Select Report

            </option>

            {reports.map((report) => (

              <option

                key={report.ReportId}

                value={report.ReportName}

              >

                {report.ReportName}

              </option>

            ))}

          </select>

        </div>

      </div>

      {/* Filters */}

      {selectedReport && (

        <div className="bg-white border rounded-xl shadow p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>

              <label className="block text-sm font-semibold text-gray-900 mb-2">

                Date From

              </label>

              <input

                type="date"

                value={fromDate}

                onChange={(e) =>
                  setFromDate(e.target.value)
                }

                className="
w-full
border
border-gray-300
bg-white
text-gray-900
rounded-lg
px-4
py-2
"

              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-900 mb-2">

                Date To

              </label>

              <input

                type="date"

                value={toDate}

                onChange={(e) =>
                  setToDate(e.target.value)
                }

                className="
w-full
border
border-gray-300
bg-white
text-gray-900
rounded-lg
px-4
py-2

                "

              />

            </div>

          </div>
                    <div className="mt-6 flex flex-wrap gap-3">

            <button

  onClick={handleGenerate}

  className="
  bg-blue-600
  hover:bg-blue-700
  text-white
  px-5
  py-2
  rounded-lg
  "

>

  Generate

</button>

            {generated && (

  <>

    <button
      className="
      bg-green-600
      hover:bg-green-700
      text-white
      px-5
      py-2
      rounded-lg
      "
    >
      Export Excel
    </button>

    <button
      className="
      bg-red-600
      hover:bg-red-700
      text-white
      px-5
      py-2
      rounded-lg
      "
    >
      Export PDF
    </button>

    <button
      className="
      bg-gray-700
      hover:bg-gray-800
      text-white
      px-5
      py-2
      rounded-lg
      "
    >
      Print
    </button>

  </>

)}

          </div>

        </div>

      )}

      {/* Report Result */}

  {selectedReport && generated && (

  <div className="bg-white border rounded-xl shadow overflow-hidden">

    <div className="p-6 border-b">

      <h2 className="text-2xl font-bold text-gray-900">

        {selectedReport}

      </h2>

      <p className="text-gray-500 mt-1">

        {fromDate} To {toDate}

      </p>

    </div>

    <table className="w-full text-gray-900">

      <thead className="bg-gray-100 text-gray-900">

        <tr>

         <th className="px-4 py-3 text-left font-semibold text-gray-900">
            Employee Code
          </th>

          <th className="px-4 py-3 text-left font-semibold text-gray-900">
            Name
          </th>

          <th className="px-4 py-3 text-left font-semibold text-gray-900">
            Department
          </th>

         <th className="px-4 py-3 text-left font-semibold text-gray-900">
            Salary
          </th>

         <th className="px-4 py-3 text-left font-semibold text-gray-900">
            Status
          </th>

        </tr>

      </thead>

      <tbody>

        <tr className="border-t">

          <td className="px-4 py-4 text-gray-900">
            EMP001
          </td>

          <td className="px-4 py-4 text-gray-900">
            John Smith
          </td>

          <td className="px-4 py-4 text-gray-900">
            HR
          </td>

          <td className="px-4 py-4 text-gray-900">
            ₹50,000
          </td>

         <td className="px-4 py-4 text-gray-900">

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

              Active

            </span>

          </td>

        </tr>

        <tr className="border-t">

          <td className="px-4 py-4 text-gray-900">
            EMP002
          </td>

          <td className="px-4 py-4 text-gray-900">
            Amit Kumar
          </td>

          <td className="px-4 py-4 text-gray-900">
            Sales
          </td>

         <td className="px-4 py-4 text-gray-900">
            ₹40,000
          </td>

         <td className="px-4 py-4 text-gray-900">

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

              Active

            </span>

          </td>

        </tr>

      </tbody>

    </table>

  </div>

)}

    </div>

  );

}