"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function AddCustomerPage() {


  const router = useRouter();



  const [customerCode, setCustomerCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("India");
    const [status, setStatus] = useState("Active");



 const handleSave = async () => {

  const response = await fetch("/api/customers", {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({

      CustomerCode: customerCode,
      CustomerName: customerName,
      Phone: phone,
      Email: email,
      Address: address,
      City: city,
      State: state,
      Country: country,
      Status: status,

    }),

  });


  const data = await response.json();


  console.log(data);


  alert("Customer Added Successfully");


  router.push("/sales/customers");

};




  return (


    <div className="space-y-6">





      {/* Header */}


      <div className="flex justify-between items-center">


        <div>


          <h1 className="text-3xl font-bold text-gray-900">
            Add Customer
          </h1>


          <p className="text-gray-600 mt-2">
            Create new customer record
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


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">





          {/* Customer Code */}



          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Customer Code

            </label>



            <input

              type="text"

              value={customerCode}

              onChange={(e)=>
                setCustomerCode(e.target.value)
              }

              placeholder="Enter Customer Code"

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
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "

            />


          </div>







          {/* Customer Name */}



          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Customer Name

            </label>



            <input

              type="text"

              value={customerName}

              onChange={(e)=>
                setCustomerName(e.target.value)
              }

              placeholder="Enter Customer Name"

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
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
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

              value={phone}

              onChange={(e)=>
                setPhone(e.target.value)
              }

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
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
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

              value={email}

              onChange={(e)=>
                setEmail(e.target.value)
              }

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
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "

            />


          </div>
                    {/* Address */}


          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Address

            </label>



           <textarea

                value={address}

                onChange={(e)=>
                setAddress(e.target.value)
                }

                placeholder="Enter Address"
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
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "

            />


          </div>







          {/* City */}



          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              City

            </label>



           <input

value={city}

onChange={(e)=>
 setCity(e.target.value)
}

placeholder="Enter City"

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







          {/* State */}



          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              State

            </label>


<input

value={state}

onChange={(e)=>
 setState(e.target.value)
}

placeholder="Enter State"

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







          {/* Country */}



          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Country

            </label>



           <input

value={country}

onChange={(e)=>
 setCountry(e.target.value)
}

placeholder="Enter Country"
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







          {/* Status */}



          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Status

            </label>



            <select

            value={status}

            onChange={(e) =>
                setStatus(e.target.value)
            }

            className="w-full border
            border-gray-300
            bg-white
            text-gray-900
            rounded-lg
            px-4
            py-2
            ">

            <option value="Active">
                Active
            </option>


            <option value="Inactive">
                Inactive
            </option>


            </select>


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


            Save Customer


          </button>


        </div>



      </div>



    </div>


  );


}