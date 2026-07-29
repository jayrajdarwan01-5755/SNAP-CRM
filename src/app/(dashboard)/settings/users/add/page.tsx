"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserPage() {

  const router = useRouter();


  const [username, setUsername] = useState("");

  const [fullname, setFullname] = useState("");

  const [role, setRole] = useState("");

  const [status, setStatus] = useState(true);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);



  const handleSave = async () => {


    if (!username.trim()) {

      alert("Username is required");

      return;

    }


    if (!fullname.trim()) {

      alert("Full Name is required");

      return;

    }


    if (!role) {

      alert("Role is required");

      return;

    }


    if (!password) {

      alert("Password is required");

      return;

    }


    if (!confirmPassword) {

      alert("Confirm Password is required");

      return;

    }


    if (password !== confirmPassword) {

      alert("Password does not match");

      return;

    }



    try {


      setLoading(true);



      const response = await fetch("/api/users", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },


        body: JSON.stringify({

          username: username,

          fullname: fullname,

          password: password,

          role: role,

          status: status,

        }),


      });




      if (!response.ok) {

        throw new Error("Failed to add user");

      }




      alert("User Added Successfully");


      router.push("/settings/users");



    }

    catch (error) {


      console.log(error);

      alert("Failed to add user");


    }

    finally {


      setLoading(false);


    }


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







          {/* Full Name */}


          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Full Name

            </label>


            <input

              type="text"

              placeholder="Enter Full Name"

              value={fullname}

              onChange={(e)=>setFullname(e.target.value)}

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


              <option value="Admin">
                Admin
              </option>


              <option value="Manager">
                Manager
              </option>


              <option value="HR">
                HR
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

              value={status ? "true" : "false"}

              onChange={(e)=>setStatus(e.target.value === "true")}

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


              <option value="true">
                Active
              </option>


              <option value="false">
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


            {loading ? "Saving..." : "Save User"}
          </button>
        </div>
      </div>
    </div>

  );

}