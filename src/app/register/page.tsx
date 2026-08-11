"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {

    e.preventDefault();

    if (
      !fullname ||
      !username ||
      !email ||
      !role ||
      !password ||
      !confirmPassword
    ) {

      alert("Please fill all fields");

      return;
    }

    if (password !== confirmPassword) {

      alert("Password does not match");

      return;
    }

    try {

      setLoading(true);

      const response = await fetch("/api/register", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          fullname,
          username,
          email,
          password,
          role

        })

      });

      const result = await response.json();

      if (!response.ok) {

        alert(result.message);

        return;
      }

      alert("Account created successfully");

      router.push("/login");

    }
    catch (error) {

      console.log(error);

      alert("Registration failed");

    }
    finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex bg-theme text-theme">

      {/* Left Section */}

      <div className="
        w-full
        lg:w-1/2
        flex
        items-center
        justify-center
        px-6
        py-10
      ">

        <div className="w-full max-w-[520px]">

          <h1 className="
            text-3xl
            font-bold
            text-theme
            leading-snug
            mb-10
          ">

            Smart CRM Platform

            <br />

            Manage Your Business Effortlessly.

          </h1>

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            {/* Full Name */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              ">

                Full Name

              </label>

              <input

                type="text"

                value={fullname}

                onChange={(e) =>
                  setFullname(e.target.value)
                }

                placeholder="Enter full name"

                className="
                  w-full
                  h-12
                  border
                  border-theme
                  rounded-md
                  px-4
                  bg-theme
                  text-theme
                  placeholder:text-muted
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "

              />

            </div>

            {/* Username */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              ">

                User Name

              </label>

              <input

                type="text"

                value={username}

                onChange={(e) =>
                  setUsername(e.target.value)
                }

                placeholder="Enter username"

                className="
                  w-full
                  h-12
                  border
                  border-theme
                  rounded-md
                  px-4
                  bg-theme
                  text-theme
                  placeholder:text-muted
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "

              />

            </div>

            {/* Email */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              ">

                Email

              </label>

              <input

                type="email"

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }

                placeholder="Enter email address"

                className="
                  w-full
                  h-12
                  border
                  border-theme
                  rounded-md
                  px-4
                  bg-theme
                  text-theme
                  placeholder:text-muted
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "

              />

            </div>

            {/* Role */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              ">

                Role

              </label>

              <select

                value={role}

                onChange={(e) =>
                  setRole(e.target.value)
                }

                className="
                  w-full
                  h-12
                  border
                  border-theme
                  rounded-md
                  px-4
                  bg-theme
                  text-theme
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
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

            {/* Password */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              ">

                Password

              </label>

              <input

                type="password"

                value={password}

                onChange={(e) =>
                  setPassword(e.target.value)
                }

                placeholder="Enter password"

                className="
                  w-full
                  h-12
                  border
                  border-theme
                  rounded-md
                  px-4
                  bg-theme
                  text-theme
                  placeholder:text-muted
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "

              />

            </div>

            {/* Confirm Password */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              ">

                Confirm Password

              </label>

              <input

                type="password"

                value={confirmPassword}

                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }

                placeholder="Confirm password"

                className="
                  w-full
                  h-12
                  border
                  border-theme
                  rounded-md
                  px-4
                  bg-theme
                  text-theme
                  placeholder:text-muted
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "

              />

            </div>

            {/* Create Account */}

            <button

              type="submit"

              disabled={loading}

              className="
                w-full
                h-12
                bg-blue-600
                hover:bg-blue-700
                text-white
                rounded-md
                font-semibold
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "

            >

              {loading
                ? "Creating..."
                : "Create Account"}

            </button>

          </form>

          <div className="
            text-center
            mt-5
            text-sm
            text-muted
          ">

            Already have an account?

            <button

              type="button"

              onClick={() =>
                router.push("/login")
              }

              className="
                text-blue-600
                hover:text-blue-700
                cursor-pointer
                ml-1
                font-semibold
              "

            >

              Login

            </button>

          </div>

        </div>

      </div>

      {/* Right Gradient Section */}

      <div className="
        hidden
        lg:flex
        w-1/2
        items-center
        justify-center
        bg-gradient-to-br
        from-blue-50
        via-white
        to-purple-100
        dark:from-gray-900
        dark:via-gray-900
        dark:to-purple-950
      ">

        <div className="text-center px-10">

          <h2 className="
            text-4xl
            font-bold
            text-gray-800
            dark:text-white
          ">

            Welcome to SNAP CRM

          </h2>

          <p className="
            mt-4
            text-gray-600
            dark:text-gray-300
            max-w-md
          ">

            Manage your customers, sales,
            employees and business operations
            from one powerful platform.

          </p>

        </div>

      </div>

    </div>

  );

}