import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile";
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = "desktop" }) => {
  const { language, setLanguage } = useLanguage();

  if (variant === "mobile") {
    return (
      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Globe className="w-4 h-4 text-purple-400" />
          <span className="font-medium">Language / भाषा:</span>
        </div>
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              language === "en"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
            aria-label="Switch language to English"
          >
            English
          </button>
          <button
            onClick={() => setLanguage("hi")}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              language === "hi"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
            aria-label="भाषा हिंदी में बदलें"
          >
            हिंदी
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-1 bg-slate-900/90 border border-purple-500/25 p-1 rounded-full text-xs shadow-inner"
      role="group"
      aria-label="Language selection"
    >
      <Globe className="w-3.5 h-3.5 text-purple-400 ml-1.5 mr-0.5" />
      <button
        onClick={() => setLanguage("en")}
        className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
          language === "en"
            ? "bg-purple-600 text-white shadow-sm shadow-purple-950"
            : "text-slate-400 hover:text-slate-200"
        }`}
        aria-pressed={language === "en"}
        title="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("hi")}
        className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
          language === "hi"
            ? "bg-purple-600 text-white shadow-sm shadow-purple-950"
            : "text-slate-400 hover:text-slate-200"
        }`}
        aria-pressed={language === "hi"}
        title="हिंदी में बदलें"
      >
        हिं
      </button>
    </div>
  );
};
