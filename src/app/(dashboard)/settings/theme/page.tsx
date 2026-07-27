"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function ThemePage() {
    const { themeSettings, setThemeSettings } = useTheme();

  const [theme, setTheme] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [sidebarColor, setSidebarColor] = useState("#111827");
  const [fontSize, setFontSize] = useState("medium");
  

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const response = await fetch("/api/theme");

      if (!response.ok) {
        throw new Error("Failed to load theme");
      }

      const result = await response.json();

      // Support both:
      // { theme: ... }
      // { success: true, data: { theme: ... } }
      const data = result.data ?? result;

      setTheme(data.theme ?? "light");
      setPrimaryColor(data.primaryColor ?? "#2563eb");
      setSidebarColor(data.sidebarColor ?? "#111827");
      setFontSize(data.fontSize ?? "medium");

      setThemeSettings({
  theme: data.theme ?? "light",
  primaryColor: data.primaryColor ?? "#2563eb",
  sidebarColor: data.sidebarColor ?? "#111827",
  fontSize: data.fontSize ?? "medium",
});

    } catch (error) {
      console.error("Theme Load Error:", error);

      setTheme("light");
      setPrimaryColor("#2563eb");
      setSidebarColor("#111827");
      setFontSize("medium");
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/theme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theme,
          primaryColor,
          sidebarColor,
          fontSize,
        }),
      });

const result = await response.json();

setThemeSettings({
  theme,
  primaryColor,
  sidebarColor,
  fontSize,
});

setMessage(result.message ?? "Theme saved successfully");


    } catch (error) {
      console.error("Save Theme Error:", error);
      setMessage("Failed to save theme settings");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Theme Settings
          </h1>

          <p className="mt-2 text-gray-600">
            Customize application appearance
          </p>
        </div>

        <Link
          href="/settings"
          className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
        >
          ← Back
        </Link>
      </div>

      {/* Form */}
      <div className="bg-white border rounded-xl shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Theme */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Theme
            </label>

            <select
              value={theme || "light"}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          {/* Primary Color */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Primary Color
            </label>

            <input
              type="color"
              value={primaryColor || "#2563eb"}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-full h-10 border rounded-lg"
            />
          </div>

          {/* Sidebar Color */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Sidebar Color
            </label>

            <input
              type="color"
              value={sidebarColor || "#111827"}
              onChange={(e) => setSidebarColor(e.target.value)}
              className="w-full h-10 border rounded-lg"
            />
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Font Size
            </label>

            <select
              value={fontSize || "medium"}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>

        {message && (
          <div className="mt-5 text-green-600 font-semibold">
            {message}
          </div>
        )}

        <div className="flex justify-end mt-8">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Save Theme
          </button>
        </div>
      </div>
    </div>
  );
}