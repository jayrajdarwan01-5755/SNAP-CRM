"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Supplier } from "@/types/supplier";

export default function ViewSupplierPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [supplier, setSupplier] =
    useState<Supplier | null>(null);

  useEffect(() => {
    loadSupplier();
  }, []);

  const loadSupplier = async () => {
    const response = await fetch("/api/suppliers");

    const data: Supplier[] = await response.json();

    const foundSupplier = data.find(
      (item) => item.SupplierId === id
    );

    setSupplier(foundSupplier || null);
  };

  if (!supplier) {
    return (
      <div className="text-theme">
        Loading Supplier...
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6 min-w-0">

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
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-theme">
            Supplier Details
          </h1>

          <p className="text-muted mt-1 sm:mt-2 text-sm sm:text-base">
            View supplier information
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="
            button-secondary
            px-5
            py-2.5
            rounded-lg
            w-full
            sm:w-auto
          "
        >
          Back
        </button>
      </div>

      {/* Supplier Information */}

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
        <h2 className="text-xl font-semibold text-theme mb-6">
          Supplier Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

          {/* Supplier Name */}

          <div>
            <p className="text-sm text-muted mb-1">
              Supplier Name
            </p>

            <p className="font-semibold text-theme break-words">
              {supplier.SupplierName}
            </p>
          </div>

          {/* Email */}

          <div>
            <p className="text-sm text-muted mb-1">
              Email
            </p>

            <p className="font-semibold text-theme break-words">
              {supplier.Email}
            </p>
          </div>

          {/* Phone */}

          <div>
            <p className="text-sm text-muted mb-1">
              Phone
            </p>

            <p className="font-semibold text-theme">
              {supplier.Phone}
            </p>
          </div>

          {/* Address */}

          <div>
            <p className="text-sm text-muted mb-1">
              Address
            </p>

            <p className="font-semibold text-theme break-words whitespace-pre-line">
              {supplier.Address}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}