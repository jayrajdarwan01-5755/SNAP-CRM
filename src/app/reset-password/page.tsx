"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordForm() {
const router = useRouter();
const searchParams = useSearchParams();

const [token, setToken] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [error, setError] = useState("");

useEffect(() => {
const resetToken = searchParams.get("token");

if (!resetToken) {
  setError("Invalid or missing password reset token.");
  return;
}

setToken(resetToken);


}, [searchParams]);

const handleResetPassword = async (
e: React.FormEvent<HTMLFormElement>
) => {
e.preventDefault();


setMessage("");
setError("");

// Token Validation
if (!token) {
  setError("Invalid or missing password reset token.");
  return;
}

// Password Validation
if (!password || !confirmPassword) {
  setError(
    "Please enter new password and confirm password."
  );
  return;
}

if (password.length < 6) {
  setError("Password must be at least 6 characters.");
  return;
}

if (password !== confirmPassword) {
  setError("Password does not match.");
  return;
}

try {
  setLoading(true);

  const response = await fetch("/api/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      password,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    setError(
      result.message || "Failed to reset password."
    );
    return;
  }

  // Success
  setMessage(
    "Password reset successfully. Redirecting to login..."
  );

  setPassword("");
  setConfirmPassword("");

  setTimeout(() => {
    router.push("/login");
  }, 2000);
} catch (error) {
  console.log(error);

  setError(
    "Something went wrong. Please try again."
  );
} finally {
  setLoading(false);
}


};

return ( <div className="min-h-screen flex bg-theme text-theme">
{/* LEFT SECTION */} <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10"> <div className="w-full max-w-[520px]">


      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-theme leading-snug">
          Reset Password
        </h1>

        <p className="mt-3 text-muted text-sm sm:text-base">
          Create a new password for your SNAP CRM account.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleResetPassword}
        className="space-y-5"
      >
        {/* New Password */}
        <div>
          <label className="block text-sm font-semibold text-theme mb-2">
            New Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter new password"
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

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-semibold text-theme mb-2">
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            placeholder="Confirm new password"
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

        {/* Password Information */}
        <div className="text-sm text-muted">
          Password must be at least 6 characters long.
        </div>

        {/* Error */}
        {error && (
          <div className="
            text-sm
            text-red-500
            border
            border-red-300
            dark:border-red-700
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

        {/* Reset Button */}
        <button
          type="submit"
          disabled={loading || !token}
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
            ? "Resetting..."
            : "Reset Password"}
        </button>
      </form>

      {/* Back to Login */}
      <div className="text-center mt-6">
        <button
          type="button"
          onClick={() => router.push("/login")}
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

  {/* RIGHT SECTION */}
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
        Secure Password Reset
      </h2>

      <p className="
        mt-4
        text-gray-600
        dark:text-gray-300
        max-w-md
      ">
        Create a new secure password and continue
        managing your business with SNAP CRM.
      </p>
    </div>
  </div>
</div>


);
}

export default function ResetPasswordPage() {
return (
<Suspense
fallback={ <div className="min-h-screen flex items-center justify-center bg-theme text-theme"> <p className="text-muted">
Loading... </p> </div>
}
> <ResetPasswordForm /> </Suspense>
);
}
