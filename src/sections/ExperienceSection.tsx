import React from "react";
import { usePortfolioData } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";
import { Briefcase, Calendar, MapPin, CheckCircle2, Sparkles, Plus, Trash2 } from "lucide-react";

interface ExperienceSectionProps {
  onOpenStudio?: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenStudio }) => {
  const { t } = useLanguage();
  const { experiences, deleteExperience } = usePortfolioData();

  return (
    <section id="experience" className="py-16 sm:py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/20 text-purple-700 dark:text-purple-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3" />
            <span>{t.experience.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.experience.heading}
          </h2>
          <p className="max-w-md mx-auto text-sm text-slate-600 dark:text-slate-400 mt-3">
            {t.experience.subtitle}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full" />

          {onOpenStudio && (
            <div className="mt-4">
              <button
                onClick={onOpenStudio}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 hover:bg-purple-100 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add / Manage Real Internship Details</span>
              </button>
            </div>
          )}
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6">
          {experiences.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-slate-800 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                No experience entries currently listed.
              </p>
              {onOpenStudio && (
                <button
                  onClick={onOpenStudio}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
                >
                  Add Your Real Internship
                </button>
              )}
            </div>
          ) : (
            experiences.map((exp) => (
              <div
                key={exp.id}
                className="relative bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/20 hover:border-purple-500/40 rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-xl shadow-slate-200/50 dark:shadow-black/30"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20 shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/30 text-xs font-mono text-purple-700 dark:text-purple-300 font-semibold">
                      {exp.mode}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </span>

                    {/* Direct Delete button */}
                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Delete this experience"
                      aria-label="Delete experience"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Responsibilities List */}
                <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {exp.responsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[11px] font-mono border border-slate-200 dark:border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
