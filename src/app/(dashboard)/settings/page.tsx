"use client";

import Link from "next/link";
import RoleGuard from "@/components/auth/RoleGuard";

import {
  Building2,
  Users,
  ShieldCheck,
  Mail,
  Palette,
  FileText,
  DatabaseBackup,
} from "lucide-react";

export default function SettingsPage() {

  const settings = [
    {
      title: "Company Information",
      description: "Manage company details",
      href: "/settings/company",
      icon: Building2,
    },
    {
      title: "Users",
      description: "Manage system users",
      href: "/settings/users",
      icon: Users,
    },
    {
      title: "Roles",
      description: "Manage user permissions and roles",
      href: "/settings/roles",
      icon: ShieldCheck,
    },
    {
      title: "Email Settings",
      description: "Configure SMTP and email service",
      href: "/settings/email",
      icon: Mail,
    },
    {
      title: "Theme",
      description: "Customize application appearance",
      href: "/settings/theme",
      icon: Palette,
    },
    {
      title: "Audit Logs",
      description: "View system activity history",
      href: "/settings/audit-logs",
      icon: FileText,
    },
    {
      title: "Backup",
      description: "Backup and restore system data",
      href: "/settings/backup",
      icon: DatabaseBackup,
    },
  ];

  return (

    <RoleGuard allowedRoles={["Admin"]}>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-theme">
              Settings
            </h1>

            <p className="mt-2 text-muted">
              Manage application configuration and preferences
            </p>

          </div>

          <div className="
            card-theme
            border
            border-theme
            px-4
            py-3
            rounded-lg
          ">

            <p className="text-sm text-muted">
              Total Settings
            </p>

            <p className="text-2xl font-bold text-blue-600">
              {settings.length}
            </p>

          </div>

        </div>

        {/* Settings Cards */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        ">

          {settings.map((item) => {

            const Icon = item.icon;

            return (

              <Link
                key={item.title}
                href={item.href}
                className="
                  group
                  card-theme
                  border
                  border-theme
                  rounded-xl
                  p-6
                  shadow-sm
                  hover:shadow-xl
                  hover:border-blue-500
                  transition-all
                  duration-300
                "
              >

                <div className="
                  flex
                  items-center
                  justify-between
                ">

                  <div className="
                    h-12
                    w-12
                    rounded-lg
                    bg-blue-100
                    flex
                    items-center
                    justify-center
                    group-hover:bg-blue-600
                    transition
                  ">

                    <Icon
                      className="
                        h-6
                        w-6
                        text-blue-600
                        group-hover:text-white
                        transition
                      "
                    />

                  </div>

                </div>

                <h2 className="
                  mt-5
                  text-xl
                  font-semibold
                  text-theme
                ">

                  {item.title}

                </h2>

                <p className="
                  mt-2
                  text-muted
                  text-sm
                ">

                  {item.description}

                </p>

                <div className="
                  mt-5
                  text-sm
                  text-blue-600
                  font-medium
                ">

                  Manage →

                </div>

              </Link>

            );

          })}

        </div>

      </div>

    </RoleGuard>

  );
}