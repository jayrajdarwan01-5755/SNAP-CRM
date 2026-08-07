"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Payroll } from "@/types/payroll";
import { useTheme } from "@/context/ThemeContext";

export default function PayrollDetailsPage() {

const router = useRouter();

const params = useParams();

const { themeSettings } = useTheme();



const [payroll, setPayroll] =
useState<Payroll | null>(null);

const [loading, setLoading] =
useState(true);



useEffect(() => {

  loadPayroll();

}, []);



const loadPayroll = async () => {

try {


  const response = await fetch(
    "/api/payrolls"
  );


  const data: Payroll[] =
    await response.json();



  const selectedPayroll =
    data.find(

      (item) =>

        item.PayrollId ===
        Number(params.id)

    );



  if (selectedPayroll) {

    setPayroll(selectedPayroll);

  }



} catch (error) {


  console.log(error);


} finally {


  setLoading(false);


}

};



if (loading) {

return (

  <div className="
  text-center
  py-10
  text-muted
  ">

    Loading Payroll...

  </div>

);

}



if (!payroll) {

return (

  <div className="
  text-center
  py-10
  text-theme
  ">

    Payroll Not Found

  </div>

);

}



return (

<div className="space-y-6">


  {/* Header */}


  <div className="
  flex
  justify-between
  items-center
  ">


    <div>


      <h1 className="
      text-3xl
      font-bold
      text-theme
      ">

        Payroll Details


      </h1>



      <p className="
      text-muted
      mt-2
      ">

        View employee payroll information


      </p>



    </div>



    <button

      onClick={() => router.back()}

      className="
      button-secondary
      px-5
      py-2
      rounded-lg
      "

    >

      Back


    </button>



  </div>



  {/* Payroll Information Card */}


  <div className="
  card-theme
  rounded-xl
  shadow
  border-theme
  border
  p-6
  ">



    <h2 className="
    text-xl
    font-semibold
    text-theme
    mb-6
    ">

      Payroll Information


    </h2>




    <div className="
    grid
    grid-cols-1
    md:grid-cols-2
    gap-6
    ">


      <div>

        <p className="
        text-sm
        text-muted
        ">
          Payroll ID
        </p>

        <p className="
        font-semibold
        text-theme
        ">
          {payroll.PayrollId}
        </p>

      </div>




      <div>

        <p className="
        text-sm
        text-muted
        ">
          Employee ID
        </p>

        <p className="
        font-semibold
        text-theme
        ">
          {payroll.EmployeeId}
        </p>

      </div>




      <div>

        <p className="
        text-sm
        text-muted
        ">
          Employee Name
        </p>

        <p className="
        font-semibold
        text-theme
        ">
          {payroll.EmployeeName}
        </p>

      </div>




      <div>

        <p className="
        text-sm
        text-muted
        ">
          Month
        </p>

        <p className="
        font-semibold
        text-theme
        ">
          {payroll.Month}
        </p>

      </div>




      <div>

        <p className="
        text-sm
        text-muted
        ">
          Basic Salary
        </p>

        <p className="
        font-semibold
        text-theme
        ">
          ₹{payroll.Basic.toLocaleString()}
        </p>

      </div>




      <div>

        <p className="
        text-sm
        text-muted
        ">
          Allowance
        </p>

        <p className="
        font-semibold
        text-theme
        ">
          ₹{payroll.Allowance.toLocaleString()}
        </p>

      </div>




      <div>

        <p className="
        text-sm
        text-muted
        ">
          Deduction
        </p>

        <p className="
        font-semibold
        text-theme
        ">
          ₹{payroll.Deduction.toLocaleString()}
        </p>

      </div>




      <div>

        <p className="
        text-sm
        text-muted
        ">
          Net Salary
        </p>


        <p className="
        text-2xl
        font-bold
        text-theme
        ">

          ₹{payroll.NetSalary.toLocaleString()}

        </p>


      </div>




    </div>



  </div>






  {/* Generate Payslip */}



  <div className="
  card-theme
  rounded-xl
  shadow
  border-theme
  border
  p-6
  ">



    <div className="
    flex
    justify-center
    ">



      <button


        onClick={() =>
          alert("Payslip generated successfully!")
        }


        className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-8
        py-3
        rounded-lg
        font-semibold
        "


      >

        Generate Payslip


      </button>



    </div>



  </div>


</div>

);

}