"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Supplier } from "@/types/supplier";


export default function ViewSupplierPage() {


  const router = useRouter();

  const params = useParams();

  const id = Number(params.id);



  const [supplier, setSupplier] = useState<Supplier | null>(null);




  useEffect(() => {


    loadSupplier();


  }, []);





  const loadSupplier = async () => {


    const response = await fetch("/api/suppliers");


    const data: Supplier[] = await response.json();



    const foundSupplier = data.find(

      (item) =>

      item.SupplierId === id

    );



    setSupplier(
      foundSupplier || null
    );


  };





  if(!supplier){


    return (

      <div>

        Loading Supplier...

      </div>

    );


  }





  return (


    <div className="space-y-6">



      {/* Header */}



      <div className="flex justify-between items-center">


        <div>


          <h1 className="text-3xl font-bold text-gray-900">

            Supplier Details

          </h1>


          <p className="text-gray-600 mt-2">

            View supplier information

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







      {/* Supplier Information */}



      <div className="bg-white border rounded-xl shadow p-6">



        <h2 className="text-xl font-semibold text-gray-900 mb-6">

          Supplier Information

        </h2>





        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">





          {/* Supplier Name */}


          <div>


            <p className="text-sm text-gray-500">

              Supplier Name

            </p>


            <p className="font-semibold text-gray-900">

              {supplier.SupplierName}

            </p>


          </div>







          {/* Email */}


          <div>


            <p className="text-sm text-gray-500">

              Email

            </p>


            <p className="font-semibold text-gray-900">

              {supplier.Email}

            </p>


          </div>







          {/* Phone */}


          <div>


            <p className="text-sm text-gray-500">

              Phone

            </p>


            <p className="font-semibold text-gray-900">

              {supplier.Phone}

            </p>


          </div>







          {/* Address */}


          <div>


            <p className="text-sm text-gray-500">

              Address

            </p>


            <p className="font-semibold text-gray-900">

              {supplier.Address}

            </p>


          </div>





        </div>



      </div>



    </div>


  );


}