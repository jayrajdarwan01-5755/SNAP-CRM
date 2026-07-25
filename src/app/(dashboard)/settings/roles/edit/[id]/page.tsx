"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditRolePage() {

  const router = useRouter();


  const [roleName, setRoleName] = useState(
    "Administrator"
  );


  const [description, setDescription] = useState(
    "Full system access"
  );


  const [status, setStatus] = useState(
    "Active"
  );



  const handleUpdate = () => {

    alert("Role Updated Successfully");

    router.push("/settings/roles");

  };



  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex justify-between items-center">


        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Edit Role
          </h1>


          <p className="text-gray-600 mt-2">
            Update role information
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



          {/* Role Name */}


          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Role Name

            </label>


            <input

              type="text"

              value={roleName}

              onChange={(e)=>setRoleName(e.target.value)}

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
                    {/* Description */}

          <div className="md:col-span-2">


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Description

            </label>


            <textarea

              rows={4}

              value={description}

              onChange={(e)=>setDescription(e.target.value)}

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





        {/* Update Button */}


        <div className="flex justify-end mt-8">


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

            Update Role

          </button>


        </div>



      </div>



    </div>


  );


}