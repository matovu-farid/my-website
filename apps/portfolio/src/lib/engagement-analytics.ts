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
};

const origin = "https://matovu-farid.com";
const placements = new Set(["header", "footer", "home_hero", "home_contact", "case_study", "contact", "main"]);
const ingestionHosts = new Set(["https://us.i.posthog.com", "https://eu.i.posthog.com"]);

export const CONTACT_FORM_SUCCESS_EVENT = "portfolio:contact-form-success";

/** Signal only the server-confirmed outcome; never pass form fields or delivery IDs. */
export function notifyContactFormResult(
  result: { success: boolean },
  notify = () => { document.dispatchEvent(new Event(CONTACT_FORM_SUCCESS_EVENT)); },
) {
  if (!result.success) return;
  try { notify(); } catch { /* Analytics must not interrupt a successful submission. */ }
}

/** Explicit events; no SDK, cookies, browser storage, or automatic collection. */
export function createEngagementTracker(config: EngagementConfig, dependencies: Dependencies) {
  const caseStudies = new Map(config.caseStudyIds.map((id) => [`/projects/${id}`, id]));
  const pages = new Set(["/", "/projects", "/experience", "/contact", ...caseStudies.keys()]);
  let lastPage: string | undefined;
  let visitId: string | undefined;

  function publicPage(pathname: string) {
    const path = pathname.split(/[?#]/, 1)[0].replace(/\/$/, "") || "/";
    return pages.has(path) ? path : "other";
  }

  function capture(event: string, properties: Record<string, string>) {
    try {
      if (!config.enabled || !config.token || !ingestionHosts.has(config.host) || dependencies.optedOut()) return;
      // Random per-document ID stays in memory and is never linked to a person.
      visitId ??= dependencies.uuid();
      const request = dependencies.send(`${config.host}/i/v0/e/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "omit",
        referrerPolicy: "no-referrer",
        keepalive: true,
        body: JSON.stringify({
          api_key: config.token,
          event,
          distinct_id: visitId,
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
