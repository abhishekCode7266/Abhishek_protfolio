import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  variant?: "desktop" | "mobile";
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = "desktop" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  if (variant === "mobile") {
    return (
      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs transition-colors">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          {isDark ? (
            <Moon className="w-4 h-4 text-purple-400" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
          <span className="font-medium">Theme / थीम:</span>
        </div>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          {isDark ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-purple-600" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white border border-slate-200 dark:border-purple-500/25 transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0" />
      ) : (
        <Moon className="w-4 h-4 text-purple-600 transition-transform rotate-0" />
      )}
    </button>
  );
};
