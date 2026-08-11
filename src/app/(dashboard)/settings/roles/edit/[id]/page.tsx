"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Role } from "@/types/role";

export default function EditRolePage() {
  const router = useRouter();
  const params = useParams();

  const roleId = Number(params.id);

  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ======================================
  // LOAD ROLE
  // ======================================

  useEffect(() => {
    loadRole();
  }, []);

  const loadRole = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/roles?id=${roleId}`
      );

      if (!response.ok) {
        alert("Role not found");
        router.push("/settings/roles");
        return;
      }

      const role: Role = await response.json();

      if (!role) {
        alert("Role not found");
        router.push("/settings/roles");
        return;
      }

      setRoleName(role.RoleName);
      setDescription(role.Description);
      setStatus(role.Status);
    } catch (error) {
      console.log(error);
      alert("Failed to load role");
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // UPDATE ROLE
  // ======================================

  const handleUpdate = async () => {
    if (!roleName.trim()) {
      alert("Role Name is required");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "/api/roles",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            RoleId: roleId,
            RoleName: roleName,
            Description: description,
            Status: status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      alert("Role Updated Successfully");

      router.push("/settings/roles");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <div className="space-y-6 bg-theme text-theme min-h-screen">

        <div className="
          card-theme
          border
          border-theme
          rounded-xl
          shadow
          p-6
        ">

          <div className="
            text-center
            py-10
            text-muted
          ">
            Loading role...
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="
        flex
        flex-col
        sm:flex-row
        sm:justify-between
        sm:items-center
        gap-4
      ">

        <div>

          <h1 className="
            text-2xl
            sm:text-3xl
            font-bold
            text-theme
          ">
            Edit Role
          </h1>

          <p className="text-muted mt-2">
            Update role information
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
          ← Back
        </button>

      </div>

      {/* ======================================
          FORM CARD
      ====================================== */}

      <div className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        p-4
        sm:p-6
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        ">

          {/* Role Name */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Role Name
            </label>

            <input
              type="text"
              value={roleName}
              onChange={(e) =>
                setRoleName(e.target.value)
              }
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

          {/* Status */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
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

          {/* Description */}

          <div className="md:col-span-2">

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
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

        {/* ======================================
            UPDATE BUTTON
        ====================================== */}

        <div className="
          flex
          flex-col-reverse
          sm:flex-row
          sm:justify-end
          gap-3
          mt-8
        ">

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
              transition
            "
          >
            {saving ? "Updating..." : "Update Role"}
          </button>

        </div>

      </div>

    </div>
  );
}