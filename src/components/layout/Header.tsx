"use client";

import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { themeSettings } = useTheme();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* User Avatar */}
        <div
          className="w-10 h-10 rounded-full text-white flex items-center justify-center font-semibold shadow-md"
          style={{
            backgroundColor: themeSettings.primaryColor,
          }}
        >
          A
        </div>

      </div>

    </header>
  );
}