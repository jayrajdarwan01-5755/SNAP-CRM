"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useLoading } from "@/context/LoadingContext";
import { useAuth } from "@/context/AuthContext";

import {
  LayoutDashboard,
  Users,
  Briefcase,
  Package,
  FileBarChart2,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const { user } = useAuth();
  const role = user?.role ?? "";

  console.log("Logged In Role :", role);

  const pathname = usePathname();
  const router = useRouter();

  const { themeSettings } = useTheme();
  const { setLoading } = useLoading();

  const [hrOpen, setHrOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);

  const menuClass = (path: string) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      pathname === path
        ? "text-white"
        : "text-gray-300 hover:text-white"
    }`;

  const subMenuClass = (path: string) =>
    `w-full text-left block ml-10 px-3 py-2 rounded-md transition ${
      pathname === path
        ? "text-white"
        : "text-gray-300 hover:text-white"
    }`;

  const navigate = (path: string) => {
    setLoading(true);

    router.push(path);

    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  return (
    <aside
      className="w-64 h-screen sticky top-0 border-r overflow-y-auto"
      style={{
        backgroundColor: themeSettings.sidebarColor,
        borderColor: "#334155",
      }}
    >
      <div
        className="h-16 flex items-center px-6 border-b"
        style={{
          borderColor: "#334155",
        }}
      >
        <h1 className="text-2xl font-bold text-white">
          SNAP CRM
        </h1>
      </div>

      <nav className="p-4 space-y-2">

        {/* Dashboard */}

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className={menuClass("/dashboard")}
          style={{
            backgroundColor:
              pathname === "/dashboard"
                ? themeSettings.primaryColor
                : "transparent",
          }}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </button>

        {/* HR */}

        {(role === "Admin" || role === "HR") && (
          <button
            type="button"
            onClick={() => setHrOpen(!hrOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-300 hover:text-white transition"
          >
            <div className="flex items-center gap-3">
              <Users size={20} />
              <span>HR</span>
            </div>

            {hrOpen ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
        )}

        {(role === "Admin" || role === "HR") && hrOpen && (
          <div className="space-y-1">

            <button
              type="button"
              onClick={() => navigate("/hr/employees")}
              className={subMenuClass("/hr/employees")}
              style={{
                backgroundColor:
                  pathname === "/hr/employees"
                    ? themeSettings.primaryColor
                    : "transparent",
              }}
            >
              Employees
            </button>

            <button
              type="button"
              onClick={() => navigate("/hr/leave")}
              className={subMenuClass("/hr/leave")}
              style={{
                backgroundColor:
                  pathname === "/hr/leave"
                    ? themeSettings.primaryColor
                    : "transparent",
              }}
            >
              Leave
            </button>

            <button
              type="button"
              onClick={() => navigate("/hr/payroll")}
              className={subMenuClass("/hr/payroll")}
              style={{
                backgroundColor:
                  pathname === "/hr/payroll"
                    ? themeSettings.primaryColor
                    : "transparent",
              }}
            >
              Payroll
            </button>

          </div>
        )}

    {/* SALES */}

        {(role === "Admin" || role === "Manager") && (
  <button
    type="button"
    onClick={() => setSalesOpen(!salesOpen)}
    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-300 hover:text-white transition"
  >
    <div className="flex items-center gap-3">
      <Briefcase size={20} />
      <span>Sales</span>
    </div>

    {salesOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
  </button>
)}    

{(role === "Admin" || role === "Manager") && salesOpen && (
  <div className="space-y-1">

    <button
      type="button"
      onClick={() => navigate("/sales/leads")}
      className={subMenuClass("/sales/leads")}
      style={{
        backgroundColor:
          pathname === "/sales/leads"
            ? themeSettings.primaryColor
            : "transparent",
      }}
    >
      Leads
    </button>

    <button
      type="button"
      onClick={() => navigate("/sales/opportunities")}
      className={subMenuClass("/sales/opportunities")}
      style={{
        backgroundColor:
          pathname === "/sales/opportunities"
            ? themeSettings.primaryColor
            : "transparent",
      }}
    >
      Opportunities
    </button>

    <button
      type="button"
      onClick={() => navigate("/sales/customers")}
      className={subMenuClass("/sales/customers")}
      style={{
        backgroundColor:
          pathname === "/sales/customers"
            ? themeSettings.primaryColor
            : "transparent",
      }}
    >
      Customers
    </button>

  </div>
)}


                {/* INVENTORY */}
        {(role === "Admin" || role === "Manager") && (
          <button
            type="button"
            onClick={() => setInventoryOpen(!inventoryOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-300 hover:text-white transition"
          >
            <div className="flex items-center gap-3">
              <Package size={20} />
              <span>Inventory</span>
            </div>

            {inventoryOpen ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
        )}



        {(role === "Admin" || role === "Manager") && inventoryOpen && (
          <div className="space-y-1">

            <button
              type="button"
              onClick={() => navigate("/inventory/products")}
              className={subMenuClass("/inventory/products")}
              style={{
                backgroundColor:
                  pathname === "/inventory/products"
                    ? themeSettings.primaryColor
                    : "transparent",
              }}
            >
              Products
            </button>

            <button
              type="button"
              onClick={() => navigate("/inventory/categories")}
              className={subMenuClass("/inventory/categories")}
              style={{
                backgroundColor:
                  pathname === "/inventory/categories"
                    ? themeSettings.primaryColor
                    : "transparent",
              }}
            >
              Categories
            </button>

            <button
              type="button"
              onClick={() => navigate("/inventory/suppliers")}
              className={subMenuClass("/inventory/suppliers")}
              style={{
                backgroundColor:
                  pathname === "/inventory/suppliers"
                    ? themeSettings.primaryColor
                    : "transparent",
              }}
            >
              Suppliers
            </button>

          </div>
        )}

        {/* REPORTS */}
        <button
          type="button"
          onClick={() => navigate("/reports")}
          className={menuClass("/reports")}
          style={{
            backgroundColor:
              pathname === "/reports"
                ? themeSettings.primaryColor
                : "transparent",
          }}
        >
          <FileBarChart2 size={20} />
          <span>Reports</span>
        </button>

        {/* SETTINGS */}
        {role === "Admin" && (
          <button
            type="button"
            onClick={() => navigate("/settings")}
            className={menuClass("/settings")}
            style={{
              backgroundColor:
                pathname === "/settings"
                  ? themeSettings.primaryColor
                  : "transparent",
            }}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        )}

      </nav>
    </aside>
  );
}