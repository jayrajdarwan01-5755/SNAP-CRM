"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSupplierPage() {
  const router = useRouter();

  const [supplier, setSupplier] = useState({
    supplierName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSupplier({
      ...supplier,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !supplier.supplierName ||
      !supplier.email ||
      !supplier.phone ||
      !supplier.address
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const response = await fetch("/api/suppliers", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          SupplierName: supplier.supplierName,
          Email: supplier.email,
          Phone: supplier.phone,
          Address: supplier.address,
        }),
      });

      if (response.ok) {
        alert("Supplier Added Successfully");

        router.push("/inventory/suppliers");
      } else {
        alert("Failed to add supplier");
      }
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  return (
    <div className="w-full min-w-0 space-y-5 sm:space-y-6">

      {/* Header */}

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
              text-theme
            "
          >
            Add Supplier
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
            Create new supplier
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
            w-full
            sm:w-auto
            whitespace-nowrap
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
          shadow-sm
          p-4
          sm:p-6
        "
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
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

            {/* Supplier Name */}

            <div>

              <label
                className="
                  block
                  text-sm
                  font-semibold
                  text-theme
                  mb-2
                "
              >
                Supplier Name
              </label>

              <input
                type="text"
                name="supplierName"
                value={supplier.supplierName}
                onChange={handleChange}
                placeholder="Enter Supplier Name"
                className="
                  input-theme
                  w-full
                "
              />

            </div>


            {/* Email */}

            <div>

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
                name="email"
                value={supplier.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="
                  input-theme
                  w-full
                "
              />

            </div>


            {/* Phone */}

            <div>

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
                name="phone"
                value={supplier.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="
                  input-theme
                  w-full
                "
              />

            </div>


            {/* Address */}

            <div>

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
                name="address"
                value={supplier.address}
                onChange={handleChange}
                placeholder="Enter Address"
                rows={4}
                className="
                  input-theme
                  w-full
                  resize-none
                "
              />

            </div>

          </div>


          {/* Buttons */}

          <div
            className="
              flex
              flex-col-reverse
              sm:flex-row
              sm:justify-end
              gap-3
              pt-3
            "
          >

            <button
              type="button"
              onClick={() => router.back()}
              className="
                bg-gray-600
                hover:bg-gray-700
                text-white
                px-6
                py-2.5
                rounded-lg
                transition
                w-full
                sm:w-auto
              "
            >
              Cancel
            </button>

            <button
              type="submit"
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
              "
            >
              Save Supplier
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}