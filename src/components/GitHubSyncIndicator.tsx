import React from "react";
import { usePortfolioData } from "@/context/DataContext";
import {
  RefreshCw,
  Github,
  CheckCircle2,
  AlertCircle,
  Clock,
  Radio,
  ExternalLink,
  Layers,
  Zap,
} from "lucide-react";

interface GitHubSyncIndicatorProps {
  variant?: "banner" | "compact" | "detailed";
  onForceResync?: () => void;
}

export const GitHubSyncIndicator: React.FC<GitHubSyncIndicatorProps> = ({
  variant = "banner",
  onForceResync,
}) => {
  const {
    isSyncingGitHub,
    isGitHubConnected,
    gitHubLastSync,
    gitHubTelemetry,
    gitHubRepos,
    hasLocalChanges,
    syncWithGitHub,
  } = usePortfolioData();

  const handleResync = () => {
    if (onForceResync) {
      onForceResync();
    } else {
      syncWithGitHub(true);
    }
  };

  const getStatusColor = () => {
    if (isSyncingGitHub) return "amber";
    if (gitHubTelemetry.status === "error" || gitHubTelemetry.status === "rate_limited") return "rose";
    if (isGitHubConnected) return "emerald";
    return "slate";
  };

  const statusColor = getStatusColor();

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2 text-xs">
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-300 ${
            isSyncingGitHub
              ? "bg-amber-50/90 dark:bg-amber-950/70 border-amber-300 dark:border-amber-600/70 shadow-sm shadow-amber-500/20 animate-pulse text-amber-800 dark:text-amber-200"
              : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          }`}
        >
          <span className="relative flex h-2 w-2">
            {isSyncingGitHub && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isSyncingGitHub
                  ? "bg-amber-500 animate-pulse"
                  : isGitHubConnected
                  ? "bg-emerald-500 animate-pulse"
                  : "bg-rose-500"
              }`}
            />
          </span>

          {isSyncingGitHub && (
            <RefreshCw className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400 animate-spin" />
          )}

          <span className="font-mono text-[11px] font-medium">
            {isSyncingGitHub
              ? "Syncing GitHub..."
              : isGitHubConnected
              ? "GitHub Synced"
              : "Sync Alert"}
          </span>
        </div>

        <button
          onClick={handleResync}
          disabled={isSyncingGitHub}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer disabled:opacity-75 ${
            isSyncingGitHub
              ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700/60 animate-pulse"
              : "bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30"
          }`}
          title="Force immediate re-fetch from GitHub API"
        >
          <RefreshCw className={`w-3 h-3 ${isSyncingGitHub ? "animate-spin text-amber-600 dark:text-amber-400" : ""}`} />
          <span>{isSyncingGitHub ? "Syncing..." : "Force Resync"}</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-purple-50/50 via-white to-slate-50 dark:from-[#0d1428] dark:via-[#0c101d] dark:to-[#120d24] border transition-all duration-500 shadow-md ${
        isSyncingGitHub
          ? "border-amber-400/70 dark:border-amber-500/50 ring-2 ring-amber-400/20 dark:ring-amber-500/25 shadow-lg shadow-amber-500/10"
          : "border-purple-200/80 dark:border-purple-500/30"
      }`}
    >
      {/* Subtle pulsing background glow wave during active sync */}
      {isSyncingGitHub && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-400/10 to-purple-500/5 animate-pulse pointer-events-none" />
      )}

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Status & Telemetry details */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Pill with subtle pulsing animation when syncing */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-300 ${
                statusColor === "emerald"
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/40"
                  : statusColor === "amber"
                  ? "bg-amber-50/95 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-500/60 shadow-sm shadow-amber-500/20 animate-pulse"
                  : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/40"
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                {isSyncingGitHub ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-amber-400" />
                    <span className="absolute -inset-1 rounded-full bg-amber-400/25 animate-pulse" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                  </>
                ) : (
                  <>
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        statusColor === "emerald"
                          ? "bg-emerald-400"
                          : "bg-rose-400"
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                        statusColor === "emerald"
                          ? "bg-emerald-500"
                          : "bg-rose-500"
                      }`}
                    />
                  </>
                )}
              </span>

              {isSyncingGitHub && (
                <RefreshCw className="w-3 h-3 text-amber-600 dark:text-amber-400 animate-spin" />
              )}

              <span className={isSyncingGitHub ? "animate-pulse font-medium" : ""}>
                {isSyncingGitHub
                  ? "Syncing with GitHub..."
                  : isGitHubConnected
                  ? "Real-Time GitHub Sync Connected"
                  : "GitHub Sync Disconnected"}
              </span>
            </div>

            {/* Local edits badge if present */}
            {hasLocalChanges ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[11px] font-mono">
                <AlertCircle className="w-3 h-3 text-amber-500" />
                <span>Local Edits Active (Uncommitted)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 text-[11px] font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>Local State Clean</span>
              </span>
            )}

            {/* Source indicator */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 text-[11px] font-mono">
              <Radio className="w-3 h-3 text-purple-500" />
              <span>
                {gitHubTelemetry.cacheSource === "live"
                  ? "Live API Stream"
                  : gitHubTelemetry.cacheSource === "cache"
                  ? "Cached (15m window)"
                  : "Offline Fallback"}
              </span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <Github className="w-3.5 h-3.5 text-slate-500" />
              <span>Target: <strong>@{gitHubTelemetry.targetUser}</strong></span>
            </span>

            <span>•</span>

            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-purple-500" />
              <span>Repos: <strong>{gitHubRepos.length} public</strong></span>
            </span>

            <span>•</span>

            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Checked: {gitHubLastSync || "Just now"}</span>
            </span>

            {gitHubTelemetry.latencyMs !== undefined && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>{gitHubTelemetry.latencyMs}ms</span>
                </span>
              </>
            )}

            {gitHubTelemetry.rateLimitRemaining !== undefined && (
              <>
                <span>•</span>
                <span title="GitHub unauthenticated REST API quota">
                  Quota: {gitHubTelemetry.rateLimitRemaining}/{gitHubTelemetry.rateLimitTotal ?? 60}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right: Force Resync button & target link */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleResync}
            disabled={isSyncingGitHub}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white text-xs font-semibold shadow-md shadow-purple-900/30 transition-all cursor-pointer disabled:opacity-50 hover:scale-105 active:scale-95"
            title="Bypass cache and force an immediate real-time sync with GitHub API"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncingGitHub ? "animate-spin" : ""}`} />
            <span>{isSyncingGitHub ? "Re-syncing..." : "Force Resync"}</span>
          </button>

          <a
            href="https://github.com/abhishekCode7266"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors shadow-sm"
            title="Open GitHub profile in new tab"
            aria-label="Open GitHub Profile"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
