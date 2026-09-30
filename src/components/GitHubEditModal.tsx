import React from "react";
import { siteConfig } from "@/data/site";
import { X, ExternalLink, Smartphone, Laptop, GitCommit, CheckCircle2 } from "lucide-react";

interface GitHubEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubEditModal: React.FC<GitHubEditModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const repoBase = `${siteConfig.repoUrl}/edit/main/src/data`;

  const files = [
    { name: "Profile & Bio", file: "profile.ts", path: `${repoBase}/profile.ts`, desc: "Name, title, intro, and about paragraphs" },
    { name: "Skills & Tech Stack", file: "skills.ts", path: `${repoBase}/skills.ts`, desc: "Categories, tools, frameworks & pills" },
    { name: "Featured Projects", file: "projects.ts", path: `${repoBase}/projects.ts`, desc: "Project cards, descriptions, URLs & tags" },
    { name: "Certifications", file: "certifications.ts", path: `${repoBase}/certifications.ts`, desc: "Badges, issuers, dates & verification URLs" },
    { name: "Education", file: "education.ts", path: `${repoBase}/education.ts`, desc: "Degree, college, percentage & highlights" },
    { name: "Experience", file: "experience.ts", path: `${repoBase}/experience.ts`, desc: "Internship details, roles & responsibilities" },
    { name: "Social Links", file: "socials.ts", path: `${repoBase}/socials.ts`, desc: "GitHub, LinkedIn, Email, and links" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d121f] border border-purple-500/30 rounded-2xl p-6 shadow-2xl shadow-purple-950/50 text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800/60 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
            <GitCommit className="w-6 h-6" />
          </div>
          <div>
            <h3 id="edit-modal-title" className="text-xl font-bold text-white">
              Edit Content via GitHub
            </h3>
            <p className="text-xs text-purple-300/80 font-mono">
              Single Source of Truth • Instant Auto-Deployment
            </p>
          </div>
        </div>

        {/* Workflow Explanation Banner */}
        <div className="my-4 p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-indigo-950/40 border border-purple-500/20 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 text-purple-300 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>How to Update from Mobile or Laptop:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-400">
            <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <Smartphone className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">Mobile Phone:</strong> Tap any file below, edit in your mobile browser, commit to <code className="text-purple-300">main</code>.
              </div>
            </div>
            <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <Laptop className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">Laptop:</strong> Edit files in your editor, run <code className="text-purple-300">git push origin main</code>.
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            GitHub Actions validates every change and automatically updates the live website at{" "}
            <a href={siteConfig.siteUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">
              {siteConfig.domain}{siteConfig.subpath}
            </a>.
          </p>
        </div>

        {/* List of Data Files to Edit */}
        <div className="space-y-2.5 mt-4">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
            Select Section to Edit in GitHub:
          </h4>
          {files.map((item) => (
            <a
              key={item.file}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 group-hover:text-purple-200 border border-slate-700">
                    src/data/{item.file}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-purple-400 group-hover:text-purple-300 shrink-0 ml-3">
                <span className="hidden sm:inline">Edit</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <a
            href={`${siteConfig.repoUrl}/actions`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-purple-300 flex items-center gap-1.5"
          >
            <span>View GitHub Actions Deployment Status</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
