"use client";

import { useState } from "react";
import Link from "next/link";

export default function ThemePage() {

  const [theme, setTheme] = useState("Light");

  const [primaryColor, setPrimaryColor] = useState("Blue");

  const [sidebarStyle, setSidebarStyle] = useState("Dark");


  const handleSave = () => {

    alert("Theme Settings Saved Successfully");

  };


  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex justify-between items-center">


        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Theme Settings
          </h1>

          <p className="text-gray-600 mt-2">
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
          "

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

              value={theme}

              onChange={(e)=>setTheme(e.target.value)}

              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "

            >

              <option value="Light">
                Light
              </option>

              <option value="Dark">
                Dark
              </option>

              <option value="System">
                System
              </option>

            </select>

          </div>




          {/* Primary Color */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Primary Color
            </label>

            <select

              value={primaryColor}

              onChange={(e)=>setPrimaryColor(e.target.value)}

              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "

            >

              <option value="Blue">
                Blue
              </option>

              <option value="Green">
                Green
              </option>

              <option value="Purple">
                Purple
              </option>

              <option value="Red">
                Red
              </option>

            </select>

          </div>
                    {/* Sidebar Style */}

          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Sidebar Style
            </label>

            <select

              value={sidebarStyle}

              onChange={(e) => setSidebarStyle(e.target.value)}

              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "

            >

              <option value="Dark">
                Dark
              </option>

              <option value="Light">
                Light
              </option>

            </select>

          </div>


        </div>



        {/* Save Button */}

        <div className="flex justify-end mt-8">

          <button

            onClick={handleSave}

            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-2
            rounded-lg
            "

          >

            Save Theme

          </button>

        </div>


      </div>


    </div>

  );

}