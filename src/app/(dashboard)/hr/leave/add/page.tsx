"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Employee } from "@/types/employee";
import { useTheme } from "@/context/ThemeContext";


export default function AddLeavePage() {


  const router = useRouter();

  const { themeSettings } = useTheme();


  const [employees, setEmployees] = useState<Employee[]>([]);


  const [employeeId, setEmployeeId] = useState("");

  const [employeeName, setEmployeeName] = useState("");

  const [leaveType, setLeaveType] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [reason, setReason] = useState("");

  const [status, setStatus] = useState("Pending");




  useEffect(() => {


    const loadEmployees = async () => {


      try {


        const response = await fetch("/api/employees");


        const data: Employee[] = await response.json();


        setEmployees(data);


      } catch (error) {


        console.log(error);


      }


    };


    loadEmployees();


  }, []);





  const handleEmployeeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {


    const id = e.target.value;


    setEmployeeId(id);



    const employee = employees.find(
      (emp) => emp.EmployeeId === Number(id)
    );



    if (employee) {


      setEmployeeName(
        `${employee.FirstName} ${employee.LastName}`
      );


    } else {


      setEmployeeName("");


    }


  };






  const handleSave = async () => {


    const response = await fetch("/api/leaves", {


      method: "POST",


      headers: {


        "Content-Type": "application/json",


      },


      body: JSON.stringify({


        EmployeeId: Number(employeeId),

        EmployeeName: employeeName,

        LeaveType: leaveType,

        FromDate: fromDate,

        ToDate: toDate,

        Reason: reason,

        Status: status,


      }),


    });




    if (response.ok) {


      alert("Leave Applied Successfully");


      router.push("/hr/leave");


    }


  };





  return (


    <div className="space-y-6">


      <div className="flex justify-between items-center">


        <div>


          <h1 className="text-3xl font-bold text-theme">

            Apply Leave

          </h1>



          <p className="text-muted mt-2">

            Create employee leave request

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




      <div className="card-theme rounded-xl shadow p-6">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Employee */}

          <div>


            <label className="block text-sm font-semibold text-theme mb-2">

              Employee

            </label>



            <select

              value={employeeId}

              onChange={handleEmployeeChange}

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
                value=""
                className="bg-theme text-theme"
              >
                Select Employee
              </option>



              {employees.map((employee) => (


                <option

                  key={employee.EmployeeId}

                  value={employee.EmployeeId}

                  className="bg-theme text-theme"

                >

                  {employee.EmployeeCode} - {employee.FirstName} {employee.LastName}

                </option>


              ))}


            </select>


          </div>





          {/* Employee Name */}


          <div>


            <label className="block text-sm font-semibold text-theme mb-2">

              Employee Name

            </label>




            <input

              type="text"

              value={employeeName}

              readOnly

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
                value=""
                className="bg-theme text-theme"
              >

                Select Leave Type

              </option>



              <option
                value="Casual Leave"
                className="bg-theme text-theme"
              >

                Casual Leave

              </option>



              <option
                value="Sick Leave"
                className="bg-theme text-theme"
              >

                Sick Leave

              </option>



              <option
                value="Paid Leave"
                className="bg-theme text-theme"
              >

                Paid Leave

              </option>



              <option
                value="Earned Leave"
                className="bg-theme text-theme"
              >

                Earned Leave

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
                className="bg-theme text-theme"
              >

                Pending

              </option>



              <option
                value="Approved"
                className="bg-theme text-theme"
              >

                Approved

              </option>



              <option
                value="Rejected"
                className="bg-theme text-theme"
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
              bg-theme
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
              bg-theme
              "

            />



          </div>







          {/* Reason */}


          <div className="md:col-span-2">


            <label className="block text-sm font-semibold text-theme mb-2">

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
              rounded-lg
              px-4
              py-2
              text-theme
              bg-theme
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