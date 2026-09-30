import React, { useRef, useState } from "react";
import { profile } from "@/data/profile";
import { usePortfolioData } from "@/context/DataContext";
import { siteConfig } from "@/data/site";
import { socials } from "@/data/socials";
import { useLanguage } from "@/context/LanguageContext";
import { getAssetUrl } from "@/lib/asset";
import {
  X,
  Printer,
  FileDown,
  Check,
  Eye,
  SlidersHorizontal,
  Mail,
  Github,
  MapPin,
  ExternalLink,
} from "lucide-react";

interface PrintableResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableResumeModal: React.FC<PrintableResumeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();
  const {
    educationList,
    experiences,
    skillCategories,
    certifications,
    projects,
    resumeUrl,
    resumeFileName,
  } = usePortfolioData();

  const [includeProjects, setIncludeProjects] = useState(true);
  const [includeCertifications, setIncludeCertifications] = useState(true);
  const [includeExperience, setIncludeExperience] = useState(true);
  const [isPrinting, setIsPrinting] = useState(false);

  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div className="relative w-full max-w-4xl max-h-[94vh] flex flex-col bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/30 rounded-2xl shadow-2xl text-slate-900 dark:text-slate-100 overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#101628]/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 id="resume-modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {t.resumeModal.title}
              </h3>
              <p className="text-xs text-purple-700 dark:text-purple-300/80 font-mono">
                {t.resumeModal.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              disabled={isPrinting}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-950 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{t.resumeModal.printButton}</span>
            </button>

            <a
              href={getAssetUrl(resumeUrl)}
              download={resumeFileName}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <FileDown className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>{t.resumeModal.downloadButton}</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors ml-1 cursor-pointer"
              aria-label="Close export modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Customization Options Bar */}
        <div className="px-6 py-2.5 bg-slate-100 dark:bg-[#090d16] border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="font-mono uppercase tracking-wider text-[11px]">{t.resumeModal.includeSections}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white select-none">
              <input
                type="checkbox"
                checked={includeExperience}
                onChange={(e) => setIncludeExperience(e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-purple-600 focus:ring-purple-500 w-3.5 h-3.5"
              />
              <span>{t.resumeModal.experienceToggle}</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white select-none">
              <input
                type="checkbox"
                checked={includeProjects}
                onChange={(e) => setIncludeProjects(e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-purple-600 focus:ring-purple-500 w-3.5 h-3.5"
              />
              <span>{t.resumeModal.projectsToggle}</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white select-none">
              <input
                type="checkbox"
                checked={includeCertifications}
                onChange={(e) => setIncludeCertifications(e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-purple-600 focus:ring-purple-500 w-3.5 h-3.5"
              />
              <span>{t.resumeModal.certificationsToggle}</span>
            </label>
          </div>
        </div>

        {/* Scrollable Document Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-200/50 dark:bg-slate-950/80">
          <div
            id="printable-resume"
            ref={printAreaRef}
            className="max-w-[780px] mx-auto bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-2xl font-sans leading-normal selection:bg-purple-200"
          >
            {/* Resume Header */}
            <div className="border-b-2 border-slate-900 pb-4 mb-5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                  {profile.name}
                </h1>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
                  {profile.title}
                </span>
              </div>

              {/* Contact metadata */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 mt-2 font-mono">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-500" />
                  {siteConfig.author.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Github className="w-3 h-3 text-slate-500" />
                  github.com/abhishekCode7266
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {siteConfig.author.location}
                </span>
                <span>•</span>
                <span className="text-purple-700 font-semibold">
                  abhishekcode7266.github.io/Abhishek_portfolio/
                </span>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                {t.resumeModal.summaryHeading}
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                {profile.shortIntroduction} Focused on exploratory data analysis, data cleaning pipelines with Python (Pandas, NumPy), object-oriented programming in Java, and modern web application development.
              </p>
            </div>

            {/* Education Section */}
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                {t.resumeModal.academicHeading}
              </h2>
              <div className="space-y-3">
                {educationList.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{edu.degree} in {edu.field}</span>
                      <span className="text-slate-600 font-normal">{edu.status}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-slate-700 italic text-[11px]">
                      <span>{edu.institution}</span>
                      {edu.score && <span className="font-semibold not-italic text-purple-900">Aggregate: {edu.score}</span>}
                    </div>
                    <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                {t.resumeModal.skillsHeading}
              </h2>
              <div className="space-y-1.5 text-xs text-slate-800">
                {skillCategories.map((cat) => (
                  <div key={cat.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                    <span className="font-bold min-w-[170px] text-slate-950 text-[11px]">
                      {cat.title}:
                    </span>
                    <span className="text-slate-700 text-[11px]">
                      {cat.skills.join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Internship Experience */}
            {includeExperience && (
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  {t.resumeModal.experienceHeading}
                </h2>
                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="text-xs">
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span>{exp.role}</span>
                        <span className="text-slate-600 font-normal">{exp.period} • {exp.mode}</span>
                      </div>
                      <div className="text-purple-800 font-semibold text-[11px]">
                        {exp.company} — {exp.location}
                      </div>
                      <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-700 text-[11px]">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                      <div className="mt-1 text-[10px] text-slate-500">
                        <strong>Technologies:</strong> {exp.technologies.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Projects */}
            {includeProjects && (
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  {t.resumeModal.projectsHeading}
                </h2>
                <div className="space-y-3">
                  {projects.slice(0, 4).map((proj) => (
                    <div key={proj.id} className="text-xs">
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span>{proj.title}</span>
                        <span className="text-[10px] font-mono font-normal text-slate-500">
                          {proj.category}
                        </span>
                      </div>
                      <p className="text-slate-700 text-[11px] mt-0.5 leading-relaxed">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[10px] text-slate-600">
                        <span>
                          <strong>Technologies:</strong> {proj.technologies.join(", ")}
                        </span>
                        {proj.liveDemo && (
                          <span className="text-purple-700 font-mono">
                            Live: {proj.liveDemo}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {includeCertifications && (
              <div className="mb-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  {t.resumeModal.certificationsHeading}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="border border-slate-200 p-2 rounded">
                      <div className="font-bold text-slate-900 text-[11px]">{cert.title}</div>
                      <div className="text-[10px] text-slate-600">{cert.issuer} • {cert.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Footer Note */}
            <div className="pt-4 mt-4 border-t border-slate-200 text-center text-[10px] text-slate-500 font-mono">
              Generated directly from dynamic portfolio data • {siteConfig.siteUrl}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#101628]/90 flex items-center justify-between">
          <span className="text-xs text-slate-600 dark:text-slate-400">
            {t.resumeModal.printTip}
          </span>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-950 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{t.resumeModal.printButton}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
