"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface AuditLog {
  id: number;
  user: string;
  action: string;
  module: string;
  date: string;
  status: string;
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All Modules");

  const clearFilters = () => {
    setSearch("");
    setModuleFilter("All Modules");
  };

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const loadAuditLogs = async () => {
    try {
      const response = await fetch("/api/audit-logs");

      if (!response.ok) {
        throw new Error("Failed to fetch audit logs");
      }

      const result = await response.json();

      setLogs(result.data ?? []);
    } catch (error) {
      console.error("Audit Logs Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.module.toLowerCase().includes(search.toLowerCase());

    const matchesModule =
      moduleFilter === "All Modules" ||
      log.module === moduleFilter;

    return matchesSearch && matchesModule;
  });

  if (loading) {
    return (
      <div className="p-6 text-lg font-semibold bg-theme text-theme min-h-screen">
        Loading Audit Logs...
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-theme text-theme min-h-screen">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-theme">
            Audit Logs
          </h1>

          <p className="text-muted font-medium">
            View system activity logs
          </p>

        </div>

        <Link
          href="/settings"
          className="
          bg-gray-600
          hover:bg-gray-700
          text-white
          px-5
          py-2
          rounded-lg
          "
        >
          ← Back
        </Link>

      </div>


      {/* Search */}

      <div className="card-theme border-theme rounded-xl shadow p-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Search Logs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            "
          />


          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="
            w-full
            border
            border-theme
            bg-theme
            text-theme
            rounded-lg
            px-4
            py-2
            "
          >

            <option>All Modules</option>

            <option>Users</option>

            <option>Inventory</option>

            <option>Sales</option>

            <option>HR</option>

          </select>


          <button

            onClick={clearFilters}

            className="
            bg-gray-600
            hover:bg-gray-700
            text-white
            px-4
            py-2
            rounded-lg
            "

          >

            Clear

          </button>


        </div>

      </div>


      {/* Audit Logs Table */}

      <div className="card-theme border-theme rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-theme border-b border-theme">

            <tr>

              <th className="px-4 py-3 text-left text-theme font-semibold">
                User
              </th>

              <th className="px-4 py-3 text-left text-theme font-semibold">
                Action
              </th>

              <th className="px-4 py-3 text-left text-theme font-semibold">
                Module
              </th>

              <th className="px-4 py-3 text-left text-theme font-semibold">
                Date & Time
              </th>

              <th className="px-4 py-3 text-left text-theme font-semibold">
                Status
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredLogs.length > 0 ? (

              filteredLogs.map((log) => (

                <tr
                  key={log.id}
                  className="border-t border-theme hover:bg-black/5"
                >

                  <td className="px-4 py-4 text-theme font-medium">
                    {log.user}
                  </td>


                  <td className="px-4 py-4 text-theme">
                    {log.action}
                  </td>


                  <td className="px-4 py-4 text-theme">
                    {log.module}
                  </td>


                  <td className="px-4 py-4 text-theme">
                    {log.date}
                  </td>


                  <td className="px-4 py-4">

                    <span
                      className={
                        log.status === "Success"
                          ? "bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full text-sm"
                          : "bg-red-100 text-red-800 font-semibold px-3 py-1 rounded-full text-sm"
                      }
                    >

                      {log.status}

                    </span>

                  </td>


                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={5}
                  className="text-center py-8 text-muted"
                >

                  No audit logs found.

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}