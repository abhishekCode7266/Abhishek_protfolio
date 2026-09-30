import React, { useState, useMemo } from "react";
import { usePortfolioData } from "@/context/DataContext";
import { CertificationItem } from "@/data/certifications";
import { ExperienceItem } from "@/data/experience";
import { EducationItem } from "@/data/education";
import { GitHubSyncIndicator } from "@/components/GitHubSyncIndicator";
import { GitHubWebhookConfig } from "@/components/GitHubWebhookConfig";
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Check,
  Upload,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Github,
  GitCommit,
  BarChart3,
  RefreshCw,
  Search,
  ExternalLink,
  Copy,
  Webhook,
} from "lucide-react";
import { RecentActivityPanel } from "@/components/RecentActivityPanel";
import { GitHubAnalyticsSection } from "@/components/GitHubAnalyticsSection";

interface PortfolioManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "certificates" | "experience" | "education" | "skills" | "resume" | "github" | "activity" | "analytics" | "webhook" | "export";
}

export const PortfolioManagerModal: React.FC<PortfolioManagerModalProps> = ({
  isOpen,
  onClose,
  defaultTab = "certificates",
}) => {
  const {
    certifications,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    experiences,
    addExperience,
    updateExperience,
    deleteExperience,
    educationList,
    updateEducation,
    addEducation,
    deleteEducation,
    skillCategories,
    addSkillToCategory,
    removeSkillFromCategory,
    resumeUrl,
    resumeFileName,
    updateResume,
    projects,
    gitHubRepos,
    isGitHubConnected,
    isSyncingGitHub,
    gitHubSyncStatus,
    gitHubLastSync,
    syncWithGitHub,
    resetToDefaults,
    hasLocalChanges,
  } = usePortfolioData();

  const [activeTab, setActiveTab] = useState<
    "certificates" | "experience" | "education" | "skills" | "resume" | "github" | "activity" | "analytics" | "webhook" | "export"
  >(defaultTab);

  // Global search bar state across projects and certificates
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResultsDrawer, setShowSearchResultsDrawer] = useState(false);

  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [newCert, setNewCert] = useState<Partial<CertificationItem>>({
    title: "",
    issuer: "",
    date: new Date().getFullYear().toString(),
    previewImage: "/assets/certificates/ai-foundations.svg",
    description: "",
    skills: [],
    credentialUrl: "",
  });
  const [newCertSkillInput, setNewCertSkillInput] = useState("");

  // Experience state
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [newExp, setNewExp] = useState<Partial<ExperienceItem>>({
    role: "Data Analytics Intern",
    company: "",
    period: "2024 - Present",
    mode: "Remote",
    location: "India",
    responsibilities: [""],
    technologies: ["Python", "SQL"],
  });
  const [newExpTechInput, setNewExpTechInput] = useState("");

  // Education state
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [eduEditForm, setEduEditForm] = useState<Partial<EducationItem>>({});

  // Skills state
  const [selectedSkillCategory, setSelectedSkillCategory] = useState(
    skillCategories[0]?.id || "data-analytics"
  );
  const [newSkillText, setNewSkillText] = useState("");

  // Resume state
  const [resumeInputUrl, setResumeInputUrl] = useState(resumeUrl);
  const [resumeInputName, setResumeInputName] = useState(resumeFileName);
  const [resumeSavedNotice, setResumeSavedNotice] = useState(false);

  // Copy code export state
  const [copiedExport, setCopiedExport] = useState(false);

  // Filtered certificates for high capacity (100+)
  const matchingCerts = useMemo(() => {
    if (!searchQuery.trim()) return certifications;
    const q = searchQuery.toLowerCase().trim();
    return certifications.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        (c.skills && c.skills.some((s) => s.toLowerCase().includes(q)))
    );
  }, [certifications, searchQuery]);

  // Combined projects (curated + GitHub repos)
  const allProjects = useMemo(() => {
    return [...projects, ...gitHubRepos];
  }, [projects, gitHubRepos]);

  // Matching projects by name, description, or tech stack
  const matchingProjects = useMemo(() => {
    if (!searchQuery.trim()) return allProjects;
    const q = searchQuery.toLowerCase().trim();
    return allProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    );
  }, [allProjects, searchQuery]);

  // Filtered GitHub repos specifically for tab 6
  const filteredGitHubRepos = useMemo(() => {
    if (!searchQuery.trim()) return gitHubRepos;
    const q = searchQuery.toLowerCase().trim();
    return gitHubRepos.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.technologies.some((t) => t.toLowerCase().includes(q))
    );
  }, [gitHubRepos, searchQuery]);

  if (!isOpen) return null;

  const handleCreateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title || !newCert.issuer) return;

    const certItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      title: newCert.title.trim(),
      issuer: newCert.issuer.trim(),
      date: newCert.date?.trim() || "2025",
      previewImage: newCert.previewImage?.trim() || "/assets/certificates/ai-foundations.svg",
      description: newCert.description?.trim() || "Accredited specialization program credential.",
      skills: newCert.skills && newCert.skills.length > 0 ? newCert.skills : ["Data Analytics", "AI"],
      credentialUrl: newCert.credentialUrl?.trim() || undefined,
    };

    addCertificate(certItem);
    setNewCert({
      title: "",
      issuer: "",
      date: new Date().getFullYear().toString(),
      previewImage: "/assets/certificates/ai-foundations.svg",
      description: "",
      skills: [],
      credentialUrl: "",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "cert" | "resume") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      if (field === "cert") {
        setNewCert((prev) => ({ ...prev, previewImage: dataUrl }));
      } else {
        updateResume(dataUrl, file.name);
        setResumeInputUrl(dataUrl);
        setResumeInputName(file.name);
        setResumeSavedNotice(true);
        setTimeout(() => setResumeSavedNotice(false), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.role || !newExp.company) return;

    const expItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: newExp.role.trim(),
      company: newExp.company.trim(),
      period: newExp.period?.trim() || "2024",
      mode: newExp.mode || "Remote",
      typeBadge: "INTERNSHIP",
      location: newExp.location?.trim() || "India",
      summary: `${newExp.role?.trim()} at ${newExp.company?.trim()}`,
      responsibilities:
        newExp.responsibilities && newExp.responsibilities.length > 0
          ? newExp.responsibilities.filter((r) => r.trim().length > 0)
          : ["Developed analytical solutions and software modules."],
      technologies: newExp.technologies && newExp.technologies.length > 0 ? newExp.technologies : ["Python"],
    };

    addExperience(expItem);
    setNewExp({
      role: "",
      company: "",
      period: "2024 - Present",
      mode: "Remote",
      location: "India",
      responsibilities: [""],
      technologies: ["Python"],
    });
  };

  const handleSaveResumeDetails = (e: React.FormEvent) => {
    e.preventDefault();
    updateResume(resumeInputUrl, resumeInputName);
    setResumeSavedNotice(true);
    setTimeout(() => setResumeSavedNotice(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-white dark:bg-[#0c101d] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden transition-colors">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#101628]/95">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-500/30">
              <Edit2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Portfolio Content &amp; Data Studio
              </h2>
              <p className="text-xs text-slate-500 dark:text-purple-300/80 font-mono">
                Real-time In-App Editor • 100+ Certificates • GitHub Live Auto-Sync
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <GitHubSyncIndicator variant="compact" />
            </div>

            {hasLocalChanges && (
              <button
                onClick={resetToDefaults}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 transition-colors cursor-pointer"
                title="Reset all edits to original repository data files"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Defaults</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800 transition-colors"
              aria-label="Close manager"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Search Bar across Projects & Certificates */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-50/95 dark:bg-[#0b0f1a] border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-purple-600 dark:text-purple-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResultsDrawer(e.target.value.trim().length > 0);
                }}
                onFocus={() => {
                  if (searchQuery.trim().length > 0) setShowSearchResultsDrawer(true);
                }}
                placeholder="Search projects or certificates by name, issuer, skill, or technology..."
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowSearchResultsDrawer(false);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Match Counter & Quick Jump Tabs */}
            {searchQuery.trim() && (
              <div className="flex items-center gap-1.5 shrink-0 text-xs animate-in fade-in duration-150">
                <button
                  onClick={() => {
                    setActiveTab("certificates");
                    setShowSearchResultsDrawer(false);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors cursor-pointer ${
                    activeTab === "certificates"
                      ? "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-600"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-purple-400"
                  }`}
                >
                  <Award className="w-3 h-3 text-purple-500" />
                  <span>{matchingCerts.length} Certificates</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("github");
                    setShowSearchResultsDrawer(false);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors cursor-pointer ${
                    activeTab === "github"
                      ? "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-600"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-purple-400"
                  }`}
                >
                  <Github className="w-3 h-3 text-purple-500" />
                  <span>{matchingProjects.length} Projects</span>
                </button>

                <button
                  onClick={() => setShowSearchResultsDrawer(!showSearchResultsDrawer)}
                  className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {showSearchResultsDrawer ? "Hide Matches" : "Show Matches"}
                </button>
              </div>
            )}
          </div>

          {/* Quick Results Drawer Popover */}
          {showSearchResultsDrawer && searchQuery.trim().length > 0 && (
            <div className="mt-2.5 p-3 rounded-xl bg-white dark:bg-[#0c101d] border border-purple-200 dark:border-purple-500/30 shadow-lg max-h-56 overflow-y-auto space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span>
                  Search Matches: <strong>{matchingCerts.length}</strong> certificates, <strong>{matchingProjects.length}</strong> projects
                </span>
                <button
                  onClick={() => setShowSearchResultsDrawer(false)}
                  className="text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                >
                  Close
                </button>
              </div>

              {matchingCerts.length === 0 && matchingProjects.length === 0 ? (
                <p className="text-center py-3 text-slate-400 text-xs">
                  No projects or certificates found matching "{searchQuery}".
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {/* Matching Certificates */}
                  {matchingCerts.slice(0, 4).map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setActiveTab("certificates");
                        setShowSearchResultsDrawer(false);
                      }}
                      className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200 dark:border-slate-800 cursor-pointer flex items-center justify-between gap-2 transition-colors"
                      title="Click to view and edit certificate"
                    >
                      <div className="truncate">
                        <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 mr-1.5">
                          Certificate
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {c.title}
                        </span>
                        <span className="block text-[10px] text-slate-500 truncate">
                          {c.issuer} • {c.date}
                        </span>
                      </div>
                      <Award className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    </div>
                  ))}

                  {/* Matching Projects */}
                  {matchingProjects.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setActiveTab("github");
                        setShowSearchResultsDrawer(false);
                      }}
                      className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200 dark:border-slate-800 cursor-pointer flex items-center justify-between gap-2 transition-colors"
                      title="Click to view repository details"
                    >
                      <div className="truncate">
                        <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 mr-1.5">
                          Project
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {p.title}
                        </span>
                        <span className="block text-[10px] text-slate-500 truncate">
                          {p.technologies.slice(0, 2).join(", ")}
                        </span>
                      </div>
                      <Github className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tab Navigation Navigation Strip */}
        <div className="flex items-center gap-1 px-4 sm:px-6 py-2.5 bg-slate-100 dark:bg-[#090d16] border-b border-slate-200 dark:border-slate-800 overflow-x-auto text-xs font-medium scrollbar-none">
          <button
            onClick={() => setActiveTab("certificates")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "certificates"
                ? "bg-purple-600 text-white shadow-sm font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certificates ({certifications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("experience")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "experience"
                ? "bg-purple-600 text-white shadow-sm font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Internships &amp; Experience ({experiences.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "education"
                ? "bg-purple-600 text-white shadow-sm font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Education</span>
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "skills"
                ? "bg-purple-600 text-white shadow-sm font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Skills &amp; Tech Stack</span>
          </button>

          <button
            onClick={() => setActiveTab("resume")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "resume"
                ? "bg-purple-600 text-white shadow-sm font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Upload Resume</span>
          </button>

          <button
            onClick={() => setActiveTab("github")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "github"
                ? "bg-purple-600 text-white shadow-sm font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Github className="w-4 h-4" />
            <span>GitHub Auto-Sync ({gitHubRepos.length})</span>
            {isSyncingGitHub && (
              <span className="relative flex h-2 w-2 ml-0.5" title="Background GitHub sync in progress">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 animate-pulse" />
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("activity")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "activity"
                ? "bg-purple-600 text-white shadow-sm font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <GitCommit className="w-4 h-4" />
            <span>Recent Activity</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
              5 Commits
            </span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "analytics"
                ? "bg-purple-600 text-white shadow-sm font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>GitHub Analytics</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
              D3.js
            </span>
          </button>

          <button
            onClick={() => setActiveTab("webhook")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "webhook"
                ? "bg-purple-600 text-white shadow-sm font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Webhook className="w-4 h-4" />
            <span>Webhook Listener</span>
          </button>

          <button
            onClick={() => setActiveTab("export")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "export"
                ? "bg-purple-600 text-white shadow-sm font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Copy className="w-4 h-4" />
            <span>Export to GitHub File</span>
          </button>
        </div>

        {/* Tab Body Contents */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/60 dark:bg-slate-950/60">
          {/* Real-time Sync Indicator & Force Resync Banner */}
          <div className="mb-5">
            <GitHubSyncIndicator variant="banner" onForceResync={() => syncWithGitHub(true)} />
          </div>
          {/* TAB 1: CERTIFICATES (SUPPORTS 100+) */}
          {activeTab === "certificates" && (
            <div className="space-y-6">
              {/* Add Certificate Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/25 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Upload / Add New Certificate (Add up to 100+ Certificates)</span>
                </h3>

                <form onSubmit={handleCreateCertificate} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                        Certificate Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Deep Learning Specialization / Python Data Science"
                        value={newCert.title || ""}
                        onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                        Issuing Organization / Platform *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. IBM / Google / Coursera / NPTEL"
                        value={newCert.issuer || ""}
                        onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                        Completion Date / Year
                      </label>
                      <input
                        type="text"
                        placeholder="2025"
                        value={newCert.date || ""}
                        onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                        Online Verification Link (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://coursera.org/verify/..."
                        value={newCert.credentialUrl || ""}
                        onChange={(e) => setNewCert({ ...newCert, credentialUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                        Upload Image File or SVG
                      </label>
                      <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-purple-400 dark:border-purple-500/40 bg-purple-50/50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 cursor-pointer hover:bg-purple-100/50 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Choose File</span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload(e, "cert")}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Skills Associated (Press Enter or Add)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Python, Machine Learning, Tableau"
                        value={newCertSkillInput}
                        onChange={(e) => setNewCertSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (newCertSkillInput.trim()) {
                              setNewCert({
                                ...newCert,
                                skills: [...(newCert.skills || []), newCertSkillInput.trim()],
                              });
                              setNewCertSkillInput("");
                            }
                          }
                        }}
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newCertSkillInput.trim()) {
                            setNewCert({
                              ...newCert,
                              skills: [...(newCert.skills || []), newCertSkillInput.trim()],
                            });
                            setNewCertSkillInput("");
                          }
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium cursor-pointer"
                      >
                        Add Tag
                      </button>
                    </div>
                    {newCert.skills && newCert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {newCert.skills.map((s, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 text-[11px]"
                          >
                            <span>{s}</span>
                            <button
                              type="button"
                              onClick={() =>
                                setNewCert({
                                  ...newCert,
                                  skills: newCert.skills?.filter((_, i) => i !== idx),
                                })
                              }
                              className="text-purple-400 hover:text-purple-600"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md shadow-purple-900/30 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Save &amp; Add Certificate</span>
                  </button>
                </form>
              </div>

              {/* Certificate List with High-Capacity Search */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Existing Certificates ({matchingCerts.length} of {certifications.length})
                  </h4>
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search certificates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {matchingCerts.length === 0 ? (
                  <div className="p-8 text-center bg-white dark:bg-[#0c101d] rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500">
                    No certificates found matching "{searchQuery}".
                    <button
                      onClick={() => setSearchQuery("")}
                      className="block mx-auto mt-2 text-purple-600 dark:text-purple-400 underline cursor-pointer"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchingCerts.map((cert) => (
                      <div
                        key={cert.id}
                        className="p-3.5 rounded-xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 shadow-sm hover:border-purple-400 transition-colors"
                      >
                        <div className="space-y-1 flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {cert.title}
                          </h5>
                          <p className="text-[11px] text-purple-600 dark:text-purple-400 font-mono">
                            {cert.issuer} • {cert.date}
                          </p>
                          {cert.skills && (
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                              {cert.skills.join(", ")}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                              title="Open verification link"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => deleteCertificate(cert.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                            title="Delete certificate"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: INTERNSHIPS & EXPERIENCE (DELETE OR ADD REAL ONES) */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              {/* Add Real Internship */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/25 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Add Real Internship or Trainee Experience</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Add your actual company or trainee experience, or delete any sample experience below with one click.
                </p>

                <form onSubmit={handleCreateExperience} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                        Role / Designation *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Data Analytics Trainee / Python Developer Intern"
                        value={newExp.role || ""}
                        onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                        Company / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. TechCorp Solutions / AI Institute"
                        value={newExp.company || ""}
                        onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                        Duration / Period
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Jun 2024 - Aug 2024"
                        value={newExp.period || ""}
                        onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                        Work Mode
                      </label>
                      <select
                        value={newExp.mode || "Remote"}
                        onChange={(e) =>
                          setNewExp({ ...newExp, mode: e.target.value as "Remote" | "On-site" | "Hybrid" })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Prayagraj / Noida, India"
                        value={newExp.location || ""}
                        onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Key Responsibilities / Achievements (One per line)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Processed customer datasets using Python and Pandas...&#10;Built interactive charts and dashboards..."
                      value={(newExp.responsibilities || []).join("\n")}
                      onChange={(e) =>
                        setNewExp({
                          ...newExp,
                          responsibilities: e.target.value.split("\n"),
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md shadow-purple-900/30 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Save Internship / Experience</span>
                  </button>
                </form>
              </div>

              {/* Experience list with instant delete */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Current Experiences ({experiences.length})
                </h4>

                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {exp.role}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                          {exp.mode}
                        </span>
                      </div>
                      <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                        {exp.company} • {exp.period} • {exp.location}
                      </p>
                      <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 space-y-1 mt-1">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 hover:bg-rose-100 transition-colors cursor-pointer self-start"
                      title="Delete this experience"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EDUCATION (EDIT DEGREE, INSTITUTION, MARKS) */}
          {activeTab === "education" && (
            <div className="space-y-6">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Edit academic qualifications, university / college details, aggregate percentage/CGPA, and completion status.
              </p>

              <div className="space-y-4">
                {educationList.map((edu) => {
                  const isEditing = editingEduId === edu.id;

                  return (
                    <div
                      key={edu.id}
                      className="p-5 rounded-2xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/25 shadow-sm space-y-3"
                    >
                      {isEditing ? (
                        <div className="space-y-3 text-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                                Degree / Certificate Name
                              </label>
                              <input
                                type="text"
                                value={eduEditForm.degree ?? edu.degree}
                                onChange={(e) =>
                                  setEduEditForm({ ...eduEditForm, degree: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                                Field of Study
                              </label>
                              <input
                                type="text"
                                value={eduEditForm.field ?? edu.field}
                                onChange={(e) =>
                                  setEduEditForm({ ...eduEditForm, field: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                                Institution Name
                              </label>
                              <input
                                type="text"
                                value={eduEditForm.institution ?? edu.institution}
                                onChange={(e) =>
                                  setEduEditForm({ ...eduEditForm, institution: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                                Score / Aggregate (e.g. 73% or CGPA)
                              </label>
                              <input
                                type="text"
                                value={eduEditForm.score ?? edu.score ?? ""}
                                onChange={(e) =>
                                  setEduEditForm({ ...eduEditForm, score: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                                Status (Pursuing / Completed)
                              </label>
                              <input
                                type="text"
                                value={eduEditForm.status ?? edu.status}
                                onChange={(e) =>
                                  setEduEditForm({ ...eduEditForm, status: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                              Description / Key Focus Areas
                            </label>
                            <textarea
                              rows={2}
                              value={eduEditForm.description ?? edu.description}
                              onChange={(e) =>
                                setEduEditForm({ ...eduEditForm, description: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                            />
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                updateEducation(edu.id, eduEditForm);
                                setEditingEduId(null);
                                setEduEditForm({});
                              }}
                              className="px-4 py-1.5 rounded-lg bg-purple-600 text-white font-semibold cursor-pointer"
                            >
                              Save Changes
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingEduId(null);
                                setEduEditForm({});
                              }}
                              className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              {edu.degree} — {edu.field}
                            </h4>
                            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                              {edu.institution}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                              <span>Status: {edu.status}</span>
                              {edu.score && <span>• Score: {edu.score}</span>}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                              {edu.description}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              setEditingEduId(edu.id);
                              setEduEditForm(edu);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 hover:bg-purple-100 transition-colors cursor-pointer shrink-0"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: SKILLS & TECH STACK (ADD OR REMOVE SKILLS) */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/25 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  Add New Skill to a Category
                </h3>

                <div className="flex flex-col sm:flex-row gap-3 text-xs">
                  <select
                    value={selectedSkillCategory}
                    onChange={(e) => setSelectedSkillCategory(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    {skillCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="e.g. Scikit-Learn / PyTorch / Docker"
                    value={newSkillText}
                    onChange={(e) => setNewSkillText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newSkillText.trim()) {
                        addSkillToCategory(selectedSkillCategory, newSkillText.trim());
                        setNewSkillText("");
                      }
                    }}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />

                  <button
                    onClick={() => {
                      if (newSkillText.trim()) {
                        addSkillToCategory(selectedSkillCategory, newSkillText.trim());
                        setNewSkillText("");
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold cursor-pointer"
                  >
                    Add Skill
                  </button>
                </div>
              </div>

              {/* Skills Category List */}
              <div className="space-y-4">
                {skillCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-4 rounded-xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-slate-800 shadow-sm"
                  >
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                      {cat.title} ({cat.skills.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs"
                        >
                          <span>{skill}</span>
                          <button
                            onClick={() => removeSkillFromCategory(cat.id, skill)}
                            className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                            title={`Remove ${skill}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: RESUME UPLOAD */}
          {activeTab === "resume" && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/25 shadow-sm space-y-4 text-xs">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Upload or Update Printable Resume File</span>
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Upload a fresh PDF resume from your device or provide a direct document URL. The website's "Download CV" buttons will instantly serve this updated file.
                </p>

                {resumeSavedNotice && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Resume file updated and active across the portfolio!</span>
                  </div>
                )}

                <div className="p-6 rounded-2xl border-2 border-dashed border-purple-300 dark:border-purple-500/30 text-center space-y-3 bg-purple-50/30 dark:bg-purple-950/10">
                  <FileText className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      Choose PDF from device
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Standard PDF files up to 10MB
                    </span>
                  </div>
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold cursor-pointer shadow-md shadow-purple-900/30 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Select Resume PDF</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, "resume")}
                      className="hidden"
                    />
                  </label>
                </div>

                <form onSubmit={handleSaveResumeDetails} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Or Provide Direct Resume URL:
                    </label>
                    <input
                      type="text"
                      value={resumeInputUrl}
                      onChange={(e) => setResumeInputUrl(e.target.value)}
                      placeholder="/assets/resume/Abhishek-Singh-Yadav-Resume.pdf"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Download File Name:
                    </label>
                    <input
                      type="text"
                      value={resumeInputName}
                      onChange={(e) => setResumeInputName(e.target.value)}
                      placeholder="Abhishek-Singh-Yadav-Resume.pdf"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold cursor-pointer"
                  >
                    Save Resume Configuration
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 6: GITHUB AUTO-CONNECT & LIVE REPOSITORIES */}
          {activeTab === "github" && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/25 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 text-white">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Connected to github.com/abhishekCode7266
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {gitHubSyncStatus}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => syncWithGitHub(true)}
                    disabled={isSyncingGitHub}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-900/30 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncingGitHub ? "animate-spin" : ""}`} />
                    <span>{isSyncingGitHub ? "Syncing..." : "Sync Live Repos Now"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-mono">
                      Status
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {isGitHubConnected ? "Live Connected" : "Connecting..."}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-mono">
                      Auto-Synced Repos
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {gitHubRepos.length} Repositories
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-mono">
                      Sync Target
                    </span>
                    <span className="font-bold text-purple-600 dark:text-purple-400 truncate block">
                      @abhishekCode7266
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-mono">
                      Last Check
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white truncate block">
                      {gitHubLastSync || "Just now"}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  When you create, push, or delete repositories on your GitHub account, the Projects section automatically updates on the website.
                </p>
              </div>

              {/* Repos list preview with Search */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Synced Public Repositories ({filteredGitHubRepos.length} of {gitHubRepos.length})
                  </h4>
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search repositories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {filteredGitHubRepos.length === 0 ? (
                  <div className="p-8 text-center bg-white dark:bg-[#0c101d] rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500">
                    No repositories or projects found matching "{searchQuery}".
                    <button
                      onClick={() => setSearchQuery("")}
                      className="block mx-auto mt-2 text-purple-600 dark:text-purple-400 underline cursor-pointer"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredGitHubRepos.map((repo) => (
                      <div
                        key={repo.id}
                        className="p-3.5 rounded-xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-purple-400 transition-colors"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {repo.title}
                            </h5>
                            <a
                              href={repo.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-purple-600"
                              title="View on GitHub"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                            {repo.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] font-mono text-purple-600 dark:text-purple-400 mt-2">
                          <span>{repo.category}</span>
                          {repo.technologies && repo.technologies.length > 0 && (
                            <span>• {repo.technologies[0]}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Embedded Recent Activity Panel in GitHub Sync tab */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <RecentActivityPanel />
              </div>
            </div>
          )}

          {/* TAB 7: RECENT ACTIVITY & COMMIT TRACKER (STANDALONE) */}
          {activeTab === "activity" && <RecentActivityPanel />}

          {/* TAB 8: GITHUB ANALYTICS & D3 CONTRIBUTION STREAKS */}
          {activeTab === "analytics" && <GitHubAnalyticsSection />}

          {/* TAB 9: GITHUB WEBHOOK LISTENER CONFIGURATION & REAL-TIME IMPORT */}
          {activeTab === "webhook" && <GitHubWebhookConfig />}

          {/* TAB 8: EXPORT DATA TO GITHUB FILE */}
          {activeTab === "export" && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-300">
                <p className="font-semibold mb-1">
                  1-Click Export: Make your edits permanent in your GitHub Repository!
                </p>
                <p className="text-[11px] text-purple-700 dark:text-purple-400">
                  All edits made in this studio are active right now in your current session and stored in browser memory. To ensure they stay forever when deploying to GitHub Pages, you can copy the updated data below and paste it into <code>src/data/</code> on GitHub.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">
                  Updated Certifications TS Code:
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(certifications, null, 2));
                    setCopiedExport(true);
                    setTimeout(() => setCopiedExport(false), 2000);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold cursor-pointer"
                >
                  {copiedExport ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedExport ? "Copied JSON!" : "Copy JSON Data"}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto max-h-64 border border-slate-800">
                {JSON.stringify(certifications, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#101628]/95 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Changes take effect immediately on screen and persist in browser storage.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold cursor-pointer"
          >
            Done Editing
          </button>
        </div>
      </div>
    </div>
  );
};
