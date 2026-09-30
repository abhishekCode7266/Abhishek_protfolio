import React, { useState, useMemo } from "react";
import { ProjectCategory, projectCategories, ProjectItem } from "@/data/projects";
import { usePortfolioData } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";
import { SmartImage } from "@/components/SmartImage";
import { ProjectLightbox } from "@/components/ProjectLightbox";
import { GitHubLanguageDistributionChart } from "@/components/GitHubLanguageDistributionChart";
import {
  Github,
  ExternalLink,
  Sparkles,
  Search,
  Maximize2,
  RefreshCw,
  Star,
  GitFork,
  Radio,
} from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  const {
    projects: customProjects,
    gitHubRepos,
    isGitHubConnected,
    isSyncingGitHub,
    gitHubLastSync,
    syncWithGitHub,
  } = usePortfolioData();

  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<"all" | "github" | "curated">("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    images: string[];
    title: string;
  }>({
    isOpen: false,
    images: [],
    title: "",
  });

  // Combine curated and live GitHub repositories
  const combinedProjects = useMemo(() => {
    if (sourceFilter === "github") {
      return gitHubRepos;
    }
    if (sourceFilter === "curated") {
      return customProjects;
    }
    // Merged: avoid duplicate GitHub repo links if any
    const curatedUrls = new Set(customProjects.map((p) => p.github?.toLowerCase()).filter(Boolean));
    const nonDuplicateGitHub = gitHubRepos.filter(
      (r) => !curatedUrls.has(r.github?.toLowerCase())
    );
    return [...customProjects, ...nonDuplicateGitHub];
  }, [customProjects, gitHubRepos, sourceFilter]);

  const filteredProjects = useMemo(() => {
    return combinedProjects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((t) => t.toLowerCase().includes(query));

      const matchesLanguage =
        !selectedLanguage ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(selectedLanguage.toLowerCase())
        ) ||
        project.category.toLowerCase().includes(selectedLanguage.toLowerCase()) ||
        (selectedLanguage === "Python" && project.title.toLowerCase().includes("python")) ||
        (selectedLanguage === "AI / ML" &&
          (project.category.includes("AI") || project.title.toLowerCase().includes("ai")));

      return matchesCategory && matchesSearch && matchesLanguage;
    });
  }, [combinedProjects, activeCategory, searchQuery, selectedLanguage]);

  const handleOpenLightbox = (project: ProjectItem) => {
    const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
    setLightboxState({
      isOpen: true,
      images,
      title: project.title,
    });
  };

  return (
    <section id="projects" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/20 text-purple-700 dark:text-purple-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3" />
            <span>{t.projects.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.projects.heading}
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
            {t.projects.subtitle}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* GitHub Live Auto-Sync Status Bar */}
        <div className="mb-8 p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
            </div>
            <div>
              <span className="font-semibold text-slate-900 dark:text-white">
                Live GitHub Sync Active:
              </span>{" "}
              <span className="text-purple-700 dark:text-purple-300 font-mono">
                github.com/abhishekCode7266
              </span>{" "}
              <span className="text-slate-500 dark:text-slate-400 hidden md:inline">
                ({gitHubRepos.length} public repos fetched • synced {gitHubLastSync || "just now"})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => syncWithGitHub(true)}
              disabled={isSyncingGitHub}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 hover:bg-purple-100 transition-colors cursor-pointer disabled:opacity-50"
              title="Fetch fresh repositories from GitHub API"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncingGitHub ? "animate-spin" : ""}`} />
              <span>{isSyncingGitHub ? "Syncing..." : "Sync with GitHub"}</span>
            </button>
          </div>
        </div>

        {/* D3.js GitHub Repository Language Distribution Visualization */}
        <GitHubLanguageDistributionChart
          repos={gitHubRepos.length > 0 ? gitHubRepos : combinedProjects}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
        />

        {/* Filter Source Tabs (All / Live GitHub / Curated) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#0b0f1a] border border-slate-200 dark:border-slate-800 text-xs">
              <button
                onClick={() => setSourceFilter("all")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  sourceFilter === "all"
                    ? "bg-white dark:bg-purple-600 text-slate-900 dark:text-white shadow-sm font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                All Projects ({combinedProjects.length})
              </button>
              <button
                onClick={() => setSourceFilter("github")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  sourceFilter === "github"
                    ? "bg-white dark:bg-purple-600 text-slate-900 dark:text-white shadow-sm font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>Live GitHub Repos ({gitHubRepos.length})</span>
              </button>
              <button
                onClick={() => setSourceFilter("curated")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  sourceFilter === "curated"
                    ? "bg-white dark:bg-purple-600 text-slate-900 dark:text-white shadow-sm font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Featured Highlights ({customProjects.length})
              </button>
            </div>

            {/* Active Language Filter Chip */}
            {selectedLanguage && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700 text-xs font-medium">
                <span>Filter: <strong>{selectedLanguage}</strong></span>
                <button
                  onClick={() => setSelectedLanguage(null)}
                  className="hover:text-purple-900 dark:hover:text-white font-bold ml-1 cursor-pointer"
                  title="Clear language filter"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* Real-time Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={t.projects.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/20 focus:border-purple-500 focus:outline-none text-xs text-slate-900 dark:text-white placeholder-slate-500 shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-start gap-1.5 mb-8">
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeCategory === category
                  ? "bg-purple-600 text-white shadow-md shadow-purple-950 font-semibold"
                  : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
              }`}
            >
              {category === "All" ? t.projects.all : category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#0c101d] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t.projects.noProjects}
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setSourceFilter("all");
              }}
              className="mt-3 text-xs text-purple-600 dark:text-purple-400 underline cursor-pointer font-medium"
            >
              {t.projects.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/20 hover:border-purple-500/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl shadow-slate-200/50 dark:shadow-black/40 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Project Screenshot / Visual Frame with Lightbox Trigger */}
                  <div
                    onClick={() => handleOpenLightbox(project)}
                    className="relative aspect-[16/9] bg-slate-100 dark:bg-slate-950/80 overflow-hidden cursor-pointer border-b border-slate-200 dark:border-purple-500/20"
                    title="Click to view full screenshot lightbox"
                  >
                    <SmartImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-slate-900/90 text-purple-300 border border-purple-500/30 text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm">
                        {project.category}
                      </span>

                      {project.isLiveGitHub ? (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono backdrop-blur-sm">
                          <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
                          <span>Live GitHub</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-purple-600/90 text-white text-[10px] font-bold tracking-wide backdrop-blur-sm shadow-md">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Lightbox inspection icon indicator */}
                    <div className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/70 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm">
                      <Maximize2 className="w-4 h-4 text-purple-300" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors line-clamp-1">
                        {project.title}
                      </h3>

                      {/* GitHub stats if present */}
                      {(project.stars !== undefined || project.forks !== undefined) && (
                        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 shrink-0">
                          {project.stars !== undefined && project.stars > 0 && (
                            <span className="flex items-center gap-0.5 text-amber-500">
                              <Star className="w-3 h-3 fill-amber-500" />
                              <span>{project.stars}</span>
                            </span>
                          )}
                          {project.forks !== undefined && project.forks > 0 && (
                            <span className="flex items-center gap-0.5 text-slate-400">
                              <GitFork className="w-3 h-3" />
                              <span>{project.forks}</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Highlights if present */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="space-y-1 mb-4 text-xs text-slate-500 dark:text-slate-400">
                        {project.highlights.slice(0, 2).map((h, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                            <span className="truncate">{h}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[11px] font-mono border border-slate-200 dark:border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 sm:p-7 pt-0 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3 mt-auto">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-950 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>{t.projects.liveDemo}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors ${
                        !project.liveDemo ? "flex-1" : ""
                      }`}
                    >
                      <Github className="w-4 h-4" />
                      <span>{t.projects.repo}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <ProjectLightbox
        isOpen={lightboxState.isOpen}
        images={lightboxState.images}
        projectTitle={lightboxState.title}
        onClose={() => setLightboxState({ isOpen: false, images: [], title: "" })}
      />
    </section>
  );
};
