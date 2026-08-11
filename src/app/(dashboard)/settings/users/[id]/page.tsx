"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { User } from "@/types/user";

export default function ViewUserPage() {
  const router = useRouter();
  const params = useParams();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

      setUser(data);
    } catch (error) {
      console.log(error);
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

          <h1 className="text-3xl font-bold text-theme">
            User Details
          </h1>

          <p className="text-muted mt-2">
            View user information
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


      {/* ================= DETAILS CARD ================= */}

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

        {loading ? (

          /* ================= LOADING ================= */

          <div className="text-center py-10 text-muted">
            Loading user...
          </div>

        ) : !user ? (

          /* ================= NOT FOUND ================= */

          <div className="text-center py-10 text-muted">
            User not found
          </div>

        ) : (

          /* ================= USER DETAILS ================= */

          <>

            <div className="mb-6">

              <h2 className="text-xl font-semibold text-theme">
                User Information
              </h2>

              <p className="text-sm text-muted mt-1">
                User account details
              </p>

            </div>


            {/* ================= DESKTOP / TABLET ================= */}

            <div
              className="
              hidden
              md:grid
              md:grid-cols-2
              gap-6
              "
            >

              {/* Username */}

              <div
                className="
                border
                border-theme
                rounded-lg
                p-4
                "
              >

                <p className="text-sm text-muted mb-1">
                  Username
                </p>

                <p className="font-semibold text-theme">
                  {user.username}
                </p>

              </div>


              {/* Full Name */}

              <div
                className="
                border
                border-theme
                rounded-lg
                p-4
                "
              >

                <p className="text-sm text-muted mb-1">
                  Full Name
                </p>

                <p className="font-semibold text-theme">
                  {user.fullname}
                </p>

              </div>


              {/* Role */}

              <div
                className="
                border
                border-theme
                rounded-lg
                p-4
                "
              >

                <p className="text-sm text-muted mb-1">
                  Role
                </p>

                <p className="font-semibold text-theme">
                  {user.role}
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

                <p className="text-sm text-muted mb-1">
                  Status
                </p>

                <p className="font-semibold text-theme">
                  {user.status
                    ? "Active"
                    : "Inactive"}
                </p>

              </div>

            </div>


            {/* ================= MOBILE ================= */}

            <div className="md:hidden space-y-4">

              {/* Username */}

              <div
                className="
                border
                border-theme
                rounded-lg
                p-4
                "
              >

                <p className="text-sm text-muted">
                  Username
                </p>

                <p className="font-semibold text-theme mt-1">
                  {user.username}
                </p>

              </div>


              {/* Full Name */}

              <div
                className="
                border
                border-theme
                rounded-lg
                p-4
                "
              >

                <p className="text-sm text-muted">
                  Full Name
                </p>

                <p className="font-semibold text-theme mt-1">
                  {user.fullname}
                </p>

              </div>


              {/* Role */}

              <div
                className="
                border
                border-theme
                rounded-lg
                p-4
                "
              >

                <p className="text-sm text-muted">
                  Role
                </p>

                <p className="font-semibold text-theme mt-1">
                  {user.role}
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

                <p className="text-sm text-muted">
                  Status
                </p>

                <p className="font-semibold text-theme mt-1">
                  {user.status
                    ? "Active"
                    : "Inactive"}
                </p>

              </div>

            </div>


            {/* ================= ACTION ================= */}

            <div
              className="
              flex
              flex-col
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
                "
              >
                Back
              </button>

            </div>

          </>

        )}

      </div>

    </div>
  );
}
