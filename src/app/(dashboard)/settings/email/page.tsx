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

  const [encryption, setEncryption] = useState<"TLS" | "SSL" | "None">("TLS");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {

    loadSettings();

  }, []);

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

    }

    catch (error) {

      console.log(error);

      alert("Failed to load Email Settings");

    }

    finally {

      setLoading(false);

    }

  };

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

    }

    catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

    finally {

      setSaving(false);

    }

  };

 const handleTest = async () => {

  try {


    const response = await fetch(
      "/api/email/test",
      {
        method:"POST"
      }
    );


    const data = await response.json();


    if(response.ok){

      alert(data.message);

    }
    else{

      alert(data.message);

    }


  }
  catch(error){

    console.log(error);

    alert("Something went wrong");

  }

};

  if (loading) {

    return (

      <div className="p-6 text-center bg-theme text-theme min-h-screen">

        Loading...

      </div>

    );

  }

  return (

    <div className="space-y-6 bg-theme text-theme min-h-screen">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-theme">

            Email Settings

          </h1>

          <p className="text-muted mt-2">

            Configure SMTP email settings

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

      {/* Form */}

      <div className="card-theme border-theme rounded-xl shadow p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* SMTP Host */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">

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
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          {/* SMTP Port */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">

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
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          {/* Email */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">

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
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          {/* Password */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">

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
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          {/* Sender Name */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">

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
              rounded-lg
              px-4
              py-2
              "
            />

          </div>

          {/* Encryption */}

          <div>

            <label className="block text-sm font-semibold text-theme mb-2">

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

        {/* Buttons */}

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={handleTest}
            className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-6
            py-2
            rounded-lg
            "
          >

            Test Email

          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="
            bg-blue-600
            hover:bg-blue-700
            disabled:bg-gray-400
            text-white
            px-6
            py-2
            rounded-lg
            "
          >

            {saving ? "Saving..." : "Save Settings"}

          </button>

        </div>

      </div>

    </div>

  );

}