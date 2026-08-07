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

  useEffect(() => {

    loadRole();

  }, []);

  const loadRole = async () => {

    try {

      setLoading(true);

      const response = await fetch(`/api/roles?id=${roleId}`);

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

    }

    catch (error) {

      console.log(error);

      alert("Failed to load role");

    }

    finally {

      setLoading(false);

    }

  };

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

    }

    catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

    finally {

      setSaving(false);

    }

  };

  if (loading) {

    return (

      <div className="p-6 text-center bg-theme text-theme min-h-screen">

        Loading...

      </div>

    );

  }

  return (

    <div className="space-y-6 bg-theme text-theme min-h-screen">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-theme">

            Edit Role

          </h1>

          <p className="text-muted mt-2">

            Update role information

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

      {/* Form */}

      <div className="card-theme border-theme rounded-xl shadow p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Role Name */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">

              Role Name

            </label>

            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2
              "
            />

          </div>


          {/* Status */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">

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

            <label className="block text-sm font-semibold text-theme mb-2">

              Description

            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

        </div>

        {/* Update Button */}

        <div className="flex justify-end mt-8">

          <button
            onClick={handleUpdate}
            disabled={saving}
            className="
            bg-blue-600
            hover:bg-blue-700
            disabled:bg-gray-400
            text-white
            px-6
            py-2
            rounded-lg
            "
          >

            {saving ? "Updating..." : "Update Role"}

          </button>

        </div>

      </div>

    </div>

  );

}