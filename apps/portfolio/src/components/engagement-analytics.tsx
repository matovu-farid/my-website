"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { CONTACT_FORM_SUCCESS_EVENT, createEngagementTracker, type EngagementConfig } from "@/lib/engagement-analytics";

export default function EngagementAnalytics({ config }: { config: EngagementConfig }) {
  const pathname = usePathname();
  const tracker = useRef<ReturnType<typeof createEngagementTracker> | null>(null);

  useEffect(() => {
    if (!config.enabled || window.location.origin !== "https://matovu-farid.com") return;
    tracker.current ??= createEngagementTracker(config, {
      send: (url, options) => fetch(url, options),
      uuid: () => crypto.randomUUID(),
      storage: () => window.localStorage,
      optedOut: () => navigator.doNotTrack === "1" ||
        (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true,
    });
    tracker.current.view(pathname);
  }, [config, pathname]);

  useEffect(() => {
    function onContactSuccess() {
      tracker.current?.contactSubmitted();
    }
    function onActivation(event: MouseEvent) {
      if ((event.type === "click" && event.button !== 0) || (event.type === "auxclick" && event.button !== 1)) return;
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!anchor) return;
      const placement = anchor.closest("[data-analytics-placement]")?.getAttribute("data-analytics-placement") ??
        (anchor.closest("header") ? "header" : anchor.closest("footer") ? "footer" : "main");
      tracker.current?.click(anchor.getAttribute("href")!, window.location.pathname, placement);
    }
    // Capture before Next's navigation handlers. Never cancel or await navigation.
    document.addEventListener("click", onActivation, true);
    document.addEventListener("auxclick", onActivation, true);
    document.addEventListener(CONTACT_FORM_SUCCESS_EVENT, onContactSuccess);
    return () => {
      document.removeEventListener("click", onActivation, true);
      document.removeEventListener("auxclick", onActivation, true);
      document.removeEventListener(CONTACT_FORM_SUCCESS_EVENT, onContactSuccess);
    };
  }, []);

  return null;
}
