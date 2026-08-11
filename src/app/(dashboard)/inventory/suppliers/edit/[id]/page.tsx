"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Supplier } from "@/types/supplier";

export default function EditSupplierPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [supplier, setSupplier] = useState<Supplier | null>(null);

  const [supplierName, setSupplierName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    loadSupplier();
  }, []);

  const loadSupplier = async () => {
    try {
      const response = await fetch("/api/suppliers");

      const data: Supplier[] = await response.json();

      const foundSupplier = data.find(
        (item) => item.SupplierId === id
      );

      if (foundSupplier) {
        setSupplier(foundSupplier);

        setSupplierName(foundSupplier.SupplierName);
        setEmail(foundSupplier.Email);
        setPhone(foundSupplier.Phone);
        setAddress(foundSupplier.Address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch("/api/suppliers", {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          SupplierId: id,
          SupplierName: supplierName,
          Email: email,
          Phone: phone,
          Address: address,
        }),
      });

      if (response.ok) {
        alert("Supplier Updated Successfully");

        router.push("/inventory/suppliers");
      } else {
        alert("Failed to update supplier");
      }
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  if (!supplier) {
    return (
      <div className="text-muted">
        Loading Supplier...
      </div>
    );
  }

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
            Edit Supplier
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
            Update supplier information
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
              value={supplierName}
              onChange={(e) =>
                setSupplierName(e.target.value)
              }
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
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
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
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
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
              rows={4}
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
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
            pt-6
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
            "
          >
            Update Supplier
          </button>

        </div>

      </div>

    </div>
  );
}