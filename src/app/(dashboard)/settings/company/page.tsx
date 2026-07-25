"use client";

import { useState } from "react";
import Link from "next/link";

export default function CompanyInformationPage() {

  const [companyName, setCompanyName] = useState("SNAP CRM");

  const [email, setEmail] = useState("admin@snapcrm.com");

  const [phone, setPhone] = useState("+91 9876543210");

  const [website, setWebsite] = useState("www.snapcrm.com");

  const [address, setAddress] = useState("Pune, Maharashtra");

  const [city, setCity] = useState("Pune");

  const [state, setState] = useState("Maharashtra");

  const [country, setCountry] = useState("India");


  const handleSave = () => {

    alert("Company Information Saved Successfully");

  };


  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex justify-between items-center">


        <div>

          <h1 className="text-3xl font-bold text-gray-900">

            Company Information

          </h1>

          <p className="text-gray-600 mt-2">

            Manage company details

          </p>

        </div>


        <Link

          href="/settings"

          className="
          bg-gray-600
          hover:bg-gray-700
          text-white
          px-5
          py-2
          rounded-lg
          "

        >

          ← Back

        </Link>


      </div>




      {/* Company Information Form */}

      <div className="bg-white border rounded-xl shadow p-6">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          {/* Company Name */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Company Name

            </label>

            <input

              type="text"

              value={companyName}

              onChange={(e)=>setCompanyName(e.target.value)}

              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "

            />

          </div>




          {/* Company Logo */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Company Logo

            </label>

            <input

              type="file"

              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
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

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
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

              value={phone}

              onChange={(e)=>setPhone(e.target.value)}

              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "

            />

          </div>

                    {/* Website */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Website

            </label>

            <input

              type="text"

              value={website}

              onChange={(e) => setWebsite(e.target.value)}

              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
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

            <input

              type="text"

              value={address}

              onChange={(e) => setAddress(e.target.value)}

              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "

            />

          </div>




          {/* City */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">

              City

            </label>

            <input

              type="text"

              value={city}

              onChange={(e) => setCity(e.target.value)}

              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
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

              type="text"

              value={state}

              onChange={(e) => setState(e.target.value)}

              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
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

              type="text"

              value={country}

              onChange={(e) => setCountry(e.target.value)}

              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "

            />

          </div>


        </div>



        {/* Save Button */}

        <div className="flex justify-end mt-8">

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

            Save Information

          </button>

        </div>


      </div>


    </div>

  );

}