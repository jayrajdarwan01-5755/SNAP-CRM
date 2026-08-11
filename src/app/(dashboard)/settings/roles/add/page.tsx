"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddRolePage() {
  const router = useRouter();

  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!roleName.trim()) {
      alert("Role Name is required");
      return;
    }

    if (roleName.trim().length < 3) {
      alert("Role Name must be at least 3 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/roles", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          RoleName: roleName,
          Description: description,
          Status: status,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to save role");
        return;
      }

      alert(result.message);
      router.push("/settings/roles");

      alert("Role Added Successfully");

      router.push("/settings/roles");
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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

          <h1 className="text-2xl sm:text-3xl font-bold text-theme">
            Add Role
          </h1>

          <p className="text-muted mt-2">
            Create new user role
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
          transition
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
        p-4
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

          {/* ================= ROLE NAME ================= */}

          <div>

            <label
              className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
              "
            >
              Role Name
            </label>

            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Enter Role Name"
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
              focus:ring-2
              focus:ring-blue-500
              "
            />

          </div>


          {/* ================= STATUS ================= */}

          <div>

            <label
              className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
              "
            >
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              focus:ring-2
              focus:ring-blue-500
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


          {/* ================= DESCRIPTION ================= */}

          <div className="md:col-span-2">

            <label
              className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
              "
            >
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
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
              resize-none
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

          </div>

        </div>


        {/* ================= SAVE BUTTON ================= */}

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
            className="
            w-full
            sm:w-auto
            bg-gray-600
            hover:bg-gray-700
            text-white
            px-6
            py-2
            rounded-lg
            transition
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
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
            transition
            "
          >
            {loading ? "Saving..." : "Save Role"}
          </button>

        </div>

      </div>

    </div>
  );
}