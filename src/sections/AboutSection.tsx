import React from "react";
import { profile } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";
import { CodeSnippetPreview } from "@/components/CodeSnippetPreview";
import { CheckCircle2, UserCheck, Sparkles } from "lucide-react";

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/20 text-purple-700 dark:text-purple-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3" />
            <span>{t.about.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.about.heading}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text & Strengths */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/20 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-purple-700 dark:text-purple-300 font-mono">
                    {profile.degree} • {profile.institution}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
              </div>

              {/* Strengths List */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                  {t.about.capabilitiesTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {profile.coreStrengths.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-purple-500/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                        <span className="text-xs font-semibold text-slate-900 dark:text-white">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal pl-6">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Code Snippet Card matching screenshot */}
          <div className="lg:col-span-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-mono text-purple-700 dark:text-purple-300 uppercase tracking-wider font-semibold">
                  {t.about.terminalTitle}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {t.about.terminalSubtitle}
                </span>
              </div>
              <CodeSnippetPreview />
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center font-mono">
                {t.about.terminalNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
