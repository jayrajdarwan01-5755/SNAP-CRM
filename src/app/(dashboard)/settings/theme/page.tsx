"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function ThemePage() {

  const { setThemeSettings } = useTheme();

  const [theme, setTheme] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [sidebarColor, setSidebarColor] = useState("#111827");
  const [fontSize, setFontSize] = useState("medium");

  const [message, setMessage] = useState("");

  // ======================================
  // LOAD THEME
  // ======================================

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

      const data = result.data ?? result;

      setTheme(
        data.theme ?? "light"
      );

      setPrimaryColor(
        data.primaryColor ?? "#2563eb"
      );

      setSidebarColor(
        data.sidebarColor ?? "#111827"
      );

      setFontSize(
        data.fontSize ?? "medium"
      );

      setThemeSettings({

        theme:
          data.theme ?? "light",

        primaryColor:
          data.primaryColor ?? "#2563eb",

        sidebarColor:
          data.sidebarColor ?? "#111827",

        fontSize:
          data.fontSize ?? "medium",

        textColor:
          data.textColor ?? "#111827",

        backgroundColor:
          data.backgroundColor ?? "#ffffff",

      });

    } catch (error) {

      console.error(
        "Theme Load Error",
        error
      );

    }

  };

  // ======================================
  // SAVE THEME
  // ======================================

  const handleSave = async () => {

    try {

      const response = await fetch(
        "/api/theme",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            theme,

            primaryColor,

            sidebarColor,

            fontSize,

            textColor:
              theme === "dark"
                ? "#ffffff"
                : "#111827",

            backgroundColor:
              theme === "dark"
                ? "#111827"
                : "#ffffff",

          }),

        }
      );

      const result =
        await response.json();

      setThemeSettings({

        theme,

        primaryColor,

        sidebarColor,

        fontSize,

        textColor:
          theme === "dark"
            ? "#ffffff"
            : "#111827",

        backgroundColor:
          theme === "dark"
            ? "#111827"
            : "#ffffff",

      });

      setMessage(
        result.message ??
        "Theme saved successfully"
      );

    } catch (error) {

      console.error(
        "Save Theme Error",
        error
      );

      setMessage(
        "Failed to save theme"
      );

    }

  };

  return (

    <div className="
      space-y-6
      bg-theme
      text-theme
      min-h-screen
    ">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="
        flex
        flex-col
        sm:flex-row
        sm:justify-between
        sm:items-center
        gap-4
      ">

        <div>

          <h1 className="
            text-2xl
            sm:text-3xl
            font-bold
            text-theme
          ">
            Theme Settings
          </h1>

          <p className="
            mt-2
            text-muted
          ">
            Customize application appearance
          </p>

        </div>

        <Link
          href="/settings"
          className="
            bg-gray-600
            hover:bg-gray-700
            text-white
            px-5
            py-2
            rounded-lg
            text-center
            transition
          "
        >
          ← Back
        </Link>

      </div>

      {/* ======================================
          THEME FORM
      ====================================== */}

      <div className="
        card-theme
        border
        border-theme
        rounded-xl
        shadow
        p-4
        sm:p-6
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        ">

          {/* ======================================
              THEME
          ====================================== */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Theme
            </label>

            <select
              value={theme}
              onChange={(e) =>
                setTheme(e.target.value)
              }
              className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >

              <option value="light">
                Light
              </option>

              <option value="dark">
                Dark
              </option>

              <option value="system">
                System
              </option>

            </select>

          </div>

          {/* ======================================
              PRIMARY COLOR
          ====================================== */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Primary Color
            </label>

            <div className="
              flex
              items-center
              gap-3
            ">

              <input
                type="color"
                value={primaryColor}
                onChange={(e) =>
                  setPrimaryColor(e.target.value)
                }
                className="
                  w-full
                  h-10
                  border
                  border-theme
                  rounded-lg
                  cursor-pointer
                  bg-theme
                "
              />

            </div>

          </div>

          {/* ======================================
              SIDEBAR COLOR
          ====================================== */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Sidebar Color
            </label>

            <input
              type="color"
              value={sidebarColor}
              onChange={(e) =>
                setSidebarColor(e.target.value)
              }
              className="
                w-full
                h-10
                border
                border-theme
                rounded-lg
                cursor-pointer
                bg-theme
              "
            />

          </div>

          {/* ======================================
              FONT SIZE
          ====================================== */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-theme
              mb-2
            ">
              Font Size
            </label>

            <select
              value={fontSize}
              onChange={(e) =>
                setFontSize(e.target.value)
              }
              className="
                w-full
                border
                border-theme
                bg-theme
                text-theme
                rounded-lg
                px-4
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >

              <option value="small">
                Small
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="large">
                Large
              </option>

            </select>

          </div>

        </div>

        {/* ======================================
            SUCCESS / ERROR MESSAGE
        ====================================== */}

        {message && (

          <div className="
            mt-5
            px-4
            py-3
            rounded-lg
            bg-green-100
            text-green-700
            font-semibold
          ">

            {message}

          </div>

        )}

        {/* ======================================
            SAVE BUTTON
        ====================================== */}

        <div className="
          flex
          justify-end
          mt-8
        ">

          <button
            onClick={handleSave}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-2
              rounded-lg
              transition
            "
          >
            Save Theme
          </button>

        </div>

      </div>

    </div>

  );

}