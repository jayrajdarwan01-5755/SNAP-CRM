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
Menu,
} from "lucide-react";

interface HeaderProps {
onMenuClick?: () => void;
}

export default function Header({
onMenuClick,
}: HeaderProps) {
const { themeSettings } = useTheme();
const { user, logout } = useAuth();
const router = useRouter();

const [open, setOpen] = useState(false);

const menuRef = useRef<HTMLDivElement | null>(null);

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
  document.removeEventListener("mousedown", handleClickOutside);


}, []);

const handleLogout = () => {
logout();
router.push("/");
};

const handleNavigation = (path: string) => {
setOpen(false);
router.push(path);
};

return (
<header
className="h-16 shrink-0 border-b flex items-center justify-between px-3 sm:px-4 md:px-6 relative z-30"
style={{
background: "var(--background)",
color: "var(--foreground)",
borderColor: "#334155",
}}
>
{/* Mobile Menu Button */} <button
     type="button"
     onClick={onMenuClick}
     className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition hover:bg-black/10 dark:hover:bg-white/10"
     aria-label="Open sidebar"
   > <Menu size={24} /> </button>

  {/* Header Left Space on Desktop */}
  <div className="hidden lg:block" />

  {/* Profile Menu */}
  <div
    className="relative"
    ref={menuRef}
  >
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full text-white font-semibold flex items-center justify-center shadow-md shrink-0"
      style={{
        backgroundColor: themeSettings.primaryColor,
      }}
      aria-label="Open profile menu"
    >
      {user?.fullname?.charAt(0).toUpperCase() || "A"}
    </button>

    {open && (
      <div
        className="absolute right-0 mt-3 w-[calc(100vw-24px)] max-w-64 rounded-xl shadow-lg border overflow-hidden z-50"
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
          borderColor: "#d1d5db",
        }}
      >
        {/* User Information */}
        <div
          className="p-4 border-b"
          style={{
            borderColor: "#d1d5db",
          }}
        >
          <h3
            className="font-semibold text-sm sm:text-base truncate"
            style={{
              color: "var(--foreground)",
            }}
          >
            {user?.fullname || "User"}
          </h3>

          <p
            className="text-xs sm:text-sm mt-1"
            style={{
              opacity: 0.7,
            }}
          >
            {user?.role || "User"}
          </p>
        </div>

        {/* My Profile */}
        <button
          type="button"
          onClick={() => handleNavigation("/profile")}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm sm:text-base transition hover:bg-black/5 dark:hover:bg-white/5"
        >
          <User
            size={18}
            className="shrink-0"
          />
          <span>My Profile</span>
        </button>

        {/* Change Password */}
        <button
          type="button"
          onClick={() => handleNavigation("/change-password")}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm sm:text-base transition hover:bg-black/5 dark:hover:bg-white/5"
        >
          <KeyRound
            size={18}
            className="shrink-0"
          />
          <span>Change Password</span>
        </button>

        {/* Settings */}
        <button
          type="button"
          onClick={() => handleNavigation("/settings")}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm sm:text-base transition hover:bg-black/5 dark:hover:bg-white/5"
        >
          <Settings
            size={18}
            className="shrink-0"
          />
          <span>Settings</span>
        </button>

        {/* Logout */}
        <div
          className="border-t"
          style={{
            borderColor: "#d1d5db",
          }}
        >
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition text-sm sm:text-base"
          >
            <LogOut
              size={18}
              className="shrink-0"
            />
            <span>Logout</span>
          </button>
        </div>
      </div>
    )}
  </div>
</header>


);
}
