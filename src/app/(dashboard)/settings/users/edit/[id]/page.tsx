"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { User } from "@/types/user";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/users?id=${params.id}`
      );

      const data: User = await response.json();

      setUsername(data.username);
      setFullname(data.fullname);
      setRole(data.role);
      setStatus(data.status);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!username.trim()) {
      alert("Username is required");
      return;
    }

    if (!fullname.trim()) {
      alert("Full name is required");
      return;
    }

    if (!role) {
      alert("Role is required");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("/api/users", {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userid: Number(params.id),
          username,
          fullname,
          role,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      alert("User Updated Successfully");

      router.push("/settings/users");
    } catch (error) {
      console.log(error);
      alert("Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 bg-theme text-theme min-h-screen">

        <div
          className="
          card-theme
          border
          border-theme
          rounded-xl
          shadow
          p-6
          "
        >
          <p className="text-muted">
            Loading user...
          </p>
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}

      <div
        className="
        flex
        flex-col
        sm:flex-row
        sm:justify-between
        sm:items-center
        gap-4
        "
      >

        <div>

          <h1 className="text-3xl font-bold text-theme">
            Edit User
          </h1>

          <p className="text-muted mt-2">
            Update user information
          </p>

        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="
          w-full
          sm:w-auto
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


      {/* ================= FORM CARD ================= */}

      <div
        className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        p-5
        sm:p-6
        "
      >

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
          sm:gap-6
          "
        >

          {/* ================= USERNAME ================= */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              placeholder:text-muted
              rounded-lg
              px-4
              py-2
              focus:outline-none
              "
            />

          </div>


          {/* ================= FULL NAME ================= */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={fullname}
              onChange={(e) =>
                setFullname(e.target.value)
              }
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              placeholder:text-muted
              rounded-lg
              px-4
              py-2
              focus:outline-none
              "
            />

          </div>


          {/* ================= ROLE ================= */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              Role
            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2
              focus:outline-none
              "
            >

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


          {/* ================= STATUS ================= */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              Status
            </label>

            <select
              value={status ? "true" : "false"}
              onChange={(e) =>
                setStatus(
                  e.target.value === "true"
                )
              }
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2
              focus:outline-none
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

        </div>


        {/* ================= ACTION BUTTON ================= */}

        <div
          className="
          flex
          flex-col-reverse
          sm:flex-row
          sm:justify-end
          gap-3
          mt-8
          "
        >

          <button
            type="button"
            onClick={() => router.back()}
            disabled={saving}
            className="
            w-full
            sm:w-auto
            bg-gray-600
            hover:bg-gray-700
            disabled:bg-gray-400
            text-white
            px-6
            py-2
            rounded-lg
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpdate}
            disabled={saving}
            className="
            w-full
            sm:w-auto
            bg-blue-600
            hover:bg-blue-700
            disabled:bg-gray-400
            text-white
            px-6
            py-2
            rounded-lg
            "
          >
            {saving
              ? "Updating..."
              : "Update User"}
          </button>

        </div>

      </div>

    </div>
  );
}