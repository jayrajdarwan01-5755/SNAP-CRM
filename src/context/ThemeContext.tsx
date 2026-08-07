"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ThemeSettings {
  theme: string;
  primaryColor: string;
  sidebarColor: string;
  fontSize: string;

  textColor: string;
  backgroundColor: string;
}

interface ThemeContextType {
  themeSettings: ThemeSettings;
  setThemeSettings: React.Dispatch<
    React.SetStateAction<ThemeSettings>
  >;
  loadTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [themeSettings, setThemeSettings] =
   useState<ThemeSettings>({
  theme: "light",
  primaryColor: "#2563eb",
  sidebarColor: "#111827",
  fontSize: "medium",

  textColor: "#111827",
  backgroundColor: "#ffffff",
});

  const loadTheme = async () => {
    try {
      const response = await fetch("/api/theme");
      const result = await response.json();

      const data = result.data ?? result;

     setThemeSettings({
  theme: data.theme ?? "light",

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
      console.error("Theme Load Error:", error);
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

useEffect(() => {
  const root = document.documentElement;

  // =========================
  // Primary Color
  // =========================
  root.style.setProperty(
    "--primary-color",
    themeSettings.primaryColor
  );

  // =========================
  // Sidebar Color
  // =========================
  root.style.setProperty(
    "--sidebar-color",
    themeSettings.sidebarColor
  );

  // =========================
  // Font Size
  // =========================
  let size = "16px";

  switch (themeSettings.fontSize) {
    case "small":
      size = "14px";
      break;

    case "large":
      size = "18px";
      break;

    default:
      size = "16px";
  }

  root.style.fontSize = size;

  // =========================
  // Theme Apply
  // =========================
  const applyTheme = (isDark: boolean) => {
    if (isDark) {
      root.classList.add("dark");

      root.style.setProperty("--background", "#111827");
      root.style.setProperty("--foreground", "#f9fafb");
    } else {
      root.classList.remove("dark");

      root.style.setProperty("--background", "#ffffff");
      root.style.setProperty("--foreground", "#111827");
    }
  };

  // Light
  if (themeSettings.theme === "light") {
    applyTheme(false);
    return;
  }

  // Dark
  if (themeSettings.theme === "dark") {
    applyTheme(true);
    return;
  }

  // =========================
  // System Theme
  // =========================
  const media = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

  applyTheme(media.matches);

  const handleChange = (
    event: MediaQueryListEvent
  ) => {
    applyTheme(event.matches);
  };

  media.addEventListener("change", handleChange);

  return () => {
    media.removeEventListener(
      "change",
      handleChange
    );
  };

}, [themeSettings]);

  return (
    <ThemeContext.Provider
      value={{
        themeSettings,
        setThemeSettings,
        loadTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}