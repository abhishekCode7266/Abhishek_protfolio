import React from "react";
import { siteConfig } from "@/data/site";
import { socials } from "@/data/socials";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUp, Github, Linkedin, Mail, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-100 dark:bg-[#050811] border-t border-slate-200 dark:border-purple-500/15 py-12 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="text-center md:text-left space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                ASY
              </span>
              <span className="text-base font-bold text-slate-900 dark:text-white tracking-wide">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-xs text-purple-700 dark:text-purple-300 font-mono">
              {t.footer.title}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white dark:bg-slate-900/80 hover:bg-purple-600 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors shadow-sm"
                aria-label="GitHub profile"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white dark:bg-slate-900/80 hover:bg-purple-600 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors shadow-sm"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {socials.email && (
              <a
                href={socials.email}
                className="p-2.5 rounded-full bg-white dark:bg-slate-900/80 hover:bg-purple-600 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors shadow-sm"
                aria-label="Email Abhishek"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Back to top button */}
          <div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-mono border border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-500/40 transition-colors cursor-pointer shadow-sm"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {siteConfig.year} {siteConfig.name}. {t.footer.rights}</p>
          <p className="flex items-center gap-1">
            <span>{t.footer.builtFor}</span>
            <span>•</span>
            <span className="text-purple-600 dark:text-purple-400 font-mono">React + Vite + Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
