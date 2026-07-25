"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function AddSupplierPage() {


  const router = useRouter();



  const [supplier, setSupplier] = useState({

    supplierName: "",
    email: "",
    phone: "",
    address: "",

  });





  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {


    setSupplier({

      ...supplier,

      [e.target.name]: e.target.value,

    });


  };





  const handleSubmit = async (
    e: React.FormEvent
  ) => {


    e.preventDefault();




    if(

      !supplier.supplierName ||
      !supplier.email ||
      !supplier.phone ||
      !supplier.address

    ){

      alert("Please fill all required fields");

      return;

    }






    const response = await fetch(
      "/api/suppliers",
      {

        method:"POST",

        headers:{

          "Content-Type":"application/json",

        },


        body:JSON.stringify({

          SupplierName: supplier.supplierName,

          Email: supplier.email,

          Phone: supplier.phone,

          Address: supplier.address,

        }),

      }

    );





    if(response.ok){


      alert("Supplier Added Successfully");


      router.push(
        "/inventory/suppliers"
      );


    }
    else{


      alert(
        "Failed to add supplier"
      );


    }


  };





  return (

    <div className="space-y-6">



      {/* Header */}


      <div className="flex justify-between items-center">


        <div>


          <h1 className="text-3xl font-bold text-gray-900">
            Add Supplier
          </h1>


          <p className="text-gray-600 mt-2">
            Create new supplier
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


      <div className="bg-white border rounded-xl shadow p-6">


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >



          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


            {/* Supplier Name */}

            <div>


              <label className="block text-sm font-semibold text-gray-900 mb-2">

                Supplier Name

              </label>


              <input

                type="text"

                name="supplierName"

                value={supplier.supplierName}

                onChange={handleChange}

                placeholder="Enter Supplier Name"

                className="
                w-full
                border
                border-gray-300
                bg-white
                text-gray-900
                placeholder-gray-400
                rounded-lg
                px-4
                py-2
                "

              />


            </div>





            {/* Email */}

            <div>


              <label className="block text-sm font-semibold text-gray-900 mb-2">

                Email

              </label>


              <input

                type="email"

                name="email"

                value={supplier.email}

                onChange={handleChange}

                placeholder="Enter Email"

                className="
                w-full
                border
                border-gray-300
                bg-white
                text-gray-900
                placeholder-gray-400
                rounded-lg
                px-4
                py-2
                "

              />


            </div>
                        {/* Phone */}

            <div>


              <label className="block text-sm font-semibold text-gray-900 mb-2">

                Phone

              </label>


              <input

                type="text"

                name="phone"

                value={supplier.phone}

                onChange={handleChange}

                placeholder="Enter Phone Number"

                className="
                w-full
                border
                border-gray-300
                bg-white
                text-gray-900
                placeholder-gray-400
                rounded-lg
                px-4
                py-2
                "

              />


            </div>





            {/* Address */}

            <div>


              <label className="block text-sm font-semibold text-gray-900 mb-2">

                Address

              </label>


              <textarea

                name="address"

                value={supplier.address}

                onChange={handleChange}

                placeholder="Enter Address"

                rows={4}

                className="
                w-full
                border
                border-gray-300
                bg-white
                text-gray-900
                placeholder-gray-400
                rounded-lg
                px-4
                py-2
                "

              />


            </div>


          </div>





          {/* Save Button */}


          <div className="mt-8 flex justify-end">


            <button

              type="submit"

              className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-2
              rounded-lg
              "

            >

              Save Supplier

            </button>


          </div>



        </form>


      </div>


    </div>


  );


}