"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const [hrOpen, setHrOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);

  const menuClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-slate-800 hover:text-white"
    }`;

  const subMenuClass = (path: string) =>
    `block ml-10 px-3 py-2 rounded-md transition ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white">
          SNAP CRM
        </h1>
      </div>

      <nav className="p-4 space-y-2">

        {/* Dashboard */}
        <Link href="/dashboard" className={menuClass("/dashboard")}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        {/* ================= HR ================= */}

        <button
          onClick={() => setHrOpen(!hrOpen)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white transition"
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

        {hrOpen && (
          <div className="space-y-1">
            <Link
              href="/hr/employees"
              className={subMenuClass("/hr/employees")}
            >
              Employees
            </Link>

            <Link
              href="/hr/leave"
              className={subMenuClass("/hr/leave")}
            >
              Leave
            </Link>

            <Link
              href="/hr/payroll"
              className={subMenuClass("/hr/payroll")}
            >
              Payroll
            </Link>
          </div>
        )}

        {/* ================= SALES ================= */}

        <button
          onClick={() => setSalesOpen(!salesOpen)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white transition"
        >
          <div className="flex items-center gap-3">
            <Briefcase size={20} />
            <span>Sales</span>
          </div>

          {salesOpen ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>

        {salesOpen && (
          <div className="space-y-1">
            <Link
              href="/sales/leads"
              className={subMenuClass("/sales/leads")}
            >
              Leads
            </Link>

            <Link
              href="/sales/opportunities"
              className={subMenuClass("/sales/opportunities")}
            >
              Opportunities
            </Link>

            <Link
              href="/sales/customers"
              className={subMenuClass("/sales/customers")}
            >
              Customers
            </Link>
          </div>
        )}

        {/* ================= INVENTORY ================= */}

        <button
          onClick={() => setInventoryOpen(!inventoryOpen)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white transition"
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

        {inventoryOpen && (
          <div className="space-y-1">
            <Link
              href="/inventory/products"
              className={subMenuClass("/inventory/products")}
            >
              Products
            </Link>

            <Link
              href="/inventory/categories"
              className={subMenuClass("/inventory/categories")}
            >
              Categories
            </Link>

            <Link
              href="/inventory/suppliers"
              className={subMenuClass("/inventory/suppliers")}
            >
              Suppliers
            </Link>
          </div>
        )}

        {/* Reports */}

        <Link href="/reports" className={menuClass("/reports")}>
          <FileBarChart2 size={20} />
          <span>Reports</span>
        </Link>

        {/* Settings */}

        <Link href="/settings" className={menuClass("/settings")}>
          <Settings size={20} />
          <span>Settings</span>
        </Link>

      </nav>
    </aside>
  );
}