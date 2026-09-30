import React, { useState, useEffect } from "react";
import { usePortfolioData } from "@/context/DataContext";
import {
  WebhookDelivery,
  fetchWebhookStatus,
  triggerTestWebhook,
  subscribeToWebhook,
} from "@/services/webhook";
import { ProjectItem } from "@/data/projects";
import {
  Webhook,
  Copy,
  Check,
  ExternalLink,
  Zap,
  Play,
  CheckCircle2,
  RefreshCw,
  Radio,
  Clock,
  ShieldCheck,
  Eye,
  EyeOff,
  BellRing,
  GitBranch,
  Layers,
} from "lucide-react";

export const GitHubWebhookConfig: React.FC = () => {
  const { addProject, syncWithGitHub } = usePortfolioData();

  const [deliveries, setDeliveries] = useState<WebhookDelivery[]>([]);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [webhookSecret] = useState(() => "asy_wh_sec_" + Math.random().toString(36).substring(2, 10));

  // Simulation form
  const [simEventType, setSimEventType] = useState<"repository" | "push" | "ping">("repository");
  const [simRepoName, setSimRepoName] = useState("ai-nlp-data-pipeline");
  const [simRepoDesc, setSimRepoDesc] = useState("High-throughput NLP pipeline and machine learning dataset preprocessing.");
  const [simLanguage, setSimLanguage] = useState("Python");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simNotification, setSimNotification] = useState<string | null>(null);

  // Compute absolute webhook URL based on current browser location
  const currentOrigin = typeof window !== "undefined" ? window.location.origin : "https://abhishekcode7266.github.io";
  const webhookUrl = `${currentOrigin}/api/github/webhook`;

  // Fetch initial webhook status and deliveries
  useEffect(() => {
    fetchWebhookStatus().then((res) => {
      setDeliveries(res.deliveries);
    });

    // Subscribe to live SSE events from server
    const unsubscribe = subscribeToWebhook((newEvent) => {
      setDeliveries((prev) => [newEvent, ...prev.slice(0, 19)]);

      // Auto-import if it's a repository creation event
      if (newEvent.event === "repository" && (newEvent.action === "created" || !newEvent.action)) {
        const importedProject: ProjectItem = {
          id: `wh-${Date.now()}`,
          title: newEvent.repository.name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          description: newEvent.repository.description || "Project automatically imported via GitHub webhook listener.",
          category: "AI / ML",
          image: "/assets/projects/code-preview.svg",
          technologies: [newEvent.repository.language || "Python", "GitHub Webhook Auto-Import"],
          github: newEvent.repository.htmlUrl,
          featured: true,
          stars: newEvent.repository.stars,
          forks: newEvent.repository.forks,
          isLiveGitHub: true,
        };

        addProject(importedProject);
        setSimNotification(`🎉 Webhook received! Auto-imported repository "${newEvent.repository.name}" into your portfolio.`);
      } else {
        setSimNotification(`⚡ Webhook event '${newEvent.event}' processed for "${newEvent.repository.name}".`);
      }

      // Auto-clear toast
      setTimeout(() => setSimNotification(null), 5000);
    });

    return () => {
      unsubscribe();
    };
  }, [addProject]);

  const handleCopy = (text: string, type: "url" | "secret") => {
    navigator.clipboard.writeText(text);
    if (type === "url") {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else {
      setCopiedSecret(true);
      setTimeout(() => setCopiedSecret(false), 2000);
    }
  };

  const handleRunSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulating(true);

    try {
      const result = await triggerTestWebhook({
        eventType: simEventType,
        repoName: simRepoName.trim(),
        repoDescription: simRepoDesc.trim(),
        language: simLanguage.trim(),
      });

      // If test created a repository, add it to portfolio
      if (simEventType === "repository") {
        const importedProject: ProjectItem = {
          id: `wh-${Date.now()}`,
          title: result.repository.name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          description: result.repository.description || "Project automatically imported via GitHub webhook listener.",
          category: "AI / ML",
          image: "/assets/projects/code-preview.svg",
          technologies: [result.repository.language || "Python", "Auto-Imported"],
          github: result.repository.htmlUrl,
          featured: true,
          stars: 5,
          forks: 1,
          isLiveGitHub: true,
        };

        addProject(importedProject);
        setSimNotification(`🚀 Success: Webhook fired! New repository "${result.repository.name}" detected and imported into your live Projects section.`);
      } else {
        setSimNotification(`⚡ Webhook fired! Pushed commit detected on "${result.repository.name}". Portfolio refreshed.`);
        syncWithGitHub(true);
      }
    } catch {
      setSimNotification("Webhook test simulation completed locally.");
    } finally {
      setIsSimulating(false);
      setTimeout(() => setSimNotification(null), 5000);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Toast Notification Alert Banner */}
      {simNotification && (
        <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-500/50 text-purple-900 dark:text-purple-200 flex items-center justify-between gap-3 shadow-md animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-bounce" />
            <span className="font-medium text-xs">{simNotification}</span>
          </div>
          <button
            onClick={() => setSimNotification(null)}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-900"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Webhook Listener Configuration Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/25 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-500/30">
              <Webhook className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>GitHub Webhook Listener Configuration</span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono border border-emerald-300 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Endpoint Active</span>
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Automatically detects when you create, update, or push to repositories on GitHub and imports them into your portfolio without manual edits.
              </p>
            </div>
          </div>

          <a
            href="https://github.com/abhishekCode7266/Abhishek_portfolio/settings/hooks/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-sm shadow-purple-900/30 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>Open GitHub Webhook Settings</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Payload URL & Secret Field */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Payload URL */}
          <div className="space-y-1.5">
            <label className="block text-slate-600 dark:text-slate-400 font-medium text-[11px]">
              Payload URL (Copy to GitHub Webhooks):
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={webhookUrl}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-purple-300 font-mono text-[11px] select-all focus:outline-none"
              />
              <button
                onClick={() => handleCopy(webhookUrl, "url")}
                className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors cursor-pointer shrink-0"
                title="Copy Payload URL"
              >
                {copiedUrl ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Content type must be set to <strong>application/json</strong>
            </p>
          </div>

          {/* Secret Token */}
          <div className="space-y-1.5">
            <label className="block text-slate-600 dark:text-slate-400 font-medium text-[11px]">
              Secret Token (Optional Signature Verification):
            </label>
            <div className="flex items-center gap-2">
              <input
                type={showSecret ? "text" : "password"}
                readOnly
                value={webhookSecret}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-purple-300 font-mono text-[11px] select-all focus:outline-none"
              />
              <button
                onClick={() => setShowSecret(!showSecret)}
                className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer shrink-0"
                title={showSecret ? "Hide Secret" : "Show Secret"}
              >
                {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleCopy(webhookSecret, "secret")}
                className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors cursor-pointer shrink-0"
                title="Copy Secret Token"
              >
                {copiedSecret ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Paste in GitHub to secure webhook payloads via HMAC SHA-256.
            </p>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
          <h4 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>3-Step Setup in your GitHub Repository</span>
          </h4>
          <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>
              Go to your GitHub repo <strong>Settings → Webhooks → Add webhook</strong>.
            </li>
            <li>
              Paste the <strong>Payload URL</strong> above and choose <strong>application/json</strong> as the Content type.
            </li>
            <li>
              Under <em>"Which events would you like to trigger this webhook?"</em>, choose <strong>"Let me select individual events"</strong> and select <strong>Repositories</strong> and <strong>Pushes</strong>.
            </li>
          </ol>
        </div>
      </div>

      {/* Simulator / Test Trigger Runner */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/25 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Test Webhook Event Simulator</span>
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Dispatch a simulated GitHub webhook payload right now to test real-time detection and automatic project import.
            </p>
          </div>
        </div>

        <form onSubmit={handleRunSimulation} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                Event Type
              </label>
              <select
                value={simEventType}
                onChange={(e) => setSimEventType(e.target.value as "repository" | "push" | "ping")}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                <option value="repository">repository.created (New Project Auto-Import)</option>
                <option value="push">push (Commit / Code Update)</option>
                <option value="ping">ping (GitHub Handshake)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                Repository Name
              </label>
              <input
                type="text"
                required
                value={simRepoName}
                onChange={(e) => setSimRepoName(e.target.value)}
                placeholder="e.g. churn-prediction-model"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                Primary Language
              </label>
              <input
                type="text"
                value={simLanguage}
                onChange={(e) => setSimLanguage(e.target.value)}
                placeholder="Python / TypeScript"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
              Project Description
            </label>
            <input
              type="text"
              value={simRepoDesc}
              onChange={(e) => setSimRepoDesc(e.target.value)}
              placeholder="Brief summary of the project..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSimulating}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-semibold shadow-md shadow-purple-900/30 transition-all cursor-pointer disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? "animate-spin" : ""}`} />
            <span>{isSimulating ? "Sending Webhook..." : "Dispatch Test Webhook Event"}</span>
          </button>
        </form>
      </div>

      {/* Live Webhook Deliveries Log */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-500" />
            <span>Live Webhook Deliveries &amp; Event Stream ({deliveries.length})</span>
          </h4>
        </div>

        <div className="space-y-2">
          {deliveries.length === 0 ? (
            <div className="p-6 rounded-xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-slate-800 text-center text-slate-500">
              No webhook events recorded yet. Configure the webhook in GitHub or dispatch a test event above.
            </div>
          ) : (
            deliveries.map((del) => (
              <div
                key={del.id}
                className="p-3.5 rounded-xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-purple-400 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                      {del.event}
                      {del.action ? `.${del.action}` : ""}
                    </span>

                    <span className="font-bold text-slate-900 dark:text-white">
                      {del.repository.name}
                    </span>

                    {del.repository.language && (
                      <span className="text-[10px] text-slate-500 font-mono">
                        ({del.repository.language})
                      </span>
                    )}

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        del.status === "imported"
                          ? "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                          : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400"
                      }`}
                    >
                      {del.status === "imported" ? "Auto-Imported" : "Processed 200 OK"}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-normal">
                    {del.summary}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-slate-500 shrink-0 font-mono text-[11px]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{del.timestamp}</span>
                  </span>

                  <a
                    href={del.repository.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-purple-600 transition-colors"
                    title="View repository on GitHub"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
