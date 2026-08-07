"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CompanyInformationPage() {

  const [company, setCompany] = useState({
    CompanyName: "",
    Email: "",
    Phone: "",
    Website: "",
    Address: "",
    City: "",
    State: "",
    Country: "",
  });

  useEffect(() => {
    loadCompany();
  }, []);

  const loadCompany = async () => {
    try {
      const response = await fetch("/api/company");
      const data = await response.json();

      setCompany(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });

  };

  const handleSave = async () => {

    const response = await fetch("/api/company", {

      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(company),

    });

    if (response.ok) {

      alert("Company Information Saved Successfully");

    } else {

      alert("Failed to save company information");

    }

  };

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-theme">
            Company Information
          </h1>

          <p className="text-muted mt-2">
            Manage company details
          </p>

        </div>

        <Link
          href="/settings"
          className="
          bg-gray-600
          hover:bg-gray-700
          text-white
          px-5
          py-2
          rounded-lg
          "
        >
          ← Back
        </Link>

      </div>

      {/* Form */}

      <div className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        p-6
      ">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Company Name */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              Company Name
            </label>

            <input
              type="text"
              name="CompanyName"
              value={company.CompanyName}
              onChange={handleChange}
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          {/* Logo */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              Company Logo
            </label>

            <input
              type="file"
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          {/* Email */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              Email
            </label>

            <input
              type="email"
              name="Email"
              value={company.Email}
              onChange={handleChange}
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          {/* Phone */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              Phone
            </label>

            <input
              type="text"
              name="Phone"
              value={company.Phone}
              onChange={handleChange}
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          {/* Website */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              Website
            </label>

            <input
              type="text"
              name="Website"
              value={company.Website}
              onChange={handleChange}
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          {/* Address */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              Address
            </label>

            <input
              type="text"
              name="Address"
              value={company.Address}
              onChange={handleChange}
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          {/* City */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              City
            </label>

            <input
              type="text"
              name="City"
              value={company.City}
              onChange={handleChange}
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          {/* State */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              State
            </label>

            <input
              type="text"
              name="State"
              value={company.State}
              onChange={handleChange}
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          {/* Country */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">
              Country
            </label>

            <input
              type="text"
              name="Country"
              value={company.Country}
              onChange={handleChange}
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

        </div>

        {/* Save Button */}

        <div className="flex justify-end mt-8">

          <button
            onClick={handleSave}
            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-2
            rounded-lg
            "
          >
            Save Information
          </button>

        </div>

      </div>

    </div>

  );

}