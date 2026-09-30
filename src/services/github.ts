import { ProjectItem } from "@/data/projects";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  fork: boolean;
  archived: boolean;
}

export interface GitHubSyncTelemetry {
  rateLimitRemaining?: number;
  rateLimitTotal?: number;
  latencyMs?: number;
  cacheSource: "live" | "cache" | "stale_fallback";
  status: "synced" | "syncing" | "rate_limited" | "error";
  targetUser: string;
  targetRepo: string;
}

const GITHUB_USERNAME = "abhishekCode7266";
const TARGET_REPO = "abhishekCode7266/Abhishek_portfolio";
const CACHE_KEY = "portfolio_github_repos_cache";
const CACHE_EXPIRY_MS = 1000 * 60 * 15; // 15 minutes cache

export async function fetchGitHubRepositories(forceRefresh = false): Promise<{
  repos: ProjectItem[];
  rawRepos: GitHubRepo[];
  lastUpdated: string;
  fromCache: boolean;
  telemetry: GitHubSyncTelemetry;
  error?: string;
}> {
  // Check local cache if not forcing refresh
  if (!forceRefresh && typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_EXPIRY_MS) {
          return {
            repos: parsed.repos,
            rawRepos: parsed.rawRepos || [],
            lastUpdated: new Date(parsed.timestamp).toLocaleTimeString(),
            fromCache: true,
            telemetry: {
              cacheSource: "cache",
              status: "synced",
              targetUser: GITHUB_USERNAME,
              targetRepo: TARGET_REPO,
              rateLimitRemaining: parsed.rateLimitRemaining ?? 60,
              rateLimitTotal: parsed.rateLimitTotal ?? 60,
              latencyMs: 12,
            },
          };
        }
      }
    } catch {
      // Ignore cache parse error
    }
  }

  const startTime = Date.now();

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    const latencyMs = Date.now() - startTime;
    const rateLimitRemaining = response.headers.get("x-ratelimit-remaining")
      ? parseInt(response.headers.get("x-ratelimit-remaining")!, 10)
      : undefined;
    const rateLimitTotal = response.headers.get("x-ratelimit-limit")
      ? parseInt(response.headers.get("x-ratelimit-limit")!, 10)
      : undefined;

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("GitHub API rate limit reached. Showing local/cached repositories.");
      }
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data: GitHubRepo[] = await response.json();

    // Map GitHub repos to ProjectItem format
    const mappedProjects: ProjectItem[] = data
      .filter((repo) => !repo.archived) // exclude archived repos
      .map((repo) => {
        // Infer category based on language, topics, or repo name
        let category: ProjectItem["category"] = "Software Development";
        const text = `${repo.name} ${repo.description || ""} ${(repo.topics || []).join(" ")}`.toLowerCase();

        if (text.includes("ai") || text.includes("machine learning") || text.includes("model") || text.includes("assistant")) {
          category = "AI / ML";
        } else if (text.includes("data") || text.includes("analytics") || text.includes("pandas") || text.includes("analysis")) {
          category = "Data Analytics";
        } else if (text.includes("web") || text.includes("react") || text.includes("html") || text.includes("frontend") || text.includes("portfolio")) {
          category = "Web Development";
        }

        const technologies: string[] = [];
        if (repo.language) technologies.push(repo.language);
        if (repo.topics && repo.topics.length > 0) {
          technologies.push(...repo.topics.slice(0, 4));
        }
        if (technologies.length === 0) {
          technologies.push("Python", "Software Engineering");
        }

        return {
          id: `gh-${repo.id}`,
          title: repo.name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          description:
            repo.description ||
            `Public repository ${repo.name} maintained by @${GITHUB_USERNAME} with automated GitHub sync.`,
          category,
          image: "/assets/projects/code-preview.svg",
          technologies,
          github: repo.html_url,
          liveDemo: repo.homepage && repo.homepage.startsWith("http") ? repo.homepage : undefined,
          featured: Boolean(repo.stargazers_count > 0 || (repo.homepage && repo.homepage.length > 0)),
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.updated_at,
          isLiveGitHub: true,
        };
      });

    // Cache the results
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timestamp: Date.now(),
            repos: mappedProjects,
            rawRepos: data,
            rateLimitRemaining,
            rateLimitTotal,
          })
        );
      } catch {
        // Cache quota exceeded
      }
    }

    return {
      repos: mappedProjects,
      rawRepos: data,
      lastUpdated: new Date().toLocaleTimeString(),
      fromCache: false,
      telemetry: {
        cacheSource: "live",
        status: "synced",
        targetUser: GITHUB_USERNAME,
        targetRepo: TARGET_REPO,
        rateLimitRemaining,
        rateLimitTotal,
        latencyMs,
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to connect to GitHub";

    // Try fallback from expired cache if available
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          return {
            repos: parsed.repos,
            rawRepos: parsed.rawRepos || [],
            lastUpdated: new Date(parsed.timestamp).toLocaleTimeString(),
            fromCache: true,
            telemetry: {
              cacheSource: "stale_fallback",
              status: message.includes("rate limit") ? "rate_limited" : "error",
              targetUser: GITHUB_USERNAME,
              targetRepo: TARGET_REPO,
              rateLimitRemaining: 0,
              rateLimitTotal: 60,
              latencyMs: Date.now() - startTime,
            },
            error: `${message} (Showing cached data)`,
          };
        } catch {
          // ignore
        }
      }
    }

    return {
      repos: [],
      rawRepos: [],
      lastUpdated: "Unavailable",
      fromCache: false,
      telemetry: {
        cacheSource: "stale_fallback",
        status: "error",
        targetUser: GITHUB_USERNAME,
        targetRepo: TARGET_REPO,
        latencyMs: Date.now() - startTime,
      },
      error: message,
    };
  }
}
