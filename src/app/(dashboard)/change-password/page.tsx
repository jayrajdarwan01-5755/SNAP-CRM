"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ChangePasswordPage() {
const router = useRouter();
const { user } = useAuth();

const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [message, setMessage] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
event.preventDefault();


setMessage("");
setError("");

if (!user?.userid) {
  setError("User information not found. Please login again.");
  return;
}

if (!currentPassword || !newPassword || !confirmPassword) {
  setError("Please fill all fields.");
  return;
}

if (newPassword.length < 6) {
  setError("New password must be at least 6 characters long.");
  return;
}

if (newPassword !== confirmPassword) {
  setError("New password and confirm password do not match.");
  return;
}

if (currentPassword === newPassword) {
  setError(
    "New password must be different from current password."
  );
  return;
}

try {
  setLoading(true);

  const response = await fetch("/api/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userid: user.userid,
      currentPassword,
      newPassword,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    setError(data.message || "Failed to change password.");
    return;
  }

  setMessage(data.message || "Password changed successfully.");

  setCurrentPassword("");
  setNewPassword("");
  setConfirmPassword("");

  setTimeout(() => {
    router.push("/profile");
  }, 1500);
} catch (error) {
  console.error(error);
  setError("Something went wrong. Please try again.");
} finally {
  setLoading(false);
}

};

return ( <div className="max-w-2xl mx-auto space-y-6">
{/* Header */} <div className="flex items-center gap-3">
<button
type="button"
onClick={() => router.back()}
className="h-10 w-10 rounded-lg border border-theme flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition"
aria-label="Go back"
> <ArrowLeft size={20} /> </button>

    <div>
      <h1 className="text-3xl font-bold text-theme">
        Change Password
      </h1>

      <p className="mt-1 text-muted">
        Update your account password
      </p>
    </div>
  </div>

  {/* Card */}
  <div className="card-theme border border-theme rounded-xl p-6 shadow-sm">
    <div className="flex items-center gap-3 mb-6">
      <div className="h-11 w-11 rounded-lg bg-blue-100 flex items-center justify-center">
        <KeyRound
          size={22}
          className="text-blue-600"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-theme">
          Password Security
        </h2>

        <p className="text-sm text-muted">
          Enter your current password and choose a new one.
        </p>
      </div>
    </div>

    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Current Password */}
      <div>
        <label className="block text-sm font-medium text-theme mb-2">
          Current Password
        </label>

        <input
          type="password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(e.target.value)
          }
          className="input-theme w-full"
          placeholder="Enter current password"
          autoComplete="current-password"
        />
      </div>

      {/* New Password */}
      <div>
        <label className="block text-sm font-medium text-theme mb-2">
          New Password
        </label>

        <input
          type="password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
          className="input-theme w-full"
          placeholder="Enter new password"
          autoComplete="new-password"
        />

        <p className="mt-1 text-xs text-muted">
          Minimum 6 characters.
        </p>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-theme mb-2">
          Confirm New Password
        </label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          className="input-theme w-full"
          placeholder="Confirm new password"
          autoComplete="new-password"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Success */}
      {message && (
        <div className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700">
          {message}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 rounded-lg border border-theme text-theme hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </div>
    </form>
  </div>
</div>

);
}
