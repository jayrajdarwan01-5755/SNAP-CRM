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
  if (themeSettings.theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [themeSettings.theme]);

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