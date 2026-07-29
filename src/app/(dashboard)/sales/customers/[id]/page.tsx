"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Customer } from "@/types/customer";



export default function ViewCustomerPage() {


  const router = useRouter();



//   const customer = {

//     CustomerId: 1,
//     CustomerCode: "CUST001",
//     CustomerName: "Rahul Sharma",
//     Phone: "9876543210",
//     Email: "rahul@gmail.com",
//     Address: "Andheri East, Mumbai",
//     City: "Mumbai",
//     State: "Maharashtra",
//     Country: "India",
//     Status: "Active",

//   };

const params = useParams();

const id = Number(params.id);


const [customer, setCustomer] = useState<Customer | null>(null);



useEffect(() => {

  const loadCustomer = async () => {

    try {

      const response = await fetch(
        `/api/customers?id=${id}`
      );


      if(!response.ok){

        throw new Error(
          "Customer not found"
        );

      }


      const data: Customer =
        await response.json();


      setCustomer(data);


    }
    catch(error){

      console.log(error);

      setCustomer(null);

    }

  };


  if(id){

    loadCustomer();

  }


}, [id]);



if (!customer) {

  return (
    <div>
      Loading Customer...
    </div>
  );

}



  return (


    <div className="space-y-6">





      {/* Header */}


      <div className="flex justify-between items-center">


        <div>


          <h1 className="text-3xl font-bold text-gray-900">
            Customer Details
          </h1>


          <p className="text-gray-600 mt-2">
            View customer information
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







      {/* Customer Information */}



      <div className="bg-white border rounded-xl shadow p-6">



        <h2 className="text-xl font-semibold text-gray-900 mb-6">

          Customer Information

        </h2>





        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">







          {/* Customer Code */}



          <div>


            <p className="text-sm text-gray-500">
              Customer Code
            </p>


            <p className="font-semibold text-gray-900">
              {customer.CustomerCode}
            </p>


          </div>








          {/* Customer Name */}



          <div>


            <p className="text-sm text-gray-500">
              Customer Name
            </p>


            <p className="font-semibold text-gray-900">
              {customer.CustomerName}
            </p>


          </div>








          {/* Phone */}



          <div>


            <p className="text-sm text-gray-500">
              Phone
            </p>


            <p className="font-semibold text-gray-900">
              {customer.Phone}
            </p>


          </div>








          {/* Email */}



          <div>


            <p className="text-sm text-gray-500">
              Email
            </p>


            <p className="font-semibold text-gray-900">
              {customer.Email}
            </p>


          </div>
                    {/* Address */}


          <div>


            <p className="text-sm text-gray-500">
              Address
            </p>


            <p className="font-semibold text-gray-900">
              {customer.Address}
            </p>


          </div>







          {/* City */}



          <div>


            <p className="text-sm text-gray-500">
              City
            </p>


            <p className="font-semibold text-gray-900">
              {customer.City}
            </p>


          </div>







          {/* State */}



          <div>


            <p className="text-sm text-gray-500">
              State
            </p>


            <p className="font-semibold text-gray-900">
              {customer.State}
            </p>


          </div>







          {/* Country */}



          <div>


            <p className="text-sm text-gray-500">
              Country
            </p>


            <p className="font-semibold text-gray-900">
              {customer.Country}
            </p>


          </div>







          {/* Status */}



          <div>


            <p className="text-sm text-gray-500 mb-2">
              Status
            </p>



            <span

              className={

                customer.Status === "Active"

                ?

                "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"

                :

                "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"

              }

            >

              {customer.Status}

            </span>



          </div>





        </div>



      </div>



    </div>


  );


}