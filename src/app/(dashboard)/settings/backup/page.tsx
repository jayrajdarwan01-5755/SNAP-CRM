"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Backup } from "@/types/backup";

export default function BackupPage() {

  const [backupName, setBackupName] = useState("");
  const [lastBackup, setLastBackup] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  // ==========================
  // LOAD BACKUP DETAILS
  // ==========================

  useEffect(() => {
    loadBackup();
  }, []);

  const loadBackup = async () => {

    try {

      const response = await fetch("/api/backup");

      const result = await response.json();

      const data: Backup = result.data;

      setBackupName(
        data.backupname
      );

      setLastBackup(
        new Date(data.lastbackup).toLocaleString(
          "en-IN",
          {
            timeZone: "Asia/Kolkata",
          }
        )
      );

      setStatus(
        data.status
      );

    }
    catch (error) {

      console.log(
        "Backup Load Error",
        error
      );

    }

  };

  // ==========================
  // CREATE BACKUP
  // ==========================

  const handleCreateBackup = async () => {

    try {

      const response = await fetch(
        "/api/backup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            action: "create",
          }),
        }
      );

      const result = await response.json();

      setLastBackup(
        new Date(
          result.data.lastbackup
        ).toLocaleString()
      );

      setStatus(
        result.data.status
      );

      setMessage(
        result.message
      );

    }
    catch (error) {

      console.log(error);

      setMessage(
        "Backup creation failed"
      );

    }

  };

  // ==========================
  // RESTORE BACKUP
  // ==========================

  const handleRestoreBackup = async () => {

    try {

      const response = await fetch(
        "/api/backup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            action: "restore",
          }),
        }
      );

      const result = await response.json();

      setStatus(
        result.data.status
      );

      setMessage(
        result.message
      );

    }
    catch (error) {

      console.log(error);

      setMessage(
        "Restore failed"
      );

    }

  };

  // ==========================
  // DOWNLOAD BACKUP
  // ==========================

  const handleDownloadBackup = async () => {

    const response = await fetch(
      "/api/backup/download"
    );

    const blob =
      await response.blob();

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = "backup.json";

    link.click();

  };

  return (

    <div className="
      space-y-6
      bg-theme
      text-theme
      min-h-screen
    ">

      {/* ======================================
          HEADER
      ====================================== */}

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
            text-2xl
            sm:text-3xl
            font-bold
            text-theme
          ">
            Backup
          </h1>

          <p className="text-muted mt-2">
            Manage system backups
          </p>

        </div>

        <Link
          href="/settings"
          className="
            w-full
            sm:w-auto
            text-center
            bg-gray-600
            hover:bg-gray-700
            text-white
            px-5
            py-2
            rounded-lg
            transition
          "
        >
          ← Back
        </Link>

      </div>

      {/* ======================================
          BACKUP CARD
      ====================================== */}

      <div className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        p-4
        sm:p-6
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        ">

          {/* Backup Name */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Backup Name
            </label>

            <input
              type="text"
              value={backupName}
              onChange={(e) =>
                setBackupName(e.target.value)
              }
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

          </div>

          {/* Last Backup */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Last Backup
            </label>

            <input
              type="text"
              value={lastBackup}
              readOnly
              className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                focus:outline-none
              "
            />

          </div>

          {/* Backup Status */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Backup Status
            </label>

            <input
              type="text"
              value={status}
              readOnly
              className={`
                w-full
                border
                border-theme
                bg-theme
                rounded-lg
                px-4
                py-2
                focus:outline-none
                ${
                  status === "Completed"
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              `}
            />

          </div>

          {/* Message */}

          {message && (

            <div className="
              md:col-span-2
            ">

              <div className="
                border
                border-theme
                rounded-lg
                px-4
                py-3
                text-green-600
                font-semibold
              ">

                {message}

              </div>

            </div>

          )}

          {/* Action Buttons */}

          <div className="
            md:col-span-2
          ">

            <div className="
              flex
              flex-col
              sm:flex-row
              flex-wrap
              gap-3
              mt-4
            ">

              {/* Create Backup */}

              <button
                onClick={handleCreateBackup}
                className="
                  w-full
                  sm:w-auto
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-6
                  py-2
                  rounded-lg
                  transition
                "
              >
                Create Backup
              </button>

              {/* Restore Backup */}

              <button
                onClick={handleRestoreBackup}
                className="
                  w-full
                  sm:w-auto
                  bg-yellow-500
                  hover:bg-yellow-600
                  text-white
                  px-6
                  py-2
                  rounded-lg
                  transition
                "
              >
                Restore Backup
              </button>

              {/* Download Backup */}

              <button
                onClick={handleDownloadBackup}
                className="
                  w-full
                  sm:w-auto
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-6
                  py-2
                  rounded-lg
                  transition
                "
              >
                Download Backup
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}