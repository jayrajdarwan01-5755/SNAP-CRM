"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Lead } from "@/types/lead";

export default function EditLeadPage() {
  const router = useRouter();
  const params = useParams();

  const leadId = Number(params.id);

  const [leadName, setLeadName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadLead = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/leads");

        if (!response.ok) {
          alert("Failed to load lead.");
          router.push("/sales/leads");
          return;
        }

        const data: Lead[] = await response.json();

        const lead = data.find(
          (item) => item.LeadId === leadId
        );

        if (!lead) {
          alert("Lead not found.");
          router.push("/sales/leads");
          return;
        }

        setLeadName(lead.LeadName ?? "");
        setCompany(lead.Company ?? "");
        setPhone(lead.Phone ?? "");
        setEmail(lead.Email ?? "");
        setAddress(lead.Address ?? "");
        setLeadSource(lead.LeadSource ?? "");
        setStatus(lead.Status ?? "");
      } catch (error) {
        console.log(error);
        alert("Something went wrong.");
        router.push("/sales/leads");
      } finally {
        setLoading(false);
      }
    };

    loadLead();
  }, [leadId, router]);

  const handleUpdate = async () => {
    if (
      !leadName ||
      !company ||
      !phone ||
      !email ||
      !address ||
      !leadSource ||
      !status
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("/api/leads", {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          LeadId: leadId,
          LeadName: leadName,
          Company: company,
          Phone: phone,
          Email: email,
          Address: address,
          LeadSource: leadSource,
          Status: status,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert("Failed to update lead.");
        return;
      }

      alert("Lead Updated Successfully");

      router.push("/sales/leads");
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-lg font-medium text-muted">
          Loading lead...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-theme">
            Edit Lead
          </h1>

          <p className="text-muted mt-2">
            Update lead information
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

      {/* Form */}

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {/* Lead Name */}

          <div className="w-full">
            <label className="block text-sm font-semibold text-theme mb-2">
              Lead Name
            </label>

            <input
              type="text"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              placeholder="Enter Lead Name"
              className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2.5
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                transition
              "
            />
          </div>

          {/* Company */}

          <div className="w-full">
            <label className="block text-sm font-semibold text-theme mb-2">
              Company
            </label>

            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Enter Company"
              className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2.5
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                transition
              "
            />
          </div>

          {/* Phone */}

          <div className="w-full">
            <label className="block text-sm font-semibold text-theme mb-2">
              Phone
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone"
              className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2.5
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                transition
              "
            />
          </div>

          {/* Email */}

          <div className="w-full">
            <label className="block text-sm font-semibold text-theme mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2.5
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                transition
              "
            />
          </div>

          {/* Address */}

          <div className="w-full">
            <label className="block text-sm font-semibold text-theme mb-2">
              Address
            </label>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
              rows={4}
              className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2.5
                resize-y
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                transition
              "
            />
          </div>

          {/* Lead Source */}

          <div className="w-full">
            <label className="block text-sm font-semibold text-theme mb-2">
              Lead Source
            </label>

            <select
              value={leadSource}
              onChange={(e) => setLeadSource(e.target.value)}
              className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2.5
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                transition
              "
            >
              <option value="Website">
                Website
              </option>

              <option value="Facebook">
                Facebook
              </option>

              <option value="LinkedIn">
                LinkedIn
              </option>

              <option value="Referral">
                Referral
              </option>
            </select>
          </div>

          {/* Status */}

          <div className="w-full">
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
                py-2.5
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                transition
              "
            >
              <option value="New">
                New
              </option>

              <option value="Contacted">
                Contacted
              </option>

              <option value="Qualified">
                Qualified
              </option>

              <option value="Lost">
                Lost
              </option>
            </select>
          </div>
        </div>

        {/* Buttons */}

        <div
          className="
            mt-8
            flex
            flex-col-reverse
            sm:flex-row
            sm:justify-end
            gap-3
          "
        >
          <button
            type="button"
            onClick={() => router.push("/sales/leads")}
            disabled={saving}
            className="
              w-full
              sm:w-auto
              bg-gray-600
              hover:bg-gray-700
              disabled:opacity-50
              text-white
              px-6
              py-2.5
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
              disabled:bg-blue-400
              text-white
              px-6
              py-2.5
              rounded-lg
              transition
            "
          >
            {saving ? "Updating..." : "Update Lead"}
          </button>
        </div>
      </div>
    </div>
  );
}