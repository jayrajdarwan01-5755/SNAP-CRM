"use client";

import Link from "next/link";

export default function SettingsPage() {

  const settings = [

    {
      title: "Company Information",
      description: "Manage company details",
      href: "/settings/company",
    },

    {
      title: "Users",
      description: "Manage system users",
      href: "/settings/users",
    },

    {
      title: "Roles",
      description: "Manage user roles",
      href: "/settings/roles",
    },

    {
      title: "Email Settings",
      description: "Configure email service",
      href: "/settings/email",
    },

    {
      title: "Theme",
      description: "Customize application theme",
      href: "/settings/theme",
    },

    {
      title: "Audit Logs",
      description: "View system activity logs",
      href: "/settings/audit-logs",
    },

    {
      title: "Backup",
      description: "Backup and restore data",
      href: "/settings/backup",
    },

  ];

  return (

    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          Settings
        </h1>

        <p className="text-gray-600 mt-2">
          Manage application settings
        </p>

      </div>

      {/* Settings Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {settings.map((item) => (

          <Link
            key={item.title}
            href={item.href}
            className="
            bg-white
            border
            rounded-xl
            shadow
            p-6
            hover:shadow-lg
            hover:border-blue-500
            transition
            "
          >

            <h2 className="text-xl font-semibold text-gray-900">

              {item.title}

            </h2>

            <p className="text-gray-600 mt-2">

              {item.description}

            </p>
                      </Link>

        ))}

      </div>

    </div>

  );

}