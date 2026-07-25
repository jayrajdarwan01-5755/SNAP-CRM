"use client";

import { useRouter } from "next/navigation";

export default function ViewUserPage() {

  const router = useRouter();


  const user = {

    UserId: 1,
    Username: "admin",
    Role: "Administrator",
    Status: "Active",

  };


  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex justify-between items-center">


        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            User Details
          </h1>

          <p className="text-gray-600 mt-2">
            View user information
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




      {/* User Information */}


      <div className="bg-white border rounded-xl shadow p-6">


        <h2 className="text-xl font-semibold text-gray-900 mb-6">

          User Information

        </h2>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          {/* Username */}

          <div>

            <p className="text-sm text-gray-500">
              Username
            </p>

            <p className="font-semibold text-gray-900">
              {user.Username}
            </p>

          </div>



          {/* Role */}

          <div>

            <p className="text-sm text-gray-500">
              Role
            </p>

            <p className="font-semibold text-gray-900">
              {user.Role}
            </p>

          </div>



          {/* Status */}

          <div>

            <p className="text-sm text-gray-500">
              Status
            </p>

            <p
              className={
                user.Status === "Active"
                  ? "font-semibold text-green-600"
                  : "font-semibold text-red-600"
              }
            >

              {user.Status}

            </p>

          </div>
                  </div>


      </div>


    </div>


  );

}