"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Customer } from "@/types/customer";

export default function EditCustomerPage() {
  const router = useRouter();
  const params = useParams();

  const customerId = Number(params.id);

  const [customerCode, setCustomerCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");

  // =========================
  // LOAD CUSTOMER
  // =========================

  useEffect(() => {
    const loadCustomer = async () => {
      const response = await fetch("/api/customers");

      const data: Customer[] = await response.json();

      const customer = data.find(
        (item) => item.CustomerId === customerId
      );

      if (customer) {
        setCustomerCode(customer.CustomerCode);
        setCustomerName(customer.CustomerName);
        setPhone(customer.Phone);
        setEmail(customer.Email);
        setAddress(customer.Address);
        setCity(customer.City);
        setState(customer.State);
        setCountry(customer.Country);
        setStatus(customer.Status);
      }
    };

    loadCustomer();
  }, [customerId]);

  // =========================
  // UPDATE CUSTOMER
  // =========================

  const handleUpdate = async () => {
    const response = await fetch("/api/customers", {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        CustomerId: customerId,
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

    console.log(data);

    alert("Customer Updated Successfully");

    router.push("/sales/customers");
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
            Edit Customer
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
            Update customer information
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
              type="text"
              value={customerCode}
              onChange={(e) =>
                setCustomerCode(e.target.value)
              }
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
              type="text"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
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
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
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
              onChange={(e) =>
                setEmail(e.target.value)
              }
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
              onChange={(e) =>
                setAddress(e.target.value)
              }
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
              type="text"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
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
              type="text"
              value={state}
              onChange={(e) =>
                setState(e.target.value)
              }
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
              type="text"
              value={country}
              onChange={(e) =>
                setCountry(e.target.value)
              }
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
              onChange={(e) =>
                setStatus(e.target.value)
              }
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
          {/* Cancel */}

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

          {/* Update */}

          <button
            type="button"
            onClick={handleUpdate}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-2.5
              rounded-lg
              transition
              w-full
              sm:w-auto
              whitespace-nowrap
            "
          >
            Update Customer
          </button>
        </div>
      </div>
    </div>
  );
}