"use client";

import { useEffect, useState } from "react";
import { Report } from "@/types/report";
import { Employee } from "@/types/employee";
import { Leave } from "@/types/leave";


export default function ReportsPage() {


  const [reports, setReports] = useState<Report[]>([]);

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [leaves, setLeaves] = useState<Leave[]>([]);

  const [selectedReport, setSelectedReport] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [generated, setGenerated] = useState(false);

  const [reportData, setReportData] = useState<any[]>([]);


  useEffect(() => {

    loadReports();

  }, []);




  const loadReports = async () => {

    try {

      const response = await fetch("/api/reports");

      const data: Report[] = await response.json();

      setReports(data);


    } catch (error) {

      console.log(error);

    }

  };




  const loadEmployees = async () => {

    try {


      const response = await fetch("/api/employees");


      const data: Employee[] = await response.json();


      setEmployees(data);



    } catch (error) {

      console.log(error);

    }

  };





 const loadLeaves = async () => {

  try {

    const response = await fetch(
      "/api/reports?type=leave"
    );


    const data = await response.json();


    console.log("LEAVE DATA:", data);



    if (Array.isArray(data)) {

      setLeaves(data);

    } else {

      console.log("Leave API response is not array");

      setLeaves([]);

    }


  } catch (error) {

    console.log(error);

    setLeaves([]);

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



  let type = "";


  if (selectedReport === "Employee Report") {

    type = "employee";

  }


  if (selectedReport === "Leave Report") {

    type = "leave";

  }


  if (selectedReport === "Payroll Report") {

  type = "payroll";

}

if (selectedReport === "Customer Report") {

  type = "customer";

}

if (selectedReport === "Lead Report") {

  type = "lead";

}

if (selectedReport === "Supplier Report") {

  type = "supplier";

}


if (selectedReport === "Category Report") {

  type = "category";

}


if (selectedReport === "Sales Report") {

  type = "sales";

}

if (selectedReport === "Opportunity Report") {

  type = "opportunity";

}

if (selectedReport === "Product Report") {

  type = "product";

}


 const response = await fetch(
  `/api/reports?type=${type}`
);


const data = await response.json();


console.log("REPORT TYPE:", type);

console.log("REPORT DATA:", data);


setReportData(data);


setGenerated(true);
};



  return (

    <div className="space-y-6">



      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          Reports
        </h1>


        <p className="mt-2 text-gray-600">
          Generate and export business reports
        </p>


      </div>





      <div className="bg-white border rounded-xl shadow p-6">


        <label className="block text-sm font-semibold text-gray-900 mb-2">

          Report Name

        </label>



        <select

          value={selectedReport}

          onChange={(e)=>{

            setSelectedReport(e.target.value);

            setGenerated(false);

          }}

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



          {reports.map((report)=>(


            <option

              key={report.ReportId}

              value={report.ReportName}

            >

              {report.ReportName}

            </option>


          ))}


        </select>


      </div>






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

              onChange={(e)=>setFromDate(e.target.value)}

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

              onChange={(e)=>setToDate(e.target.value)}

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


          <button className="bg-green-600 text-white px-5 py-2 rounded-lg">

            Export Excel

          </button>



          <button className="bg-red-600 text-white px-5 py-2 rounded-lg">

            Export PDF

          </button>



          <button className="bg-gray-700 text-white px-5 py-2 rounded-lg">

            Print

          </button>



          </>

          )}



        </div>


      </div>


      )}









      {generated && selectedReport && (


      <div className="bg-white border rounded-xl shadow overflow-hidden">


        <div className="p-6 border-b">


          <h2 className="text-2xl font-bold text-gray-900">

            {selectedReport}

          </h2>


          <p className="text-gray-500">

            {fromDate} To {toDate}

          </p>


        </div>






       <table className="w-full text-gray-900">

<thead className="bg-gray-100">

<tr>


{selectedReport === "Employee Report" && (
<>
<th className="px-4 py-3 text-left">
Employee Code
</th>

<th className="px-4 py-3 text-left">
Name
</th>

<th className="px-4 py-3 text-left">
Department
</th>

<th className="px-4 py-3 text-left">
Salary
</th>

<th className="px-4 py-3 text-left">
Status
</th>
</>
)}



{selectedReport === "Leave Report" && (
<>
<th className="px-4 py-3 text-left">
Employee
</th>

<th className="px-4 py-3 text-left">
Leave Type
</th>

<th className="px-4 py-3 text-left">
From Date
</th>

<th className="px-4 py-3 text-left">
To Date
</th>

<th className="px-4 py-3 text-left">
Status
</th>
</>
)}



{selectedReport === "Payroll Report" && (
<>
<th className="px-4 py-3 text-left">
Employee
</th>

<th className="px-4 py-3 text-left">
Employee ID
</th>

<th className="px-4 py-3 text-left">
Month
</th>

<th className="px-4 py-3 text-left">
Allowance
</th>

<th className="px-4 py-3 text-left">
Deduction
</th>

<th className="px-4 py-3 text-left">
Net Salary
</th>
</>
)}


{selectedReport === "Customer Report" && (
<>
<th className="px-4 py-3 text-left">
Customer Code
</th>

<th className="px-4 py-3 text-left">
Customer Name
</th>

<th className="px-4 py-3 text-left">
Phone
</th>

<th className="px-4 py-3 text-left">
Email
</th>

<th className="px-4 py-3 text-left">
City
</th>

<th className="px-4 py-3 text-left">
Status
</th>
</>
)}

{selectedReport === "Lead Report" && (
<>
<th className="px-4 py-3 text-left">
Lead Name
</th>

<th className="px-4 py-3 text-left">
Company
</th>

<th className="px-4 py-3 text-left">
Phone
</th>

<th className="px-4 py-3 text-left">
Email
</th>

<th className="px-4 py-3 text-left">
Lead Source
</th>

<th className="px-4 py-3 text-left">
Status
</th>
</>
)}

{selectedReport === "Supplier Report" && (
<>
<th className="px-4 py-3 text-left">
Supplier Name
</th>

<th className="px-4 py-3 text-left">
Email
</th>

<th className="px-4 py-3 text-left">
Phone
</th>

<th className="px-4 py-3 text-left">
Address
</th>
</>
)}



{selectedReport === "Category Report" && (
<>
<th className="px-4 py-3 text-left">
Category Name
</th>

<th className="px-4 py-3 text-left">
Description
</th>

<th className="px-4 py-3 text-left">
Status
</th>
</>
)}


{selectedReport === "Opportunity Report" && (
<>
<th className="px-4 py-3 text-left">
Customer
</th>

<th className="px-4 py-3 text-left">
Opportunity Name
</th>

<th className="px-4 py-3 text-left">
Amount
</th>

<th className="px-4 py-3 text-left">
Stage
</th>

<th className="px-4 py-3 text-left">
Probability
</th>

<th className="px-4 py-3 text-left">
Close Date
</th>
</>
)}


{selectedReport === "Product Report" && (
<>
<th className="px-4 py-3 text-left">
Product Code
</th>

<th className="px-4 py-3 text-left">
Product Name
</th>

<th className="px-4 py-3 text-left">
Category
</th>

<th className="px-4 py-3 text-left">
Price
</th>

<th className="px-4 py-3 text-left">
Quantity
</th>

<th className="px-4 py-3 text-left">
Status
</th>

<th className="px-4 py-3 text-left">
Created Date
</th>

</>
)}


</tr>

</thead>


<tbody>


{reportData.map((row,index)=>(

<tr key={index} className="border-t">


{selectedReport === "Employee Report" && (
<>

<td className="px-4 py-3">
{row.EmployeeCode}
</td>

<td className="px-4 py-3">
{row.FirstName} {row.LastName}
</td>

<td className="px-4 py-3">
{row.Department}
</td>

<td className="px-4 py-3">
₹{row.Salary.toLocaleString()}
</td>

<td className="px-4 py-3">
{row.Status}
</td>

</>
)}




{selectedReport === "Leave Report" && (
<>

<td className="px-4 py-3">
{row.EmployeeName}
</td>

<td className="px-4 py-3">
{row.LeaveType}
</td>

<td className="px-4 py-3">
{row.FromDate}
</td>

<td className="px-4 py-3">
{row.ToDate}
</td>

<td className="px-4 py-3">
{row.Status}
</td>

</>

)}




{selectedReport === "Customer Report" && (
<>

<td className="px-4 py-3">
{row.CustomerCode}
</td>

<td className="px-4 py-3">
{row.CustomerName}
</td>

<td className="px-4 py-3">
{row.Phone}
</td>

<td className="px-4 py-3">
{row.Email}
</td>

<td className="px-4 py-3">
{row.City}
</td>

<td className="px-4 py-3">
{row.Status}
</td>

</>
)}


{selectedReport === "Lead Report" && (
<>

<td className="px-4 py-3">
{row.LeadName}
</td>


<td className="px-4 py-3">
{row.Company}
</td>


<td className="px-4 py-3">
{row.Phone}
</td>


<td className="px-4 py-3">
{row.Email}
</td>


<td className="px-4 py-3">
{row.LeadSource}
</td>


<td className="px-4 py-3">
{row.Status}
</td>


</>
)}


{selectedReport === "Supplier Report" && (
<>

<td className="px-4 py-3">
{row.SupplierName}
</td>


<td className="px-4 py-3">
{row.Email}
</td>


<td className="px-4 py-3">
{row.Phone}
</td>


<td className="px-4 py-3">
{row.Address}
</td>


</>
)}


{selectedReport === "Category Report" && (
<>

<td className="px-4 py-3">
{row.CategoryName}
</td>


<td className="px-4 py-3">
{row.Description}
</td>


<td className="px-4 py-3">
{row.Status}
</td>


</>
)}

{selectedReport === "Opportunity Report" && (
<>

<td className="px-4 py-3">
{row.Customer}
</td>


<td className="px-4 py-3">
{row.OpportunityName}
</td>


<td className="px-4 py-3">
₹{row.Amount?.toLocaleString("en-IN")}
</td>


<td className="px-4 py-3">
{row.Stage}
</td>


<td className="px-4 py-3">
{row.Probability}%
</td>


<td className="px-4 py-3">
{row.CloseDate}
</td>


</>

)}


{selectedReport === "Product Report" && (
<>

<td className="px-4 py-3">
{row.ProductCode}
</td>


<td className="px-4 py-3">
{row.ProductName}
</td>


<td className="px-4 py-3">
{row.Category}
</td>


<td className="px-4 py-3">
₹{row.Price?.toLocaleString("en-IN")}
</td>


<td className="px-4 py-3">
{row.Quantity}
</td>


<td className="px-4 py-3">
{row.Status}
</td>


<td className="px-4 py-3">
{row.CreatedDate}
</td>


</>
)}



{selectedReport === "Payroll Report" && (
<>

<td className="px-4 py-3">
{row.EmployeeName}
</td>

<td className="px-4 py-3">
{row.EmployeeId}
</td>

<td className="px-4 py-3">
{row.Month}
</td>

<td className="px-4 py-3">
₹{row.Allowance?.toLocaleString()}
</td>

<td className="px-4 py-3">
₹{row.Deduction?.toLocaleString()}
</td>

<td className="px-4 py-3">
₹{row.NetSalary?.toLocaleString()}
</td>

</>
)}



</tr>

))}

</tbody>

</table>


      </div>


      )}

    </div>


  );


}