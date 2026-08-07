"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Supplier } from "@/types/supplier";


export default function EditSupplierPage() {


  const router = useRouter();

  const params = useParams();

  const id = Number(params.id);



  const [supplier, setSupplier] = useState<Supplier | null>(null);



  const [supplierName, setSupplierName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");





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



    if(foundSupplier){


      setSupplier(foundSupplier);


      setSupplierName(
        foundSupplier.SupplierName
      );


      setEmail(
        foundSupplier.Email
      );


      setPhone(
        foundSupplier.Phone
      );


      setAddress(
        foundSupplier.Address
      );


    }



  };





  const handleUpdate = async () => {



    const response = await fetch(
      "/api/suppliers",
      {


        method:"PUT",


        headers:{

          "Content-Type":"application/json"

        },


        body:JSON.stringify({

          SupplierId:id,

          SupplierName:supplierName,

          Email:email,

          Phone:phone,

          Address:address,


        })


      }

    );



    if(response.ok){


      alert(
        "Supplier Updated Successfully"
      );


      router.push(
        "/inventory/suppliers"
      );


    }



  };





  if(!supplier){


    return (

      <div className="text-theme">

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

            Edit Supplier

          </h1>


          <p className="text-muted mt-2">

            Update supplier information

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


      <div className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        p-6
      ">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">



          {/* Supplier Name */}


          <div>


            <label className="block text-sm font-semibold text-theme mb-2">

              Supplier Name

            </label>



            <input

              type="text"

              value={supplierName}

              onChange={(e)=>
                setSupplierName(e.target.value)
              }


              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              placeholder:text-muted
              rounded-lg
              px-4
              py-2
              "

            />


          </div>





          {/* Email */}


          <div>


            <label className="block text-sm font-semibold text-theme mb-2">

              Email

            </label>



            <input

              type="email"

              value={email}

              onChange={(e)=>
                setEmail(e.target.value)
              }


              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              placeholder:text-muted
              rounded-lg
              px-4
              py-2
              "

            />


          </div>





          {/* Phone */}


          <div>


            <label className="block text-sm font-semibold text-theme mb-2">

              Phone

            </label>



            <input

              type="text"

              value={phone}

              onChange={(e)=>
                setPhone(e.target.value)
              }


              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              placeholder:text-muted
              rounded-lg
              px-4
              py-2
              "

            />


          </div>





          {/* Address */}


          <div>


            <label className="block text-sm font-semibold text-theme mb-2">

              Address

            </label>



            <textarea

              rows={4}

              value={address}

              onChange={(e)=>
                setAddress(e.target.value)
              }


              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              placeholder:text-muted
              rounded-lg
              px-4
              py-2
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

            Update Supplier


          </button>


        </div>



      </div>



    </div>


  );


}