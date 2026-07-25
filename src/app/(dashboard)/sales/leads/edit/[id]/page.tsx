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

  useEffect(() => {

    const loadLead = async () => {

      const response = await fetch("/api/leads");

      const data: Lead[] = await response.json();

      const lead = data.find(
        (item) =>
          item.LeadId === leadId
      );

      if (lead) {

        setLeadName(lead.LeadName);
        setCompany(lead.Company);
        setPhone(lead.Phone);
        setEmail(lead.Email);
        setAddress(lead.Address);
        setLeadSource(lead.LeadSource);
        setStatus(lead.Status);

      }

    };

    loadLead();

  }, [leadId]);

  const handleUpdate = async () => {

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

    alert("Lead Updated Successfully");

    router.push("/sales/leads");

  };

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Edit Lead
          </h1>

          <p className="text-gray-600 mt-2">
            Update lead information
          </p>

        </div>

        <button
          onClick={() => router.back()}
          className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
        >
          Back
        </button>

      </div>

      {/* Form */}

      <div className="bg-white border rounded-xl shadow p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Lead Name */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Lead Name
            </label>

            <input
              type="text"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

          </div>

          {/* Company */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Company
            </label>

            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

          </div>

          {/* Phone */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Phone
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

          </div>

          {/* Email */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

          </div>

          {/* Address */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Address
            </label>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

          </div>

          {/* Lead Source */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Lead Source
            </label>

            <select
              value={leadSource}
              onChange={(e) => setLeadSource(e.target.value)}
              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "
            >
              <option value="Website">Website</option>
              <option value="Facebook">Facebook</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Referral">Referral</option>
            </select>

          </div>

          {/* Status */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>

          </div>

        </div>

        {/* Update Button */}

        <div className="mt-8 flex justify-end">

          <button
            onClick={handleUpdate}
            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-2
            rounded-lg
            "
          >
            Update Lead
          </button>

        </div>

      </div>

    </div>

  );

}