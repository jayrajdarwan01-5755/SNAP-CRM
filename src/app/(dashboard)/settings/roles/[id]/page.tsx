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

    }

    catch (error) {

      console.log(error);

      alert("Failed to load role");

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="p-6 text-center bg-theme text-theme min-h-screen">

        Loading...

      </div>

    );

  }

  if (!role) {

    return null;

  }

  return (

    <div className="space-y-6 bg-theme text-theme min-h-screen">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-theme">

            Role Details

          </h1>

          <p className="text-muted mt-2">

            View role information

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

      {/* Role Information */}

      <div className="card-theme border-theme rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold text-theme mb-6">

          Role Information

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Role Name */}

          <div>

            <p className="text-sm text-muted">

              Role Name

            </p>

            <p className="font-semibold text-theme">

              {role.RoleName}

            </p>

          </div>

          {/* Description */}

          <div>

            <p className="text-sm text-muted">

              Description

            </p>

            <p className="font-semibold text-theme">

              {role.Description}

            </p>

          </div>

          {/* Status */}

          <div>

            <p className="text-sm text-muted">

              Status

            </p>

            <p
              className={
                role.Status === "Active"
                  ? "font-semibold text-green-600"
                  : "font-semibold text-red-600"
              }
            >

              {role.Status}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}