"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  const id = Number(params.id);

  const [lead, setLead] = useState<Lead | null>(null);

  useEffect(() => {
    const loadLead = async () => {
      const response = await fetch("/api/leads");

      const data: Lead[] = await response.json();

      const foundLead = data.find(
        (item) => item.LeadId === id
      );

      setLead(foundLead || null);
    };

    loadLead();
  }, [id]);

  if (!lead) {
    return (
      <div className="text-theme">
        Loading Lead...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-theme">
            Lead Details
          </h1>

          <p className="text-muted mt-2">
            View lead information
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

      {/* Lead Information */}

      <div className="card-theme border border-theme rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-theme mb-6">
          Lead Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lead Name */}

          <div>
            <p className="text-sm text-muted">
              Lead Name
            </p>

            <p className="font-semibold text-theme">
              {lead.LeadName}
            </p>
          </div>

          {/* Company */}

          <div>
            <p className="text-sm text-muted">
              Company
            </p>

            <p className="font-semibold text-theme">
              {lead.Company}
            </p>
          </div>

          {/* Phone */}

          <div>
            <p className="text-sm text-muted">
              Phone
            </p>

            <p className="font-semibold text-theme">
              {lead.Phone}
            </p>
          </div>

          {/* Email */}

          <div>
            <p className="text-sm text-muted">
              Email
            </p>

            <p className="font-semibold text-theme">
              {lead.Email}
            </p>
          </div>

          {/* Address */}

          <div>
            <p className="text-sm text-muted">
              Address
            </p>

            <p className="font-semibold text-theme">
              {lead.Address}
            </p>
          </div>

          {/* Lead Source */}

          <div>
            <p className="text-sm text-muted">
              Lead Source
            </p>

            <p className="font-semibold text-theme">
              {lead.LeadSource}
            </p>
          </div>

          {/* Status */}

          <div>
            <p className="text-sm text-muted mb-2">
              Status
            </p>

            <span
              className={
                lead.Status === "New"
                  ? "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  : lead.Status === "Contacted"
                  ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                  : lead.Status === "Qualified"
                  ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                  : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
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