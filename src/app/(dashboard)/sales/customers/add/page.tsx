"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCustomerPage() {
  const router = useRouter();

  const [customerCode, setCustomerCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [status, setStatus] = useState("Active");

  const [loading, setLoading] = useState(false);

  // =========================
  // SAVE CUSTOMER
  // =========================

  const handleSave = async () => {
    if (!customerCode || !customerName) {
      alert("Customer Code and Customer Name are required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/customers", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          CustomerCode: customerCode,
          CustomerName: customerName,
          Phone: phone,
          Email: email,
          Address: address,
          City: city,
          State: state,
          Country: country,
          Status: status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add customer");
        return;
      }

      alert("Customer Added Successfully");

      router.push("/sales/customers");
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        w-full
        min-w-0
        space-y-5
        sm:space-y-6
      "
    >
      {/* =========================
          HEADER
      ========================= */}

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
            Add Customer
          </h1>

          <p
            className="
              text-muted
              mt-1
              sm:mt-2
              text-sm
              sm:text-base
            "
          >
            Create new customer record
          </p>
        </div>

        {/* Back Button */}

        <button
          type="button"
          onClick={() => router.back()}
          className="
            bg-gray-600
            hover:bg-gray-700
            text-white
            px-5
            py-2.5
            rounded-lg
            transition
            text-center
            w-full
            sm:w-auto
            whitespace-nowrap
          "
        >
          Back
        </button>
      </div>

      {/* =========================
          CUSTOMER FORM
      ========================= */}

      <div
        className="
          card-theme
          border
          border-theme
          rounded-xl
          shadow-sm
          p-4
          sm:p-6
        "
      >
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

          <div className="min-w-0">
            <label
              className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              "
            >
              Customer Code
            </label>

            <input
              value={customerCode}
              onChange={(e) => setCustomerCode(e.target.value)}
              placeholder="Enter Customer Code"
              className="
                input-theme
                w-full
                min-w-0
              "
            />
          </div>

          {/* Customer Name */}

          <div className="min-w-0">
            <label
              className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              "
            >
              Customer Name
            </label>

            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter Customer Name"
              className="
                input-theme
                w-full
                min-w-0
              "
            />
          </div>

          {/* Phone */}

          <div className="min-w-0">
            <label
              className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              "
            >
              Phone
            </label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone"
              className="
                input-theme
                w-full
                min-w-0
              "
            />
          </div>

          {/* Email */}

          <div className="min-w-0">
            <label
              className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              "
            >
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="
                input-theme
                w-full
                min-w-0
              "
            />
          </div>

          {/* Address */}

          <div className="min-w-0">
            <label
              className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              "
            >
              Address
            </label>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
              rows={4}
              className="
                input-theme
                w-full
                min-w-0
                resize-y
              "
            />
          </div>

          {/* City */}

          <div className="min-w-0">
            <label
              className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              "
            >
              City
            </label>

            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City"
              className="
                input-theme
                w-full
                min-w-0
              "
            />
          </div>

          {/* State */}

          <div className="min-w-0">
            <label
              className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              "
            >
              State
            </label>

            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter State"
              className="
                input-theme
                w-full
                min-w-0
              "
            />
          </div>

          {/* Country */}

          <div className="min-w-0">
            <label
              className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              "
            >
              Country
            </label>

            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter Country"
              className="
                input-theme
                w-full
                min-w-0
              "
            />
          </div>

          {/* Status */}

          <div className="min-w-0">
            <label
              className="
                block
                text-sm
                font-semibold
                text-theme
                mb-2
              "
            >
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="
                input-theme
                w-full
                min-w-0
              "
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>
        </div>

        {/* =========================
            FORM ACTIONS
        ========================= */}

        <div
          className="
            mt-6
            sm:mt-8
            flex
            flex-col-reverse
            sm:flex-row
            sm:justify-end
            gap-3
          "
        >
          <button
            type="button"
            onClick={() => router.back()}
            className="
              button-secondary
              w-full
              sm:w-auto
              px-6
              py-2.5
              rounded-lg
              whitespace-nowrap
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="
              bg-blue-600
              hover:bg-blue-700
              disabled:bg-gray-400
              text-white
              px-6
              py-2.5
              rounded-lg
              transition
              w-full
              sm:w-auto
              whitespace-nowrap
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Saving..."
              : "Save Customer"}
          </button>
        </div>
      </div>
    </div>
  );
}