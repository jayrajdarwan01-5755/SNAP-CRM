"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function AddLeavePage() {


  const router = useRouter();


  const [employeeId,setEmployeeId] = useState("");

  const [employeeName,setEmployeeName] = useState("");

  const [leaveType,setLeaveType] = useState("");

  const [fromDate,setFromDate] = useState("");

  const [toDate,setToDate] = useState("");

  const [reason,setReason] = useState("");

  const [status,setStatus] = useState("Pending");





  const handleSave = async()=>{


    const response = await fetch("/api/leaves",{


      method:"POST",


      headers:{
        "Content-Type":"application/json",
      },


      body:JSON.stringify({


        EmployeeId:Number(employeeId),


        EmployeeName:employeeName,


        LeaveType:leaveType,


        FromDate:fromDate,


        ToDate:toDate,


        Reason:reason,


        Status:status,


      })


    });




    if(response.ok){


      alert("Leave Applied Successfully");


      router.push("/hr/leave");


    }


  };







  return (


    <div className="space-y-6">



      {/* Header */}


      <div className="flex justify-between items-center">


        <div>


          <h1 className="text-3xl font-bold text-gray-900">

            Apply Leave

          </h1>


          <p className="text-gray-600 mt-2">

            Create employee leave request

          </p>


        </div>




        <button

        onClick={()=>router.back()}

        className="
        bg-gray-600
        hover:bg-gray-700
        text-white
        px-5
        py-2
        rounded-lg
        "

        >

          Back

        </button>



      </div>







      {/* Form */}


      <div className="bg-white border rounded-xl shadow p-6">



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">





          {/* Employee ID */}


          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Employee ID

            </label>


            <input

            type="number"

            value={employeeId}

            onChange={(e)=>setEmployeeId(e.target.value)}

            placeholder="Enter Employee ID"

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







          {/* Employee Name */}


          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Employee Name

            </label>


            <input

            type="text"

            value={employeeName}

            onChange={(e)=>setEmployeeName(e.target.value)}

            placeholder="Enter Employee Name"

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







          {/* Leave Type */}


          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Leave Type

            </label>


            <select

            value={leaveType}

            onChange={(e)=>setLeaveType(e.target.value)}

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
                Select Leave Type
              </option>


              <option>
                Casual Leave
              </option>


              <option>
                Sick Leave
              </option>


              <option>
                Paid Leave
              </option>


            </select>


          </div>







          {/* From Date */}


          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              From Date

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







          {/* To Date */}


          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              To Date

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







          {/* Status */}


          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Status

            </label>


            <select

            value={status}

            onChange={(e)=>setStatus(e.target.value)}

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


              <option>
                Pending
              </option>


              <option>
                Approved
              </option>


              <option>
                Rejected
              </option>


            </select>


          </div>







          {/* Reason */}


          <div className="md:col-span-2">


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Reason

            </label>


            <textarea

            rows={4}

            value={reason}

            onChange={(e)=>setReason(e.target.value)}

            placeholder="Enter reason"

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






        {/* Save Button */}


        <div className="mt-8 flex justify-end">


          <button

          onClick={handleSave}

          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-2
          rounded-lg
          "

          >

            Save Leave

          </button>


        </div>



      </div>



    </div>


  );


}