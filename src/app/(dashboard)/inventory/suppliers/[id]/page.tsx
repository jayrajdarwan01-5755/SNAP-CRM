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

      <div className="text-muted">

        Loading Supplier...

      </div>

    );


  }






  return (


    <div className="space-y-6">





      {/* Header */}



      <div className="flex justify-between items-center">


        <div>


          <h1 className="text-3xl font-bold text-theme">

            Supplier Details

          </h1>


          <p className="text-muted mt-2">

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



      <div

        className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        p-6
        "

      >



        <h2 className="text-xl font-semibold text-theme mb-6">

          Supplier Information

        </h2>







        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">







          {/* Supplier Name */}


          <div>


            <p className="text-sm text-muted">

              Supplier Name

            </p>


            <p className="font-semibold text-theme">

              {supplier.SupplierName}

            </p>


          </div>









          {/* Email */}


          <div>


            <p className="text-sm text-muted">

              Email

            </p>


            <p className="font-semibold text-theme">

              {supplier.Email}

            </p>


          </div>









          {/* Phone */}


          <div>


            <p className="text-sm text-muted">

              Phone

            </p>


            <p className="font-semibold text-theme">

              {supplier.Phone}

            </p>


          </div>









          {/* Address */}


          <div>


            <p className="text-sm text-muted">

              Address

            </p>


            <p className="font-semibold text-theme">

              {supplier.Address}

            </p>


          </div>






        </div>



      </div>



    </div>


  );


}