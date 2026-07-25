"use client";

import { useRouter } from "next/navigation";

export default function ViewRolePage() {

  const router = useRouter();

  const role = {
    RoleId: 1,
    RoleName: "Administrator",
    Description: "Full system access",
    Status: "Active",
  };


  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Role Details
          </h1>

          <p className="text-gray-600 mt-2">
            View role information
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




      {/* Role Information */}

      <div className="bg-white border rounded-xl shadow p-6">


        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Role Information
        </h2>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          <div>

            <p className="text-sm text-gray-500">
              Role Name
            </p>

            <p className="font-semibold text-gray-900">
              {role.RoleName}
            </p>

          </div>



          <div>

            <p className="text-sm text-gray-500">
              Description
            </p>

            <p className="font-semibold text-gray-900">
              {role.Description}
            </p>

          </div>



          <div>

            <p className="text-sm text-gray-500">
              Status
            </p>

            <p
              className={
                role.Status === "Active"
                  ? "font-semibold text-green-600"
                  : "font-semibold text-red-600"
              }
            >
              {role.Status}
            </p>

          </div>


        </div>


      </div>


    </div>

  );

}