export type EngagementConfig = {
  enabled: boolean;
  token: string;
  host: string;
  caseStudyIds: string[];
};

type Dependencies = {
  send: (url: string, options: RequestInit) => unknown;
  uuid: () => string;
  optedOut: () => boolean;
  storage?: () => Pick<Storage, "getItem" | "setItem" | "removeItem">;
  now?: () => number;
};

const origin = "https://matovu-farid.com";
const placements = new Set(["header", "footer", "home_hero", "home_contact", "case_study", "contact", "main"]);
const ingestionHosts = new Set(["https://us.i.posthog.com", "https://eu.i.posthog.com"]);
const identityKey = "portfolio:anonymous-visitor:v1";
const identityLifetime = 30 * 24 * 60 * 60 * 1000;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
type AnonymousIdentity = { id: string; expiresAt: number };

/** First-party random identity only; storage failures retain a temporary document ID. */
function createAnonymousIdentity(dependencies: Dependencies) {
  let memory: AnonymousIdentity | undefined;
  let storageUnavailable = false;

  function valid(value: unknown, now: number): value is AnonymousIdentity {
    if (!value || typeof value !== "object") return false;
    const record = value as AnonymousIdentity;
    return typeof record.id === "string" && uuidPattern.test(record.id) &&
      Number.isFinite(record.expiresAt) && record.expiresAt > now && record.expiresAt <= now + identityLifetime;
  }

  return {
    get() {
      const now = dependencies.now?.() ?? Date.now();
      if (dependencies.storage && !storageUnavailable) {
        try {
          const storage = dependencies.storage();
          const raw = storage.getItem(identityKey);
          let stored: unknown;
          try { stored = raw ? JSON.parse(raw) : undefined; } catch { /* Replace corrupt records. */ }
          if (valid(stored, now)) {
            memory = { id: stored.id, expiresAt: stored.expiresAt };
            return memory.id;
          }
          memory = { id: dependencies.uuid(), expiresAt: now + identityLifetime };
          storage.setItem(identityKey, JSON.stringify(memory));
          return memory.id;
        } catch { storageUnavailable = true; }
      }
      if (!memory || memory.expiresAt <= now) {
        memory = { id: dependencies.uuid(), expiresAt: now + identityLifetime };
      }
      return memory.id;
    },
    clear() {
      memory = undefined;
      storageUnavailable = false;
      try { dependencies.storage?.().removeItem(identityKey); } catch { /* Storage may be denied. */ }
    },
  };
}

export const CONTACT_FORM_SUCCESS_EVENT = "portfolio:contact-form-success";

/** Signal only the server-confirmed outcome; never pass form fields or delivery IDs. */
export function notifyContactFormResult(
  result: { success: boolean },
  notify = () => { document.dispatchEvent(new Event(CONTACT_FORM_SUCCESS_EVENT)); },
) {
  if (!result.success) return;
  try { notify(); } catch { /* Analytics must not interrupt a successful submission. */ }
}

/** Explicit events; no SDK, cookies, person profiles, or automatic collection. */
export function createEngagementTracker(config: EngagementConfig, dependencies: Dependencies) {
  const caseStudies = new Map(config.caseStudyIds.map((id) => [`/projects/${id}`, id]));
  const pages = new Set(["/", "/projects", "/experience", "/contact", ...caseStudies.keys()]);
  let lastPage: string | undefined;
  const identity = createAnonymousIdentity(dependencies);

  function canTrack() {
    if (!config.enabled || !config.token || !ingestionHosts.has(config.host)) return false;
    if (dependencies.optedOut()) {
      identity.clear();
      return false;
    }
    return true;
  }

  // Honor opt-outs even when the landing page has no tracked event.
  try { canTrack(); } catch { /* Missing browser APIs must be harmless. */ }

  function publicPage(pathname: string) {
    const path = pathname.split(/[?#]/, 1)[0].replace(/\/$/, "") || "/";
    return pages.has(path) ? path : "other";
  }

  function capture(event: string, properties: Record<string, string>) {
    try {
      if (!canTrack()) return;
      const visitorId = identity.get();
      const request = dependencies.send(`${config.host}/i/v0/e/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "omit",
        referrerPolicy: "no-referrer",
        keepalive: true,
        body: JSON.stringify({
          api_key: config.token,
          event,
          distinct_id: visitorId,
          properties: {
            ...properties,
            site: "portfolio",
            $process_person_profile: false,
            $geoip_disable: true,
            $ip: "0.0.0.0",
          },
        }),
      });
      // Delivery is best effort and never holds up the visitor's action.
      void Promise.resolve(request).catch(() => {});
    } catch {
      // Blocking analytics, offline browsers, or missing APIs must be harmless.
    }
  }

  return {
    contactSubmitted() {
      capture("contact_form_submitted", { page: "/contact", channel: "form", environment: "production" });
    },
    view(pathname: string) {
      const page = publicPage(pathname);
      if (lastPage === page) return;
      lastPage = page;
      const projectId = caseStudies.get(page);
      if (projectId) capture("case_study_view", { page, project_id: projectId });
    },
    click(href: string, pathname: string, placement: string) {
      let destination: URL;
      try { destination = new URL(href, origin); } catch { return; }
      const properties = {
        page: publicPage(pathname),
        placement: placements.has(placement) ? placement : "main",
      };
      if (destination.origin === origin && destination.pathname === "/Farid-Matovu-Resume.pdf") {
        capture("resume_download", properties);
      } else if (destination.origin === origin && destination.pathname.replace(/\/$/, "") === "/contact") {
        capture("contact_click", { ...properties, channel: "contact_page" });
      } else if (destination.protocol === "mailto:" && destination.pathname === "matovu90@gmail.com") {
        capture("contact_click", { ...properties, channel: "email" });
      } else if (destination.origin === "https://www.linkedin.com" && destination.pathname.replace(/\/$/, "") === "/in/matovu-farid") {
        capture("contact_click", { ...properties, channel: "linkedin" });
      }
    },
  };
}
