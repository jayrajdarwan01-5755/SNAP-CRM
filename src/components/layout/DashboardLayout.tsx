"use client";

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

  return (
    <div
      className="flex h-screen bg-theme overflow-hidden"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >

      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <main
          className="flex-1 overflow-y-auto p-6"
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