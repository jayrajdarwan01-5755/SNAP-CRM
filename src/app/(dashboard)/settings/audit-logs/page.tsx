"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [moduleFilter, setModuleFilter] = useState("");

  // ==========================
  // LOAD AUDIT LOGS
  // ==========================

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const loadAuditLogs = async () => {

    try {

      setLoading(true);

      const response = await fetch("/api/audit-logs");

      if (!response.ok) {
        throw new Error("Failed to fetch audit logs");
      }

      const result = await response.json();

      setLogs(result.data ?? []);

    } catch (error) {

      console.error(
        "Audit Logs Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  // ==========================
  // CLEAR FILTER
  // ==========================

  const clearFilters = () => {

    setSearch("");
    setModuleFilter("");

  };

  // ==========================
  // FILTER LOGS
  // ==========================

  const filteredLogs = logs.filter((log) => {

    const searchMatch =
      log.user
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      log.action
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      log.module
        .toLowerCase()
        .includes(search.toLowerCase());

    const moduleMatch =
      moduleFilter === "" ||
      log.module === moduleFilter;

    return searchMatch && moduleMatch;

  });

  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (

      <div className="
        min-h-screen
        bg-theme
        text-theme
        flex
        items-center
        justify-center
        p-6
      ">

        <div className="
          card-theme
          border
          border-theme
          rounded-xl
          shadow
          px-8
          py-6
          text-center
        ">

          <p className="
            text-theme
            font-semibold
          ">
            Loading Audit Logs...
          </p>

          <p className="
            text-muted
            text-sm
            mt-2
          ">
            Please wait
          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="
      space-y-6
      bg-theme
      text-theme
      min-h-screen
    ">

      {/* ================= HEADER ================= */}

      <div className="
        flex
        flex-col
        sm:flex-row
        sm:justify-between
        sm:items-center
        gap-4
      ">

        <div>

          <h1 className="
            text-3xl
            font-bold
            text-theme
          ">
            Audit Logs
          </h1>

          <p className="
            text-muted
            mt-2
          ">
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
            text-center
          "
        >
          ← Back
        </Link>

      </div>


      {/* ================= SEARCH & FILTER ================= */}

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

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
          "
        >

          {/* Search */}

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search User / Action / Module"
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


          {/* Module */}

          <select
            value={moduleFilter}
            onChange={(e) =>
              setModuleFilter(e.target.value)
            }
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

            <option value="">
              All Modules
            </option>

            <option value="Users">
              Users
            </option>

            <option value="Inventory">
              Inventory
            </option>

            <option value="Sales">
              Sales
            </option>

            <option value="HR">
              HR
            </option>

          </select>


          {/* Buttons */}

          <div className="flex gap-3">

            <button
              type="button"
              onClick={() => {
                setSearch(search);
                setModuleFilter(moduleFilter);
              }}
              className="
                flex-1
                bg-green-600
                hover:bg-green-700
                text-white
                rounded-lg
                px-4
                py-2
              "
            >
              Search
            </button>

            <button
              type="button"
              onClick={clearFilters}
              className="
                flex-1
                bg-gray-600
                hover:bg-gray-700
                text-white
                rounded-lg
                px-4
                py-2
              "
            >
              Clear
            </button>

          </div>

        </div>

      </div>


      {/* ================= DATA CARD ================= */}

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

        {/* ================= DESKTOP / TABLET ================= */}

        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-theme">

              <tr className="text-theme">

                <th className="
                  px-4
                  py-4
                  text-left
                ">
                  User
                </th>

                <th className="
                  px-4
                  py-4
                  text-left
                ">
                  Action
                </th>

                <th className="
                  px-4
                  py-4
                  text-left
                ">
                  Module
                </th>

                <th className="
                  px-4
                  py-4
                  text-left
                ">
                  Date & Time
                </th>

                <th className="
                  px-4
                  py-4
                  text-left
                ">
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredLogs.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="
                      text-center
                      py-10
                      text-muted
                    "
                  >
                    No audit logs found
                  </td>

                </tr>

              ) : (

                filteredLogs.map((log) => (

                  <tr
                    key={log.id}
                    className="
                      border-t
                      border-theme
                      hover:bg-theme
                      table-row-theme
                    "
                  >

                    {/* User */}

                    <td className="
                      px-4
                      py-4
                      font-medium
                      text-theme
                    ">
                      {log.user}
                    </td>


                    {/* Action */}

                    <td className="
                      px-4
                      py-4
                      text-muted
                    ">
                      {log.action}
                    </td>


                    {/* Module */}

                    <td className="
                      px-4
                      py-4
                      text-muted
                    ">
                      {log.module}
                    </td>


                    {/* Date */}

                    <td className="
                      px-4
                      py-4
                      text-muted
                    ">
                      {log.date}
                    </td>


                    {/* Status */}

                    <td className="px-4 py-4">

                      <span
                        className={
                          log.status === "Success"
                            ? `
                              bg-green-100
                              text-green-700
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              font-semibold
                            `
                            : `
                              bg-red-100
                              text-red-700
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              font-semibold
                            `
                        }
                      >
                        {log.status}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>


        {/* ================= MOBILE ================= */}

        <div className="md:hidden">

          {filteredLogs.length === 0 ? (

            <div className="
              text-center
              py-10
              text-muted
            ">
              No audit logs found
            </div>

          ) : (

            <div className="
              divide-y
              divide-gray-200
              dark:divide-gray-700
            ">

              {filteredLogs.map((log) => (

                <div
                  key={log.id}
                  className="
                    p-5
                    table-row-theme
                  "
                >

                  {/* Log Header */}

                  <div className="
                    flex
                    justify-between
                    items-start
                    gap-3
                    mb-4
                  ">

                    <div>

                      <h3 className="
                        font-semibold
                        text-lg
                        text-theme
                      ">
                        {log.action}
                      </h3>

                      <p className="
                        text-sm
                        text-muted
                        mt-1
                      ">
                        {log.user}
                      </p>

                    </div>


                    <span
                      className={
                        log.status === "Success"
                          ? `
                            bg-green-100
                            text-green-700
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold
                          `
                          : `
                            bg-red-100
                            text-red-700
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold
                          `
                      }
                    >
                      {log.status}
                    </span>

                  </div>


                  {/* Log Information */}

                  <div className="space-y-3">

                    {/* User */}

                    <div className="
                      flex
                      justify-between
                      gap-4
                    ">

                      <span className="
                        text-sm
                        text-muted
                      ">
                        User
                      </span>

                      <span className="
                        text-sm
                        font-medium
                        text-theme
                        text-right
                      ">
                        {log.user}
                      </span>

                    </div>


                    {/* Action */}

                    <div className="
                      flex
                      justify-between
                      gap-4
                    ">

                      <span className="
                        text-sm
                        text-muted
                      ">
                        Action
                      </span>

                      <span className="
                        text-sm
                        font-medium
                        text-theme
                        text-right
                      ">
                        {log.action}
                      </span>

                    </div>


                    {/* Module */}

                    <div className="
                      flex
                      justify-between
                      gap-4
                    ">

                      <span className="
                        text-sm
                        text-muted
                      ">
                        Module
                      </span>

                      <span className="
                        text-sm
                        font-medium
                        text-theme
                        text-right
                      ">
                        {log.module}
                      </span>

                    </div>


                    {/* Date */}

                    <div className="
                      flex
                      justify-between
                      gap-4
                    ">

                      <span className="
                        text-sm
                        text-muted
                      ">
                        Date & Time
                      </span>

                      <span className="
                        text-sm
                        font-medium
                        text-theme
                        text-right
                      ">
                        {log.date}
                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>


      {/* ================= SUMMARY CARD ================= */}

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

        <div className="
          flex
          flex-col
          sm:flex-row
          justify-between
          items-center
          gap-3
        ">

          <p className="text-sm text-muted">

            Showing{" "}

            <span className="
              font-semibold
              text-theme
            ">
              {filteredLogs.length}
            </span>{" "}

            of{" "}

            <span className="
              font-semibold
              text-theme
            ">
              {logs.length}
            </span>{" "}

            audit logs

          </p>

        </div>

      </div>

    </div>

  );

}