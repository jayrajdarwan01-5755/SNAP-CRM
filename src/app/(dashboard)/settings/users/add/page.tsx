"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserPage() {

  const router = useRouter();

  const [username, setUsername] = useState("");

  const [role, setRole] = useState("");

  const [status, setStatus] = useState("Active");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");



  const handleSave = () => {

    if (password !== confirmPassword) {

      alert("Password does not match");

      return;

    }


    alert("User Added Successfully");

    router.push("/settings/users");

  };


  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex justify-between items-center">


        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Add User
          </h1>

          <p className="text-gray-600 mt-2">
            Create new system user
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



          {/* Username */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
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




          {/* Role */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Role
            </label>


            <select

              value={role}

              onChange={(e)=>setRole(e.target.value)}

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

              <option value="">
                Select Role
              </option>

              <option value="Administrator">
                Administrator
              </option>

              <option value="Manager">
                Manager
              </option>

              <option value="Employee">
                Employee
              </option>


            </select>


          </div>




          {/* Status */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Status
            </label>


            <select

              value={status}

              onChange={(e)=>setStatus(e.target.value)}

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

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>


            </select>


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
                    {/* Confirm Password */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
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

            Save User

          </button>


        </div>


      </div>


    </div>


  );

}