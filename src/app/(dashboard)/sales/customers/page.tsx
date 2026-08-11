"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Customer } from "@/types/customer";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const customersPerPage = 5;

  // =========================
  // LOAD CUSTOMERS
  // =========================

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/customers");

        const data: Customer[] = await response.json();

        setCustomers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  // =========================
  // DELETE CUSTOMER
  // =========================

  const handleDelete = async (CustomerId: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch("/api/customers", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        CustomerId,
      }),
    });

    const result = await response.json();

    console.log(result);

    if (response.ok) {
      setCustomers((prev) =>
        prev.filter(
          (customer) =>
            customer.CustomerId !== CustomerId
        )
      );
    }
  };

  // =========================
  // CLEAR FILTER
  // =========================

  const handleClearFilter = () => {
    setSearchText("");
    setSelectedCity("");
    setSelectedStatus("");
    setCurrentPage(1);
  };

  // =========================
  // FILTER CUSTOMERS
  // =========================

  const filteredCustomers = customers.filter(
    (customer: Customer) => {
      const searchMatch =
        customer.CustomerName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||

        customer.CustomerCode
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||

        customer.Email
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||

        customer.Phone.includes(searchText);

      const cityMatch =
        selectedCity === "" ||
        customer.City === selectedCity;

      const statusMatch =
        selectedStatus === "" ||
        customer.Status === selectedStatus;

      return (
        searchMatch &&
        cityMatch &&
        statusMatch
      );
    }
  );

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredCustomers.length / customersPerPage
  );

  const lastCustomerIndex =
    currentPage * customersPerPage;

  const firstCustomerIndex =
    lastCustomerIndex - customersPerPage;

  const currentCustomers =
    filteredCustomers.slice(
      firstCustomerIndex,
      lastCustomerIndex
    );

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
            Customer Management
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
            Manage customer records
          </p>

        </div>


        {/* Add Customer */}

        <Link
          href="/sales/customers/add"
          className="
            w-full
            sm:w-auto
            text-center
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-2.5
            rounded-lg
            transition
            whitespace-nowrap
          "
        >
          + Add Customer
        </Link>

      </div>


      {/* =========================
          SEARCH & FILTERS
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
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
          "
        >

          {/* Search */}

          <div
            className="
              sm:col-span-2
              lg:col-span-1
            "
          >

            <label
              className="
                block
                text-sm
                font-medium
                text-theme
                mb-2
              "
            >
              Search
            </label>

            <input
              type="text"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search Customer"
              className="
                input-theme
                w-full
                min-w-0
              "
            />

          </div>


          {/* City */}

          <div>

            <label
              className="
                block
                text-sm
                font-medium
                text-theme
                mb-2
              "
            >
              City
            </label>

            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setCurrentPage(1);
              }}
              className="
                input-theme
                w-full
                min-w-0
              "
            >

              <option value="">
                All City
              </option>

              <option value="Mumbai">
                Mumbai
              </option>

              <option value="Pune">
                Pune
              </option>

              <option value="Delhi">
                Delhi
              </option>

            </select>

          </div>


          {/* Status */}

          <div>

            <label
              className="
                block
                text-sm
                font-medium
                text-theme
                mb-2
              "
            >
              Status
            </label>

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="
                input-theme
                w-full
                min-w-0
              "
            >

              <option value="">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

            </select>

          </div>


          {/* Buttons */}

          <div
            className="
              grid
              grid-cols-2
              gap-3
              items-end
            "
          >

            {/* Search */}

            <button
              type="button"
              className="
                w-full
                bg-green-600
                hover:bg-green-700
                text-white
                rounded-lg
                py-2.5
                transition
              "
            >
              Search
            </button>


            {/* Clear */}

            <button
              type="button"
              onClick={handleClearFilter}
              className="
                button-secondary
                w-full
                py-2.5
              "
            >
              Clear
            </button>

          </div>

        </div>

      </div>


      {/* =========================
          CUSTOMER TABLE
      ========================= */}

      <div
        className="
          card-theme
          border
          border-theme
          rounded-xl
          shadow
          overflow-hidden
          w-full
        "
      >

        {/* =========================
            DESKTOP / TABLET TABLE
        ========================= */}

        <div className="hidden md:block overflow-x-auto">

          <table
            className="
              w-full
              min-w-[1050px]
              text-sm
            "
          >

            <thead
              className="
                table-header-theme
                border-b
                border-theme
              "
            >

              <tr className="text-theme">

                <th
                  className="
                    px-4
                    py-3
                    text-left
                    whitespace-nowrap
                  "
                >
                  Customer Code
                </th>

                <th
                  className="
                    px-4
                    py-3
                    text-left
                    whitespace-nowrap
                  "
                >
                  Customer Name
                </th>

                <th
                  className="
                    px-4
                    py-3
                    text-left
                    whitespace-nowrap
                  "
                >
                  City
                </th>

                <th
                  className="
                    px-4
                    py-3
                    text-left
                    whitespace-nowrap
                  "
                >
                  Phone
                </th>

                <th
                  className="
                    px-4
                    py-3
                    text-left
                    whitespace-nowrap
                  "
                >
                  Email
                </th>

                <th
                  className="
                    px-4
                    py-3
                    text-left
                    whitespace-nowrap
                  "
                >
                  Status
                </th>

                <th
                  className="
                    px-4
                    py-3
                    text-center
                    whitespace-nowrap
                    min-w-[220px]
                  "
                >
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {/* Loading */}

              {loading ? (

                <tr>

                  <td
                    colSpan={7}
                    className="
                      text-center
                      py-10
                      text-muted
                    "
                  >
                    Loading customers...
                  </td>

                </tr>

              ) : currentCustomers.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="
                      text-center
                      py-10
                      text-muted
                    "
                  >
                    No customers found
                  </td>

                </tr>

              ) : (

                currentCustomers.map(
                  (customer) => (

                    <tr
                      key={customer.CustomerId}
                      className="
                        border-t
                        border-theme
                        table-row-theme
                        text-theme
                        transition-colors
                      "
                    >

                      {/* Customer Code */}

                      <td
                        className="
                          px-4
                          py-4
                          font-medium
                          whitespace-nowrap
                        "
                      >
                        {customer.CustomerCode}
                      </td>


                      {/* Customer Name */}

                      <td
                        className="
                          px-4
                          py-4
                          font-medium
                          whitespace-nowrap
                        "
                      >
                        {customer.CustomerName}
                      </td>


                      {/* City */}

                      <td
                        className="
                          px-4
                          py-4
                          text-muted
                          whitespace-nowrap
                        "
                      >
                        {customer.City}
                      </td>


                      {/* Phone */}

                      <td
                        className="
                          px-4
                          py-4
                          text-muted
                          whitespace-nowrap
                        "
                      >
                        {customer.Phone}
                      </td>


                      {/* Email */}

                      <td
                        className="
                          px-4
                          py-4
                          text-muted
                          max-w-[260px]
                          truncate
                        "
                        title={customer.Email}
                      >
                        {customer.Email}
                      </td>


                      {/* Status */}

                      <td className="px-4 py-4">

                        <span
                          className={`
                            inline-flex
                            items-center
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            sm:text-sm
                            whitespace-nowrap

                            ${
                              customer.Status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {customer.Status}
                        </span>

                      </td>


                      {/* Actions */}

                      <td className="px-4 py-4">

                        <div
                          className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            flex-nowrap
                            whitespace-nowrap
                          "
                        >

                          {/* View */}

                          <Link
                            href={`/sales/customers/${customer.CustomerId}`}
                            className="
                              bg-green-600
                              hover:bg-green-700
                              text-white
                              px-3
                              py-1.5
                              rounded
                              text-sm
                              whitespace-nowrap
                              transition
                            "
                          >
                            View
                          </Link>


                          {/* Edit */}

                          <Link
                            href={`/sales/customers/edit/${customer.CustomerId}`}
                            className="
                              bg-blue-600
                              hover:bg-blue-700
                              text-white
                              px-3
                              py-1.5
                              rounded
                              text-sm
                              whitespace-nowrap
                              transition
                            "
                          >
                            Edit
                          </Link>


                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                customer.CustomerId
                              )
                            }
                            className="
                              bg-red-600
                              hover:bg-red-700
                              text-white
                              px-3
                              py-1.5
                              rounded
                              text-sm
                              whitespace-nowrap
                              transition
                            "
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>


        {/* =========================
            MOBILE CARDS
        ========================= */}

        <div className="md:hidden">

          {loading ? (

            <div
              className="
                py-10
                text-center
                text-muted
              "
            >
              Loading customers...
            </div>

          ) : currentCustomers.length === 0 ? (

            <div
              className="
                py-10
                text-center
                text-muted
              "
            >
              No customers found
            </div>

          ) : (

            <div className="divide-y divide-theme">

              {currentCustomers.map(
                (customer) => (

                  <div
                    key={customer.CustomerId}
                    className="
                      p-4
                      sm:p-5
                      space-y-4
                      table-row-theme
                    "
                  >

                    {/* Customer Code */}

                    <div>

                      <p
                        className="
                          text-xs
                          text-muted
                          mb-1
                        "
                      >
                        Customer Code
                      </p>

                      <p
                        className="
                          font-semibold
                          text-theme
                          break-words
                        "
                      >
                        {customer.CustomerCode}
                      </p>

                    </div>


                    {/* Customer Name */}

                    <div>

                      <p
                        className="
                          text-xs
                          text-muted
                          mb-1
                        "
                      >
                        Customer Name
                      </p>

                      <p
                        className="
                          font-semibold
                          text-theme
                          break-words
                        "
                      >
                        {customer.CustomerName}
                      </p>

                    </div>


                    {/* City + Phone */}

                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-4
                      "
                    >

                      <div>

                        <p
                          className="
                            text-xs
                            text-muted
                            mb-1
                          "
                        >
                          City
                        </p>

                        <p
                          className="
                            text-theme
                            break-words
                          "
                        >
                          {customer.City}
                        </p>

                      </div>


                      <div>

                        <p
                          className="
                            text-xs
                            text-muted
                            mb-1
                          "
                        >
                          Phone
                        </p>

                        <p
                          className="
                            text-theme
                            break-words
                          "
                        >
                          {customer.Phone}
                        </p>

                      </div>

                    </div>


                    {/* Email */}

                    <div>

                      <p
                        className="
                          text-xs
                          text-muted
                          mb-1
                        "
                      >
                        Email
                      </p>

                      <p
                        className="
                          text-theme
                          break-words
                        "
                      >
                        {customer.Email}
                      </p>

                    </div>


                    {/* Status */}

                    <div>

                      <p
                        className="
                          text-xs
                          text-muted
                          mb-1
                        "
                      >
                        Status
                      </p>

                      <span
                        className={`
                          inline-flex
                          items-center
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          whitespace-nowrap

                          ${
                            customer.Status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {customer.Status}
                      </span>

                    </div>


                    {/* Actions */}

                    <div
                      className="
                        grid
                        grid-cols-3
                        gap-2
                        pt-2
                      "
                    >

                      {/* View */}

                      <Link
                        href={`/sales/customers/${customer.CustomerId}`}
                        className="
                          bg-green-600
                          hover:bg-green-700
                          text-white
                          text-center
                          px-2
                          py-2
                          rounded
                          text-sm
                          whitespace-nowrap
                          transition
                        "
                      >
                        View
                      </Link>


                      {/* Edit */}

                      <Link
                        href={`/sales/customers/edit/${customer.CustomerId}`}
                        className="
                          bg-blue-600
                          hover:bg-blue-700
                          text-white
                          text-center
                          px-2
                          py-2
                          rounded
                          text-sm
                          whitespace-nowrap
                          transition
                        "
                      >
                        Edit
                      </Link>


                      {/* Delete */}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            customer.CustomerId
                          )
                        }
                        className="
                          bg-red-600
                          hover:bg-red-700
                          text-white
                          px-2
                          py-2
                          rounded
                          text-sm
                          whitespace-nowrap
                          transition
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>


      {/* =========================
          PAGINATION
      ========================= */}

      <div
        className="
          card-theme
          border
          border-theme
          rounded-xl
          shadow-sm
          p-4
        "
      >

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

          {/* Showing */}

          <p
            className="
              text-sm
              text-muted
              text-center
              sm:text-left
            "
          >
            Showing{" "}

            {filteredCustomers.length === 0
              ? 0
              : firstCustomerIndex + 1}

            {" to "}

            {Math.min(
              lastCustomerIndex,
              filteredCustomers.length
            )}

            {" of "}

            {filteredCustomers.length}

            {" customers"}
          </p>


          {/* Pagination Controls */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-2
            "
          >

            {/* Previous */}

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    Math.max(prev - 1, 1)
                )
              }
              className="
                input-theme
                px-3
                sm:px-4
                py-2
                rounded-lg
                disabled:opacity-50
                disabled:cursor-not-allowed
                whitespace-nowrap
              "
            >
              Previous
            </button>


            {/* Page */}

            <span
              className="
                px-2
                sm:px-3
                py-2
                text-sm
                text-theme
                whitespace-nowrap
              "
            >
              Page {currentPage}

              {totalPages > 0 &&
                ` of ${totalPages}`}
            </span>


            {/* Next */}

            <button
              type="button"
              disabled={
                currentPage >= totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    Math.min(
                      prev + 1,
                      totalPages
                    )
                )
              }
              className="
                input-theme
                px-3
                sm:px-4
                py-2
                rounded-lg
                disabled:opacity-50
                disabled:cursor-not-allowed
                whitespace-nowrap
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