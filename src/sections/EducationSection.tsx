import React from "react";
import { usePortfolioData } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";
import { GraduationCap, Award, BookOpen, CheckCircle, Sparkles, Edit2 } from "lucide-react";

interface EducationSectionProps {
  onOpenStudio?: () => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ onOpenStudio }) => {
  const { t } = useLanguage();
  const { educationList } = usePortfolioData();

  return (
    <section id="education" className="py-16 sm:py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/20 text-purple-700 dark:text-purple-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3" />
            <span>{t.education.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.education.heading}
          </h2>
          <p className="max-w-md mx-auto text-sm text-slate-600 dark:text-slate-400 mt-3">
            {t.education.subtitle}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Education Cards */}
        <div className="space-y-6">
          {educationList.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-xl ${
                item.isPrimary
                  ? "bg-gradient-to-br from-white via-purple-50/30 to-slate-50 dark:from-[#12162a] dark:via-[#0c101d] dark:to-[#150f28] border-2 border-purple-400 dark:border-purple-500/40 shadow-purple-900/10 dark:shadow-purple-950/30"
                  : "bg-white dark:bg-[#0b0f1a] border border-slate-200 dark:border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                {item.isPrimary ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-600 text-white text-[11px] font-bold tracking-wide uppercase shadow-md shadow-purple-950">
                    <Award className="w-3.5 h-3.5" />
                    <span>{t.education.primaryBadge}</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[11px] font-mono">
                    <BookOpen className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>Foundational Qualification</span>
                  </div>
                )}

                {onOpenStudio && (
                  <button
                    onClick={onOpenStudio}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-950/50 transition-colors cursor-pointer"
                    title="Edit education details"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Edit Details</span>
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20 shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {item.degree} — {item.field}
                    </h3>
                    <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mt-1">
                      {item.institution}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300">
                    {item.status}
                  </span>
                  {item.score && (
                    <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-500/30 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                      {t.education.aggregate}: {item.score}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
