export interface WebhookDelivery {
  id: string;
  event: string;
  action?: string;
  sender: string;
  repository: {
    name: string;
    fullName: string;
    description: string | null;
    htmlUrl: string;
    language: string | null;
    stars: number;
    forks: number;
  };
  timestamp: string;
  status: "received" | "processed" | "imported" | "ignored";
  summary: string;
}

export interface WebhookStatusResponse {
  status: "active" | "inactive";
  endpoint: string;
  targetUser: string;
  targetRepo: string;
  activeListeners: number;
  deliveriesCount: number;
  deliveries: WebhookDelivery[];
}

// Local listeners
type WebhookEventListener = (event: WebhookDelivery) => void;
const listeners: Set<WebhookEventListener> = new Set();

let eventSource: EventSource | null = null;
let isConnected = false;

// Fallback in-memory delivery store if backend server is unreachable (e.g. static preview)
const localFallbackDeliveries: WebhookDelivery[] = [
  {
    id: "wh-handshake-demo",
    event: "ping",
    sender: "abhishekCode7266",
    repository: {
      name: "Abhishek_portfolio",
      fullName: "abhishekCode7266/Abhishek_portfolio",
      description: "Interactive Software & Data Analytics Portfolio",
      htmlUrl: "https://github.com/abhishekCode7266/Abhishek_portfolio",
      language: "TypeScript",
      stars: 1,
      forks: 0,
    },
    timestamp: new Date().toLocaleTimeString(),
    status: "received",
    summary: "GitHub ping handshake: Webhook hook configured successfully.",
  },
];

export function initWebhookEventStream(onEvent?: WebhookEventListener) {
  if (onEvent) {
    listeners.add(onEvent);
  }

  if (typeof window === "undefined" || eventSource) return;

  try {
    eventSource = new EventSource("/api/github/events");

    eventSource.onopen = () => {
      isConnected = true;
    };

    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === "webhook_event" && data.event) {
          notifyListeners(data.event);
        }
      } catch {
        // ignore parse error
      }
    };

    eventSource.onerror = () => {
      isConnected = false;
      // Close and retry in 10s
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
      setTimeout(() => initWebhookEventStream(), 10000);
    };
  } catch {
    // EventSource not supported or network error
  }
}

export function subscribeToWebhook(listener: WebhookEventListener): () => void {
  listeners.add(listener);
  initWebhookEventStream();
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners(event: WebhookDelivery) {
  listeners.forEach((listener) => {
    try {
      listener(event);
    } catch {
      // ignore
    }
  });
}

// Fetch webhook status and recent delivery logs from server
export async function fetchWebhookStatus(): Promise<WebhookStatusResponse> {
  try {
    const res = await fetch("/api/github/webhook/status");
    if (!res.ok) throw new Error("Failed to reach webhook status API");
    return await res.json();
  } catch {
    // Return graceful local fallback
    return {
      status: "active",
      endpoint: "/api/github/webhook",
      targetUser: "abhishekCode7266",
      targetRepo: "abhishekCode7266/Abhishek_portfolio",
      activeListeners: listeners.size || 1,
      deliveriesCount: localFallbackDeliveries.length,
      deliveries: localFallbackDeliveries,
    };
  }
}

// Dispatch a simulated test webhook event
export async function triggerTestWebhook(params: {
  eventType?: "repository" | "push" | "ping";
  repoName?: string;
  repoDescription?: string;
  language?: string;
}): Promise<WebhookDelivery> {
  try {
    const res = await fetch("/api/github/webhook/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (res.ok) {
      const data = await res.json();
      return data.event;
    }
    throw new Error("Server test endpoint returned an error");
  } catch {
    // Fallback simulation in pure browser context
    const mockRepoName =
      params.repoName || `ai-analytics-pipeline-${Math.floor(100 + Math.random() * 900)}`;
    const mockEvent = params.eventType || "repository";

    const simulated: WebhookDelivery = {
      id: `local-wh-${Date.now()}`,
      event: mockEvent,
      action: mockEvent === "repository" ? "created" : undefined,
      sender: "abhishekCode7266",
      repository: {
        name: mockRepoName,
        fullName: `abhishekCode7266/${mockRepoName}`,
        description:
          params.repoDescription ||
          "Automated data pipeline and analysis tool with machine learning insights.",
        htmlUrl: `https://github.com/abhishekCode7266/${mockRepoName}`,
        language: params.language || "Python",
        stars: 3,
        forks: 1,
      },
      timestamp: new Date().toLocaleTimeString(),
      status: mockEvent === "repository" ? "imported" : "processed",
      summary:
        mockEvent === "repository"
          ? `New repository created: ${mockRepoName}. Auto-imported into portfolio!`
          : `Commit pushed to ${mockRepoName}. Live sync triggered.`,
    };

    localFallbackDeliveries.unshift(simulated);
    notifyListeners(simulated);
    return simulated;
  }
}
