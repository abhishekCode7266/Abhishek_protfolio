import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { certifications as defaultCertifications, CertificationItem } from "@/data/certifications";
import { educationList as defaultEducation, EducationItem } from "@/data/education";
import { experiences as defaultExperiences, ExperienceItem } from "@/data/experience";
import { skillCategories as defaultSkills, SkillCategory } from "@/data/skills";
import { projects as defaultProjects, ProjectItem } from "@/data/projects";
import { profile as defaultProfile } from "@/data/profile";
import { fetchGitHubRepositories, GitHubRepo, GitHubSyncTelemetry } from "@/services/github";

interface DataContextType {
  // Certifications (supports 100+)
  certifications: CertificationItem[];
  addCertificate: (cert: CertificationItem) => void;
  updateCertificate: (id: string, updated: Partial<CertificationItem>) => void;
  deleteCertificate: (id: string) => void;

  // Education
  educationList: EducationItem[];
  updateEducation: (id: string, updated: Partial<EducationItem>) => void;
  addEducation: (item: EducationItem) => void;
  deleteEducation: (id: string) => void;

  // Experience / Internships
  experiences: ExperienceItem[];
  addExperience: (exp: ExperienceItem) => void;
  updateExperience: (id: string, updated: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;

  // Skills
  skillCategories: SkillCategory[];
  updateSkillCategory: (id: string, skills: string[]) => void;
  addSkillToCategory: (categoryId: string, skill: string) => void;
  removeSkillFromCategory: (categoryId: string, skill: string) => void;

  // Projects & Live GitHub
  projects: ProjectItem[];
  gitHubRepos: ProjectItem[];
  rawGitHubRepos: GitHubRepo[];
  isGitHubConnected: boolean;
  isSyncingGitHub: boolean;
  gitHubSyncStatus: string;
  gitHubLastSync: string;
  gitHubTelemetry: GitHubSyncTelemetry;
  viewMode: "all" | "curated" | "github";
  setViewMode: (mode: "all" | "curated" | "github") => void;
  syncWithGitHub: (force?: boolean) => Promise<void>;
  addProject: (proj: ProjectItem) => void;
  deleteProject: (id: string) => void;

  // Resume Upload / Document
  resumeUrl: string;
  resumeFileName: string;
  updateResume: (url: string, fileName?: string) => void;

  // Persistence helpers
  hasLocalChanges: boolean;
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CERTIFICATIONS: "portfolio_custom_certifications",
  EDUCATION: "portfolio_custom_education",
  EXPERIENCES: "portfolio_custom_experiences",
  SKILLS: "portfolio_custom_skills",
  PROJECTS: "portfolio_custom_projects",
  RESUME_URL: "portfolio_custom_resume_url",
  RESUME_NAME: "portfolio_custom_resume_name",
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Certifications
  const [certifications, setCertifications] = useState<CertificationItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.CERTIFICATIONS);
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return defaultCertifications;
  });

  // Education
  const [educationList, setEducationList] = useState<EducationItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.EDUCATION);
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return defaultEducation;
  });

  // Experience
  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.EXPERIENCES);
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return defaultExperiences;
  });

  // Skills
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return defaultSkills;
  });

  // Projects
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return defaultProjects;
  });

  // Resume
  const [resumeUrl, setResumeUrl] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.RESUME_URL);
      if (saved) return saved;
    }
    return defaultProfile.resume;
  });

  const [resumeFileName, setResumeFileName] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.RESUME_NAME);
      if (saved) return saved;
    }
    return "Abhishek-Singh-Yadav-Resume.pdf";
  });

  // GitHub Auto-connect State
  const [gitHubRepos, setGitHubRepos] = useState<ProjectItem[]>([]);
  const [rawGitHubRepos, setRawGitHubRepos] = useState<GitHubRepo[]>([]);
  const [isGitHubConnected, setIsGitHubConnected] = useState<boolean>(false);
  const [isSyncingGitHub, setIsSyncingGitHub] = useState<boolean>(false);
  const [gitHubSyncStatus, setGitHubSyncStatus] = useState<string>("Initializing...");
  const [gitHubLastSync, setGitHubLastSync] = useState<string>("");
  const [gitHubTelemetry, setGitHubTelemetry] = useState<GitHubSyncTelemetry>({
    cacheSource: "live",
    status: "syncing",
    targetUser: "abhishekCode7266",
    targetRepo: "abhishekCode7266/Abhishek_portfolio",
    rateLimitRemaining: 60,
    rateLimitTotal: 60,
    latencyMs: 0,
  });
  const [viewMode, setViewMode] = useState<"all" | "curated" | "github">("all");

  const [hasLocalChanges, setHasLocalChanges] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return (
        !!localStorage.getItem(STORAGE_KEYS.CERTIFICATIONS) ||
        !!localStorage.getItem(STORAGE_KEYS.EDUCATION) ||
        !!localStorage.getItem(STORAGE_KEYS.EXPERIENCES) ||
        !!localStorage.getItem(STORAGE_KEYS.SKILLS) ||
        !!localStorage.getItem(STORAGE_KEYS.PROJECTS) ||
        !!localStorage.getItem(STORAGE_KEYS.RESUME_URL)
      );
    }
    return false;
  });

  // Automatic GitHub Sync function
  const syncWithGitHub = useCallback(async (force = false) => {
    setIsSyncingGitHub(true);
    setGitHubSyncStatus("Syncing with @abhishekCode7266...");
    try {
      const result = await fetchGitHubRepositories(force);
      setGitHubRepos(result.repos);
      setRawGitHubRepos(result.rawRepos);
      setGitHubLastSync(result.lastUpdated);
      setGitHubTelemetry(result.telemetry);
      setIsGitHubConnected(result.repos.length > 0);

      if (result.error) {
        setGitHubSyncStatus(result.error);
      } else {
        setGitHubSyncStatus(
          `Connected: ${result.repos.length} repos synced from GitHub (${result.fromCache ? "Cache" : "Live API"})`
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Sync error";
      setGitHubSyncStatus(`GitHub Sync Error: ${msg}`);
      setIsGitHubConnected(false);
    } finally {
      setIsSyncingGitHub(false);
    }
  }, []);

  // Initial GitHub Fetch on mount
  useEffect(() => {
    syncWithGitHub(false);
  }, [syncWithGitHub]);

  // Certifications operations
  const addCertificate = (cert: CertificationItem) => {
    const updated = [cert, ...certifications];
    setCertifications(updated);
    localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(updated));
    setHasLocalChanges(true);
  };

  const updateCertificate = (id: string, partial: Partial<CertificationItem>) => {
    const updated = certifications.map((c) => (c.id === id ? { ...c, ...partial } : c));
    setCertifications(updated);
    localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(updated));
    setHasLocalChanges(true);
  };

  const deleteCertificate = (id: string) => {
    const updated = certifications.filter((c) => c.id !== id);
    setCertifications(updated);
    localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(updated));
    setHasLocalChanges(true);
  };

  // Education operations
  const updateEducation = (id: string, partial: Partial<EducationItem>) => {
    const updated = educationList.map((e) => (e.id === id ? { ...e, ...partial } : e));
    setEducationList(updated);
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(updated));
    setHasLocalChanges(true);
  };

  const addEducation = (item: EducationItem) => {
    const updated = [...educationList, item];
    setEducationList(updated);
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(updated));
    setHasLocalChanges(true);
  };

  const deleteEducation = (id: string) => {
    const updated = educationList.filter((e) => e.id !== id);
    setEducationList(updated);
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(updated));
    setHasLocalChanges(true);
  };

  // Experience operations
  const addExperience = (exp: ExperienceItem) => {
    const updated = [exp, ...experiences];
    setExperiences(updated);
    localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(updated));
    setHasLocalChanges(true);
  };

  const updateExperience = (id: string, partial: Partial<ExperienceItem>) => {
    const updated = experiences.map((exp) => (exp.id === id ? { ...exp, ...partial } : exp));
    setExperiences(updated);
    localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(updated));
    setHasLocalChanges(true);
  };

  const deleteExperience = (id: string) => {
    const updated = experiences.filter((exp) => exp.id !== id);
    setExperiences(updated);
    localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(updated));
    setHasLocalChanges(true);
  };

  // Skills operations
  const updateSkillCategory = (id: string, skills: string[]) => {
    const updated = skillCategories.map((cat) => (cat.id === id ? { ...cat, skills } : cat));
    setSkillCategories(updated);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
    setHasLocalChanges(true);
  };

  const addSkillToCategory = (categoryId: string, skill: string) => {
    if (!skill.trim()) return;
    const updated = skillCategories.map((cat) => {
      if (cat.id === categoryId && !cat.skills.includes(skill.trim())) {
        return { ...cat, skills: [...cat.skills, skill.trim()] };
      }
      return cat;
    });
    setSkillCategories(updated);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
    setHasLocalChanges(true);
  };

  const removeSkillFromCategory = (categoryId: string, skill: string) => {
    const updated = skillCategories.map((cat) => {
      if (cat.id === categoryId) {
        return { ...cat, skills: cat.skills.filter((s) => s !== skill) };
      }
      return cat;
    });
    setSkillCategories(updated);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
    setHasLocalChanges(true);
  };

  // Projects operations
  const addProject = (proj: ProjectItem) => {
    const updated = [proj, ...projects];
    setProjects(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    setHasLocalChanges(true);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    setHasLocalChanges(true);
  };

  // Resume operations
  const updateResume = (url: string, fileName?: string) => {
    setResumeUrl(url);
    localStorage.setItem(STORAGE_KEYS.RESUME_URL, url);
    if (fileName) {
      setResumeFileName(fileName);
      localStorage.setItem(STORAGE_KEYS.RESUME_NAME, fileName);
    }
    setHasLocalChanges(true);
  };

  // Reset to original data files
  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.CERTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.EDUCATION);
    localStorage.removeItem(STORAGE_KEYS.EXPERIENCES);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.RESUME_URL);
    localStorage.removeItem(STORAGE_KEYS.RESUME_NAME);

    setCertifications(defaultCertifications);
    setEducationList(defaultEducation);
    setExperiences(defaultExperiences);
    setSkillCategories(defaultSkills);
    setProjects(defaultProjects);
    setResumeUrl(defaultProfile.resume);
    setResumeFileName("Abhishek-Singh-Yadav-Resume.pdf");
    setHasLocalChanges(false);
  };

  const value: DataContextType = {
    certifications,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    educationList,
    updateEducation,
    addEducation,
    deleteEducation,
    experiences,
    addExperience,
    updateExperience,
    deleteExperience,
    skillCategories,
    updateSkillCategory,
    addSkillToCategory,
    removeSkillFromCategory,
    projects,
    gitHubRepos,
    rawGitHubRepos,
    isGitHubConnected,
    isSyncingGitHub,
    gitHubSyncStatus,
    gitHubLastSync,
    gitHubTelemetry,
    viewMode,
    setViewMode,
    syncWithGitHub,
    addProject,
    deleteProject,
    resumeUrl,
    resumeFileName,
    updateResume,
    hasLocalChanges,
    resetToDefaults,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const usePortfolioData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("usePortfolioData must be used within a DataProvider");
  }
  return context;
};
