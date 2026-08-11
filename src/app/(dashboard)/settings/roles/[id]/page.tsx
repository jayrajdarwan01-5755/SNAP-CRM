"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Role } from "@/types/role";

export default function ViewRolePage() {
  const router = useRouter();
  const params = useParams();

  const roleId = Number(params.id);

  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRole();
  }, []);

  // ======================================
  // LOAD ROLE
  // ======================================

  const loadRole = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/roles?id=${roleId}`);

      if (!response.ok) {
        alert("Role not found");
        router.push("/settings/roles");
        return;
      }

      const data: Role = await response.json();

      setRole(data);
    } catch (error) {
      console.log(error);

      alert("Failed to load role");
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <div className="space-y-6">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-theme">
            Role Details
          </h1>

          <p className="text-muted mt-2">
            View role information
          </p>
        </div>

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
          <div className="text-center py-10 text-muted">
            Loading role...
          </div>
        </div>

      </div>
    );
  }

  // ======================================
  // ROLE NOT FOUND
  // ======================================

  if (!role) {
    return (
      <div className="space-y-6">

        <div className="
          card-theme
          border
          border-theme
          rounded-xl
          shadow
          p-6
        ">
          <div className="text-center py-10 text-muted">
            Role not found
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

          <h1 className="
            text-2xl
            sm:text-3xl
            font-bold
            text-theme
          ">
            Role Details
          </h1>

          <p className="text-muted mt-2">
            View role information
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
          ROLE INFORMATION CARD
      ====================================== */}

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

        <div className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
          mb-6
        ">

          <div>

            <h2 className="
              text-xl
              font-semibold
              text-theme
            ">
              Role Information
            </h2>

            <p className="text-sm text-muted mt-1">
              Details of the selected user role
            </p>

          </div>

          {/* Status */}

          <span
            className={`
              inline-flex
              items-center
              w-fit
              px-3
              py-1
              rounded-full
              text-sm
              font-medium
              ${
                role.Status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            {role.Status}
          </span>

        </div>


        {/* ======================================
            ROLE DETAILS
        ====================================== */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        ">

          {/* Role Name */}

          <div
            className="
              border
              border-theme
              rounded-lg
              p-4
            "
          >

            <p className="
              text-sm
              text-muted
              mb-2
            ">
              Role Name
            </p>

            <p className="
              font-semibold
              text-theme
              text-lg
            ">
              {role.RoleName}
            </p>

          </div>


          {/* Status */}

          <div
            className="
              border
              border-theme
              rounded-lg
              p-4
            "
          >

            <p className="
              text-sm
              text-muted
              mb-2
            ">
              Status
            </p>

            <p
              className={`
                font-semibold
                text-lg
                ${
                  role.Status === "Active"
                    ? "text-green-600"
                    : "text-red-600"
                }
              `}
            >
              {role.Status}
            </p>

          </div>


          {/* Description */}

          <div
            className="
              border
              border-theme
              rounded-lg
              p-4
              md:col-span-2
            "
          >

            <p className="
              text-sm
              text-muted
              mb-2
            ">
              Description
            </p>

            <p className="
              font-medium
              text-theme
              leading-relaxed
            ">
              {role.Description || "No description available"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}