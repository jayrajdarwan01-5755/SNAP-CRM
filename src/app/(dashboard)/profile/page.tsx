"use client";

import { useRouter } from "next/navigation";
import { User, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
const router = useRouter();
const { user } = useAuth();

if (!user) {
return ( <div className="flex items-center justify-center min-h-[400px]"> <p className="text-muted">
User information not available. </p> </div>
);
}

return ( <div className="max-w-3xl mx-auto space-y-6">
{/* Header */} <div className="flex items-center gap-3">
<button
type="button"
onClick={() => router.back()}
className="h-10 w-10 rounded-lg border border-theme flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition"
aria-label="Go back"
> <ArrowLeft size={20} /> </button>


    <div>
      <h1 className="text-3xl font-bold text-theme">
        My Profile
      </h1>

      <p className="mt-1 text-muted">
        View your account information
      </p>
    </div>
  </div>

  {/* Profile Card */}
  <div className="card-theme border border-theme rounded-xl p-6 shadow-sm">
    {/* Avatar */}
    <div className="flex items-center gap-5 pb-6 border-b border-theme">
      <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
        {user.fullname?.charAt(0).toUpperCase() || "U"}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-theme">
          {user.fullname || "User"}
        </h2>

        <p className="text-muted">
          {user.role || "User"}
        </p>
      </div>
    </div>

    {/* Information */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
      <div>
        <p className="text-sm text-muted">
          Full Name
        </p>

        <p className="mt-1 font-medium text-theme">
          {user.fullname || "-"}
        </p>
      </div>

      <div>
        <p className="text-sm text-muted">
          Username
        </p>

        <p className="mt-1 font-medium text-theme">
          {user.username || "-"}
        </p>
      </div>

      <div>
        <p className="text-sm text-muted">
          Role
        </p>

        <p className="mt-1 font-medium text-theme">
          {user.role || "-"}
        </p>
      </div>

      <div>
        <p className="text-sm text-muted">
          Employee ID
        </p>

        <p className="mt-1 font-medium text-theme">
          {user.employeeid ?? "-"}
        </p>
      </div>

      <div>
        <p className="text-sm text-muted">
          Account Status
        </p>

        <p
          className={`mt-1 font-medium ${
            user.status
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {user.status ? "Active" : "Inactive"}
        </p>
      </div>
    </div>

    {/* Change Password */}
    <div className="mt-8 pt-6 border-t border-theme">
      <button
        type="button"
        onClick={() => router.push("/change-password")}
        className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Change Password
      </button>
    </div>
  </div>
</div>

);
}
