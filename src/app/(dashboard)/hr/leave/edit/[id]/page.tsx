"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Leave } from "@/types/leave";
import { useTheme } from "@/context/ThemeContext";


export default function EditLeavePage() {


  const router = useRouter();

  const params = useParams();

  const leaveId = Number(params.id);


  const { themeSettings } = useTheme();




  const [employeeId, setEmployeeId] = useState(0);

  const [employeeName, setEmployeeName] = useState("");

  const [leaveType, setLeaveType] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [reason, setReason] = useState("");

  const [status, setStatus] = useState("");






  useEffect(() => {


    const loadLeave = async () => {


      try {


        const response = await fetch("/api/leaves");


        const data: Leave[] = await response.json();




        const leave = data.find(

          (item) => item.LeaveId === leaveId

        );




        if (leave) {


          setEmployeeId(leave.EmployeeId);

          setEmployeeName(leave.EmployeeName);

          setLeaveType(leave.LeaveType);

          setFromDate(leave.FromDate);

          setToDate(leave.ToDate);

          setReason(leave.Reason);

          setStatus(leave.Status);


        }



      } catch(error) {


        console.log(error);


      }



    };



    loadLeave();



  }, [leaveId]);
    const handleUpdate = async () => {


    try {


      const response = await fetch("/api/leaves", {


        method: "PUT",


        headers: {

          "Content-Type": "application/json",

        },


        body: JSON.stringify({


          LeaveId: leaveId,

          EmployeeId: employeeId,

          EmployeeName: employeeName,

          LeaveType: leaveType,

          FromDate: fromDate,

          ToDate: toDate,

          Reason: reason,

          Status: status,


        }),


      });





      const data = await response.json();


      console.log(data);





      if (response.ok) {


        alert("Leave Updated Successfully");


        router.push("/hr/leave");


      }

      else {


        alert(data.message || "Failed to update leave");


      }




    }


    catch(error){


      console.log(error);


      alert("Something went wrong");


    }



  };







  return (


    <div className="space-y-6">



      {/* Header */}



      <div className="flex justify-between items-center">



        <div>


          <h1 className="text-3xl font-bold text-theme">

            Edit Leave

          </h1>



          <p className="text-muted mt-2">

            Update leave information

          </p>



        </div>






        <button


          onClick={() => router.back()}


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



      <div className="card-theme rounded-xl shadow p-6">



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">



          {/* Employee ID */}



          <div>


            <label className="block text-sm font-semibold text-theme mb-2">

              Employee ID

            </label>



            <input


              type="number"


              value={employeeId}


              onChange={(e)=>setEmployeeId(Number(e.target.value))}


              className="
              w-full
              border
              border-gray-300
              rounded-lg
              px-4
              py-2
              text-theme
              bg-transparent
              "

            />


          </div>






          {/* Employee Name */}



          <div>


            <label className="block text-sm font-semibold text-theme mb-2">

              Employee Name

            </label>



            <input


              type="text"


              value={employeeName}


              onChange={(e)=>setEmployeeName(e.target.value)}


              className="
              w-full
              border
              border-gray-300
              rounded-lg
              px-4
              py-2
              text-theme
              bg-transparent
              "

            />


          </div>
                    {/* Leave Type */}


          <div>


            <label className="block text-sm font-semibold text-theme mb-2">

              Leave Type

            </label>





            <select


              value={leaveType}


              onChange={(e)=>setLeaveType(e.target.value)}


              className="
w-full
border
border-gray-300
rounded-lg
px-4
py-2
text-theme
bg-theme
"


            >



              <option 
              value="Casual Leave"
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
              >

                Casual Leave

              </option>




              <option 
              value="Sick Leave"
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
              >

                Sick Leave

              </option>





              <option 
              value="Earned Leave"
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
              >

                Earned Leave

              </option>





              <option 
              value="Maternity Leave"
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
              >

                Maternity Leave

              </option>



            </select>


          </div>








          {/* Status */}



          <div>


            <label className="block text-sm font-semibold text-theme mb-2">

              Status

            </label>





            <select


              value={status}


              onChange={(e)=>setStatus(e.target.value)}



className="
w-full
border
border-gray-300
rounded-lg
px-4
py-2
text-theme
bg-theme
"



            >



              <option
              value="Pending"
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
              >

                Pending

              </option>




              <option
              value="Approved"
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
              >

                Approved

              </option>




              <option
              value="Rejected"
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
              >

                Rejected

              </option>



            </select>



          </div>








          {/* From Date */}



          <div>


            <label className="block text-sm font-semibold text-theme mb-2">

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
              rounded-lg
              px-4
              py-2
              text-theme
              bg-transparent
              "


            />



          </div>







          {/* To Date */}



          <div>


            <label className="block text-sm font-semibold text-theme mb-2">

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
              rounded-lg
              px-4
              py-2
              text-theme
              bg-transparent
              "


            />



          </div>
                    {/* Reason */}


          <div className="md:col-span-2">


            <label className="block text-sm font-semibold text-theme mb-2">

              Reason

            </label>





            <textarea


              value={reason}


              onChange={(e)=>setReason(e.target.value)}


              rows={4}



              className="
              w-full
              border
              border-gray-300
              rounded-lg
              px-4
              py-2
              text-theme
              bg-transparent
              "


            />



          </div>





        </div>







        {/* Update Button */}




        <div className="mt-8 flex justify-end">



          <button


            onClick={handleUpdate}



            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-2
            rounded-lg
            "


          >

            Update Leave


          </button>



        </div>





      </div>




    </div>


  );


}