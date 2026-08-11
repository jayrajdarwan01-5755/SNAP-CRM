"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Customer } from "@/types/customer";
import { useTheme } from "@/context/ThemeContext";

export default function ViewCustomerPage() {
  const router = useRouter();
  const params = useParams();

  const { themeSettings } = useTheme();

  const isDark = themeSettings.theme === "dark";

  const id = Number(params.id);

  const [customer, setCustomer] =
    useState<Customer | null>(null);

  // =========================
  // LOAD CUSTOMER
  // =========================

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const response = await fetch(
          `/api/customers?id=${id}`
        );

        if (!response.ok) {
          throw new Error("Customer not found");
        }

        const data: Customer =
          await response.json();

        setCustomer(data);
      } catch (error) {
        console.log(error);

        setCustomer(null);
      }
    };

    if (id) {
      loadCustomer();
    }
  }, [id]);

  // =========================
  // LOADING
  // =========================

  if (!customer) {
    return (
      <div
        className="text-center py-10"
        style={{
          backgroundColor:
            themeSettings.backgroundColor,

          color: themeSettings.textColor,
        }}
      >
        Loading Customer...
      </div>
    );
  }

  return (
    <div
      className="
        w-full
        min-w-0
        space-y-5
        sm:space-y-6
        min-h-screen
      "
      style={{
        backgroundColor:
          themeSettings.backgroundColor,

        color: themeSettings.textColor,
      }}
    >

      {/* =========================
          HEADER
      ========================= */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        "
      >

        <div className="min-w-0">

          <h1
            className="
              text-2xl
              sm:text-3xl
              font-bold
            "
            style={{
              color: themeSettings.textColor,
            }}
          >
            Customer Details
          </h1>

          <p
            className="
              mt-1
              sm:mt-2
              text-sm
              sm:text-base
            "
            style={{
              color: isDark
                ? "#9CA3AF"
                : "#6B7280",
            }}
          >
            View customer information
          </p>

        </div>


        {/* Back Button */}

        <button
          type="button"
          onClick={() => router.back()}
          className="
            text-white
            px-4
            sm:px-5
            py-2.5
            rounded-lg
            transition
            w-full
            sm:w-auto
          "
          style={{
            backgroundColor:
              themeSettings.sidebarColor,
          }}
        >
          Back
        </button>

      </div>


      {/* =========================
          CUSTOMER INFORMATION
      ========================= */}

      <div
        className="
          rounded-xl
          shadow
          border
          p-4
          sm:p-6
        "
        style={{
          backgroundColor:
            themeSettings.backgroundColor,

          borderColor: isDark
            ? "#374151"
            : "#D1D5DB",
        }}
      >

        <h2
          className="
            text-xl
            font-semibold
            mb-6
          "
          style={{
            color: themeSettings.textColor,
          }}
        >
          Customer Information
        </h2>


        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
            sm:gap-6
          "
        >

          {/* Customer Code */}

          <div>

            <p
              className="text-sm mb-1"
              style={{
                color: isDark
                  ? "#9CA3AF"
                  : "#6B7280",
              }}
            >
              Customer Code
            </p>

            <p
              className="font-semibold break-words"
              style={{
                color: themeSettings.textColor,
              }}
            >
              {customer.CustomerCode}
            </p>

          </div>


          {/* Customer Name */}

          <div>

            <p
              className="text-sm mb-1"
              style={{
                color: isDark
                  ? "#9CA3AF"
                  : "#6B7280",
              }}
            >
              Customer Name
            </p>

            <p
              className="
                font-semibold
                break-words
              "
              style={{
                color: themeSettings.textColor,
              }}
            >
              {customer.CustomerName}
            </p>

          </div>


          {/* Phone */}

          <div>

            <p
              className="text-sm mb-1"
              style={{
                color: isDark
                  ? "#9CA3AF"
                  : "#6B7280",
              }}
            >
              Phone
            </p>

            <p
              className="font-semibold break-words"
              style={{
                color: themeSettings.textColor,
              }}
            >
              {customer.Phone}
            </p>

          </div>


          {/* Email */}

          <div>

            <p
              className="text-sm mb-1"
              style={{
                color: isDark
                  ? "#9CA3AF"
                  : "#6B7280",
              }}
            >
              Email
            </p>

            <p
              className="
                font-semibold
                break-words
              "
              style={{
                color: themeSettings.textColor,
              }}
            >
              {customer.Email}
            </p>

          </div>


          {/* Address */}

          <div>

            <p
              className="text-sm mb-1"
              style={{
                color: isDark
                  ? "#9CA3AF"
                  : "#6B7280",
              }}
            >
              Address
            </p>

            <p
              className="
                font-semibold
                break-words
              "
              style={{
                color: themeSettings.textColor,
              }}
            >
              {customer.Address}
            </p>

          </div>


          {/* City */}

          <div>

            <p
              className="text-sm mb-1"
              style={{
                color: isDark
                  ? "#9CA3AF"
                  : "#6B7280",
              }}
            >
              City
            </p>

            <p
              className="font-semibold break-words"
              style={{
                color: themeSettings.textColor,
              }}
            >
              {customer.City}
            </p>

          </div>


          {/* State */}

          <div>

            <p
              className="text-sm mb-1"
              style={{
                color: isDark
                  ? "#9CA3AF"
                  : "#6B7280",
              }}
            >
              State
            </p>

            <p
              className="font-semibold break-words"
              style={{
                color: themeSettings.textColor,
              }}
            >
              {customer.State}
            </p>

          </div>


          {/* Country */}

          <div>

            <p
              className="text-sm mb-1"
              style={{
                color: isDark
                  ? "#9CA3AF"
                  : "#6B7280",
              }}
            >
              Country
            </p>

            <p
              className="font-semibold break-words"
              style={{
                color: themeSettings.textColor,
              }}
            >
              {customer.Country}
            </p>

          </div>


          {/* Status */}

          <div>

            <p
              className="text-sm mb-2"
              style={{
                color: isDark
                  ? "#9CA3AF"
                  : "#6B7280",
              }}
            >
              Status
            </p>

            <span
              className="
                inline-flex
                items-center
                px-3
                py-1
                rounded-full
                text-sm
                font-medium
                whitespace-nowrap
              "
              style={{
                backgroundColor:
                  customer.Status === "Active"
                    ? "#DCFCE7"
                    : "#FEE2E2",

                color:
                  customer.Status === "Active"
                    ? "#15803D"
                    : "#DC2626",
              }}
            >
              {customer.Status}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}