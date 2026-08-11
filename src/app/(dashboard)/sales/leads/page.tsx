"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Lead } from "@/types/lead";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const leadsPerPage = 5;

  // =========================
  // LOAD LEADS
  // =========================

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/leads");

      const data: Lead[] = await response.json();

      setLeads(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE LEAD
  // =========================

  const handleDelete = async (LeadId: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch("/api/leads", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        LeadId,
      }),
    });

    if (response.ok) {
      setLeads((prev) =>
        prev.filter(
          (lead) => lead.LeadId !== LeadId
        )
      );
    }
  };

  // =========================
  // CLEAR FILTER
  // =========================

  const handleClearFilter = () => {
    setSearchText("");
    setSelectedSource("");
    setSelectedStatus("");
    setCurrentPage(1);
  };

  // =========================
  // FILTER LEADS
  // =========================

  const filteredLeads = leads.filter((lead) => {
    const searchMatch =
      lead.LeadName
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||

      lead.Company
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||

      lead.Email
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||

      lead.Phone.includes(searchText);

    const sourceMatch =
      selectedSource === "" ||
      lead.LeadSource === selectedSource;

    const statusMatch =
      selectedStatus === "" ||
      lead.Status === selectedStatus;

    return (
      searchMatch &&
      sourceMatch &&
      statusMatch
    );
  });

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredLeads.length / leadsPerPage
  );

  const lastLeadIndex =
    currentPage * leadsPerPage;

  const firstLeadIndex =
    lastLeadIndex - leadsPerPage;

  const currentLeads =
    filteredLeads.slice(
      firstLeadIndex,
      lastLeadIndex
    );

  // =========================
  // STATUS STYLE
  // =========================

  const getStatusClass = (status: string) => {
    if (status === "New") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "Contacted") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Qualified") {
      return "bg-green-100 text-green-700";
    }

    return "bg-red-100 text-red-700";
  };

  return (
    <div className="
      w-full
      min-w-0
      space-y-5
      sm:space-y-6
    ">

      {/* =========================
          HEADER
      ========================= */}

      <div className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">

        <div className="min-w-0">

          <h1 className="
            text-2xl
            sm:text-3xl
            font-bold
            text-theme
          ">
            Lead Management
          </h1>

          <p className="
            text-muted
            mt-1
            sm:mt-2
            text-sm
            sm:text-base
          ">
            Manage sales leads
          </p>

        </div>

        <Link
          href="/sales/leads/add"
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-4
            sm:px-5
            py-2.5
            rounded-lg
            transition
            text-center
            w-full
            sm:w-auto
            whitespace-nowrap
          "
        >
          + Add Lead
        </Link>

      </div>

      {/* =========================
          SEARCH & FILTERS CARD
      ========================= */}

      <div className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow-sm
        p-4
        sm:p-6
      ">

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-5
          gap-3
          sm:gap-4
        ">

          {/* Search */}

          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search Lead"
            className="
              input-theme
              w-full
              min-w-0
            "
          />

          {/* Source */}

          <select
            value={selectedSource}
            onChange={(e) => {
              setSelectedSource(e.target.value);
              setCurrentPage(1);
            }}
            className="
              input-theme
              w-full
              min-w-0
            "
          >

            <option value="">
              All Sources
            </option>

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

          {/* Status */}

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

          {/* Search Button */}

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
              w-full
            "
          >
            Search
          </button>

          {/* Clear Button */}

          <button
            type="button"
            onClick={handleClearFilter}
            className="
              button-secondary
              w-full
            "
          >
            Clear
          </button>

        </div>

      </div>

      {/* =========================
          DATA CARD
      ========================= */}

      <div className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow-sm
        overflow-hidden
        w-full
      ">

        {/* =========================
            DESKTOP / TABLET
        ========================= */}

        <div className="hidden md:block w-full overflow-x-auto">

          <table className="
            w-full
            min-w-[1050px]
            text-sm
          ">

            <thead className="
              table-header-theme
              border-b
              border-theme
            ">

              <tr className="text-theme">

                <th className="
                  px-4
                  py-3
                  text-left
                  whitespace-nowrap
                ">
                  Lead Name
                </th>

                <th className="
                  px-4
                  py-3
                  text-left
                  whitespace-nowrap
                ">
                  Company
                </th>

                <th className="
                  px-4
                  py-3
                  text-left
                  whitespace-nowrap
                ">
                  Phone
                </th>

                <th className="
                  px-4
                  py-3
                  text-left
                  whitespace-nowrap
                ">
                  Email
                </th>

                <th className="
                  px-4
                  py-3
                  text-left
                  whitespace-nowrap
                ">
                  Lead Source
                </th>

                <th className="
                  px-4
                  py-3
                  text-left
                  whitespace-nowrap
                ">
                  Status
                </th>

                <th className="
                  px-4
                  py-3
                  text-center
                  whitespace-nowrap
                ">
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
                    Loading leads...
                  </td>

                </tr>

              ) : currentLeads.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="
                      text-center
                      py-10
                      text-muted
                    "
                  >
                    No leads found
                  </td>

                </tr>

              ) : (

                currentLeads.map((lead) => (

                  <tr
                    key={lead.LeadId}
                    className="
                      border-t
                      border-theme
                      table-row-theme
                      text-theme
                    "
                  >

                    {/* Lead Name */}

                    <td className="
                      px-4
                      py-4
                      font-medium
                      whitespace-nowrap
                    ">
                      {lead.LeadName}
                    </td>

                    {/* Company */}

                    <td
                      className="
                        px-4
                        py-4
                        text-muted
                        whitespace-nowrap
                        max-w-[220px]
                        truncate
                      "
                      title={lead.Company}
                    >
                      {lead.Company}
                    </td>

                    {/* Phone */}

                    <td className="
                      px-4
                      py-4
                      text-muted
                      whitespace-nowrap
                    ">
                      {lead.Phone}
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
                      title={lead.Email}
                    >
                      {lead.Email}
                    </td>

                    {/* Lead Source */}

                    <td className="
                      px-4
                      py-4
                      text-muted
                      whitespace-nowrap
                    ">
                      {lead.LeadSource}
                    </td>

                    {/* Status */}

                    <td className="px-4 py-4">

                      <span className={`
                        inline-flex
                        items-center
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        sm:text-sm
                        whitespace-nowrap
                        ${getStatusClass(lead.Status)}
                      `}>
                        {lead.Status}
                      </span>

                    </td>

                    {/* Actions */}

                    <td className="px-4 py-4">

                      <div className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        whitespace-nowrap
                      ">

                        <Link
                          href={`/sales/leads/${lead.LeadId}`}
                          className="
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            px-3
                            py-1.5
                            rounded
                            text-sm
                            transition
                          "
                        >
                          View
                        </Link>

                        <Link
                          href={`/sales/leads/edit/${lead.LeadId}`}
                          className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-3
                            py-1.5
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
                            handleDelete(lead.LeadId)
                          }
                          className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-3
                            py-1.5
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

        {/* =========================
            MOBILE CARD LAYOUT
        ========================= */}

        <div className="block md:hidden">

          {loading ? (

            <div className="
              text-center
              py-10
              text-muted
            ">
              Loading leads...
            </div>

          ) : currentLeads.length === 0 ? (

            <div className="
              text-center
              py-10
              text-muted
            ">
              No leads found
            </div>

          ) : (

            <div className="divide-y divide-theme">

              {currentLeads.map((lead) => (

                <div
                  key={lead.LeadId}
                  className="
                    p-4
                    space-y-3
                    table-row-theme
                  "
                >

                  {/* Lead */}

                  <div className="
                    flex
                    justify-between
                    gap-3
                  ">

                    <span className="
                      font-semibold
                      text-theme
                    ">
                      Lead
                    </span>

                    <span className="
                      text-theme
                      text-right
                    ">
                      {lead.LeadName}
                    </span>

                  </div>

                  {/* Company */}

                  <div className="
                    flex
                    justify-between
                    gap-3
                  ">

                    <span className="text-muted">
                      Company
                    </span>

                    <span className="
                      text-theme
                      text-right
                    ">
                      {lead.Company}
                    </span>

                  </div>

                  {/* Phone */}

                  <div className="
                    flex
                    justify-between
                    gap-3
                  ">

                    <span className="text-muted">
                      Phone
                    </span>

                    <span className="text-theme">
                      {lead.Phone}
                    </span>

                  </div>

                  {/* Email */}

                  <div>

                    <p className="
                      text-muted
                      mb-1
                    ">
                      Email
                    </p>

                    <p className="
                      text-theme
                      break-words
                    ">
                      {lead.Email}
                    </p>

                  </div>

                  {/* Source */}

                  <div className="
                    flex
                    justify-between
                    gap-3
                  ">

                    <span className="text-muted">
                      Lead Source
                    </span>

                    <span className="
                      text-theme
                      text-right
                    ">
                      {lead.LeadSource}
                    </span>

                  </div>

                  {/* Status */}

                  <div className="
                    flex
                    justify-between
                    items-center
                    gap-3
                  ">

                    <span className="text-muted">
                      Status
                    </span>

                    <span className={`
                      ${getStatusClass(lead.Status)}
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-medium
                    `}>
                      {lead.Status}
                    </span>

                  </div>

                  {/* Actions */}

                  <div className="
                    flex
                    gap-2
                    pt-2
                  ">

                    <Link
                      href={`/sales/leads/${lead.LeadId}`}
                      className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-3
                        py-1.5
                        rounded
                        text-sm
                        flex-1
                        text-center
                      "
                    >
                      View
                    </Link>

                    <Link
                      href={`/sales/leads/edit/${lead.LeadId}`}
                      className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-3
                        py-1.5
                        rounded
                        text-sm
                        flex-1
                        text-center
                      "
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(lead.LeadId)
                      }
                      className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-3
                        py-1.5
                        rounded
                        text-sm
                        flex-1
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

      {/* =========================
          PAGINATION CARD
      ========================= */}

      <div className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow-sm
        p-4
      ">

        <div className="
          flex
          flex-col
          sm:flex-row
          items-center
          justify-between
          gap-4
        ">

          {/* Showing */}

          <p className="
            text-sm
            text-muted
            text-center
            sm:text-left
          ">

            Showing{" "}

            {filteredLeads.length === 0
              ? 0
              : firstLeadIndex + 1}

            {" to "}

            {Math.min(
              lastLeadIndex,
              filteredLeads.length
            )}

            {" of "}

            {filteredLeads.length}

            {" leads"}

          </p>

          {/* Pagination */}

          <div className="
            flex
            items-center
            gap-2
          ">

            <button
              type="button"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.max(prev - 1, 1)
                )
              }
              disabled={currentPage === 1}
              className="
                input-theme
                px-3
                py-2
                rounded-lg
                disabled:opacity-50
                disabled:cursor-not-allowed
                whitespace-nowrap
              "
            >
              Previous
            </button>

            <span className="
              text-theme
              px-2
              whitespace-nowrap
              text-sm
            ">
              Page {currentPage} of {totalPages || 1}
            </span>

            <button
              type="button"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    totalPages
                  )
                )
              }
              disabled={
                totalPages === 0 ||
                currentPage >= totalPages
              }
              className="
                input-theme
                px-3
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