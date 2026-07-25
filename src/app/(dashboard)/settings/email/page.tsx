"use client";

import { useState } from "react";
import Link from "next/link";

export default function EmailSettingsPage() {

  const [smtpHost, setSmtpHost] = useState("");

  const [smtpPort, setSmtpPort] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [senderName, setSenderName] = useState("");

  const [encryption, setEncryption] = useState("TLS");


  const handleSave = () => {

    alert("Email Settings Saved Successfully");

  };


  const handleTest = () => {

    alert("Test Email Sent Successfully");

  };


  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex justify-between items-center">


        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Email Settings
          </h1>

          <p className="text-gray-600 mt-2">
            Configure SMTP email settings
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




      {/* Form */}

      <div className="bg-white border rounded-xl shadow p-6">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          {/* SMTP Host */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              SMTP Host
            </label>

            <input

              type="text"

              placeholder="smtp.gmail.com"

              value={smtpHost}

              onChange={(e)=>setSmtpHost(e.target.value)}

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




          {/* SMTP Port */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              SMTP Port
            </label>

            <input

              type="number"

              placeholder="587"

              value={smtpPort}

              onChange={(e)=>setSmtpPort(e.target.value)}

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




          {/* Email Address */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address
            </label>

            <input

              type="email"

              placeholder="example@gmail.com"

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




          {/* Password */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Password
            </label>

            <input

              type="password"

              placeholder="Enter Password"

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

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
                    {/* Sender Name */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Sender Name
            </label>

            <input

              type="text"

              placeholder="SNAP CRM"

              value={senderName}

              onChange={(e) => setSenderName(e.target.value)}

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




          {/* Encryption */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Encryption
            </label>

            <select

              value={encryption}

              onChange={(e) => setEncryption(e.target.value)}

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

            >

              <option value="TLS">
                TLS
              </option>

              <option value="SSL">
                SSL
              </option>

              <option value="None">
                None
              </option>

            </select>

          </div>


        </div>



        {/* Buttons */}

        <div className="flex justify-end gap-3 mt-8">


          <button

            onClick={handleTest}

            className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-6
            py-2
            rounded-lg
            "

          >

            Test Email

          </button>



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

            Save Settings

          </button>


        </div>


      </div>


    </div>

  );

}