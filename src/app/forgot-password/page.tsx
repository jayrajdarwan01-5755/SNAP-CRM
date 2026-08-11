"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {

  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setMessage("");
    setError("");

    if (!identifier.trim()) {

      setError("Please enter email or username");

      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "/api/forgot-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            identifier: identifier.trim()
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {

        setError(
          result.message ||
          "Failed to send reset link"
        );

        return;
      }

      setMessage(
        result.message ||
        "If the account exists, a reset link has been sent to the registered email."
      );

    }
    catch (error) {

      console.log(error);

      setError(
        "Something went wrong. Please try again."
      );

    }
    finally {

      setLoading(false);

    }

  };

  return (

    <div className="
      min-h-screen
      flex
      bg-theme
      text-theme
    ">

      {/* ================= LEFT SECTION ================= */}

      <div className="
        w-full
        lg:w-1/2
        flex
        items-center
        justify-center
        px-6
        py-10
      ">

        <div className="
          w-full
          max-w-[520px]
        ">

          {/* Heading */}

          <div className="mb-8">

            <h1 className="
              text-3xl
              sm:text-4xl
              font-bold
              text-theme
              leading-snug
            ">

              Forgot Password?

            </h1>

            <p className="
              mt-3
              text-muted
              text-sm
              sm:text-base
            ">

              Enter your registered email or username
              and we will send you a password reset link.

            </p>

          </div>


          {/* ================= FORM ================= */}

          <form
            onSubmit={handleForgotPassword}
            className="space-y-5"
          >

            {/* Email / Username */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              ">

                Email or Username

              </label>

              <input

                type="text"

                value={identifier}

                onChange={(e) =>
                  setIdentifier(e.target.value)
                }

                placeholder="Enter email or username"

                className="
                  w-full
                  h-12
                  border
                  border-theme
                  bg-theme
                  text-theme
                  placeholder:text-muted
                  rounded-md
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "

              />

            </div>


            {/* Error */}

            {error && (

              <div className="
                text-sm
                text-red-500
                border
                border-red-300
                rounded-md
                px-4
                py-3
              ">

                {error}

              </div>

            )}


            {/* Success */}

            {message && (

              <div className="
                text-sm
                text-green-600
                dark:text-green-400
                border
                border-green-300
                dark:border-green-700
                rounded-md
                px-4
                py-3
              ">

                {message}

              </div>

            )}


            {/* Send Reset Link */}

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
                ? "Sending..."
                : "Send Reset Link"
              }

            </button>

          </form>


          {/* Back to Login */}

          <div className="
            text-center
            mt-6
          ">

            <button

              type="button"

              onClick={() =>
                router.push("/login")
              }

              className="
                text-blue-600
                hover:text-blue-700
                font-semibold
                text-sm
                cursor-pointer
              "

            >

              ← Back to Login

            </button>

          </div>

        </div>

      </div>


      {/* ================= RIGHT SECTION ================= */}

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

        <div className="
          text-center
          px-10
        ">

          <h2 className="
            text-4xl
            font-bold
            text-gray-800
            dark:text-white
          ">

            Reset Your Password

          </h2>

          <p className="
            mt-4
            text-gray-600
            dark:text-gray-300
            max-w-md
          ">

            Securely reset your SNAP CRM password
            using the reset link sent to your
            registered email address.

          </p>

        </div>

      </div>

    </div>

  );

}