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

  const [loading, setLoading] = useState(false);



  const handleSave = async () => {


    if (!customerCode || !customerName) {

      alert("Customer Code and Customer Name are required");

      return;

    }



    try {

      setLoading(true);



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



      if (!response.ok) {

        alert(data.message || "Failed to add customer");

        return;

      }



      alert("Customer Added Successfully");


      router.push("/sales/customers");



    } catch (error) {


      console.log(error);

      alert("Something went wrong");


    } finally {


      setLoading(false);


    }


  };



  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex justify-between items-center">


        <div>

          <h1 className="text-3xl font-bold text-theme">
            Add Customer
          </h1>


          <p className="text-muted mt-2">
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


      <div className="card-theme border border-theme rounded-xl shadow p-6">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">



          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              Customer Code
            </label>


            <input

              value={customerCode}

              onChange={(e)=>
                setCustomerCode(e.target.value)
              }

              placeholder="Enter Customer Code"

                className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                "

            />

          </div>





          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Customer Name
            </label>


            <input

              value={customerName}

              onChange={(e)=>
                setCustomerName(e.target.value)
              }

              placeholder="Enter Customer Name"

                className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                "

            />

          </div>





          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Phone
            </label>


            <input

              value={phone}

              onChange={(e)=>
                setPhone(e.target.value)
              }

              placeholder="Enter Phone"

                className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                "

            />

          </div>





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
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                "

            />

          </div>
          
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
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                "

            />


          </div>





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
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                "

            />


          </div>





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
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                "
            />
          </div>

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
            border-theme
            bg-theme
            text-theme
            rounded-lg
            px-4
            py-2
            "
                />
         </div>

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Status
            </label>


            <select

              value={status}

              onChange={(e)=>
                setStatus(e.target.value)
              }
                className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                "
            >

              <option value="Active">
                Active
              </option>


              <option value="Inactive">
                Inactive
              </option>


            </select>


          </div>



        </div>





        <div className="mt-8 flex justify-end">


          <button

            onClick={handleSave}

            disabled={loading}

            className="
            bg-blue-600
            hover:bg-blue-700
            disabled:bg-gray-400
            text-white
            px-6
            py-2
            rounded-lg
            "

          >

            {
              loading
              ? "Saving..."
              : "Save Customer"
            }


          </button>


        </div>



      </div>


    </div>

  );


}