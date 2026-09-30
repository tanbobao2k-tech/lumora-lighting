declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(gtmEvent: string, fbEvent?: string) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event: gtmEvent });
  if (fbEvent) window.fbq?.("track", fbEvent);
}
