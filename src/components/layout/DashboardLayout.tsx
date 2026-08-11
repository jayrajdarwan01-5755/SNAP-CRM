"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

import { useLoading } from "@/context/LoadingContext";
import PageLoader from "@/components/PageLoader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const { loading } = useLoading();

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  return (
    <div
      className="flex h-screen bg-theme overflow-hidden"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div className="flex-shrink-0">
       <Sidebar
  mobileOpen={mobileSidebarOpen}
  onClose={() => setMobileSidebarOpen(false)}
/>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 min-w-0 flex-col overflow-hidden">
        {/* Header */}
        <Header
          onMenuClick={() => setMobileSidebarOpen(true)}
        />

        {/* Page Content */}
        <main
          className="flex-1 min-w-0 overflow-y-auto p-3 sm:p-4 md:p-5 lg:p-6"
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          {loading ? <PageLoader /> : children}
        </main>
      </div>
    </div>
  );
}