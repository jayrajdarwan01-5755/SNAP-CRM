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
const employeeId = user?.employeeid;
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

console.log("Status:", response.status
    );

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
            size={40}
            style={{ color: themeSettings.primaryColor }}
          />
        );

      case "Sales":
        return (
          <UserPlus
            size={40}
            style={{ color: themeSettings.primaryColor }}
          />
        );

      case "Inventory":
        return (
          <Package
            size={40}
            style={{ color: themeSettings.primaryColor }}
          />
        );

      case "Payroll":
        return (
          <Wallet
            size={40}
            style={{ color: themeSettings.primaryColor }}
          />
        );

      case "Leave":
        return (
          <CalendarDays
            size={40}
            style={{ color: themeSettings.primaryColor }}
          />
        );

      case "Attendance":
        return (
          <Clock
            size={40}
            style={{ color: themeSettings.primaryColor }}
          />
        );

      default:
        return (
          <UserRound
            size={40}
            style={{ color: themeSettings.primaryColor }}
          />
        );
    }
  };

 if (loading) {
  return (
    <div className="animate-pulse space-y-6">

      <div className="h-10 w-56 bg-gray-300 rounded"></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
  key={item}
  className="h-32 rounded-xl"
  style={{
    background: "rgba(128,128,128,0.2)",
  }}
/>        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <div
  className="h-80 rounded-xl"
  style={{
    background: "rgba(128,128,128,0.2)",
  }}
></div>       
<div
  className="h-80 rounded-xl"
  style={{
    background: "rgba(128,128,128,0.2)",
  }}
></div>

      </div>

    </div>
  );
}

  return (
    <div
  className="space-y-6"
  style={{
    color: themeSettings.textColor,
  }}
>

  {/* Header */}

  <div>
    <h1 className="text-3xl font-bold">
      Dashboard
    </h1>

    <p className="mt-2">
      Welcome to SNAP CRM
    </p>
  </div>

  {/* Dashboard Cards */}

  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

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
      className={`block rounded-xl shadow-md border p-6 transition ${
        cardLink !== "#"
          ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer"
          : "cursor-default"
      }`}
      style={{
        backgroundColor: themeSettings.backgroundColor,
        borderColor: themeSettings.primaryColor,
      }}
    >

      <div className="flex justify-between">

        <div>

          <p className="font-semibold text-sm">
            {card.title}
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {card.value}
          </h2>

          <p className="text-xs opacity-70 mt-2">
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

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

    {/* Activities */}

    <div
      className="rounded-xl shadow-md border p-6"
      style={{
        backgroundColor: themeSettings.backgroundColor,
        borderColor: themeSettings.primaryColor,
      }}
    >

      <h2 className="text-xl font-bold mb-4">
        Recent Activities
      </h2>

      <ul className="space-y-3">

        {dashboard.activities.map((activity) => (

          <li
            key={activity.id}
            className="border-b pb-2"
          >

            <p
              className="font-medium"
              style={{
                color: themeSettings.primaryColor,
              }}
            >
              {activity.title}
            </p>

            <p className="text-sm opacity-70">
              {activity.module} - {activity.date}
            </p>

          </li>

        ))}

      </ul>

    </div>

         {/* Quick Links */}

      <div
        className="rounded-xl shadow-md border p-6"
        style={{
          backgroundColor: themeSettings.backgroundColor,
          borderColor: themeSettings.primaryColor,
        }}
      >

        <h2 className="text-xl font-bold mb-4">
          Quick Links
        </h2>

        <div className="space-y-3">

          {/* Admin Quick Links */}

          {user?.role === "Admin" && (
            <>
              <a
                href="/hr/employees"
                className="block hover:underline"
                style={{
                  color: themeSettings.primaryColor,
                }}
              >
                Manage Employees →
              </a>

              <a
                href="/sales/leads"
                className="block hover:underline"
                style={{
                  color: themeSettings.primaryColor,
                }}
              >
                View Leads →
              </a>

              <a
                href="/inventory/products"
                className="block hover:underline"
                style={{
                  color: themeSettings.primaryColor,
                }}
              >
                Manage Products →
              </a>

              <a
                href="/sales/customers"
                className="block hover:underline"
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
    {/* Manage Employees */}

    <a
      href="/hr/employees"
      className="block hover:underline"
      style={{
        color: themeSettings.primaryColor,
      }}
    >
      Manage Employees →
    </a>

    {/* Manage Leaves */}

    <a
      href="/hr/leave"
      className="block hover:underline"
      style={{
        color: themeSettings.primaryColor,
      }}
    >
      Manage Leaves →
    </a>

    {/* Manage Payroll */}

    <a
      href="/hr/payroll"
      className="block hover:underline"
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
                className="block hover:underline"
                style={{
                  color: themeSettings.primaryColor,
                }}
              >
                View Leads →
              </a>

              <a
                href="/sales/opportunities"
                className="block hover:underline"
                style={{
                  color: themeSettings.primaryColor,
                }}
              >
                View Opportunities →
              </a>

              <a
                href="/sales/customers"
                className="block hover:underline"
                style={{
                  color: themeSettings.primaryColor,
                }}
              >
                Manage Customers →
              </a>

              <a
                href="/inventory/products"
                className="block hover:underline"
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
    {/* My Profile */}

    <a
      href={`/hr/employees/${user.employeeid}`}
      className="block hover:underline"
      style={{
        color: themeSettings.primaryColor,
      }}
    >
      My Profile →
    </a>

    {/* Apply Leave */}

    <a
      href="/hr/leave/add"
      className="block hover:underline"
      style={{
        color: themeSettings.primaryColor,
      }}
    >
      Apply Leave →
    </a>

    {/* My Leaves */}

 <a
  href="/hr/leave"
  className="block hover:underline"
  style={{
    color: themeSettings.primaryColor,
  }}
>
  My Leaves →
</a>


    {/* My Payroll */}

    <a
      href={`/hr/payroll/${user.employeeid}`}
      className="block hover:underline"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


        {/* CRM Statistics */}

        <div
          className="rounded-xl shadow border p-6"
          style={{
            backgroundColor: themeSettings.backgroundColor,
            borderColor: themeSettings.primaryColor,
          }}
        >

          <h2 className="text-xl font-bold mb-4">
            CRM Statistics
          </h2>

          <div style={{ width: "100%", height: 300 }}>

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={chartData}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill={themeSettings.primaryColor}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* Module Distribution */}

        <div
          className="rounded-xl shadow border p-6"
          style={{
            backgroundColor: themeSettings.backgroundColor,
            borderColor: themeSettings.primaryColor,
          }}
        >

          <h2 className="text-xl font-bold mb-4">
            Module Distribution
          </h2>

          <div style={{ width: "100%", height: 300 }}>

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
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