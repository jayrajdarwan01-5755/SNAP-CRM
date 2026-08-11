"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Supplier } from "@/types/supplier";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const suppliersPerPage = 5;

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/suppliers");

      const data: Supplier[] = await response.json();

      setSuppliers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (SupplierId: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch("/api/suppliers", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        SupplierId,
      }),
    });

    if (response.ok) {
      setSuppliers((prev) =>
        prev.filter(
          (supplier) => supplier.SupplierId !== SupplierId
        )
      );
    }
  };

  const handleClearFilter = () => {
    setSearchText("");
    setCurrentPage(1);
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.SupplierName.toLowerCase().includes(
      searchText.toLowerCase()
    ) ||
    supplier.Email.toLowerCase().includes(
      searchText.toLowerCase()
    ) ||
    supplier.Phone.toLowerCase().includes(
      searchText.toLowerCase()
    )
  );

  const totalPages = Math.ceil(
    filteredSuppliers.length / suppliersPerPage
  );

  const lastSupplierIndex =
    currentPage * suppliersPerPage;

  const firstSupplierIndex =
    lastSupplierIndex - suppliersPerPage;

  const currentSuppliers =
    filteredSuppliers.slice(
      firstSupplierIndex,
      lastSupplierIndex
    );

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

        <div>
          <h1 className="text-3xl font-bold text-theme">
            Supplier Management
          </h1>

          <p className="text-muted mt-2">
            Manage suppliers
          </p>
        </div>

        <Link
          href="/inventory/suppliers/add"
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-2
          rounded-lg
          text-center
          transition
          "
        >
          + Add Supplier
        </Link>

      </div>


      {/* Search & Filters */}

      <div
        className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        p-6
        "
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search Supplier"
            className="
            w-full
            border
            border-theme
            bg-theme
            text-theme
            placeholder:text-muted
            rounded-lg
            px-4
            py-2
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />

          <button
            type="button"
            className="
            bg-green-600
            hover:bg-green-700
            text-white
            rounded-lg
            px-4
            py-2
            transition
            "
          >
            Search
          </button>

          <button
            type="button"
            onClick={handleClearFilter}
            className="
            bg-gray-600
            hover:bg-gray-700
            text-white
            rounded-lg
            px-4
            py-2
            transition
            "
          >
            Clear
          </button>

        </div>

      </div>


      {/* Data Card */}

      <div
        className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        overflow-hidden
        "
      >

        {/* Desktop / Tablet Table */}

        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-theme">

              <tr className="text-theme">

                <th className="px-4 py-3 text-left">
                  Supplier Name
                </th>

                <th className="px-4 py-3 text-left">
                  Email
                </th>

                <th className="px-4 py-3 text-left">
                  Phone
                </th>

                <th className="px-4 py-3 text-left">
                  Address
                </th>

                <th className="px-4 py-3 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan={5}
                    className="
                    text-center
                    py-10
                    text-muted
                    "
                  >
                    Loading suppliers...
                  </td>
                </tr>

              ) : filteredSuppliers.length === 0 ? (

                <tr>
                  <td
                    colSpan={5}
                    className="
                    text-center
                    py-10
                    text-muted
                    "
                  >
                    No suppliers found
                  </td>
                </tr>

              ) : (

                currentSuppliers.map((supplier) => (

                  <tr
                    key={supplier.SupplierId}
                    className="
                    border-t
                    border-theme
                    hover:bg-theme
                    table-row-theme
                    transition
                    "
                  >

                    <td className="px-4 py-4 font-medium text-theme">
                      {supplier.SupplierName}
                    </td>

                    <td className="px-4 py-4 text-muted">
                      {supplier.Email}
                    </td>

                    <td className="px-4 py-4 text-muted">
                      {supplier.Phone}
                    </td>

                    <td className="px-4 py-4 text-muted">
                      {supplier.Address}
                    </td>

                    <td className="px-4 py-4">

                      <div className="flex justify-center gap-2">

                        <Link
                          href={`/inventory/suppliers/${supplier.SupplierId}`}
                          className="
                          bg-green-600
                          hover:bg-green-700
                          text-white
                          px-3
                          py-1
                          rounded
                          text-sm
                          transition
                          "
                        >
                          View
                        </Link>

                        <Link
                          href={`/inventory/suppliers/edit/${supplier.SupplierId}`}
                          className="
                          bg-blue-600
                          hover:bg-blue-700
                          text-white
                          px-3
                          py-1
                          rounded
                          text-sm
                          transition
                          "
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              supplier.SupplierId
                            )
                          }
                          className="
                          bg-red-600
                          hover:bg-red-700
                          text-white
                          px-3
                          py-1
                          rounded
                          text-sm
                          transition
                          "
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>


        {/* Mobile Card Layout */}

        <div className="md:hidden">

          {loading ? (

            <div className="text-center py-10 text-muted">
              Loading suppliers...
            </div>

          ) : filteredSuppliers.length === 0 ? (

            <div className="text-center py-10 text-muted">
              No suppliers found
            </div>

          ) : (

            <div className="divide-y divide-gray-300 dark:divide-gray-700">

              {currentSuppliers.map((supplier) => (

                <div
                  key={supplier.SupplierId}
                  className="
                  p-5
                  space-y-4
                  table-row-theme
                  "
                >

                  <div>

                    <p className="text-sm text-muted">
                      Supplier
                    </p>

                    <p className="font-semibold text-theme text-lg">
                      {supplier.SupplierName}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-muted">
                      Email
                    </p>

                    <p className="text-theme break-words">
                      {supplier.Email}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-muted">
                      Phone
                    </p>

                    <p className="text-theme">
                      {supplier.Phone}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-muted">
                      Address
                    </p>

                    <p className="text-theme">
                      {supplier.Address}
                    </p>

                  </div>


                  {/* Mobile Actions */}

                  <div className="flex gap-2 pt-2">

                    <Link
                      href={`/inventory/suppliers/${supplier.SupplierId}`}
                      className="
                      flex-1
                      text-center
                      bg-green-600
                      hover:bg-green-700
                      text-white
                      px-3
                      py-2
                      rounded-lg
                      text-sm
                      transition
                      "
                    >
                      View
                    </Link>

                    <Link
                      href={`/inventory/suppliers/edit/${supplier.SupplierId}`}
                      className="
                      flex-1
                      text-center
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-3
                      py-2
                      rounded-lg
                      text-sm
                      transition
                      "
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          supplier.SupplierId
                        )
                      }
                      className="
                      flex-1
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      px-3
                      py-2
                      rounded-lg
                      text-sm
                      transition
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>


      {/* Pagination Card */}

      <div
        className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        p-4
        "
      >

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Showing */}

          <div className="text-sm text-muted">

            {filteredSuppliers.length > 0 ? (
              <>
                Showing{" "}
                {firstSupplierIndex + 1}
                {" "}to{" "}
                {Math.min(
                  lastSupplierIndex,
                  filteredSuppliers.length
                )}
                {" "}of{" "}
                {filteredSuppliers.length}
              </>
            ) : (
              "Showing 0 to 0 of 0"
            )}

          </div>


          {/* Pagination */}

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
              className="
              px-4
              py-2
              rounded-lg
              bg-theme
              border
              border-theme
              text-theme
              disabled:opacity-50
              transition
              "
            >
              Previous
            </button>


            <span className="px-3 py-2 text-theme font-medium">

              Page {currentPage} of {totalPages || 1}

            </span>


            <button
              type="button"
              disabled={
                currentPage >= totalPages ||
                filteredSuppliers.length === 0
              }
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
              className="
              px-4
              py-2
              rounded-lg
              bg-theme
              border
              border-theme
              text-theme
              disabled:opacity-50
              transition
              "
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}