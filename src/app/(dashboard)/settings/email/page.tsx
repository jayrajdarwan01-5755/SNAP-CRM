"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EmailSettings } from "@/types/emailSettings";

export default function EmailSettingsPage() {
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [senderName, setSenderName] = useState("");
  const [encryption, setEncryption] =
    useState<"TLS" | "SSL" | "None">("TLS");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  // ======================================
  // LOAD EMAIL SETTINGS
  // ======================================

  const loadSettings = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/email");

      const data: EmailSettings = await response.json();

      setSmtpHost(data.SMTPHost);
      setSmtpPort(data.SMTPPort);
      setEmail(data.Email);
      setPassword(data.Password);
      setSenderName(data.SenderName);
      setEncryption(data.Encryption);
    } catch (error) {
      console.log(error);

      alert("Failed to load Email Settings");
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // SAVE SETTINGS
  // ======================================

  const handleSave = async () => {
    try {
      setSaving(true);

      const response = await fetch("/api/email", {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          SMTPHost: smtpHost,
          SMTPPort: smtpPort,
          Email: email,
          Password: password,
          SenderName: senderName,
          Encryption: encryption,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      alert("Email Settings Saved Successfully");
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // ======================================
  // TEST EMAIL
  // ======================================

  const handleTest = async () => {
    try {
      const response = await fetch("/api/email/test", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <div className="space-y-6">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-theme">
            Email Settings
          </h1>

          <p className="text-muted mt-2">
            Configure SMTP email settings
          </p>
        </div>

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
          <div className="text-center py-10 text-muted">
            Loading email settings...
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ======================================
          HEADER
      ====================================== */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:justify-between
          sm:items-center
          gap-4
        "
      >

        <div>

          <h1
            className="
              text-2xl
              sm:text-3xl
              font-bold
              text-theme
            "
          >
            Email Settings
          </h1>

          <p className="text-muted mt-2">
            Configure SMTP email settings
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
          EMAIL SETTINGS CARD
      ====================================== */}

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

        <div className="mb-6">

          <h2 className="
            text-xl
            font-semibold
            text-theme
          ">
            SMTP Configuration
          </h2>

          <p className="text-sm text-muted mt-1">
            Configure your email server and sender information.
          </p>

        </div>


        {/* ======================================
            FORM
        ====================================== */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >

          {/* SMTP Host */}

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
              SMTP Host
            </label>

            <input
              type="text"
              value={smtpHost}
              onChange={(e) => setSmtpHost(e.target.value)}
              placeholder="smtp.gmail.com"
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


          {/* SMTP Port */}

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
              SMTP Port
            </label>

            <input
              type="number"
              value={smtpPort}
              onChange={(e) => setSmtpPort(e.target.value)}
              placeholder="587"
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
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
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


          {/* Password */}

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
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
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


          {/* Sender Name */}

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
              Sender Name
            </label>

            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="SNAP CRM"
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


          {/* Encryption */}

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
              Encryption
            </label>

            <select
              value={encryption}
              onChange={(e) =>
                setEncryption(
                  e.target.value as "TLS" | "SSL" | "None"
                )
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
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >

              <option value="TLS">
                TLS
              </option>

              <option value="SSL">
                SSL
              </option>

              <option value="None">
                None
              </option>

            </select>

          </div>

        </div>


        {/* ======================================
            BUTTONS
        ====================================== */}

        <div
          className="
            flex
            flex-col-reverse
            sm:flex-row
            sm:justify-end
            gap-3
            mt-8
          "
        >

          <button
            type="button"
            onClick={handleTest}
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
            Test Email
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="
              w-full
              sm:w-auto
              bg-blue-600
              hover:bg-blue-700
              disabled:bg-gray-400
              text-white
              px-6
              py-2
              rounded-lg
              transition
            "
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>

        </div>

      </div>

    </div>
  );
}