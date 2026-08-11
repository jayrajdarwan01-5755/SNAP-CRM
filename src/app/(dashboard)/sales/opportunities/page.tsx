"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Opportunity } from "@/types/opportunity";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  const [searchText, setSearchText] = useState("");

  const [selectedStage, setSelectedStage] = useState("");

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const opportunitiesPerPage = 5;

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/opportunities");

      const data: Opportunity[] = await response.json();

      setOpportunities(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (OpportunityId: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this opportunity?"
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch("/api/opportunities", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        OpportunityId,
      }),
    });

    if (response.ok) {
      setOpportunities((prev) =>
        prev.filter(
          (opportunity) =>
            opportunity.OpportunityId !== OpportunityId
        )
      );
    }
  };

  const handleClear = () => {
    setSearchText("");
    setSelectedStage("");
    setCurrentPage(1);
  };

  const filteredOpportunities = opportunities.filter(
    (opportunity) => {
      const searchMatch =
        opportunity.OpportunityName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        opportunity.Customer
          .toLowerCase()
          .includes(searchText.toLowerCase());

      const stageMatch =
        selectedStage === "" ||
        opportunity.Stage === selectedStage;

      return searchMatch && stageMatch;
    }
  );

  const lastIndex =
    currentPage * opportunitiesPerPage;

  const firstIndex =
    lastIndex - opportunitiesPerPage;

  const currentOpportunities =
    filteredOpportunities.slice(
      firstIndex,
      lastIndex
    );

  const totalPages = Math.ceil(
    filteredOpportunities.length /
      opportunitiesPerPage
  );

  return (
    <div className="w-full space-y-6">

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
            Opportunity Management
          </h1>

          <p className="text-muted mt-2 text-sm sm:text-base">
            Manage sales opportunities
          </p>

        </div>

        <Link
          href="/sales/opportunities/add"
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
          "
        >
          + Add Opportunity
        </Link>
      </div>


      {/* Search Section */}

      <div
        className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
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

          <div className="sm:col-span-2 lg:col-span-1">

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
              placeholder="Search Opportunity"
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2.5
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

          </div>


          {/* Stage */}

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
              Stage
            </label>

            <select
              value={selectedStage}
              onChange={(e) => {
                setSelectedStage(e.target.value);
                setCurrentPage(1);
              }}
              className="
              w-full
              border
              border-theme
              bg-theme
              text-theme
              rounded-lg
              px-4
              py-2.5
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            >
              <option value="">
                All Stages
              </option>

              <option value="New">
                New
              </option>

              <option value="Proposal">
                Proposal
              </option>

              <option value="Negotiation">
                Negotiation
              </option>

              <option value="Won">
                Won
              </option>

              <option value="Lost">
                Lost
              </option>
            </select>

          </div>


          {/* Search Button */}

          <div className="flex items-end">

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

          </div>


          {/* Clear Button */}

          <div className="flex items-end">

            <button
              type="button"
              onClick={handleClear}
              className="
              w-full
              bg-gray-600
              hover:bg-gray-700
              text-white
              rounded-lg
              py-2.5
              transition
              "
            >
              Clear
            </button>

          </div>

        </div>

      </div>


      {/* Opportunity Table */}

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

          <table className="w-full min-w-[900px]">

            <thead
              className="
              bg-theme
              border-b
              border-theme
              "
            >
              <tr className="text-theme">

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Opportunity Name
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Customer
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Amount
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Stage
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Probability
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Close Date
                </th>

                <th className="px-4 py-3 text-center whitespace-nowrap">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

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
                    Loading opportunities...
                  </td>
                </tr>
              ) : currentOpportunities.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="
                    text-center
                    py-10
                    text-muted
                    "
                  >
                    No opportunities found
                  </td>
                </tr>
              ) : (
                currentOpportunities.map(
                  (opportunity) => (
                    <tr
                      key={opportunity.OpportunityId}
                      className="
                      border-t
                      border-theme
                      table-row-theme
                      transition-colors
                      "
                    >

                      <td className="px-4 py-4 font-medium text-theme">
                        {opportunity.OpportunityName}
                      </td>

                      <td className="px-4 py-4 text-muted">
                        {opportunity.Customer}
                      </td>

                      <td className="px-4 py-4 text-theme whitespace-nowrap">
                        ₹
                        {new Intl.NumberFormat(
                          "en-IN"
                        ).format(opportunity.Amount)}
                      </td>

                      <td className="px-4 py-4">

                        <span
                          className={
                            opportunity.Stage === "Won"
                              ? `
                                inline-flex
                                bg-green-100
                                text-green-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                whitespace-nowrap
                                `
                              : opportunity.Stage === "Lost"
                              ? `
                                inline-flex
                                bg-red-100
                                text-red-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                whitespace-nowrap
                                `
                              : `
                                inline-flex
                                bg-yellow-100
                                text-yellow-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                whitespace-nowrap
                                `
                          }
                        >
                          {opportunity.Stage}
                        </span>

                      </td>

                      <td className="px-4 py-4 text-muted">
                        {opportunity.Probability}
                      </td>

                      <td className="px-4 py-4 text-muted whitespace-nowrap">
                        {opportunity.CloseDate}
                      </td>

                      <td className="px-4 py-4">

                        <div
                          className="
                          flex
                          justify-center
                          gap-2
                          flex-wrap
                          "
                        >

                          <Link
                            href={`/sales/opportunities/${opportunity.OpportunityId}`}
                            className="
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            px-3
                            py-1.5
                            rounded
                            text-sm
                            "
                          >
                            View
                          </Link>

                          <Link
                            href={`/sales/opportunities/edit/${opportunity.OpportunityId}`}
                            className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-3
                            py-1.5
                            rounded
                            text-sm
                            "
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(
                                opportunity.OpportunityId
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


        {/* Mobile Cards */}

        <div className="md:hidden">

          {loading ? (
            <div className="py-10 text-center text-muted">
              Loading opportunities...
            </div>
          ) : currentOpportunities.length === 0 ? (
            <div className="py-10 text-center text-muted">
              No opportunities found
            </div>
          ) : (
            <div className="divide-y divide-theme">

              {currentOpportunities.map(
                (opportunity) => (
                  <div
                    key={opportunity.OpportunityId}
                    className="
                    p-4
                    sm:p-5
                    space-y-4
                    table-row-theme
                    "
                  >

                    {/* Opportunity Name */}

                    <div>

                      <p className="text-xs text-muted mb-1">
                        Opportunity Name
                      </p>

                      <p
                        className="
                        font-semibold
                        text-theme
                        break-words
                        "
                      >
                        {opportunity.OpportunityName}
                      </p>

                    </div>


                    {/* Customer */}

                    <div>

                      <p className="text-xs text-muted mb-1">
                        Customer
                      </p>

                      <p
                        className="
                        text-theme
                        break-words
                        "
                      >
                        {opportunity.Customer}
                      </p>

                    </div>


                    {/* Amount + Stage */}

                    <div
                      className="
                      grid
                      grid-cols-2
                      gap-4
                      "
                    >

                      <div>

                        <p className="text-xs text-muted mb-1">
                          Amount
                        </p>

                        <p className="font-semibold text-theme">
                          ₹
                          {new Intl.NumberFormat(
                            "en-IN"
                          ).format(
                            opportunity.Amount
                          )}
                        </p>

                      </div>


                      <div>

                        <p className="text-xs text-muted mb-1">
                          Stage
                        </p>

                        <span
                          className={
                            opportunity.Stage === "Won"
                              ? `
                                inline-flex
                                bg-green-100
                                text-green-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                `
                              : opportunity.Stage === "Lost"
                              ? `
                                inline-flex
                                bg-red-100
                                text-red-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                `
                              : `
                                inline-flex
                                bg-yellow-100
                                text-yellow-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                `
                          }
                        >
                          {opportunity.Stage}
                        </span>

                      </div>

                    </div>


                    {/* Probability + Close Date */}

                    <div
                      className="
                      grid
                      grid-cols-2
                      gap-4
                      "
                    >

                      <div>

                        <p className="text-xs text-muted mb-1">
                          Probability
                        </p>

                        <p className="text-theme">
                          {opportunity.Probability}
                        </p>

                      </div>


                      <div>

                        <p className="text-xs text-muted mb-1">
                          Close Date
                        </p>

                        <p className="text-theme break-words">
                          {opportunity.CloseDate}
                        </p>

                      </div>

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

                      <Link
                        href={`/sales/opportunities/${opportunity.OpportunityId}`}
                        className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        text-center
                        px-2
                        py-2
                        rounded
                        text-sm
                        "
                      >
                        View
                      </Link>

                      <Link
                        href={`/sales/opportunities/edit/${opportunity.OpportunityId}`}
                        className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        text-center
                        px-2
                        py-2
                        rounded
                        text-sm
                        "
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(
                            opportunity.OpportunityId
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


      {/* Pagination */}

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
            {filteredOpportunities.length === 0
              ? 0
              : firstIndex + 1}{" "}
            to{" "}
            {Math.min(
              lastIndex,
              filteredOpportunities.length
            )}{" "}
            of{" "}
            {filteredOpportunities.length}{" "}
            opportunities
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

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  (prev) => Math.max(prev - 1, 1)
                )
              }
              className="
              border
              border-theme
              text-theme
              px-3
              sm:px-4
              py-2
              rounded-lg
              disabled:opacity-50
              disabled:cursor-not-allowed
              "
            >
              Previous
            </button>


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


            <button
              disabled={
                currentPage >= totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setCurrentPage(
                  (prev) => prev + 1
                )
              }
              className="
              bg-blue-600
              hover:bg-blue-700
              disabled:bg-gray-400
              text-white
              px-3
              sm:px-4
              py-2
              rounded-lg
              disabled:cursor-not-allowed
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