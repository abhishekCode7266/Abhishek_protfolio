import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/site";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X, GitCommit, ArrowUpRight, Printer, Sliders } from "lucide-react";

interface NavbarProps {
  onOpenEditModal: () => void;
  onOpenResumeExport: () => void;
  onOpenStudioModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEditModal,
  onOpenResumeExport,
  onOpenStudioModal,
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.education, href: "#education" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.certifications, href: "#certifications" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ["home", "about", "skills", "education", "experience", "certifications", "projects", "contact"];
      const scrollPos = window.scrollY + 120;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#070a12]/90 backdrop-blur-md border-b border-slate-200 dark:border-purple-500/15 shadow-sm dark:shadow-lg dark:shadow-black/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-purple-900/40 group-hover:scale-105 transition-transform">
              ASY
            </div>
            <div className="hidden sm:block">
              <span className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                Abhishek
              </span>
              <span className="block text-[10px] text-purple-600 dark:text-purple-400 font-mono tracking-wider">
                PORTFOLIO
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden xl:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200 dark:border-slate-800/80 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md shadow-purple-900/50"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Action Buttons Right */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Theme Toggle (Light / Dark) */}
            <ThemeToggle variant="desktop" />

            {/* Language Switcher */}
            <LanguageSwitcher variant="desktop" />

            {/* Studio / Edit Hub button */}
            <button
              onClick={onOpenStudioModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all cursor-pointer shadow-sm"
              title="Open Portfolio Studio & Content Manager (Certificates, Resume, Experience, Skills)"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Studio / Edit</span>
            </button>

            {/* Resume PDF Export */}
            <button
              onClick={onOpenResumeExport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-sm shadow-purple-950 transition-all cursor-pointer"
              title="Export formatted resume as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.nav.resumePdf}</span>
            </button>

            <a
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-purple-500 dark:text-purple-400" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="sm:hidden flex items-center gap-1.5">
            <ThemeToggle variant="desktop" />
            <LanguageSwitcher variant="desktop" />

            <button
              onClick={onOpenStudioModal}
              className="p-2 text-xs font-medium rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30"
              title="Studio / Edit Content"
            >
              <Sliders className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              aria-label={isOpen ? "Close main navigation" : "Open main navigation"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Tablet Hamburger (Between sm and xl) */}
          <div className="hidden sm:flex xl:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              aria-label={isOpen ? "Close main navigation" : "Open main navigation"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-white/95 dark:bg-[#0d121f]/95 border-b border-slate-200 dark:border-purple-500/20 px-4 pt-3 pb-6 space-y-3 mt-3 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200 shadow-xl">
          {/* Controls: Theme & Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <ThemeToggle variant="mobile" />
            <LanguageSwitcher variant="mobile" />
          </div>

          {/* Nav links grid */}
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-purple-600 text-white font-semibold"
                      : "bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenStudioModal();
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30"
              >
                <Sliders className="w-4 h-4" />
                <span>Studio / Edit Portfolio</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenResumeExport();
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl bg-purple-600 text-white"
              >
                <Printer className="w-4 h-4" />
                <span>{t.nav.resumePdf}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenEditModal();
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl bg-slate-150 dark:bg-slate-800 text-slate-800 dark:text-purple-300 border border-slate-300 dark:border-purple-500/30"
              >
                <GitCommit className="w-4 h-4" />
                <span>{t.nav.editOnGithub}</span>
              </button>

              <a
                href={siteConfig.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 text-xs border border-slate-200 dark:border-slate-800"
                aria-label="View repository on GitHub"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
