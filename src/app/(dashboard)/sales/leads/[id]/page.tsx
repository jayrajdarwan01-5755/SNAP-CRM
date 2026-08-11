"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

type Lead = {
  LeadId: number;
  LeadName: string;
  Company: string;
  Phone: string;
  Email: string;
  Address: string;
  LeadSource: string;
  Status: string;
};

export default function ViewLeadPage() {
  const router = useRouter();

  const params = useParams();

  const { themeSettings } = useTheme();

  const id = Number(params.id);

  const [lead, setLead] = useState<Lead | null>(null);

  useEffect(() => {
    const loadLead = async () => {
      try {
        const response = await fetch("/api/leads");

        const data: Lead[] = await response.json();

        const foundLead = data.find(
          (item) => item.LeadId === id
        );

        setLead(foundLead || null);
      } catch (error) {
        console.log(error);
      }
    };

    loadLead();
  }, [id]);

  if (!lead) {
    return (
      <div className="flex items-center justify-center min-h-[300px] px-4">
        <p className="text-lg font-medium text-muted">
          Loading Lead...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">

      {/* Header */}

      <div
        className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
        "
      >

        <div className="min-w-0">

          <h1
            className="
            text-2xl
            sm:text-3xl
            font-bold
            text-theme
            break-words
            "
          >
            Lead Details
          </h1>

          <p className="text-muted mt-2 text-sm sm:text-base">
            View lead information
          </p>

        </div>


        <button
          onClick={() => router.back()}
          className="
          w-full
          sm:w-auto
          bg-gray-600
          hover:bg-gray-700
          text-white
          px-5
          py-2.5
          rounded-lg
          transition
          "
        >
          Back
        </button>

      </div>


      {/* Lead Information Card */}

      <div
        className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        p-4
        sm:p-6
        lg:p-8
        "
      >

        <h2
          className="
          text-lg
          sm:text-xl
          font-semibold
          text-theme
          mb-6
          "
        >
          Lead Information
        </h2>


        {/* Information Grid */}

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-x-6
          lg:gap-x-10
          gap-y-6
          "
        >

          {/* Lead Name */}

          <div className="min-w-0">

            <p className="text-sm text-muted mb-1">
              Lead Name
            </p>

            <p
              className="
              font-semibold
              text-theme
              break-words
              "
            >
              {lead.LeadName}
            </p>

          </div>


          {/* Company */}

          <div className="min-w-0">

            <p className="text-sm text-muted mb-1">
              Company
            </p>

            <p
              className="
              font-semibold
              text-theme
              break-words
              "
            >
              {lead.Company}
            </p>

          </div>


          {/* Phone */}

          <div className="min-w-0">

            <p className="text-sm text-muted mb-1">
              Phone
            </p>

            <p
              className="
              font-semibold
              text-theme
              break-words
              "
            >
              {lead.Phone}
            </p>

          </div>


          {/* Email */}

          <div className="min-w-0">

            <p className="text-sm text-muted mb-1">
              Email
            </p>

            <p
              className="
              font-semibold
              text-theme
              break-all
              "
            >
              {lead.Email}
            </p>

          </div>


          {/* Address */}

          <div
            className="
            min-w-0
            sm:col-span-2
            "
          >

            <p className="text-sm text-muted mb-1">
              Address
            </p>

            <p
              className="
              font-semibold
              text-theme
              break-words
              leading-relaxed
              "
            >
              {lead.Address}
            </p>

          </div>


          {/* Lead Source */}

          <div className="min-w-0">

            <p className="text-sm text-muted mb-1">
              Lead Source
            </p>

            <p
              className="
              font-semibold
              text-theme
              break-words
              "
            >
              {lead.LeadSource}
            </p>

          </div>


          {/* Status */}

          <div className="min-w-0">

            <p className="text-sm text-muted mb-2">
              Status
            </p>

            <span
              className={
                lead.Status === "New"
                  ? `
                    inline-flex
                    items-center
                    bg-blue-100
                    text-blue-700
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-medium
                    `
                  : lead.Status === "Contacted"
                  ? `
                    inline-flex
                    items-center
                    bg-yellow-100
                    text-yellow-700
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-medium
                    `
                  : lead.Status === "Qualified"
                  ? `
                    inline-flex
                    items-center
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-medium
                    `
                  : `
                    inline-flex
                    items-center
                    bg-red-100
                    text-red-700
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-medium
                    `
              }
            >
              {lead.Status}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}