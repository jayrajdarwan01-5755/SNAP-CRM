"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Payroll } from "@/types/payroll";


export default function PayrollPage() {


  const [payrolls, setPayrolls] = useState<Payroll[]>([]);

  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");

  const [selectedMonth, setSelectedMonth] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const payrollsPerPage = 5;



  useEffect(() => {

    loadPayrolls();

  }, []);





  const loadPayrolls = async () => {

    try {

      setLoading(true);


      const response = await fetch("/api/payrolls");


      const data: Payroll[] =
        await response.json();


      console.log("Payroll List:", data);


      setPayrolls(data);


    } catch(error) {


      console.log(error);


    } finally {


      setLoading(false);


    }

  };






  const handleDelete = async (
    PayrollId:number
  ) => {


    const confirmDelete = confirm(
      "Are you sure you want to delete this payroll?"
    );


    if(!confirmDelete){

      return;

    }



    const response = await fetch(
      "/api/payrolls",
      {

        method:"DELETE",

        headers:{
          "Content-Type":"application/json",
        },

        body:JSON.stringify({

          PayrollId,

        }),

      }
    );



    if(response.ok){


      setPayrolls((prev)=>

        prev.filter(

          (payroll)=>

            payroll.PayrollId !== PayrollId

        )

      );


    }


  };







  const handleClear = () => {


    setSearchText("");

    setSelectedMonth("");

    setCurrentPage(1);


  };







  const filteredPayrolls = payrolls.filter(

    (payroll)=>{


      const searchMatch =

        payroll.EmployeeName
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          );



      const monthMatch =

        selectedMonth === ""

        ||

        payroll.Month === selectedMonth;



      return searchMatch && monthMatch;


    }

  );





  const lastIndex =
    currentPage * payrollsPerPage;


  const firstIndex =
    lastIndex - payrollsPerPage;



  const currentPayrolls =
    filteredPayrolls.slice(
      firstIndex,
      lastIndex
    );






  return (

    <div className="space-y-6">


      {/* Header */}


      <div className="flex justify-between items-center">


        <div>


          <h1 className="text-3xl font-bold text-theme">

            Payroll Management

          </h1>


          <p className="text-muted mt-2">

            Manage employee payroll records

          </p>


        </div>




        <Link

          href="/hr/payroll/add"

          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-2
          rounded-lg
          "

        >

          + Generate Payroll


        </Link>


      </div>





      {/* Search Card */}


      <div className="
        card-theme
        border
        rounded-xl
        shadow
        p-6
      ">


        <div className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-4
        ">



          <input

            value={searchText}

            onChange={(e)=>{

              setSearchText(e.target.value);

              setCurrentPage(1);

            }}

            placeholder="Search Employee"


            className="
              border
              border-gray-300
              dark:border-gray-600
              rounded-lg
              px-4
              py-2
              text-theme
              bg-theme
              placeholder:text-muted
            "

          />



          <select

            value={selectedMonth}

            onChange={(e)=>{

              setSelectedMonth(e.target.value);

              setCurrentPage(1);

            }}

            className="
              border
              border-gray-300
              dark:border-gray-600
              rounded-lg
              px-4
              py-2
              text-theme
              bg-theme
            "

          >


            <option value="">
              All Months
            </option>


            <option>
              January
            </option>


            <option>
              February
            </option>


            <option>
              March
            </option>


            <option>
              April
            </option>


            <option>
              May
            </option>


            <option>
              June
            </option>


            <option>
              July
            </option>


            <option>
              August
            </option>


            <option>
              September
            </option>


            <option>
              October
            </option>


            <option>
              November
            </option>


            <option>
              December
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



      <div
        className="
        card-theme
        border
        rounded-xl
        shadow
        overflow-hidden
        "
      >


        <table className="w-full">



          <thead
            className="
            bg-theme
            "
          >


            <tr>


              <th
                className="
                p-4
                text-left
                text-theme
                "
              >
                Employee
              </th>



              <th
                className="
                p-4
                text-left
                text-theme
                "
              >
                Month
              </th>



              <th
                className="
                p-4
                text-left
                text-theme
                "
              >
                Basic
              </th>



              <th
                className="
                p-4
                text-left
                text-theme
                "
              >
                Allowance
              </th>



              <th
                className="
                p-4
                text-left
                text-theme
                "
              >
                Deduction
              </th>



              <th
                className="
                p-4
                text-left
                text-theme
                "
              >
                Net Salary
              </th>




              <th
                className="
                p-4
                text-center
                text-theme
                "
              >
                Action
              </th>



            </tr>


          </thead>





          <tbody>


          {

            loading ?


            (

              <tr>

                <td

                  colSpan={7}

                  className="
                  text-center
                  py-10
                  text-muted
                  "

                >

                  Loading payrolls...

                </td>


              </tr>


            )



            :



            currentPayrolls.length === 0 ?


            (

              <tr>


                <td

                  colSpan={7}

                  className="
                  text-center
                  py-10
                  text-muted
                  "

                >

                  No Payroll Found


                </td>


              </tr>


            )



            :



            currentPayrolls.map((payroll)=>(


 <tr
  key={payroll.PayrollId}
  className="
  border-t
  hover:bg-black/5
  dark:hover:bg-white/10
  transition
  "
>




                <td

                  className="
                  p-4
                  font-medium
                  text-theme
                  "

                >

                  {payroll.EmployeeName}


                </td>





                <td

                  className="
                  p-4
                  text-muted
                  "

                >

                  {payroll.Month}


                </td>





                <td

                  className="
                  p-4
                  text-muted
                  "

                >

                  ₹{payroll.Basic.toLocaleString()}


                </td>





                <td

                  className="
                  p-4
                  text-muted
                  "

                >

                  ₹{payroll.Allowance.toLocaleString()}


                </td>




                <td

                  className="
                  p-4
                  text-red-600
                  "

                >

                  ₹{payroll.Deduction.toLocaleString()}


                </td>





                <td

                  className="
                  p-4
                  font-semibold
                  text-green-600
                  "

                >

                  ₹{payroll.NetSalary.toLocaleString()}


                </td>





                <td

                  className="
                  p-4
                  "

                >


                  <div

                    className="
                    flex
                    justify-center
                    gap-2
                    whitespace-nowrap
                    "

                  >



                    <Link

                      href={`/hr/payroll/${payroll.PayrollId}`}

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





                    <Link

                      href={`/hr/payroll/edit/${payroll.PayrollId}`}

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

                      Edit


                    </Link>





                    <button


                      onClick={()=>handleDelete(
                        payroll.PayrollId
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

                      Delete


                    </button>



                  </div>


                </td>



              </tr>


            ))


          }


          </tbody>


        </table>


      </div>
            {/* Pagination */}


      <div className="
        flex
        justify-center
        gap-3
        mt-5
      ">


        <button

          disabled={currentPage === 1}

          onClick={() =>
            setCurrentPage(currentPage - 1)
          }

          className="
          bg-gray-600
          hover:bg-gray-700
          disabled:bg-gray-300
          disabled:text-gray-500
          text-white
          px-4
          py-2
          rounded-lg
          "

        >

          Previous

        </button>





        <span

          className="
          px-4
          py-2
          font-semibold
          text-theme
          "

        >

          Page {currentPage}

        </span>





        <button


          disabled={

            currentPage >=

            Math.ceil(
              filteredPayrolls.length /
              payrollsPerPage
            )

          }



          onClick={() =>
            setCurrentPage(currentPage + 1)
          }



          className="
          bg-blue-600
          hover:bg-blue-700
          disabled:bg-gray-300
          disabled:text-gray-500
          text-white
          px-4
          py-2
          rounded-lg
          "

        >

          Next

        </button>



      </div>



    </div>


  );


}