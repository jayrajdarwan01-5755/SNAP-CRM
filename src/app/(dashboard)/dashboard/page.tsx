"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Users,
  UserPlus,
  Package,
  UserRound,
  CalendarDays,
  Wallet,
  Clock,
} from "lucide-react";

interface Activity {
  id: number;
  title: string;
  description?: string;
  module: string;
  date: string;
}

interface DashboardCard {
  title: string;
  value: string | number;
  module: string;
}

interface DashboardData {
  cards: DashboardCard[];
  activities: Activity[];
}

export default function DashboardPage() {
  const { themeSettings } = useTheme();
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState<DashboardData>({
    cards: [],
    activities: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboard();
    }
  }, [user]);

  const loadDashboard = async () => {
    try {
      console.log("User:", user);
      console.log("Employee ID:", user?.employeeid);

      const url = `/api/dashboard?role=${user?.role}&employeeId=${user?.employeeid}`;

      console.log("Fetching:", url);

      const response = await fetch(url);

      console.log("Status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const text = await response.text();

      if (!text.trim()) {
        throw new Error("Dashboard API returned empty response");
      }

      const result = JSON.parse(text);

      console.log(result);

      setDashboard({
        cards: result.data?.cards || [],
        activities: result.data?.activities || [],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = (dashboard.cards || [])
    .map((card) => ({
      name: card.title,
      value:
        typeof card.value === "number"
          ? card.value
          : parseInt(String(card.value)) || 0,
    }))
    .filter((item) => item.value > 0);

  console.log("Chart Data:", chartData);

  const pieColors = [
    themeSettings.primaryColor,
    "#22c55e",
    "#a855f7",
    "#f97316",
  ];

  const getIcon = (module: string) => {
    switch (module) {
      case "HR":
        return (
          <Users
            size={32}
            className="sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0"
            style={{ color: themeSettings.primaryColor }}
          />
        );

      case "Sales":
        return (
          <UserPlus
            size={32}
            className="sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0"
            style={{ color: themeSettings.primaryColor }}
          />
        );

      case "Inventory":
        return (
          <Package
            size={32}
            className="sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0"
            style={{ color: themeSettings.primaryColor }}
          />
        );

      case "Payroll":
        return (
          <Wallet
            size={32}
            className="sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0"
            style={{ color: themeSettings.primaryColor }}
          />
        );

      case "Leave":
        return (
          <CalendarDays
            size={32}
            className="sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0"
            style={{ color: themeSettings.primaryColor }}
          />
        );

      case "Attendance":
        return (
          <Clock
            size={32}
            className="sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0"
            style={{ color: themeSettings.primaryColor }}
          />
        );

      default:
        return (
          <UserRound
            size={32}
            className="sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0"
            style={{ color: themeSettings.primaryColor }}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="w-full space-y-5 sm:space-y-6 animate-pulse">
        {/* Header Skeleton */}
        <div>
          <div className="h-8 sm:h-10 w-40 sm:w-56 rounded bg-gray-300" />
          <div className="h-4 w-52 sm:w-72 rounded bg-gray-300 mt-3" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-28 sm:h-32 rounded-xl"
              style={{
                background: "rgba(128,128,128,0.2)",
              }}
            />
          ))}
        </div>

        {/* Activities / Quick Links Skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          <div
            className="h-64 sm:h-72 rounded-xl"
            style={{
              background: "rgba(128,128,128,0.2)",
            }}
          />

          <div
            className="h-64 sm:h-72 rounded-xl"
            style={{
              background: "rgba(128,128,128,0.2)",
            }}
          />
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          <div
            className="h-72 sm:h-80 rounded-xl"
            style={{
              background: "rgba(128,128,128,0.2)",
            }}
          />

          <div
            className="h-72 sm:h-80 rounded-xl"
            style={{
              background: "rgba(128,128,128,0.2)",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full min-w-0 space-y-5 sm:space-y-6"
      style={{
        color: themeSettings.textColor,
      }}
    >
      {/* Header */}
      <div className="min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold break-words">
          Dashboard
        </h1>

        <p className="mt-1.5 sm:mt-2 text-sm sm:text-base opacity-80">
          Welcome to SNAP CRM
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {dashboard.cards.map((card) => {
          let cardLink = "#";

          if (user?.role === "Employee") {
            switch (card.title) {
              case "My Profile":
                cardLink = `/hr/employees/${user.employeeid}`;
                break;

              case "Leave Balance":
                cardLink = "/hr/leave/my-leaves";
                break;

              case "Attendance":
                cardLink = "#";
                break;

              case "Payroll Status":
                cardLink = "/hr/payroll";
                break;
            }
          }

          return (
            <Link
              key={card.title}
              href={cardLink}
              className={`block min-w-0 rounded-xl shadow-md border p-4 sm:p-5 lg:p-6 transition ${
                cardLink !== "#"
                  ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                  : "cursor-default"
              }`}
              style={{
                backgroundColor: themeSettings.backgroundColor,
                borderColor: themeSettings.primaryColor,
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-xs sm:text-sm break-words">
                    {card.title}
                  </p>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2 sm:mt-3 break-words">
                    {card.value}
                  </h2>

                  <p className="text-xs opacity-70 mt-1.5 sm:mt-2">
                    {card.module}
                  </p>
                </div>

                {getIcon(card.module)}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Activities + Quick Links */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        {/* Recent Activities */}
        <div
          className="min-w-0 rounded-xl shadow-md border p-4 sm:p-5 lg:p-6"
          style={{
            backgroundColor: themeSettings.backgroundColor,
            borderColor: themeSettings.primaryColor,
          }}
        >
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            Recent Activities
          </h2>

          {dashboard.activities.length > 0 ? (
            <ul className="space-y-3">
              {dashboard.activities.map((activity) => (
                <li
                  key={activity.id}
                  className="border-b pb-3 last:border-b-0 last:pb-0"
                >
                  <p
                    className="font-medium text-sm sm:text-base break-words"
                    style={{
                      color: themeSettings.primaryColor,
                    }}
                  >
                    {activity.title}
                  </p>

                  <p className="text-xs sm:text-sm opacity-70 mt-1 break-words">
                    {activity.description
                      ? `${activity.description} • `
                      : ""}
                    {activity.module} • {activity.date}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm opacity-70">
              No recent activities found.
            </p>
          )}
        </div>

        {/* Quick Links */}
        <div
          className="min-w-0 rounded-xl shadow-md border p-4 sm:p-5 lg:p-6"
          style={{
            backgroundColor: themeSettings.backgroundColor,
            borderColor: themeSettings.primaryColor,
          }}
        >
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            Quick Links
          </h2>

          <div className="space-y-3">
            {/* Admin Quick Links */}
            {user?.role === "Admin" && (
              <>
                <a
                  href="/hr/employees"
                  className="block text-sm sm:text-base hover:underline break-words"
                  style={{
                    color: themeSettings.primaryColor,
                  }}
                >
                  Manage Employees →
                </a>

                <a
                  href="/sales/leads"
                  className="block text-sm sm:text-base hover:underline break-words"
                  style={{
                    color: themeSettings.primaryColor,
                  }}
                >
                  View Leads →
                </a>

                <a
                  href="/inventory/products"
                  className="block text-sm sm:text-base hover:underline break-words"
                  style={{
                    color: themeSettings.primaryColor,
                  }}
                >
                  Manage Products →
                </a>

                <a
                  href="/sales/customers"
                  className="block text-sm sm:text-base hover:underline break-words"
                  style={{
                    color: themeSettings.primaryColor,
                  }}
                >
                  Manage Customers →
                </a>
              </>
            )}

            {/* HR Quick Links */}
            {user?.role === "HR" && (
              <>
                <a
                  href="/hr/employees"
                  className="block text-sm sm:text-base hover:underline break-words"
                  style={{
                    color: themeSettings.primaryColor,
                  }}
                >
                  Manage Employees →
                </a>

                <a
                  href="/hr/leave"
                  className="block text-sm sm:text-base hover:underline break-words"
                  style={{
                    color: themeSettings.primaryColor,
                  }}
                >
                  Manage Leaves →
                </a>

                <a
                  href="/hr/payroll"
                  className="block text-sm sm:text-base hover:underline break-words"
                  style={{
                    color: themeSettings.primaryColor,
                  }}
                >
                  Manage Payroll →
                </a>
              </>
            )}

            {/* Manager Quick Links */}
            {user?.role === "Manager" && (
              <>
                <a
                  href="/sales/leads"
                  className="block text-sm sm:text-base hover:underline break-words"
                  style={{
                    color: themeSettings.primaryColor,
                  }}
                >
                  View Leads →
                </a>

                <a
                  href="/sales/opportunities"
                  className="block text-sm sm:text-base hover:underline break-words"
                  style={{
                    color: themeSettings.primaryColor,
                  }}
                >
                  View Opportunities →
                </a>

                <a
                  href="/sales/customers"
                  className="block text-sm sm:text-base hover:underline break-words"
                  style={{
                    color: themeSettings.primaryColor,
                  }}
                >
                  Manage Customers →
                </a>

                <a
                  href="/inventory/products"
                  className="block text-sm sm:text-base hover:underline break-words"
                  style={{
                    color: themeSettings.primaryColor,
                  }}
                >
                  Manage Products →
                </a>
              </>
            )}

            {/* Employee Quick Links */}
            {user?.role === "Employee" && (
              <>
                <a
                  href={`/hr/employees/${user.employeeid}`}
                  className="block text-sm sm:text-base hover:underline break-words"
                  style={{
                    color: themeSettings.primaryColor,
                  }}
                >
                  My Profile →
                </a>

                <a
                  href="/hr/leave/add"
                  className="block text-sm sm:text-base hover:underline break-words"
                  style={{
                    color: themeSettings.primaryColor,
                  }}
                >
                  Apply Leave →
                </a>

                <a
                  href="/hr/leave"
                  className="block text-sm sm:text-base hover:underline break-words"
                  style={{
                    color: themeSettings.primaryColor,
                  }}
                >
                  My Leaves →
                </a>

                <a
                  href={`/hr/payroll/${user.employeeid}`}
                  className="block text-sm sm:text-base hover:underline break-words"
                  style={{
                    color: themeSettings.primaryColor,
                  }}
                >
                  My Payroll →
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        {/* CRM Statistics */}
        <div
          className="min-w-0 rounded-xl shadow border p-4 sm:p-5 lg:p-6"
          style={{
            backgroundColor: themeSettings.backgroundColor,
            borderColor: themeSettings.primaryColor,
          }}
        >
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            CRM Statistics
          </h2>

          <div className="w-full h-[260px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 5,
                  left: -15,
                  bottom: 5,
                }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11 }}
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill={themeSettings.primaryColor}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Module Distribution */}
        <div
          className="min-w-0 rounded-xl shadow border p-4 sm:p-5 lg:p-6"
          style={{
            backgroundColor: themeSettings.backgroundColor,
            borderColor: themeSettings.primaryColor,
          }}
        >
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            Module Distribution
          </h2>

          <div className="w-full h-[260px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="65%"
                  label
                >
                  {chartData.map((item, index) => (
                    <Cell
                      key={index}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}