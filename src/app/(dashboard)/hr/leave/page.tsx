"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Leave } from "@/types/leave";
import { useTheme } from "@/context/ThemeContext";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LeavePage() {

  const { themeSettings } = useTheme();
  const { user } = useAuth();

  const role = user?.role ?? "";
  const employeeId = user?.employeeid ?? null;

  const [leaves, setLeaves] = useState<Leave[]>([]);

  const [loading, setLoading] = useState(true);

  const [searchEmployee, setSearchEmployee] = useState("");

  const [filterStatus, setFilterStatus] =
    useState("All Status");

  const [filterLeaveType, setFilterLeaveType] =
    useState("All Leave Type");

  const handleClear = () => {

    setSearchEmployee("");

    setFilterStatus("All Status");

    setFilterLeaveType("All Leave Type");

  };


useEffect(() => {

  if (user) {
    loadLeaves();
  }

}, [user]);


const loadLeaves = async () => {

  try {

    setLoading(true);

    let url = "/api/leaves";

    if (role === "Employee") {

      if (!employeeId) {
        setLeaves([]);
        return;
      }

      url = `/api/leaves?employeeid=${employeeId}`;

    }

    console.log("Leave Role:", role);
    console.log("Leave Employee ID:", employeeId);
    console.log("Leave API:", url);

    const response = await fetch(url);

    const data: Leave[] = await response.json();

    console.log("Leaves From API:", data);

    setLeaves(data);

  }
  catch (error) {

    console.log(error);

  }
  finally {

    setLoading(false);

  }

};


  const filteredLeaves = leaves.filter((leave)=>{


    const employeeMatch =

      leave.EmployeeName
      ?.toLowerCase()
      .includes(
        searchEmployee.toLowerCase()
      );


    const statusMatch =

      filterStatus === "All Status"

      ||

      leave.Status === filterStatus;



    const leaveTypeMatch =

      filterLeaveType === "All Leave Type"

      ||

      leave.LeaveType === filterLeaveType;



    return (

      employeeMatch &&

      statusMatch &&

      leaveTypeMatch

    );


  });



  const updateLeaveStatus = async(
    id:number,
    status:string
  )=>{


    const selectedLeave = leaves.find(
      (leave)=>
        leave.LeaveId === id
    );


    if(!selectedLeave)
      return;



    await fetch(
      "/api/leaves",
      {

        method:"PUT",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          ...selectedLeave,

          Status:status

        })

      }
    );



    loadLeaves();


  };



  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex justify-between items-center">


        <div>

          <h1 className="text-3xl font-bold text-theme">

            Leave Management

          </h1>


          <p className="text-muted mt-2">

            Manage employee leave requests

          </p>


        </div>



        <Link

          href="/hr/leave/add"

          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-2
          rounded-lg
          "

        >

          + Apply Leave

        </Link>


      </div>



      {/* Filter Card */}

      <div className="card-theme rounded-xl shadow p-6">


        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">


          <input

            placeholder="Search Employee"

            value={searchEmployee}

            onChange={(e)=>
              setSearchEmployee(e.target.value)
            }

            className="
            border
            border-gray-300
            rounded-lg
            px-4
            py-2
            text-theme
            bg-transparent
            "

          />
                    <select

            value={filterLeaveType}

            onChange={(e)=>
              setFilterLeaveType(e.target.value)
            }

            className="
            border
            border-gray-300
            rounded-lg
            px-4
            py-2
            text-theme
            card-theme
            "

          >

            <option value="All Leave Type">

              All Leave Type

            </option>


            <option value="Casual Leave">

              Casual Leave

            </option>


            <option value="Sick Leave">

              Sick Leave

            </option>


            <option value="Paid Leave">

              Paid Leave

            </option>


          </select>





          <select

            value={filterStatus}

            onChange={(e)=>
              setFilterStatus(e.target.value)
            }

            className="
            border
            border-gray-300
            rounded-lg
            px-4
            py-2
            text-theme
            card-theme
            "

          >


            <option value="All Status">

              All Status

            </option>


            <option value="Pending">

              Pending

            </option>


            <option value="Approved">

              Approved

            </option>


            <option value="Rejected">

              Rejected

            </option>


          </select>






          <button

            className="
            bg-green-600
            hover:bg-green-700
            text-white
            rounded-lg
            "

          >

            Search

          </button>






          <button

            onClick={handleClear}

            className="
            bg-gray-600
            hover:bg-gray-700
            text-white
            rounded-lg
            "

          >

            Clear

          </button>



        </div>


      </div>





      {/* Table */}


      <div className="card-theme rounded-xl shadow overflow-hidden">


        <table className="w-full">


          <thead className="card-theme">


            <tr className="text-theme">


              <th className="p-4 text-left">

                ID

              </th>


              <th className="p-4 text-left">

                Employee

              </th>


              <th className="p-4 text-left">

                Leave Type

              </th>


              <th className="p-4 text-left">

                From Date

              </th>


              <th className="p-4 text-left">

                To Date

              </th>


              <th className="p-4 text-left">

                Reason

              </th>


              <th className="p-4 text-left">

                Status

              </th>


              <th className="p-4 text-center">

                Action

              </th>


            </tr>


          </thead>



          <tbody>


            {


              loading ?


              <tr>

                <td

                  colSpan={8}

                  className="text-center py-10 text-muted"

                >

                  Loading Leaves...

                </td>

              </tr>



              :



              filteredLeaves.length === 0 ?



              <tr>

                <td

                  colSpan={8}

                  className="text-center py-10 text-muted"

                >

                  No Leave Found

                </td>

              </tr>


              :


              filteredLeaves.map((leave)=>(


                <tr

                  key={leave.LeaveId}

                  className="
                  border-t
                  hover:bg-black/5
                  dark:hover:bg-white/10
                  "

                >
                                      <td className="p-4 text-theme">

                    {leave.LeaveId}

                  </td>



                  <td className="p-4 text-theme">

                    {leave.EmployeeName}

                  </td>




                  <td className="p-4 text-muted">

                    {leave.LeaveType}

                  </td>




                  <td className="p-4 text-muted">

                    {leave.FromDate}

                  </td>




                  <td className="p-4 text-muted">

                    {leave.ToDate}

                  </td>




                  <td className="p-4 text-muted">

                    {leave.Reason}

                  </td>




                  <td className="p-4">


                    <span

                      className={

                        leave.Status === "Approved"

                        ?

                        `
                        bg-green-100
                        text-green-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        `

                        :


                        leave.Status === "Rejected"

                        ?

                        `
                        bg-red-100
                        text-red-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        `


                        :


                        `
                        bg-yellow-100
                        text-yellow-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        `

                      }

                    >

                      {leave.Status}


                    </span>


                  </td>







                  <td className="p-4">


                    <div className="flex justify-center gap-2">





                      <Link

                        href={`/hr/leave/${leave.LeaveId}`}

                        className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-3
                        py-1
                        rounded
                        text-sm
                        "

                      >

                        View

                      </Link>






                      <button

                        onClick={()=>updateLeaveStatus(

                          leave.LeaveId,

                          "Approved"

                        )}

                        className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-3
                        py-1
                        rounded
                        text-sm
                        "

                      >

                        Approve

                      </button>







                      <button

                        onClick={()=>updateLeaveStatus(

                          leave.LeaveId,

                          "Rejected"

                        )}

                        className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-3
                        py-1
                        rounded
                        text-sm
                        "

                      >

                        Reject

                      </button>





                    </div>


                  </td>



                </tr>


              ))


            }


          </tbody>


        </table>
              </div>


    </div>


  );


}