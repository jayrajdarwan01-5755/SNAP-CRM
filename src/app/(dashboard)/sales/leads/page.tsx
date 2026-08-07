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

  const handleDelete = async (LeadId: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    const response = await fetch("/api/leads", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ LeadId }),
    });

    if (response.ok) {
      setLeads((prev) =>
        prev.filter((lead) => lead.LeadId !== LeadId)
      );
    }
  };

  const handleClearFilter = () => {
    setSearchText("");
    setSelectedSource("");
    setSelectedStatus("");
  };

  const filteredLeads = leads.filter((lead) => {
    const searchMatch =
      lead.LeadName.toLowerCase().includes(searchText.toLowerCase()) ||
      lead.Company.toLowerCase().includes(searchText.toLowerCase()) ||
      lead.Email.toLowerCase().includes(searchText.toLowerCase()) ||
      lead.Phone.includes(searchText);

    const sourceMatch =
      selectedSource === "" || lead.LeadSource === selectedSource;

    const statusMatch =
      selectedStatus === "" || lead.Status === selectedStatus;

    return searchMatch && sourceMatch && statusMatch;
  });

  const lastLeadIndex = currentPage * leadsPerPage;
  const firstLeadIndex = lastLeadIndex - leadsPerPage;

  const currentLeads = filteredLeads.slice(
    firstLeadIndex,
    lastLeadIndex
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-theme">
            Lead Management
          </h1>
          <p className="text-muted mt-2">
            Manage sales leads
          </p>
        </div>

        <Link
          href="/sales/leads/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Lead
        </Link>
      </div>

      {/* Search Section */}
      <div className="card-theme border-theme border rounded-xl shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Lead"
            className="bg-theme text-theme border border-theme rounded-lg px-4 py-2"
          />

          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="bg-theme text-theme border border-theme rounded-lg px-4 py-2"
          >
            <option value="">All Sources</option>
            <option value="Website">Website</option>
            <option value="Facebook">Facebook</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Referral">Referral</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-theme text-theme border border-theme rounded-lg px-4 py-2"
          >
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>

          <button className="bg-green-600 hover:bg-green-700 text-white rounded-lg">
            Search
          </button>

          <button
            onClick={handleClearFilter}
            className="bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Lead Table */}
      <div className="card-theme border-theme border rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-theme border-b border-theme">
            <tr className="text-theme">
              <th className="px-3 py-3 text-left">Lead Name</th>
              <th className="px-3 py-3 text-left">Company</th>
              <th className="px-3 py-3 text-left">Phone</th>
              <th className="px-3 py-3 text-left">Email</th>
              <th className="px-3 py-3 text-left">Lead Source</th>
              <th className="px-3 py-3 text-left">Status</th>
              <th className="px-3 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-muted"
                >
                  Loading leads...
                </td>
              </tr>
            ) : filteredLeads.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-muted"
                >
                  No leads found
                </td>
              </tr>
            ) : (
              currentLeads.map((lead) => (
                
               <tr
  key={lead.LeadId}
  className="border-t border-theme table-row-theme"
>
                  <td className="px-3 py-4 font-medium text-theme">
                    {lead.LeadName}
                  </td>

                  <td className="px-3 py-4 text-muted">
                    {lead.Company}
                  </td>

                  <td className="px-3 py-4 text-muted">
                    {lead.Phone}
                  </td>

                  <td className="px-3 py-4 text-muted">
                    {lead.Email}
                  </td>

                  <td className="px-3 py-4 text-muted">
                    {lead.LeadSource}
                  </td>

                  <td className="px-3 py-4">
                    <span
                      className={
                        lead.Status === "New"
                          ? "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                          : lead.Status === "Contacted"
                          ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                          : lead.Status === "Qualified"
                          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                          : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                      }
                    >
                      {lead.Status}
                    </span>
                  </td>

                  <td className="px-3 py-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/sales/leads/${lead.LeadId}`}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        View
                      </Link>

                      <Link
                        href={`/sales/leads/edit/${lead.LeadId}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(lead.LeadId)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm"
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

      {/* Pagination */}
      <div className="flex justify-between items-center card-theme border-theme border rounded-xl shadow p-4">
        <p className="text-sm text-muted">
          Showing {firstLeadIndex + 1} to{" "}
          {Math.min(lastLeadIndex, filteredLeads.length)} of{" "}
          {filteredLeads.length} leads
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="border border-theme text-theme px-3 py-1 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev < Math.ceil(filteredLeads.length / leadsPerPage)
                  ? prev + 1
                  : prev
              )
            }
            disabled={
              currentPage >=
              Math.ceil(filteredLeads.length / leadsPerPage)
            }
            className="border border-theme text-theme px-3 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}