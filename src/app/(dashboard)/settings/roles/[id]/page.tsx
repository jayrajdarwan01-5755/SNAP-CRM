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

      const response = await fetch("/api/roles");

      const data: Role[] = await response.json();

      const selectedRole = data.find(

        (item) => item.RoleId === roleId

      );

      if (!selectedRole) {

        alert("Role not found");

        router.push("/settings/roles");

        return;

      }

      setRole(selectedRole);

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

      <div className="p-6 text-center">

        Loading...

      </div>

    );

  }

  if (!role) {

    return null;

  }

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">

            Role Details

          </h1>

          <p className="text-gray-600 mt-2">

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

      <div className="bg-white border rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold text-gray-900 mb-6">

          Role Information

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Role Name */}

          <div>

            <p className="text-sm text-gray-500">

              Role Name

            </p>

            <p className="font-semibold text-gray-900">

              {role.RoleName}

            </p>

          </div>

          {/* Description */}

          <div>

            <p className="text-sm text-gray-500">

              Description

            </p>

            <p className="font-semibold text-gray-900">

              {role.Description}

            </p>

          </div>

          {/* Status */}

          <div>

            <p className="text-sm text-gray-500">

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