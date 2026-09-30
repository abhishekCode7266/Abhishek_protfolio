import React from "react";
import { usePortfolioData } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  Layout,
  BarChart3,
  Cpu,
  Code2,
  Terminal,
  Sparkles,
} from "lucide-react";

export const SkillsSection: React.FC = () => {
  const { t } = useLanguage();
  const { skillCategories } = usePortfolioData();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Layout":
        return <Layout className="w-5 h-5 text-sky-500 dark:text-sky-400" />;
      case "BarChart3":
        return <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case "Code2":
        return <Code2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
      default:
        return <Code2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/20 text-purple-700 dark:text-purple-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3" />
            <span>{t.skills.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.skills.heading}
          </h2>
          <p className="max-w-xl mx-auto text-sm text-slate-600 dark:text-slate-400 mt-3">
            {t.skills.subtitle}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="group bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/20 hover:border-purple-500/50 rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-lg shadow-slate-200/50 dark:shadow-black/40 hover:-translate-y-1"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 group-hover:scale-105 transition-transform">
                  {getCategoryIcon(category.icon)}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {category.title}
                  </h3>
                  <span className="text-[11px] font-mono text-purple-700 dark:text-purple-400">
                    {category.skills.length} competencies
                  </span>
                </div>
              </div>

              {/* Skills badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:text-purple-700 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-purple-950/50 border border-slate-200 dark:border-slate-800 text-xs font-medium transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
