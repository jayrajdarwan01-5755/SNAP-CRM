"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  LogOut,
  Settings,
  KeyRound,
} from "lucide-react";

export default function Header() {
  const { themeSettings } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
  <header
  className="h-16 border-b flex items-center justify-between px-6"
  style={{
    background: "var(--background)",
    color: "var(--foreground)",
    borderColor: "#d1d5db",
  }}
>
 <h2
  className="text-2xl font-bold"
  style={{
    color: "var(--foreground)",
  }}
>        Dashboard
      </h2>

      <div className="relative" ref={menuRef}>

        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full text-white font-semibold flex items-center justify-center shadow-md"
          style={{
            backgroundColor: themeSettings.primaryColor,
          }}
        >
          {user?.fullname?.charAt(0).toUpperCase() || "A"}
        </button>

        {open && (

        <div
  className="absolute right-0 mt-3 w-64 rounded-xl shadow-lg border z-50"
  style={{
    background: "var(--background)",
    color: "var(--foreground)",
    borderColor: "#d1d5db",
  }}
>

            <div
  className="p-4 border-b"
  style={{
    borderColor: "#d1d5db",
  }}
>

              <h3
  className="font-semibold"
  style={{
    color: "var(--foreground)",
  }}
>
                {user?.fullname}
              </h3>

              <p
  className="text-sm"
  style={{
    opacity: 0.7,
  }}
>
                {user?.role}
              </p>

            </div>

            <button
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-80"
            >
              <User size={18} />
              My Profile
            </button>

            <button
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-80"
            >
              <KeyRound size={18} />
              Change Password
            </button>

            <button
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-80"
            >
              <Settings size={18} />
              Settings
            </button>

            <hr />

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        )}

      </div>

    </header>
  );
}