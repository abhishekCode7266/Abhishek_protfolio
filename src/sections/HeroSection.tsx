import React from "react";
import { profile } from "@/data/profile";
import { socials, socialList } from "@/data/socials";
import { useLanguage } from "@/context/LanguageContext";
import { usePortfolioData } from "@/context/DataContext";
import { SmartImage } from "@/components/SmartImage";
import { getAssetUrl } from "@/lib/asset";
import {
  FileDown,
  ArrowRight,
  GitCommit,
  Github,
  Linkedin,
  Mail,
  Twitter,
  ExternalLink,
  Sparkles,
  Sliders,
} from "lucide-react";

interface HeroSectionProps {
  onOpenEditModal: () => void;
  onOpenResumeExport: () => void;
  onOpenStudioModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEditModal,
  onOpenResumeExport,
  onOpenStudioModal,
}) => {
  const { t } = useLanguage();
  const { resumeUrl, resumeFileName } = usePortfolioData();

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "github":
        return <Github className="w-4 h-4" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-indigo-600/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Profile Avatar with Glowing Ring */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-tr from-purple-500 via-indigo-500 to-sky-400 shadow-xl shadow-purple-950/30 dark:shadow-purple-950/60 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-[#0d121f]">
                <SmartImage
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Pulsing Available Status Dot */}
            <div
              className="absolute bottom-2 right-2 flex items-center justify-center p-1.5 rounded-full bg-white dark:bg-[#0d121f] border-2 border-slate-200 dark:border-[#1e293b] shadow-sm"
              title="Available for opportunities"
            >
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping absolute" />
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 relative" />
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-500/30 text-purple-800 dark:text-purple-300 text-xs sm:text-sm font-medium mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 animate-pulse" />
          <span>{t.hero.statusBadge}</span>
        </div>

        {/* Name Heading matching screenshot */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3 leading-tight">
          {t.hero.greeting}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-sky-500 dark:from-purple-400 dark:via-indigo-300 dark:to-sky-400">
            {t.hero.highlight}
          </span>
        </h1>

        {/* Professional Title */}
        <p className="text-base sm:text-xl text-purple-800 dark:text-purple-200/90 font-medium tracking-wide mb-6">
          {t.hero.title}
        </p>

        {/* Short Bio */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          {t.hero.intro}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold shadow-lg shadow-purple-900/30 dark:shadow-purple-900/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{t.hero.exploreProjects}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenResumeExport}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-white text-sm font-semibold border border-slate-200 dark:border-purple-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-md cursor-pointer"
            title="Open formatted printable resume and export to PDF"
          >
            <FileDown className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>{t.hero.exportResume}</span>
          </button>

          <button
            onClick={onOpenStudioModal}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-purple-50 dark:bg-slate-900/60 hover:bg-purple-100 dark:hover:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-200 text-sm font-medium border border-purple-200 dark:border-purple-500/20 transition-all cursor-pointer shadow-sm"
            title="Open Studio to edit certificates, resume, experience & skills"
          >
            <Sliders className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Studio / Edit Profile</span>
          </button>
        </div>

        {/* Social Links Bar */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {socialList.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target={item.url.startsWith("mailto:") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              aria-label={item.ariaLabel}
              className="p-3 rounded-full bg-white dark:bg-slate-900/80 hover:bg-purple-600 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-all transform hover:scale-110 active:scale-95 shadow-md"
            >
              {getSocialIcon(item.icon)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
