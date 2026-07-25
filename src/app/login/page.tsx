"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();

  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  // Temporary Login
  router.push("/dashboard");
};

  return (

    <div className="min-h-screen flex">

      {/* Left Section */}
      <div className="w-1/2 flex items-center justify-center bg-white">


        <div className="w-[520px]">


          <h1 className="text-3xl font-bold text-gray-900 leading-snug mb-14">

            Smart CRM Platform
            <br />
            Manage Your Business Effortlessly.

          </h1>
          <form 
          onSubmit={handleLogin}
          className="space-y-5">

            {/* Username */}

            <div>

              <label className="block text-sm font-semibold text-gray-800 mb-2">
                User Name
              </label>
              <input

              value={username}
              onChange={(e)=>setUsername(e.target.value)}

              placeholder="Enter username"

              className="
              w-full
              h-12
              border
              rounded-md
              px-4
              text-gray-800
              placeholder-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "

              />

            </div>

            {/* Password */}

            <div>
              <div className="flex justify-between mb-2">

                <label className="text-sm font-semibold text-gray-800">
                  Password
                </label>


                <a className="text-sm text-blue-600 cursor-pointer">
                  Forgot password?
                </a>

              </div>
              <input

              type="password"

              value={password}
              onChange={(e)=>setPassword(e.target.value)}

              placeholder="Enter password"

              className="
              w-full
              h-12
              border
              rounded-md
              px-4
              text-gray-800
              placeholder-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "

              />

            </div>

            {/* Login Button */}

            <button

            className="
            w-full
            h-12
            bg-blue-700
            text-white
            rounded-md
            font-semibold
            hover:bg-blue-800
            "

            >

              Login

            </button>
          </form>

          <div className="text-center mt-5 text-sm text-gray-500">

            First time here?

            <span className="text-blue-600 cursor-pointer ml-1">
              Create account
            </span>

          </div>
        </div>
      </div>

      {/* Right Gradient Section */}

      <div

      className="
      w-1/2
      bg-gradient-to-br
      from-blue-50
      via-white
      to-purple-100
      "
      >
      </div>
   </div>

  );
}