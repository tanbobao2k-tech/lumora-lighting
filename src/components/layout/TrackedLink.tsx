"use client";

import { trackEvent } from "@/lib/analytics";

export function TrackedLink({
  gtmEvent,
  fbEvent,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { gtmEvent: string; fbEvent?: string }) {
  return <a {...props} onClick={() => trackEvent(gtmEvent, fbEvent)} />;
}
