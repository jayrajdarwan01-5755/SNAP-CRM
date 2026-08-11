"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddLeadPage() {
  const router = useRouter();

  const [leadName, setLeadName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [leadSource, setLeadSource] = useState("Website");
  const [status, setStatus] = useState("New");

  const handleSave = async () => {
    const newLead = {
      LeadName: leadName,
      Company: company,
      Phone: phone,
      Email: email,
      Address: address,
      LeadSource: leadSource,
      Status: status,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newLead),
      });

      if (response.ok) {
        alert("Lead Added Successfully");

        router.push("/sales/leads");
      } else {
        alert("Failed to add lead");
      }
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">

        <div>
          <h1 className="
            text-2xl
            sm:text-3xl
            font-bold
            text-theme
          ">
            Add Lead
          </h1>

          <p className="text-muted mt-2">
            Create new sales lead
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


      {/* Form */}

      <div className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        p-4
        sm:p-6
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
          sm:gap-6
        ">

          {/* Lead Name */}

          <div>
            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Lead Name
            </label>

            <input
              type="text"
              value={leadName}
              onChange={(e) =>
                setLeadName(e.target.value)
              }
              placeholder="Enter Lead Name"
              className="
                w-full
                bg-theme
                text-theme
                border
                border-theme
                rounded-lg
                px-4
                py-2
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>


          {/* Company */}

          <div>
            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Company
            </label>

            <input
              type="text"
              value={company}
              onChange={(e) =>
                setCompany(e.target.value)
              }
              placeholder="Enter Company"
              className="
                w-full
                bg-theme
                text-theme
                border
                border-theme
                rounded-lg
                px-4
                py-2
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>


          {/* Phone */}

          <div>
            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Phone
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="Enter Phone"
              className="
                w-full
                bg-theme
                text-theme
                border
                border-theme
                rounded-lg
                px-4
                py-2
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>


          {/* Email */}

          <div>
            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter Email"
              className="
                w-full
                bg-theme
                text-theme
                border
                border-theme
                rounded-lg
                px-4
                py-2
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>


          {/* Address */}

          <div>
            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Address
            </label>

            <textarea
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              placeholder="Enter Address"
              rows={4}
              className="
                w-full
                bg-theme
                text-theme
                border
                border-theme
                rounded-lg
                px-4
                py-2
                outline-none
                resize-y
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>


          {/* Lead Source */}

          <div>
            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Lead Source
            </label>

            <select
              value={leadSource}
              onChange={(e) =>
                setLeadSource(e.target.value)
              }
              className="
                w-full
                bg-theme
                text-theme
                border
                border-theme
                rounded-lg
                px-4
                py-2
                outline-none
                focus:ring-2
                focus:ring-blue-500
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

          <div>
            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="
                w-full
                bg-theme
                text-theme
                border
                border-theme
                rounded-lg
                px-4
                py-2
                outline-none
                focus:ring-2
                focus:ring-blue-500
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

        <div className="
          mt-8
          flex
          flex-col-reverse
          sm:flex-row
          sm:justify-end
          gap-3
        ">

          <button
            type="button"
            onClick={() =>
              router.push("/sales/leads")
            }
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
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="
              w-full
              sm:w-auto
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-2
              rounded-lg
            "
          >
            Save Lead
          </button>

        </div>

      </div>

    </div>
  );
}