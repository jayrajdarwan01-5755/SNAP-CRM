"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";


type Payroll = {

  PayrollId:number;

  EmployeeId:number;

  EmployeeName:string;

  Month:string;

  Basic:number;

  Allowance:number;

  Deduction:number;

  NetSalary:number;

};



export default function EditPayrollPage(){


  const router = useRouter();

  const params = useParams();

  const { themeSettings } = useTheme();


  const payrollId = params.id as string;



  const [loading,setLoading] = useState(true);

  const [saving,setSaving] = useState(false);



  const [employeeId,setEmployeeId] = useState("");

  const [employeeName,setEmployeeName] = useState("");

  const [month,setMonth] = useState("");



  const [basicSalary,setBasicSalary] = useState<number>(0);

  const [allowance,setAllowance] = useState<number>(0);

  const [deduction,setDeduction] = useState<number>(0);

  const [netSalary,setNetSalary] = useState<number>(0);





  useEffect(()=>{

    loadPayroll();

  },[]);






  useEffect(()=>{


    const basic = isNaN(basicSalary) ? 0 : basicSalary;

    const allow = isNaN(allowance) ? 0 : allowance;

    const deduct = isNaN(deduction) ? 0 : deduction;



    setNetSalary(

      basic + allow - deduct

    );


  },[basicSalary,allowance,deduction]);








  const loadPayroll = async()=>{


    try{


      setLoading(true);



      const response = await fetch(

        `/api/payrolls?id=${payrollId}`

      );




      if(!response.ok){


        alert("Failed to load payroll.");

        router.push("/hr/payroll");

        return;


      }





      const result = await response.json();



      const data:Payroll = Array.isArray(result)

      ? result[0]

      : result;





      if(!data){


        alert("Payroll not found.");

        router.push("/hr/payroll");

        return;


      }





      setEmployeeId(

        String(data.EmployeeId ?? "")

      );


      setEmployeeName(

        data.EmployeeName ?? ""

      );


      setMonth(

        data.Month ?? ""

      );



      setBasicSalary(

        Number(data.Basic ?? 0)

      );


      setAllowance(

        Number(data.Allowance ?? 0)

      );


      setDeduction(

        Number(data.Deduction ?? 0)

      );


      setNetSalary(

        Number(data.NetSalary ?? 0)

      );



    }

    catch(error){


      console.log(error);


      alert("Something went wrong.");


      router.push("/hr/payroll");


    }

    finally{


      setLoading(false);


    }


  };





  const handleUpdatePayroll = async(

    e:React.FormEvent<HTMLFormElement>

  )=>{


    e.preventDefault();



    try{


      setSaving(true);



      const response = await fetch(

        "/api/payrolls",

        {


          method:"PUT",


          headers:{


            "Content-Type":"application/json"


          },


          body:JSON.stringify({


            PayrollId:Number(payrollId),

            EmployeeId:Number(employeeId),

            EmployeeName:employeeName,

            Month:month,

            Basic:Number(basicSalary),

            Allowance:Number(allowance),

            Deduction:Number(deduction),

            NetSalary:Number(netSalary)


          })


        }

      );
            if(!response.ok){

        alert("Failed to update payroll.");

        return;

      }


      alert("Payroll updated successfully.");

      router.push("/hr/payroll");


    }

    catch(error){

      console.log(error);

      alert("Something went wrong.");

    }

    finally{

      setSaving(false);

    }


  };





  if(loading){


    return (

      <div className="flex items-center justify-center py-10">

        <p className="text-lg font-medium text-muted">

          Loading payroll...

        </p>

      </div>

    );

  }





  return (


    <div className="space-y-6">



      {/* Header */}



      <div className="flex justify-between items-center">



        <div>


          <h1 className="text-3xl font-bold text-theme">

            Edit Payroll

          </h1>



          <p className="text-muted mt-2">

            Update employee payroll information

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



      <form


        onSubmit={handleUpdatePayroll}


        className="
        card-theme
        rounded-xl
        shadow
        p-6
        "


      >




      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">





        {/* Employee ID */}



        <div>


          <label className="block text-sm font-medium text-theme mb-2">

            Employee ID

          </label>




          <input


            type="text"


            value={employeeId}


            onChange={(e)=>setEmployeeId(e.target.value)}



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

            required

          />



        </div>







        {/* Employee Name */}



        <div>



          <label className="block text-sm font-medium text-theme mb-2">

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
            bg-theme
            "

            required


          />



        </div>







        {/* Month */}



        <div>



          <label className="block text-sm font-medium text-theme mb-2">

            Month

          </label>





          <select


            value={month}


            onChange={(e)=>setMonth(e.target.value)}



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

              className="
              bg-white
              text-black
              dark:bg-gray-800
              dark:text-white
              "

            >

              Select Month

            </option>



            <option className="bg-white text-black dark:bg-gray-800 dark:text-white">

              January

            </option>



            <option className="bg-white text-black dark:bg-gray-800 dark:text-white">

              February

            </option>



            <option className="bg-white text-black dark:bg-gray-800 dark:text-white">

              March

            </option>



            <option className="bg-white text-black dark:bg-gray-800 dark:text-white">

              April

            </option>



            <option className="bg-white text-black dark:bg-gray-800 dark:text-white">

              May

            </option>



            <option className="bg-white text-black dark:bg-gray-800 dark:text-white">

              June

            </option>

            <option className="bg-white text-black dark:bg-gray-800 dark:text-white">

              July

            </option>



            <option className="bg-white text-black dark:bg-gray-800 dark:text-white">

              August

            </option>



            <option className="bg-white text-black dark:bg-gray-800 dark:text-white">

              September

            </option>



            <option className="bg-white text-black dark:bg-gray-800 dark:text-white">

              October

            </option>



            <option className="bg-white text-black dark:bg-gray-800 dark:text-white">

              November

            </option>



            <option className="bg-white text-black dark:bg-gray-800 dark:text-white">

              December

            </option>



          </select>



        </div>








        {/* Basic Salary */}



        <div>


          <label className="block text-sm font-medium text-theme mb-2">

            Basic Salary

          </label>



          <input


            type="number"


            value={basicSalary}


            onChange={(e)=>

              setBasicSalary(

                e.target.value === ""

                ? 0

                : Number(e.target.value)

              )

            }



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


            min={0}

            required


          />



        </div>








        {/* Allowance */}



        <div>



          <label className="block text-sm font-medium text-theme mb-2">

            Allowance

          </label>




          <input



            type="number"


            value={allowance}


            onChange={(e)=>

              setAllowance(

                e.target.value === ""

                ? 0

                : Number(e.target.value)

              )

            }



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


            min={0}

            required


          />



        </div>








        {/* Deduction */}



        <div>



          <label className="block text-sm font-medium text-theme mb-2">

            Deduction

          </label>





          <input



            type="number"


            value={deduction}



            onChange={(e)=>

              setDeduction(

                e.target.value === ""

                ? 0

                : Number(e.target.value)

              )

            }



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


            min={0}

            required


          />



        </div>

                {/* Net Salary */}


        <div className="md:col-span-2">


          <label className="block text-sm font-medium text-theme mb-2">

            Net Salary

          </label>





          <input


            type="number"


            value={netSalary}


            readOnly



            className="
            w-full
            border
            border-gray-300
            rounded-lg
            px-4
            py-2
            font-semibold
            text-theme
            bg-gray-100
            dark:bg-gray-700
            "


          />



        </div>



      </div>








      {/* Buttons */}



      <div className="mt-8 flex gap-3">





        <button


          type="button"


          onClick={()=>router.push("/hr/payroll")}



          className="
          bg-gray-600
          hover:bg-gray-700
          text-white
          px-6
          py-3
          rounded-lg
          "


        >

          Cancel


        </button>







        <button


          type="submit"



          disabled={saving}



          className="
          bg-blue-600
          hover:bg-blue-700
          disabled:bg-blue-400
          text-white
          px-6
          py-3
          rounded-lg
          "


        >

          {saving ? "Updating..." : "Update Payroll"}


        </button>





      </div>





      </form>



    </div>


  );


}